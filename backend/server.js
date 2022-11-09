//Required stuff
const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');          
const PORT = process.env.PORT || 5000;
const app = express();
app.set('port', (process.env.PORT || 5000));

var blueimp = require('blueimp-md5');

//MongoDB stuff
require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
client.connect();
 
//Set up production env
if (process.env.NODE_ENV === 'production') 
{
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

//API and extra
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/register', async (req, res, next) =>
{
  const { firstName, lastName, login, password } = req.body;
  const newUser = {FirstName:firstName,LastName:lastName, Login:login, Password:blueimp(password), UserId:5};
  var error = '';

  try
  {
    const db = client.db('Cards');
    const result = db.collection('Users').insertOne(newUser);
  }
  catch(e)
  {
    error = e.toString();
  }

  var ret = { firstName:firstName, lastName:lastName, login:login, password:blueimp(password), error: error };
  res.status(200).json(ret);
});

app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error
  var error = '';
  const { login, password } = req.body;
  const db = client.db("Cards");
  const results = await db.collection('Users').find({Login:login,Password:blueimp(password)}).toArray();
  var id = -1;
  var fn = '';
  var ln = '';
  if( results.length > 0 )
  {
    id = 1;
    fn = results[0].FirstName;
    ln = results[0].LastName;
  }
  var ret = { id:'1', firstName:fn, lastName:ln, error:''};
  res.status(200).json(ret);
});

app.post('/api/searchcards', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error
  var error = '';
  const { userId, search } = req.body;
  var _search = search.trim();
  
  const db = client.db("Cards");
  const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'r'}}).toArray();
 

  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].Card );
  }
  
  var ret = {results:_ret, error:error};
  res.status(200).json(ret);
});


app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});

