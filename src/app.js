const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoute = require("./router/users.routes");
const orderRoute = require("./router/order.routes");
const restauRoutes = require("./router/restau.routes");
const repasRoutes = require("./router/repas.routes");

const app = express ();

mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb+srv://pacyL:newUser1@cluster0-ujmqc.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use("/api/auth", userRoute);
app.use("/api/order", orderRoute);
app.use("/api/restaurants", restauRoutes);
app.use("/api/repas", repasRoutes);

module.exports = app;
