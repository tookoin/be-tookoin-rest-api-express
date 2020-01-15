const db = require('../Config/db');

module.exports = {
    emailExist: (email) => {
        return new Promise((resolve, reject) => {

            let sql = `select * FROM user WHERE email='${email}'`;

            db.query(sql, (err, result) => {
                if(!err) {
                    if(result.length) {
                        result.emailExist = true;
                        resolve(result);
                    } else {
                        result.emailExist = false;
                        resolve(result);
                    }
                } else {
                    reject(result);
                }
            })
        })
    }
}