'use strict';

module.exports = (sequelize, DataTypes) => {

  const Usuario = sequelize.define('Usuario', {

    usuarioID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    perfilID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      foreignKey:true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: true,
      unique:true,
      
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique:true
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:'public/avatar/default.png'
    },
    contrasenia: {
      type: DataTypes.STRING,
      allowNull: true
    },
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      foreignKey:true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
    },
    emailVerification: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false
    },
    eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue:false
    },
    passworDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
    }
    
  }, {
    tableName: "Usuario",

  });


   
 // ¡¡Usuario.sync({force:true})
  Usuario.sync().then(() => {
  // this is where we continue ...

  })
  console.log(Usuario === sequelize.models.Usuario); // true

  return Usuario;
};
