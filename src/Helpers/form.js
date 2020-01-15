module.exports = {
  success: (res, data, status = 200, msg = 'success') => {
    res.json({ status, msg, data });
  },
  failed: (res, data, status = 400, msg = 'failed') => {
    res
      .status(status)
      .json({ status, msg, data });
  },
  emailExist: res => {
    res
      .status(403)
      .send({ msg: 'Email Already Exist' });
  },
  allData: (res, data, paginate, status = 200, msg = 'success', ) => {
    res.json({ status, msg, data, paginate })
  }
};