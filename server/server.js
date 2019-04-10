const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, '/../public')));



app.use((req, res) => {
  const restaurantId = req.path.slice(1).split('/')[0];
  if (restaurantId === '' || restaurantId) {
    res.sendFile(path.join(__dirname, '/../public/index.html'));
  } else {
    res.send('Can not load restaurant information!').end();
  }
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});


