import productModel from '../models/productModels.js'


export const getProducts = async (req, res) => {
    try{
        const {limit, page, metFilter, filter, metOrder, order } = req.query
        const pag = page !== undefined ? page : 1
        const lim = limit !== undefined ? limit : 10
        const filterQuery = metFilter !== undefined ? [{metFilter: filter}]:{}
        const orderQuery = metOrder !== undefined ? {metOrder: order}: {}
        const products = await productModel.paginate(filterQuery, {limit: lim, page: pag, sort: orderQuery, lean: true})

        console.log(products)

        products.pageNumber = Array.from({length: products.totalPages}, (_, i) => ({
            number: i + 1,
            isCurrente: i + 1 === products.page

        }))
        res.status(200).send(products)
    } catch(e){
      
        res.status(500).send(e)
    }
}

export const getProduct = async (req, res) => {
    try {
        const idProd = req.params.pid;

        // Validar si el id tiene el formato correcto de ObjectId
        if (!idProd || !idProd.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({ message: "ID de producto no válido" });
        }

        const prod = await productModel.findById(idProd);

        if (prod) {
            res.status(200).send(prod);
        } else {
            res.status(404).send({ message: "Producto no existe" });
        }
    } catch (e) {
        
        
        
        res.status(500).send({ message: "Error interno del servidor" });
    }
}


export const createProduct = async (req, res) => {
    try{
        const { title, description, category, code, price, stock } = req.body
        const message = await productModel.create({
            title,
            description,
            category,
            code,
            price,
            stock
        })
        console.log(message)
        res.status(201).send({message: message})
    } catch(e){
        console.log(e)
        res.status(500).send(e)
    }
}

export const updateProduct = async (req, res) => {
    try{
        const idProd = req.params.pid
        const { title, description, category, code, price, stock } = req.body
        const message = await productModel.findByIdAndUpdate(idProd,{title, description, category, code, price, stock} )
        if(message)
            res.status(200).send({message: "Producto actualizado correctamente"})
        else
            res.status(404).send({message: "Producto no existe"})

    } catch(e){
        res.status(500).send(e)
    }
}
export const deleteProduct = async (req, res) => {
    try{
        const idProd = req.params.pid
        const message = await productModel.findByIdAndDelete(idProd)
        if(message)
            res.status(200).send({message: "Producto Eliminado correctamente"})
        else
            res.status(404).send({message: "Producto no existe"})
    } catch(e){
        res.status(500).send(e)
    }
}