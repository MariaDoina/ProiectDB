const Clothing = require("../models/clothing");

const clothes_index = (req, res) => {
  Clothing.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("all-clothes", { title: "All Clothes", clothes: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const clothes_details = (req, res) => {
  const id = req.params.id;
  Clothing.findById(id)
    .then((result) => {
      res.render("details", { clothing: result, title: "Clothes details" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const clothes_create_get = (req, res) => {
  res.render("add-clothes", { title: "Add new clothes" });
};

const clothes_create_post = (req, res) => {
  const { Name, Description, Price, Stock, Sizes, Colors } = req.body;

  const sizesArray = Sizes.split(",");
  const colorsArray = Colors.split(",");

  const clothing = new Clothing({
    Name,
    Description,
    Price,
    Stock,
    Sizes: sizesArray,
    Colors: colorsArray,
  });

  clothing
    .save()
    .then((result) => {
      res.redirect("/clothes");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};

const clothes_delete = (req, res) => {
  const id = req.params.id;

  Clothing.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/clothes" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const clothes_update_get = (req, res) => {
  const id = req.params.id;
  Clothing.findById(id)
    .then((result) => {
      res.render("update", {
        clothing: result,
        title: "Update Clothes",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};

const clothes_update_post = async (req, res) => {
  try {
    const { Sizes, Colors, ...rest } = req.body; // Separ Sizes și Colors din restul datelor
    const sizesArray = Sizes.split(",");
    const colorsArray = Colors.split(",");

    const updatedClothing = await Clothing.findByIdAndUpdate(
      req.params.id,
      {
        ...rest, // Pastrez restul datelor
        Sizes: sizesArray,
        Colors: colorsArray,
      },
      { new: true, runValidators: true }
    );

    res.status(200).redirect(`/clothes/${updatedClothing._id}`);
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = {
  clothes_index,
  clothes_details,
  clothes_create_get,
  clothes_create_post,
  clothes_delete,
  clothes_update_get,
  clothes_update_post,
};
