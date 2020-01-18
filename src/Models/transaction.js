const db = require('../Configs/db');

module.exports = {
    getTransaction: (transaction_id, id_buyer) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT `transaction`.* , `transaction_detail`.* , `product`.`name_product` , `pr" +
                "oduct`.`price` FROM `transaction_detail` INNER JOIN `transaction` ON(`transactio" +
                "n_detail`.`id_transaction` = `transaction`.`id_transaction`) INNER JOIN `product" +
                "` ON (`transaction_detail`.`id_product` = `product`.`id_product`) WHERE `transac" +
                "tion_detail`.`id_transaction` = ? AND `transaction`.`id_buyer`= ?",
                [
                    transaction_id, id_buyer
                ], (err, response) => {
                    if (!err) {
                        resolve(response);
                    } else {
                        reject(err)
                    }
                })
        })
    },
    getTransactionBuyer: (id_buyer, params) => {
        if (params.status != 8) {
            var sql = "SELECT `transaction`.* , `transaction_detail`.* , `product`.`name_product` , `pr" +
                "oduct`.`price` FROM `transaction_detail` INNER JOIN `transac" +
                "tion` ON(`transaction_detail`.`id_transaction` = `transaction`.`id_transaction`)" +
                " INNER JOIN `product` ON (`transaction_detail`.`id_product` = `product" +
                "`.`id_product`) WHERE `transaction`.`id_buyer`= " + id_buyer + " and `transaction`.`status` = " + params.status + " GROUP BY `transaction_detail`.`id_transaction`"
        } else {
            var sql = "SELECT `transaction`.* , `transaction_detail`.*, `product`.`name_product` , `pr" +
                "oduct`.`price` FROM `transaction_detail` INNER JOIN `transac" +
                "tion` ON(`transaction_detail`.`id_transaction` = `transaction`.`id_transaction`)" +
                " INNER JOIN `product` ON (`transaction_detail`.`id_product` = `product" +
                "`.`id_product`) WHERE `transaction`.`id_buyer`= " + id_buyer + " GROUP BY `transaction_detail`.`id_transaction`"
        }
        return new Promise((resolve, reject) => {
            db.query(sql, (err, response) => {
                console.log(response);
                if (!err) {
                    resolve(response);
                } else {
                    reject(err)
                }
            })
        })
    },
    getTransactionSeller: (id_seller, params) => {
        if (params.status != 8) {
            var sql = "SELECT `transaction`.* , `transaction_detail`.* , `product`.`name_product` , `pr" +
                "oduct`.`price` FROM `transaction_detail` INNER JOIN `transac" +
                "tion` ON(`transaction_detail`.`id_transaction` = `transaction`.`id_transaction`)" +
                " INNER JOIN `product` ON (`transaction_detail`.`id_product` = `product" +
                "`.`id_product`) WHERE `transaction`.`id_seller`= " + id_seller + " and `transaction`.`status` = " + params.status + " GROUP BY `transaction_detail`.`id_transaction`"
        } else {
            var sql = "SELECT `transaction`.* , `transaction_detail`.*, `product`.`name_product` , `pr" +
                "oduct`.`price` FROM `transaction_detail` INNER JOIN `transac" +
                "tion` ON(`transaction_detail`.`id_transaction` = `transaction`.`id_transaction`)" +
                " INNER JOIN `product` ON (`transaction_detail`.`id_product` = `product" +
                "`.`id_product`) WHERE `transaction`.`id_seller`= " + id_seller + " GROUP BY `transaction_detail`.`id_transaction`"
        }
        return new Promise((resolve, reject) => {
            db.query(sql, (err, response) => {
                console.log(response);
                if (!err) {
                    resolve(response);
                } else {
                    reject(err)
                }
            })
        })
    },
    patchSID: (query, id_transaction, id_buyer) => {
        let date = new Date();
        let exp = new Date(date.setDate(date.getDate() + 2));
        return new Promise((resolve, reject) => {
            db.query("UPDATE TRANSACTION SET sid=?, STATUS=2, expired_date=? WHERE id_transaction = ? AND id_buyer= ?",
                [query.sid, exp, id_transaction, id_buyer], (err, response) => {
                    if (!err) {
                        resolve(response);
                    } else {
                        reject(err)
                    }
                })
        })
    },
    postStatus: (body, status) => {
        let date = new Date();
        let exp = new Date(date.setDate(date.getDate() + 2));
        return new Promise((resolve, reject) => {
            db.query("UPDATE TRANSACTION SET STATUS=?, expired_date=? WHERE sid = ?",
                [status, exp, body.sid], (err, response) => {
                    if (!err) {
                        resolve(response);
                    } else {
                        reject(err)
                    }
                })
        })
    },
    patchStatus: (query, params) => {
        let date = new Date();
        let exp = new Date(date.setDate(date.getDate() + 2));
        return new Promise((resolve, reject) => {
            db.query("UPDATE TRANSACTION SET STATUS=?, expired_date=? WHERE id_transaction = ?",
                [query.status, exp, params.id], (err, response) => {
                    if (!err) {
                        resolve(response);
                    } else {
                        reject(err)
                    }
                })
        })
    }
}