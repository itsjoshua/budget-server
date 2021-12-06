require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const session = require('@fastify/session');
const cookie = require('fastify-cookie');
const {google} = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const fs = require('fs');
const path = require('path');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const PORT = process.env.PORT || 8080;

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public')
});

fastify.register( cookie );
fastify.register( session, {
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 43200000
  }
} );

var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const auth = new google.auth.GoogleAuth({
  scopes: SCOPES
});
const sheets = google.sheets(
  {version: 'v4', auth}
);


let getSpreadSheetData = async () => {
    let response = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: '1RcfH5mXYdaY9jm8uPAPnQau_nSALE5GskPdCR98tJK4',
        majorDimension: 'COLUMNS',
        ranges: ['Aug-Sep21!G:G','Aug-Sep21!U:U']
      });
      return response;
};

let postSpreadSheetData = async ( budgetEntry ) => {
  var entryBody = {
    majorDimension: "COLUMNS",
    values:
      [
        [budgetEntry.date],
        [budgetEntry.categoryMain + ' - ' + budgetEntry.categorySub],
        [budgetEntry.amount],
        [budgetEntry.mode],
        [budgetEntry.comment]
      ]
  };
  let updateResp = await sheets.spreadsheets.values.append({
    spreadsheetId: '1RcfH5mXYdaY9jm8uPAPnQau_nSALE5GskPdCR98tJK4',
    range: 'Aug-Sep21',
    valueInputOption: 'USER_ENTERED',
    resource: entryBody
  });
  return updateResp;
};

let getAuthUsersFromPayload = ( resp ) => {
  var listOfUsers = []
  if( resp.data && resp.data.valueRanges && resp.data.valueRanges[1] && resp.data.valueRanges[1].values ) {
    for( var i=0; i<resp.data.valueRanges[1].values[0].length; i++ ) {
      listOfUsers.push( resp.data.valueRanges[1].values[0][i] );
    }
  }
  return listOfUsers;
}

// Declare a route
fastify.get('/budget/categories', async (request, reply) => {
  let resp = await getSpreadSheetData();
  if( !resp ) {
    throw new Error('Please try again later.')
  }
  let sessEmail = undefined;
  let listOfUsers = getAuthUsersFromPayload( resp );
  
  if( request.session && request.session.user && request.session.user.email && listOfUsers.includes( request.session.user.email ) ) {
    sessEmail = request.session.user.email;
  }
  if( !sessEmail ) {
    throw new Error('Please login to view data.');
  }
  request.session.user = { 
    email: sessEmail,
    needsSignIn: false,
    authUsers: listOfUsers
  };
  var categoryMap = {};
       if (resp.data && resp.data.valueRanges[0].values[0].length > 0) {
         for ( var i = 1; i <  resp.data.valueRanges[0].values[0].length; i++) {
           var row = resp.data.valueRanges[0].values[0][i];
           const splitCategory = row.split('-');
           let mainCategory = splitCategory[0].trim();
           let subCategory = splitCategory[1].trim();
           if( categoryMap.hasOwnProperty( mainCategory ) ) {
             if( !categoryMap[mainCategory].includes( subCategory ) ) {
              categoryMap[mainCategory].push( subCategory );
             }
           }else {
            categoryMap[mainCategory] = [ '' ];
           }
        }
      }
  return categoryMap;
});

fastify.post('/api/v1/auth/google',async (request, reply) => {
  const { token }  = request.body
  console.log( token );
  const ticket = await client.verifyIdToken({
      idToken: token
  });
  const { name, email, picture } = ticket.getPayload();
  const user = {
    name: name,
    email: email,
    picture: picture
  }  
  request.session.user = { 
    email: email,
    needsSignIn: false
  };
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(user);
} );

fastify.post('/budget/needsSignIn', async( request, reply ) => {
  //heroku logging
  console.log('********** server side client id: ' + process.env.REACT_APP_GOOGLE_CLIENT_ID);
  console.log('********** server side mode: ' + process.env.NODE_ENV);
  const needsSignInObj = { 
    needsSignIn: true
  }
  if( request.session && request.session.user && !request.session.user.needsSignIn ) {
    needsSignInObj.needsSignIn = false
  }
  reply
  .code(200)
  .header('Content-Type', 'application/json; charset=utf-8')
  .send(needsSignInObj);
});

fastify.post('/budget/submitSingleEntry', async( request, reply ) => {
  const { budgetEntryObj } = request.body;
  console.log( budgetEntryObj );
  let authUsers = [];
  if( request.session && request.session.user && request.session.user.needsSignIn ) {
    if( request.session.user.needsSignIn ) {
      throw new Error('Please sign in to post data.');
    }
    if( request.session.user.authUsers ) {
      authUsers = request.session.user.authUsers;
    }
    if( authUsers.length === 0 || !authUsers.includes( request.session.user.email ) ) {
      throw new Error('Please sing in to post data.')
    }
  }
  request.session.user = {
    email: request.session.user.email,
    needsSignIn: false,
    authUsers: authUsers    
  };

  let updateResp = await postSpreadSheetData( budgetEntryObj );
  reply
  .code( 200 )
  .header( 'Content-Type', 'application/json; charset=utf-8' )
  .send( updateResp.result );

} );


// Run the server!
const start = async () => {
  try {
    await fastify.listen(PORT, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()