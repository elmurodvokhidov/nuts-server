const express = require("express");
const app = express();
require("dotenv").config();
require("./start/routes")(app);
require("./start/db")(app);