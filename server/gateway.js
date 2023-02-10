const app = require('./src/app');

const PORT = process.env.PORT || 3000;

/// Starting the server
app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  }
  console.info(`Server is running on port: ${PORT}`);
});
