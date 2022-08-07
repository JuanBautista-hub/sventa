'use strict';

module.exports = (sequelize, DataTypes) => {

  const Producto = sequelize.define('Producto', {

    ProductoID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PrecioCamion: {
      type: DataTypes.DECIMAL,
      allowNull: true,      
    },
    PrecioPublico: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    } 
  }, {
    tableName: "Producto",

  });


   
 // ¡¡Usuario.sync({force:true})
 Producto.sync().then(() => {
  // this is where we continue ...

  })
  console.log(Producto === sequelize.models.Producto); // true

  return Producto;
};
