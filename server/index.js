import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// data imports

import User from "./models/User.js";
import { dataUser, dataProduct, dataProductStat, dataTransaction } from "./data/index.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";


// CONFIGURATION

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// MONGOOSE SETUP

const PORT = process.env.PORT || 9000;
console.log(process.env.PORT);

console.log(process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // ONLY ADD DATA ONE TIME
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // User.insertMany(dataUser);
     //Transaction.insertMany(dataTransaction);
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });
