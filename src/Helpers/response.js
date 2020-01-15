module.exports = {
  success: (res, data) => {
    res.json({
      status: 200,
      msg: "SUCCESS",
      data
    });
  },

  failed: (res, data) => {
    res.json({
      status: 400,
      msg: "FAILED",
      data
    });
  },

  emailAlreadylExist: res => {
    res.status(403).send({ msg: "Email already exist" });
  },

  invalidPassword: res => {
    res.status(422).send({ msg: "Invalid Password" });
  },

  invalidUsername: res => {
    res.status(401).send({ msg: "Username not registered" });
  }
};
