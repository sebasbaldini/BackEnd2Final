import generateToken from '../utils/jwt.js'

export const register = async (req, res) =>{
    try {
        
        if(!req.user)
            return res.status(400).send("Todos los atributos son necesarios")
        return res.status(201).send(`Usuarios creado correctoamente con el di: ${req.user?._id}`)
    } catch(e) {
        res.status(500).send(e)
        
    }
};

export const login = async (req, res) =>{
    try {
        if (!req.user)
            return res.status(400).send("Usuario o contraseña no validos")
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        }
        return res.status(200).cookie('coderSession', generateToken(req.user), {
            httpOnly: true,
            secure: false,
            maxAge: 86400000
        }).send("usuario logueado correctamente")

    } catch(e) {
        res.status(500).send(e)
        
    }
};

export const githubLogin = (req, res) =>{
    try {
        if(!req.user) {
            res.status(400).send("Usuario ya registrado")
        } else {
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        }
        return res.status(200).cookie('coderSession', generateToken(req.user), {
            httpOnly: true,
            secure: false,
            maxAge: 86400000
        }).send("Usuario logieado correctamente")
        }
    } catch (e){
        res.status(500).send(e)

    }
}


