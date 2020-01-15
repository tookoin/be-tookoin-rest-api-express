const db = require('../Configs/db');

module.exports = {
    getAllProduct: query => {
        console.log(query);
        let limit = query.limit || 20;

        if (limit == 0) {
            let page = 1
            let offset = (page - 1) * limit;
        } else {
            if (isNaN(query.page)) {
                page = 1;
            } else {
                let page = query.page || 1;
            }
            let offset = (page - 1) * limit;
        }

        let sort = query.sort || 'name_product';
        let order = query.order || 'asc';

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
    postProduct: (body, id_seller) => {
        let date_created = new Date();
        let values = [
            [
                body.name_product,
                body.desc_product,
                body.price,
                body.id_category,
                body.image,
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
    patchProduct: (query, params, id_seller) => {
        return new Promise((resolve, reject) => {
            db.query("UPDATE product SET ? where id_product= ? and id_seller = ?", [
                query, params.id, id_seller
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
    }
}