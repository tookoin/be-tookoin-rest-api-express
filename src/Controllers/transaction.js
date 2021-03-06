const model = require('../Models/transaction');
const jwtdecode = require('jwt-decode');
const form = require('../Helpers/form');

module.exports = {
    getTransactionDetailBuyer: (req, res) => {
        const { params } = req;
        const token = req.headers['authorization'];
        const decoded = jwtdecode(token);
        model
            .getTransactionDetailBuyer(params.id, decoded['id_user'])
            .then(result => {
                form.success(res, result)
            })
            .catch(err => console.log(err));
    },
    getTransactionDetailSeller: (req, res) => {
        const { params } = req;
        const token = req.headers['authorization'];
        const decoded = jwtdecode(token);
        model
            .getTransactionDetailSeller(params.id, decoded['id_user'])
            .then(result => {
                form.success(res, result)
            })
            .catch(err => console.log(err));
    },
    getTransactionBuyer: (req, res) => {
        const token = req.headers['authorization'];
        const decoded = jwtdecode(token);
        const { params } = req;
        model
            .getTransactionBuyer(decoded['id_user'], params)
            .then(result => {
                form.success(res, result)
            })
            .catch(err => console.log(err));
    },
    getTransactionSeller: (req, res) => {
        const token = req.headers['authorization'];
        const decoded = jwtdecode(token);
        const { params } = req;
        model
            .getTransactionSeller(decoded['id_user'], params)
            .then(result => {
                form.success(res, result)
            })
            .catch(err => console.log(err));
    },
    patchSID: (req, res) => {
        const token = req.headers['authorization'];
        const decoded = jwtdecode(token);
        const { query, params } = req;
        model.patchSID(query, params.id, decoded['id_user']).then(result => {
            form.success(res, result)
        }).catch(err => console.log(err));
    },
    postStatus: (req, res) => {
        const { body } = req;
        if (body.status == 'berhasil') {
            var status = 3;
        } else {
            var status = 7
        }

        model.postStatus(body, status).then(result => {
            form.success(res, result)
        }).catch(err => console.log(err));
    },
    patchStatus: (req, res) => {
        const { query, params } = req
        model.patchStatus(query, params).then(result => {
            form.success(res, result)
        }).catch(err => console.log(err));
    }
}