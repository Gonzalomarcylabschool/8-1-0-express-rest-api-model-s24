require('dotenv').config();
const express = require('express');
// const path = require('path');
const {
  serveSongs,
  serveSong,
  createSong
} = require('./controllers/songControllers');

const app = express();

//////////////
// Middleware
//////////////

const logRoute = (req, res, next) => {
  console.log('Time:', Date.now());
  next();
};

createSong({body: { title: 'Hot to Go', artist: 'Chappel Roan' }}, { send: console.log });
createSong({body: { title: 'Pink Pony Club', artist: 'Chappel Roan'}}, { send: console.log });

const paresJson = express.json();

app.use(logRoute);
app.use(paresJson);

app.get('/', (req, res) => {
  res.send('Hello World');
});


app.get('/api/songs', serveSongs); // this is sending data back to the client / getting all of the Songs
app.get('/api/songs/:id', serveSong);// this is sending data back to the client / getting a single Song

app.post('/api/songs', createSong); // this is creating a new Song

// const key = process.env.API_KEY || 'default-key'; //example of using default value

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});