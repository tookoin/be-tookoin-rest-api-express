const db = require('../Configs/db');

module.exports = {
    getCart: (id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT `cart`.* , `product`.`name_product` , `product`.`price` , `user`.`name_us" +
                "er` as name_seller , `product`.`price` * `cart`.`qty` AS subtotal FROM `cart` IN" +
                "NER JOIN `product` ON(`cart`.`id_product` = `product`.`id_product`) INNER JOIN `" +
                "user` ON (`product`.`id_seller` = `user`.`id_user`) WHERE `cart`.`id_buyer` = ?",
                id, (err, response) => {
                    if (!err)
                        resolve(response);
                    else
                        reject(err);
                }
            )
        })
    },
    checkCart: (body, id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM cart WHERE id_product=? AND id_buyer =?", [
                body.id_product, id
            ], (err, response) => {
                if (!err)
                    resolve(response);
                else
                    reject(err)
            });
        })
    },
    updateCart: (body, id) => {
        return new Promise((resolve, reject) => {
            db.query("UPDATE cart SET qty=(SELECT qty FROM cart WHERE id_product=? AND id_buyer =?)+? " +
                "WHERE id_product=? AND id_buyer =?",
                [
                    body.id_product, id, body.qty, body.id_product, id
                ], (err, response) => {
                    if (!err)
                        resolve(response)
                    else
                        reject(err);
                }
            )
        })
    },
    addCart: (body, id) => {
        let values = [
            [body.id_product, body.id_seller, id, body.qty]
        ];
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO cart(id_product, id_seller, id_buyer, qty) values (?)", values, (err, response) => {
                if (!err)
                    resolve(response)
                else
                    reject(err)
            })
        })
    },
    patchCart: (query, params, id) => {
        return new Promise((resolve, reject) => {
            db.query("UPDATE cart SET ? WHERE id_cart = ? AND id_buyer = ?", [
                query, params.cartId, id
            ], (err, response) => {
                if (!err)
                    resolve(response)
                else
                    reject(err)
            })
        })
    },
    deleteCart: (params, id) => {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM cart WHERE id_buyer= ? AND id_cart=?", [
                id, params.cartId
            ], (err, response) => {
                if (!err)
                    resolve(response)
                else
                    reject(err)
            })
        })
    },
    getCartId: (params, id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT `cart`.* , `product`.`price` FROM `cart` INNER JOIN `product` ON(`cart`.`id_product` = `product`.`id_product`) Where id_cart = ? AND id_buyer = ?", [params.cartId, id], (err, response) => {
                if (!err)
                    resolve(response)
                else
                    reject(err)
            })
        })
    },
    checkoutCartId: (data, id) => {
        let date = new Date();
        let exp = new Date(date.setDate(date.getDate() + 2));
        let values = [
            [date, data.id_seller, id, exp]
        ]

        return new Promise((resolve, reject) => {
            db.query("INSERT INTO transaction(transaction_date, id_seller, id_buyer, expired_date) values (?)", values, (err, response) => {
                if (!err)
                    resolve(response)
                else
                    reject(err)
            })
        })
    },
    checkoutDetail: (transaction_id, data, id) => {
        let subtotal = data.price * data.qty;
        let values = [
            [transaction_id, data.id_product, data.qty, subtotal]
        ]
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO transaction_detail(id_transaction, id_product, qty, subtotal) values (?)", values, (err, response) => {
                if (!err)
                    resolve(response)
                else
                    reject(err)
            })
        })
    },
    deleteCart: (data) => {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM cart WHERE id_cart=?", data.id_cart, (err, response) => {
                if (!err)
                    resolve(response)
                else
                    reject(err)
            })
        })
    },
    getCartStore: (params, id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT `cart`.* , `product`.`price` FROM `cart` INNER JOIN `product` ON(`cart`.`id_product` = `product`.`id_product`) Where cart.id_seller = ? AND id_buyer = ?", [params.sellerId, id], (err, response) => {
                if (!err)
                    resolve(response)
                else
                    reject(err)
            })
        })
    },
}