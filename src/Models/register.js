const db = require ('../Config/db');
const bcrypt = require ('bcryptjs');
const validate = require ('../Helpers/validate_data');

module.exports = {
    registerUser: ({name_user, email, password}, {role}) => {
        try{
         return new Promise (async (resolve, reject) => {
            // REGEX for Validate
            let nameValidate = /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,50}$/.test(name_user);
            let emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            let passwordValidate =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password);

            if (nameValidate == false) {
                resolve((msg= 'InvalidName'));
            } else {
                if (emailValidate == false || passwordValidate == false) {
                resolve((msg = 'InvalidFormat'));
            } else {
            
            const checkAccount = await validate.emailExist(email)
            .then(result => {
                if (result.emailExist == true) {
                    return 'true';
                } else {
                    return 'false';
                }
            })
            .catch(err => {
                console.log (err);
            })

            console.log(checkAccount,'check');
            if (checkAccount == 'true') {
                const result = 403;
                resolve(result);
            } else {
                
                const hashPassword = bcrypt.hashSync(password, 10);

                let value = [name_user, email, hashPassword, role]

                let sql = 'INSERT INTO user (name_user, email, password, role) VALUES ( ? )';

                db.query(sql, [value], (err, result) => {
                    if (!err) {
                        resolve(result);
                        console.log(result);
                    } else {
                        reject(err)
                        console.log(err)
                    }
                } );
            }
                
            }
            }

            
        });
    } catch {
        console.log('error bcrypt');
      }   
        }
        
}