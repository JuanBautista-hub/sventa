const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/development');
const db = {};

try {
    db.connection = new Sequelize(config.database, config.username, config.password, config);

    db.Usuario = require('./usuario/sequelize/Usuario')(db.connection, DataTypes);
    db.t_RoleUsuario = require('./usuario/sequelize/rol')(db.connection, DataTypes);
    db.Perfil = require('./perfil/sequelize/Perfil')(db.connection, DataTypes);
    db.Producto = require('./producto/sequelize/Producto')(db.connection, DataTypes);

    //relacion
    db.t_RoleUsuario.hasMany(db.Usuario, { foreignKey: 'roleID' });
    db.Usuario.belongsTo(db.t_RoleUsuario, { foreignKey: 'roleID' });

    //relacion usuario perfil
    db.Perfil.hasOne(db.Usuario, { foreignKey: 'perfilID' });
    db.Usuario.belongsTo(db.Perfil, { foreignKey: 'perfilID' });

} catch (error) {
    console.log(error);
}

module.exports = db;