const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.static(__dirname + '/build'));
console.log(__dirname + '/build');
app.use(cors());

const PORT = process.env.PORT || 5500;

/// Starting the server
app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  }
  console.info(`Server is running on port: ${PORT}`);
});
