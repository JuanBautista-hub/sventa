const {Producto} = require('../../sqlserver');

const create = async(body)=> Producto.create(body)

const getAll = async()=> Producto.findAll()

const getOne = async(id)=> Producto.findOne({where:{ProductoID:id}})
const updateProduct = async(body,id)=> Producto.update(body,{where:{ProductoID: id}})

const deleteItem = async(id) =>Producto.destroy({where:{ProductoID:id}})
module.exports = {create,getAll,updateProduct,getOne,deleteItem}