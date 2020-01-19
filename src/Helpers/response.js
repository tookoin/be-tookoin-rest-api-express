module.exports = {
  success: (res, data) => {
    res.status(200).send({
      status: 200,
      msg: "SUCCESS",
      data
    });
  },

  failed: (res, data) => {
    res.status(200).send({
      status: 400,
      msg
    });
  },

  emailAlreadylExist: res => {
    res.status(200).send({ msg: "Email already exist" });
  },

  invalidPassword: res => {
    res.status(200).send({ msg: "Invalid Password" });
  },

  invalidUsername: res => {
    res.status(200).send({ msg: "Username not registered" });
  }

  // invalidPassword: res => {
  //   res.status(422).send({ msg: "Invalid Password" });
  // },

  // invalidUsername: res => {
  //   res.status(401).send({ msg: "Username not registered" });
  // }
};
