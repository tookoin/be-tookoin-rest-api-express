const db = require('../Config/db')

module.exports = {
    updatePofile: (body, params, id_user) => {
        return new Promise ((resolve, reject) => {
            let sql = "UPDATE user SET ? WHERE id_user = ?"

            db.query(sql, [body, params.id_user, id_user], (err, result) => {
                if (!err) {
                    resolve(result);
                    // console.log(result, 'data nih');
                } else {
                    reject(err);
                }
            })
        })
    }
}