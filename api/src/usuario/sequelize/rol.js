
'use strict';
module.exports = (sequelize, DataTypes) => {

  const t_RoleUsuario = sequelize.define('t_RoleUsuario', {
   roleID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rolNombre:{
        type:DataTypes.STRING
    }    
  }, {
    tableName: "t_RoleUsuario",
 
  });
  t_RoleUsuario.sync().then(() => {
    // this is where we continue ...
  
    })
  //t_RoleUsuario.sync({force:true})
  console.log(t_RoleUsuario === sequelize.models.t_RoleUsuario);
  return t_RoleUsuario;
};
