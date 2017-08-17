const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 4500;

const getResources = require('./resources');

app.use(cors());

app.get('/images', function(req, res) {
  const { cid } = req.query;
  const resources = getResources();
  const resource = resources.find(resource => resource.cid === cid);
  if (resource) {
    res.sendFile(resource.path, err => {
      if (err) {
        res.status(404).send(`Error at reading file ${resource.path}`);
      }
    });
  } else {
    res.status(400).send(`Can't serve image without imagePath`);
  }
});

module.exports = function createServer() {
  app.listen(port, () => console.log(`Post-Grid server stated at http://localhost:${port}`));
};
