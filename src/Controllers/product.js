const model = require('../Models/product');
const jwtdecode = require('jwt-decode');
const form = require('../Helpers/form');

module.exports = {
    getAllProduct: (req, res) => {
        const { query } = req;
        model.getAllProduct(query).then(response => {
            page = parseInt(response[2]);
            limit = parseInt(response[1]);
            dataAmount = response[3];

            totalPage = Math.ceil(dataAmount / limit);
            nextPage = totalPage - page;
            prevPage = (totalPage - 1) - nextPage;

            paginate = {
                "totalPage": totalPage,
                "per_page": limit,
                "page": page,
                "total": dataAmount,
                "next": nextPage,
                "prev": prevPage
            }
            data = response[0];
            form.allData(res, data, paginate);
        }).catch(err => console.log(err))
    },
    postProduct: (req, res) => {
        const { body } = req;
        const token = req.headers['authorization'];
        const decoded = jwtdecode(token);
        model.postProduct(body, decoded['id_user']).then(response => {
            const data = {
                id: response.insertId,
            }
            form.success(res, data)
        }).catch(err => console.log(err))
    },
    patchProduct: (req, res) => {
        const { query, params } = req;
        const token = req.headers['authorization'];
        const decoded = jwtdecode(token);
        model.patchProduct(query, params, decoded['id_user']).then(response => {
            const data = {
                desc: "Update Success"
            }
            form.success(res, data);
        }).catch(err => console.log(err));
    },
    deleteProduct: (req, res) => {
        const { params } = req;
        const token = req.headers['authorization'];
        const decoded = jwtdecode(token);
        model.deleteProduct(decoded['id_user'], params).then(reponse => {
            const data = {
                desc: "Delete Success"
            }
            form.success(res, data);
        }).catch(err => console.log(err))
    }
}