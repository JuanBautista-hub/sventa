const productoRepository = require('../repository/ProductoRepository')


async function CreateProducto(body) {
    try {
        const create = await productoRepository.create(body)
        return {message:"Se ha creado un nuevo producto correctamente"}
    } catch (error) {
        return error
    }
}

async function GetProducto() {
    try {
        const producto = await productoRepository.getAll()
        return producto
    } catch (error) {
        return error
    }
}

async function GetProductoByID(id) {
    try {
        const producto = await productoRepository.getOne(id)
        return producto
    } catch (error) {
        return error
    }
}
async function UpdateProduct(body,id) {
    try {
        const updateProduct = await productoRepository.updateProduct(body, id)
        return updateProduct
    } catch (error) {
        return error
    }
}


async function DeleteProduct(id){

    try {
        
       await productoRepository.deleteItem(id);
        return {message:"Se ha eliminado correctamente el producto "}
    } catch (error) {
        return error;
    }
}


module.exports = { CreateProducto, GetProducto, UpdateProduct ,GetProductoByID, DeleteProduct}