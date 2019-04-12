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



