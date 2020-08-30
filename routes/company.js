const express = require("express");
const router = express.Router();
const Company = require("../models/company");
const bodyParser = require("body-parser");
const path = require("path");
const Response = require("../tools/Response");

let titles = [
  "name",
  "registrationCode",
  "city",
  "state",
  "phoneNumber",
  "registrationDate",
];

router.use(
  bodyParser.urlencoded({
    extended: "true",
  })
);
router.use(bodyParser.json());
router.use(
  bodyParser.json({
    //body-parser
    type: "application/vnd.api+json",
  })
);


router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.post("/addUser", function (req, res, next) {
  //adding company
  for (let i = 0; i < 5; i++) {
    if (!req.body[titles[i]]) return next("your information is not complete");
    
  }
  const NEW_COMPANY = new Company({
    // creating data
    name: req.body.name,
    registrationCode: req.body.registrationCode,
    city: req.body.city,
    state: req.body.state,
    phoneNumber: req.body.phoneNumber,
    registrationDate: req.body.registrationDate,
  });

  NEW_COMPANY.save(function (err, data) {
    if (err) next(err);
    else res.json(new Response(true , data));
  });
});

router.get("/getAllUsers", function (req, res) {
  //get all users req
  Company.find({}, function (err, data) {
    if (err) next(err);
    else res.json(new Response(true,data));
    
  });
});

router.put("/updateUser/:userId", function (req, res) {
  //get all users req
  Company.findByIdAndUpdate( { _id: req.params.userId }, req.body ,{ new: true }, function (err, data) {
      if (err) next(err);
      else res.json(new Response(true,data));
    }
    
  );
});

router.delete("/deleteUser/:userId", function (req, res) {
  //get all users req
  Company.findByIdAndRemove({ _id: req.params.userId }, function (err, data) {

    if (err) return next(err);
    else res.json(new Response(true , data));

  });
});




module.exports = router;
