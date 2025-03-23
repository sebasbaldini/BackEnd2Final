import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import "../App.css";

const Login = () => {
    const formRef = useRef ()
    const nav = useNavigate ()
    const handleSubmit = async (e) => {
        try {

            e.preventDefault()
            
            const formData = new FormData(formRef.current)
            
            const userData = Object.fromEntries(formData)

            const response = await fetch('/api/sessions/login', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(userData)
            })
            
            if(response.status == 200){
                console.log("usuario logueado correctamente")
                e.target.reset()
                nav('/')

            }else{
                console.log(response)
            }
            
        } catch(error) {

        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <form action="" ref={formRef} onSubmit={handleSubmit} className="p-4 bg-white rounted shadow w-85">
                <h2 className="text-center mb-3">Login de Usuario</h2>
                <input className="form-control mb-2" type="email" name="email" placeholder="Email"/>
                <input className="form-control mb-2" type="password" name="password" placeholder="Password"/>
                <button className="form-control mb-2" type="submit">Iniciar Sesion</button>

            </form>
          
        </div>
    );
};

export default Login;
