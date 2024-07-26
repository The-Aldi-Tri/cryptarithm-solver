require("dotenv").config(); // Load environment variables
const app = require("./app");

// Config
const config = require("./configs/config");

// Server listening
app.listen(config.app.port, config.app.host, () => {
  console.info(
    `Server is listening on http://${config.app.host}:${config.app.port}`
  );
});
