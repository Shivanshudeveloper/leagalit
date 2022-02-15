const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51IdwfeH8KzFo5uc9YHKzp2HOPkZJvH0ij0qhWeg0wQ17G73o5fVJYjMkWOfAmWUgjVZe0DesJvrQKbmAPSacXsVP00qMXnEqFr"
);
const { v4: uuidv4 } = require("uuid");
// Getting Module
const Products_Model = require("../models/Products");
const MainStore_Model = require("../models/MainStore");
const FeaturedProduct_Model = require("../models/FeaturedProduct");
const Profile_Model = require("../models/Profile")

// TEST
// @GET TEST
// GET
router.get("/test", (req, res) => {
  res.send("Working");
});

// Database CRUD Operations
// @POST Request to GET the People
// GET
router.get("/getallproductapi", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  Products_Model.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Database CRUD Operations
// @POST Request to GET the People
// GET
router.get("/getallproductsmainstorefilters/:filter", (req, res) => {
  const { filter } = req.params;
  res.setHeader("Content-Type", "application/json");
  MainStore_Model.find({ gender: filter })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Database CRUD Operations
// @POST Request to GET the Product Details
// GET
router.patch("/hidefeatured/:id", async (req, res) => {
  const { id } = req.params;
  res.setHeader("Content-Type", "application/json");
  const product = await FeaturedProduct_Model.find({ _id: id });
  await FeaturedProduct_Model.findByIdAndUpdate(
    id,
    { ...product, hidden: true },
    { new: true, useFindAndModify: false }
  )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// TEST
router.post("/profiles/test", async (req, res) => {
  res.json(req.body)
})

// Database CRUD Operations
// Post a new profile
// POST
router.post("/profiles", async (req, res) => {

  res.setHeader("Content-Type", "application/json");

  const newProfile = new Profile_Model({
    title: req.body.title,
    landlordName: req.body.landlordName,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    address1: req.body.address1,
    address2: req.body.address2,
    createdOn: req.body.createdOn,
    userId: req.body.userId
  });

  newProfile.save((err) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).send("created a new profile")
  })
})

// Database CRUD Operations
// Get all the profiles corresponding to an userId
// GET
router.get("/profiles/:userId", async (req, res) => {

  res.setHeader("Content-Type", "application/json");

  Profile_Model.find({ userId: req.params.userId }, (err, profiles) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).json(profiles)
  }
  )
})

// Database CRUD Operations
// Delete a profile based on _id
// Delete
router.delete("/profiles/:profileId", async (req, res) => {

  res.setHeader("Content-Type", "application/json");

  Profile_Model.deleteOne({ _id: req.params.profileId }, (err) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).send("Deleted one profile successfully!")
  })
})

// Database CRUD Operations
// Modify a profile based on _id
// Patch
router.patch("/profiles/:profileId", async (req, res) => {

  res.setHeader("Content-Type", "application/json");

  Profile_Model.updateOne({ _id: req.params.profileId },
    {
      $set: req.body
    },
    (err) => {
      if (err)
        res.status(400).json(`Error: ${err}`)
      else
        res.status(200).send("Patched one profile")
    })
})

router.get("/getProfile/:profileId", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  Profile_Model.findById({ _id: req.params.profileId }, (err, profile) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).send(profile)
  })
})


module.exports = router;