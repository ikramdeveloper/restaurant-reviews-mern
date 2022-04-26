import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import RestaurantsDAO from "./dao/restaurantsDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

dotenv.config();

const MongoClient = mongodb.MongoClient;

const PORT = process.env.port || 5000;

MongoClient.connect(process.env.MONGODB_URI)
  .catch((err) => {
    console.error(err.stack);
    process.exit();
  })
  .then(async (client) => {
    await RestaurantsDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);
    app.listen(PORT, console.log(`listening on ${PORT}...`));
  });
