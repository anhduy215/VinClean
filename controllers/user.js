const _ = require("lodash");
const User = require("../models/users");
const { upload, uploadFile } = require("../helpers/fbconfig");

exports.userByLogin = (req, res, next, id) => {
  User.findById(id).exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = users;
    next();
  });
};

exports.getUserBySignIn = (req, res) => {
  User.findById(req.auth._id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    return res.status(200).json({ user });

  });
};

exports.allUsers = (req, res) => {
  const currentPage = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const name = req.query.name || "";
  let totalItems;
  const Users = User.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return User.find({ name: { $regex: name, $options: "i" } })
        .skip((currentPage - 1) * perPage)
        .select("image name phone role address status tax")
        .limit(perPage)
        .sort({ created: -1 });
    })
    .then((users) => {
      res.status(200).json({
        totalPage: Math.ceil(totalItems / perPage),
        totalItems,
        perPage,
        currentPage,
        list: users,
      });
    })
    .catch((err) => console.log(err));
};

exports.getUser = (req, res) => {
  return res.json(req.profile);
};

exports.createUser = async (req, res, next) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.status(403).json({
      message: "Email is taken!",
    });
  const user = new User(req.body);
  await user.save();
  res.status(200).json({ message: "Create Success" });
};

exports.updateUserV2 = async (req, res) => {
  try {
    const uploadMiddleware = upload.single('image');
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          error: err.message
        });
      }
      let user = req.profile;
      user = _.extend(user, req.body);
      user.updated = Date.now();

      // Kiểm tra nếu có tệp tải lên
      if (req.file) {
        const file = req.file;

        // Xử lý tệp tải lên và lưu vào Firebase Storage
        const filename = await uploadFile(file);

        // Lưu filename vào thông tin người dùng
        user.image = filename;
      }

      user.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
      });
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      error: 'Something went wrong'
    });
  }
};


exports.updateUser = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

exports.deleteUser = (req, res, next) => {
  let user = req.profile;
  user.status = req.query.status;
  if (req.query.status === undefined) {
    return res.status(404).json({ message: "User deleted failed" });
  }
  user.updated = Date.now();
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({ message: "User deleted successfully" });
  });
};