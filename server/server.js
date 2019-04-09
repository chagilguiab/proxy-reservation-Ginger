const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

const router = require('./router.js');

app.use(express.static(path.join(__dirname, '/../public')));

//app.use('/:restaurantId/:partySize/:date/:time', express.static(path.join(__dirname, '/../public')));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});


