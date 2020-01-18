module.exports = {
  success: (res, data) => {
    res.json({
      status: 200,
      msg: "SUCCESS",
      data
    });
  },

  failed: (res, msg) => {
    res.status(200).json({
      status: 400,
      msg
    });
  },

  emailAlreadylExist: res => {
    res.status(200).json({
      status: 400,
      msg: "Email already exist",
    });
  },

  invalidPassword: res => {
    res.status(400).send({ msg: "Invalid Password" });
  },

  invalidUsername: res => {
    res.status(400).send({ msg: "Username not registered" });
  }

  // invalidPassword: res => {
  //   res.status(422).send({ msg: "Invalid Password" });
  // },

  // invalidUsername: res => {
  //   res.status(401).send({ msg: "Username not registered" });
  // }
};
