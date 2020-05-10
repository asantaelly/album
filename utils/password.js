/**
 *  This utility is for encrypting and comparing user password
 */

const bcrypt = require('bcrypt')


/**
 *  Return the hashed password
 */
 exports.encrypting = async (plain_password) => {

        const salt = 10
        try{
            const hashed = await bcrypt.hash(plain_password, salt)
            return hashed
        } catch(error) {
            return
        }
 }
