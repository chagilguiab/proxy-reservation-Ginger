const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});


app.use('/:id', express.static(path.join(__dirname, '/../public')));


app.use('/:id', proxy({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/ratings_ambience/:id', proxy({ target: 'http://localhost:3002', changeOrigin: true }));
app.use('/reviews/:id', proxy({ target: 'http://localhost:3002', changeOrigin: true }));
app.use('/restaurants/:id', proxy({ target: 'http://localhost:3003', changeOrigin: true }));
app.use('/menus/:id', proxy({ target: 'http://localhost:3004', changeOrigin: true }));


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

//NOTES:
//I was only able to get data for reservation service if I use above proxy middlevare.
//Proxy has extra '/' in url at the end. In order to grab the correct id I changed reviews and overview services's id method to this:  "window.location.href.split('/')[3]" in front end(in each component).
//I was not able to get data for overview service. To achieve getting data for id's I changed url to be fetched to this: `http://localhost:3003/restaurants/${this.state.urlID}`
//Also reviews service has password for database. It should be removed or password should be provided.
//In order to get data for menu service meke sure mongo running.



