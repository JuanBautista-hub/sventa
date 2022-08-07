'use strict';

module.exports = (sequelize, DataTypes) => {

  const Perfil = sequelize.define('Perfil', {
    perfilID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
 
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido1: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:""
    },
    apellido2: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:""
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Ingresa tu sexo'
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,

    },
    fechaNacimiento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slogan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },

    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },

    eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },

  }, {
    tableName: "Perfil",

  });

  //Perfil.sync({force:true})
  Perfil.sync().then(() => {
  // this is where we continue ...

  })
  console.log(Perfil === sequelize.models.Perfil); // true

  return Perfil;
};
