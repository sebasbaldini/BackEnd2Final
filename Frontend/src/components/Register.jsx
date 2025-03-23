import { useRef } from "react";
import { useNavigate } from 'react-router-dom'
import "../App.css";

const Register = () => {
    const formRef = useRef ()
    const nav = useNavigate ()
    const handleSubmit = async (e) => {
        try {

            e.preventDefault()
            
            const formData = new FormData(formRef.current)
            
            const userData = Object.fromEntries(formData)

            const response = await fetch('/api/sessions/register', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(userData)
            })
            
            if(response.status == 201){
                console.log("usuario registrato correctamente")
                e.target.reset()
                nav('/login')

            }else{
                console.log(response)
            }

        } catch(error) {

        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <form action="" ref={formRef} onSubmit={handleSubmit} className="p-4 bg-white rounted shadow w-85">
                <h2 className="text-center mb-3">Registrar Usuario</h2>
                <input className="form-control mb-2" type="text" name="first_name" placeholder="First Name"/>
                <input className="form-control mb-2" type="text" name="last_name" placeholder="Last Name"/>
                <input className="form-control mb-2" type="number" name="age" placeholder="Age"/>
                <input className="form-control mb-2" type="email" name="email" placeholder="Email"/>
                <input className="form-control mb-2" type="password" name="password" placeholder="Password"/>
                <button className="form-control mb-2" type="submit">Registrar Usuario</button>

            </form>
          
        </div>
    );
};

export default Register;
