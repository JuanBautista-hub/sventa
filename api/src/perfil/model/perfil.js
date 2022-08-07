'use strict'

class Perfil{

    constructor(perfilID,nombre,apellido1,apellido2,correo,avatar,slogan,fechaNacimiento,telefono,activo ){
        this.perfilID = perfilID;
this.nombre = nombre +" "+apellido1+" "+apellido2;
this.correo = correo;
this.avatar = avatar;
this.slogan = slogan;
this.fechaNacimiento = fechaNacimiento;
this.telefono = telefono;
this.activo = activo;

    }

}


module.exports = Perfil