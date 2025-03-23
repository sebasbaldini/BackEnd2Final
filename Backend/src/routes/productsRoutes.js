import Router from 'express'
import passport from 'passport'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productsController.js"
import {authorization} from '../config/middlewares.js'


const productsRouter = Router()

productsRouter.get('/', passport.authenticate("jwt"), getProducts)
productsRouter.get('/:pid', passport.authenticate("jwt"), getProduct)
productsRouter.post('/', passport.authenticate("jwt"), createProduct)
productsRouter.put('/:pid', passport.authenticate("jwt"), authorization("Admin"), updateProduct)
productsRouter.delete('/:pid', passport.authenticate("jwt"), authorization("Admin"), deleteProduct)

export default productsRouter

