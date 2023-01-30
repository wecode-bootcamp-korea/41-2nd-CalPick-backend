require("dotenv").config();

const { createApp }  = require("./app");
const { appDataSource } = require("./src/databases/database");

const createServer = async () => {
    try {
        const app = createApp();
        const PORT = process.env.PORT;

        await appDataSource
          .initialize()
          .then(() => {
            console.log("Data Source has been intialized!");
          })
          .catch((err) => {
            console.error("Error occurred during Data Source initialization", err);
          });
        app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
      } catch (err) {
        appDataSource.destroy();
        console.error(err);
      }
};

createServer ();