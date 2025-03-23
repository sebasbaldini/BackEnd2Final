import cartModel from "../models/cartModels.js";
import productModel from "../models/productModels.js"
import ticketModel from "../models/ticketModels.js"

export const getCart = async (req, res) => {
    try {
        const cartID = req.params.cid
        const cart = await cartModel.findOne({_id: cartId})
        if (cart)
            res.status(200).send(cart)
        else 
            res.status(404).send("Carrito no existe")

    }catch(e){
        res.satatus(500).send(e)
    }
}

export const insertProductCart = async (req, res) => {
    try {
            const cartId = req.params.cid
            const productId = req.params.pid 
            const {quantity} = req.body
            const cart = await cartModel.findOne({_id: cartId})
            if(cart){
                const product = await productModel.findById(productId)
                if(product){
                    if(product.stock >= quantity) {
                        const indice = cart.products.findIndex(prod => prod._id == productId)
                        if(indice != -1){
                            cart.products[indice].quantity = quantity
                        }else{
                            cart.products.push({id_prod: productId, quantity: quantity})
                        }
                        await cartModel.findByIdAndUpdate(cartId, cart)
                        res.status(200).send("Carrito actualizado correctamente")
                    } else {
                        res.status(404).send("No hay stock")
            
                    }
                } else {
                        res.status(404).send("Producto no existe")
                    }
 
            }else{
                res.status(404).send("Carrito no Existe")
            }

    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
}

export const deleteProductCart = async (req, res) => {
    try {
        const cartID = req.params.cid
        const productId = req.params.pid 
        const cart = await cartModel.findOne({_id: cartId})
        if (cart){
            const indice = cart.products.findIndex(prod => prod._id == productId)
            if(indice != -1){
                cart.productrs.splice(indice, 1)
                cart.save()
                res.status(200).send(cart)
            }else{
                res.status(404).send("erro al eliminar producto")
            }
           
        }else{
            res.status(404).send("Carrito no existe")
        }
    }catch(e){
        res.satatus(500).send(e)
    }
}

export const deleteCart = async (req, res) => {
    try {
        const cartID = req.params.cid
        const cart = await cartModel.findOne({_id: cartId})
        if(cart){
            cart.products = []
            cart.save()
            res.status(200).send("carrito eliminado con exito")
        } else {
            res.status(404).send("carrito no existe")
        }

    }catch(e){
        res.satatus(500).send(e)
    }
}


export const checkout = async(req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findById(cartId)
        const prodStockNull = []
        if(cart){
            for(const prod of cart.products) {
                const producto = await productModel.findById(prod.id_prod)
                if(producto){
                    if(producto.stock - prod.quantity < 0){
                        prodStockNull.push(producto.id)

                    }
                }
            }
            if(prodStockNull.length == 0){
                let totalAmount = 0

                for(const prod of cart.products){
                    const producto = await productModel.findById(prod.id_prod)
                    if(producto){
                        producto.stock -= prod.quantity
                        totalAmount += producto.price * prod.quantity
                        await producto.save()
                    }
                }
                const newTicket = await ticketModel.create({
                    code: crypto.randomUUID(),
                    purchaser: req.user.email,
                    amount: totalAmount,
                    products: cart.products

                })
                console.log(newTicket);
                await cartModel.findByIdAndUpdate(cartId, {products: []})
                res.status(200).json({message: "compra finalizada correctamente"})
            } else {
                prodStockNull.forEach((prodId) =>{
                    let indice = cart.products.findIndex(prod => prod.id_prod == prodId)
                    cart.products.splice(indice,1)
                })
                await cartModel.findByIdAndUpdate(cartId, {
                    products: cart.products
                })
                res.status(400).json(prodStockNull)
            }
        } else {
            res.status(404).json({message: "carrito no existe"})
        }
    } catch(e) {
        res.status(500).json({message: e})
    }
}