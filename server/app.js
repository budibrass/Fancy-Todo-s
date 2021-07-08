require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;
const route = require("./routes");
const Cors = require("cors");
const errHandler = require("./middlewares/errHandling")

app.use(express.urlencoded ({ extended : true }));
app.use(express.json());
app.use(Cors());

app.use("/", route);
app.use(errHandler)

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});