const db = require('../Config/db')

module.exports = {
    updatePofile: (body,params, id_user) => {
        return new Promise ((resolve, reject) => {
            let sql = "UPDATE user SET ? WHERE id_user = ?"
            db.query(sql, [body, id_user], (err, result) => {
                if (!err) {
                    resolve(result);
                    console.log(params.name_user);
                    console.log(body.address, 'iki address')
                } else {
                    reject(err);
                }
            })
        })
    }
}