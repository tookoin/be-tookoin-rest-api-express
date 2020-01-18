const db = require('../Configs/db');

module.exports = {
    getAllProduct: query => {
        var limit = query.limit || 20;

        if (limit == 0) {
            var page = 1
            var offset = (page - 1) * limit;
        } else {
            if (isNaN(query.page)) {
                var page = 1;
                var offset = (page - 1) * limit;
            } else {
                var page = query.page || 1;
                var offset = (page - 1) * limit;
            }
        }

        var sort = query.sort || 'name_product';
        var order = query.order || 'asc';

        if (query.name_product == null) {
            name = "";
        } else {
            name = query.name_product;
        }

        if ((query.id_category == null) && (query.name_product == null)) {
            sql = "SELECT `product`.* , `category`.`name_category` FROM `product` INNER JOIN `category` ON(`product`.`id_category` = `category`.`id_category`)";
            sql += " ORDER BY " + sort + " " + order + " LIMIT " + limit + " OFFSET " + offset + "";
            sql2 = "SELECT `product`.* , `category`.`name_category` FROM `product` INNER JOIN `category` ON(`product`.`id_category` = `category`.`id_category`)";
            console.log('double null');
        } else if (query.id_category == null) {
            sql = "SELECT `product`.* , `category`.`name_category` FROM `product` INNER JOIN `category` ON(`product`.`id_category` = `category`.`id_category`) WHERE name_product LIKE '%" + name + "%'";
            sql += " ORDER BY " + sort + " " + order + " LIMIT " + limit + " OFFSET " + offset + "";
            sql2 = "SELECT `product`.* , `category`.`name_category` FROM `product` INNER JOIN `category` ON(`product`.`id_category` = `category`.`id_category`) WHERE name_product LIKE '%" + name + "%'";
            console.log('category null');
        } else if (query.name_product == null) {
            sql = "SELECT `product`.* , `category`.`name_category` FROM `product` INNER JOIN `category` ON(`product`.`id_category` = `category`.`id_category`) WHERE product.id_category= " + query.id_category + " AND name_product LIKE '%" + name + "%'";
            sql += " ORDER BY " + sort + " " + order + " LIMIT " + limit + " OFFSET " + offset + "";
            sql2 = "SELECT `product`.* , `category`.`name_category` FROM `product` INNER JOIN `category` ON(`product`.`id_category` = `category`.`id_category`) WHERE product.id_category= " + query.id_category + " AND name_product LIKE '%" + name + "%'";
            console.log('name null');
        } else if ((query.id_category != null || typeof query.id_category != '') && (query.name != null || typeof query.name != '')) {
            sql = "SELECT `product`.* , `category`.`name_category` FROM `product` INNER JOIN `category` ON(`product`.`id_category` = `category`.`id_category`) WHERE product.id_category= " + query.id_category + " AND name_product LIKE '%" + name + "%'";
            sql += " ORDER BY " + sort + " " + order + " LIMIT " + limit + " OFFSET " + offset + "";
            sql2 = "SELECT `product`.* , `category`.`name_category` FROM `product` INNER JOIN `category` ON(`product`.`id_category` = `category`.`id_category`) WHERE product.id_category= " + query.id_category + " AND name_product LIKE '%" + name + "%'";
            console.log('not null');
        }

        return new Promise((resolve, reject) => {
            db.query(sql, (err, response) => {
                db.query(sql2, (err, result) => {
                    count = result.length;
                    if (!err) resolve([response, limit, page, count]);
                    else reject(err);
                })
                if (err) reject(err);
            })
        })

    },
    postProduct: (body, id_seller, image) => {
        let date_created = new Date();
        let values = [
            [
                body.name_product,
                body.desc_product,
                body.price,
                body.id_category,
                image,
                body.stock,
                date_created,
                date_created,
                id_seller
            ]
        ]
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO product(name_product, desc_product, price, id_category, image, stock" +
                ", date_update, date_created, id_seller) values (?)",
                values, (err, response) => {
                    if (!err) {
                        resolve(response);
                    } else {
                        reject(err)
                    }
                })
        })
    },
    patchProduct: (body, params, id_seller) => {
        return new Promise((resolve, reject) => {
            db.query("UPDATE product SET ? where id_product= ? and id_seller = ?", [
                body, params.id, id_seller
            ], (err, response) => {
                if (!err)
                    resolve(response)
                else
                    reject(err);
            }
            )
        })
    },
    deleteProduct: (id_seller, params) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM product WHERE id_seller= ? AND id_product=?', [
                id_seller, params.id
            ], (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    getEtalase: (id_seller) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM product where id_seller=?', id_seller, (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    }
}