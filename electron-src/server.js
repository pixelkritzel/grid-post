const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 4500;

app.use(cors());

app.get('/images', function(req, res) {
  const { imagePath } = req.query;
  if (imagePath) {
    res.sendFile(imagePath, err => {
      if (err) {
        res.status(404).send(`Error at reading file ${imagePath}`);
      }
    });
  } else {
    res.status(400).send(`Can't serve image without imagePath`);
  }
});

module.exports = function createServer() {
  app.listen(port, () => console.log(`Post-Grid server stated at http://localhost:${port}`));
};
