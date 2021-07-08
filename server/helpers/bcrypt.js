const bcrypt = require('bcryptjs');

const hashPass = (password) => {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

const comparePass = (password, hashingPassword) => {
    return bcrypt.compareSync(password, hashingPassword);
};

module.exports = { hashPass, comparePass }