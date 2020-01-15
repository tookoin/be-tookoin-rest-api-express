const model = require('../Models/cart');
const jwtdecode = require('jwt-decode');
const form = require('../Helpers/form');

module.exports = {
    getCart: (req, res) => {
        const token = req.headers['authorization'];
        const decoded = jwtdecode(token);
        model.getCart(decoded['id_user']).then(response => {
            form.success(res, response);
        }).catch(err => console.log(err));
    },
    postCart: (req, res) => {
        const { body } = req;
        const token = req.headers['authorization'];
        const decoded = jwtdecode(token);
        model.checkCart(body, decoded['id_user']).then(response => {
            if (response.length > 0) {
                model.updateCart(body, decoded['id_user']).then(response => {
                    form.success(res, response);
                }).catch(err => console.log(err));
            } else {
                model.addCart(body, decoded['id_user']).then(response => {
                    form.success(res, response);
                }).catch(err => console.log(err));
            }
        }).catch(err => console.log(err));
    },
    patchCart: (req, res) => {
        const { query, params } = req;
        const token = req.headers['authorization'];
        const decoded = jwtdecode(token);
        model.patchCart(query, params, decoded['id_user']).then(response => {
            form.success(res, response);
        }).catch(err => console.log(err));
    },
    deleteCart: (req, res) => {
        const { params } = req;
        let param = params.cartId;
        const token = req.headers['authorization'];
        const decoded = jwtdecode(token);
        model.deleteCartId(param, decoded['id_user']).then(response => {
            form.success(res, response);
        }).catch(err => console.log(err));
    },
    checkoutCart: (req, res) => {
        const { params } = req;
        const token = req.headers['authorization'];
        const decoded = jwtdecode(token);
        model.getCartId(params, decoded['id_user']).then(response => {
            let data = response[0];
            model.checkoutCartId(data, decoded['id_user']).then(result1 => {
                model.checkoutDetail(result1.insertId, data, decoded['id_user']).then(result => {
                    model.deleteCart(data).catch(err => console.log(err));
                    form.success(res, result1);
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    },
    checkoutCartStore: (req, res) => {
        const { params } = req;
        const token = req.headers['authorization'];
        const decoded = jwtdecode(token);
        model.getCartStore(params, decoded['id_user']).then(response => {
            let data = response;
            model.checkoutCartId(data[0], decoded['id_user']).then(result1 => {
                for (let i = 0; i < data.length; i++) {
                    model.checkoutDetail(result1.insertId, data[i], decoded['id_user']).then(result => {
                        model.deleteCart(data[i]).catch(err => console.log(err));
                    }).catch(err => console.log(err));
                    console.log(i);
                }
                form.success(res, result1);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }
}