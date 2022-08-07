const bcrypt = require('bcryptjs');

function desencriptar(password, password2) {
    return bcrypt.compareSync(password, password2)
}

module.exports = {desencriptar}