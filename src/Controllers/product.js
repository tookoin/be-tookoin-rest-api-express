const model = require('../Models/product');
const jwtdecode = require('jwt-decode');
const form = require('../Helpers/form');
const multer = require('multer');
const validate = require('../Helpers/validate');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './public/uploads/product')
    },
    filename: function (req, file, cb) {
        cb(null, "product-" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: validate.imageFilter
}).single('image');

module.exports = {
    getAllProduct: (req, res) => {
        const { query } = req;
        model
            .getAllProduct(query)
            .then(response => {
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
            })
            .catch(err => console.log(err))
    },
    postProduct: (req, res) => {
        upload(req, res, (err) => {
            console.log(req.body);
            if (req.fileValidationError) {
                res
                    .status(400)
                    .json({ error: true, message: 'Only image file is allowed, try another file' })
            } else if (err) {
                console.log(err)
                res
                    .status(400)
                    .json({ message: err, message: 'File is not valid' })
            } else {
                const image = req.file
                    ? req.file.filename
                    : req.file;
                const { body } = req;
                const token = req.headers['authorization'];
                const decoded = jwtdecode(token);
                model
                    .postProduct(body, decoded['id_user'], image)
                    .then(response => {
                        form.success(res, response)
                    })
                    .catch(err => console.log(err))
            }
        })
    },
    patchProduct: (req, res) => {
        upload(req, res, (err) => {
            if (req.fileValidationError) {
                res
                    .status(400)
                    .json({ error: true, message: 'Only image file is allowed, try another file' })
            } else if (err) {
                res
                    .status(400)
                    .json({ message: err, message: 'File is not valid' })
            } else {
                const { body, params } = req;
                const image = req.file
                    ? req.file.filename
                    : req.file;
                Object.assign(body, { "image": image });
                const token = req.headers['authorization'];
                const decoded = jwtdecode(token);
                model
                    .patchProduct(body, params, decoded['id_user'])
                    .then(response => {
                        form.success(res, response);
                    })
                    .catch(err => console.log(err));
            }
        })
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
    },
    getEtalase: (req, res) => {
        const token = req.headers['authorization'];
        const decoded = jwtdecode(token);
        model.getEtalase(decoded['id_user']).then(response => {
            form.success(res, response);
        }).catch(err => console.log(err))
    }
}