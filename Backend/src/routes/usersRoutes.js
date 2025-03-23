import {Router} from 'express'
import {getUsers, getUser, createUser, updateUser, deleteUser} from '../controllers/userController.js'
import {authorization} from '../config/middlewares.js'
import passport from 'passport'
const usersRouter = Router ()

usersRouter.get('/',  getUsers)
usersRouter.get('/:uid', passport.authenticate("jwt"), authorization("Admin"), getUser)
usersRouter.post('/', passport.authenticate("jwt"), authorization("Admin"), createUser)
usersRouter.put('/:uid', passport.authenticate("jwt"), authorization("Admin"), updateUser)
usersRouter.delete('/:uid', passport.authenticate("jwt"), authorization("Admin"), deleteUser)

export default usersRouter