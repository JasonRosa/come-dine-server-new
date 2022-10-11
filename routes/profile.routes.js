const User = require("../models/User.model");
const router = require("express").Router();
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const DIR = './public/';
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, new Date().toISOString().replace(/:/g, '-')  + file.originalname);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post(
  "/profile/image-upload",
  upload.single("imgUrl"),
  async (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    // const user = new User({
    //     _id: new mongoose.Types.ObjectId(),
    //     name: req.body.name,
    //     profileImg: url + '/public/' + req.file.filename
    // });
    const user = await User.findByIdAndUpdate(req.body.id, {
      imgUrl: url + "/public/" + req.file.filename,
    });
    res.send(user)
  }
);

router.get("/profile/:userId", (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.json(err));
});

router.post("/profile/create/", (req, res, next) => {
  const { firstName, lastName, username, email, password, imgURL, city } =
    req.body;

  Profile.create({
    firstName,
    lastName,
    username,
    email,
    password,
    imgURL,
    city,
  })
    .then((newRequest) => {
      return Profile.findByIdAndUpdate(partyId, {
        $push: { profile: newProfile._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.put("/profile/edit/:userId", (req, res, next) => {
  const { userId } = req.params;
  const { firstName, lastName, email, password, city, description } = req.body;

  User.findByIdAndUpdate(
    userId,
    { firstName, lastName, email, password, city, description },
    { new: true }
  )
    .then((user) => res.status(200).json(user))
    .catch((err) => res.json(err));
});

router.delete("/profile/delete/:userId", (req, res, next) => {
  const { userId } = req.params;

  User.findByIdAndRemove(userId)
    .then(() => res.redirect("/signin"))
    .catch((err) => res.json(err));
});

module.exports = router;
