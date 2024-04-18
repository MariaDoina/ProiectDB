const express = require("express");
const mongoose = require("mongoose");

const clothesRoutes = require("./routes/clothesRoutes");

//conencting to mongoDB
const dbURI =
  "mongodb+srv://<username>:<password>@store.tnbq3ln.mongodb.net/<YourCollectionName>?retryWrites=true&w=majority&appName=Store";

mongoose
  .connect(dbURI)
  .then((result) => app.listen(5050))
  .catch((err) => console.log(err));
//express app
const app = express();

//register view engine
app.set("view engine", "ejs");

//middleware and static files(for style.css)
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About us" });
});

app.get("/women", (req, res) => {
  res.render("women", { title: "Women" });
});

//clothes routes
app.use("/clothes", clothesRoutes);

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
