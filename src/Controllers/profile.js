const model = require("../Models/profile");
const jwtdecode = require("jwt-decode");
const response = require("../Helpers/response");
const multer = require("multer");
const validate = require("../Helpers/validate_data");
const path = require("path");
// const photo = require('../Helpers/uploadPhoto')

const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, "../../public/uploads/user");
  },
  filename: function(req, file, cb) {
    cb(null, "user-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: validate.imageFilter
}).single("photo");

module.exports = {
  updateProfile: (req, res) => {
    upload(req, res, err => {
      if (req.fileValidationError) {
        res
          .status(400)
          .json({
            error: true,
            message: "Only image file is allowed, try another file"
          });
      } else if (err) {
        res.status(400).json({ message: err, message: "File is not valid" });
      } else {
        const photo = req.file ? req.file.filename : req.file;
        const { body, params } = req;
        Object.assign(body, { photo: photo });
        const token = req.headers["authorization"];
        const decode = jwtdecode(token);

        model
          .updatePofile(body, params, decode["id_user"])
          .then(result => {
            response.success(res, result);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }
};
