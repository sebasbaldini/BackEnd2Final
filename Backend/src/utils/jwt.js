import 'dotenv/config'
import jwt from 'jsonwebtoken'


export const generateToken = (user) =>{
    
    
    
    const token = jwt.sign({_id: user._id, first_name: user.first_name, email: user.email, age: user.age, rol: user.rol}, process.env.SECRET_JWT, {expiresIn: '24h'})
    return token
}



export default generateToken