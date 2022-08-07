
const {CreateProducto,GetProducto, UpdateProduct,GetProductoByID,DeleteProduct} = require('../service/producto.service');

const ProductoNuevo = async (req, res, next) => {

    try {
        const nuevoproducto = await CreateProducto(req.body)
        res.json(nuevoproducto) 
    } catch (error) {
        return error
    }
}


const getProducto = async(req,res,next)=>{

    try {
const productos = await GetProducto()
res.json(productos)        
    } catch (error) {
        next(error)
    }
}

const getProductoByID = async(req,res,next)=>{
    const {id} = req.params
    try {
const productos = await GetProductoByID(id)
res.json(productos)        
    } catch (error) {
        next(error)
    }
}
const ProductUpdate = async(req,res ,next)=>{
    const {id} = req.params
    
    try {
        const productUpdate = await UpdateProduct(req.body,id)
        res.json({message:"Producto actualizado"})
    } catch (error) {
        next(error)
    }
}

const ProductDelete = async(req,res,next)=>{
    const {id} = req.params;
try {
    const deleteItem = await DeleteProduct(id);
    res.json(deleteItem)

} catch (error) {
    next(error);
}

}

module.exports = { ProductoNuevo ,getProducto,ProductUpdate,getProductoByID,ProductDelete}