"use client"
import React, { useEffect, useState} from "react";
import { myAppHook } from "@/context/AppProvider";
import { useRouter } from "next/navigation";

interface formData{
    name?: string,
    email:string,
    password: string,
    password_confirmation?: string,
}
const Auth: React.FC = () => {
    const [ isLogin, setIsLogin] = useState<boolean>(true)
    const [ formData, setFormData] = useState<formData>({
        name: "",
        email:"",
        password: "",
        password_confirmation: "",
    });




    const router = useRouter();

    const{ login, register, authToken, isloading } = myAppHook();
    
    useEffect( () => {
        if(authToken){
            router.push("/dashboard")
            return
        }
    }, [authToken, isloading])
    const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleFormSubmit = async(event:React.FormEvent<HTMLFieldSetElement>) => {
        event.preventDefault();
        if(isLogin){
            try{
                await login(formData.email, formData.password)
            } catch(Error){
                console.log(`Authentication Error ${error}`)
            }
        }else{

            try{
                 await register( formData.name!, formData.email, formData.password, formData.password_confirmation!)
            } catch(Error){
                console.log(`Registeration Error${error}`)
            }
           
        }
    }
    return <>
         <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4" style={{ width: "400px" }}>

            
           
            <h3 className="text-center">{ isLogin ? "Login": "Register"}</h3>
            <form onSubmit={ handleFormSubmit }>
                {
                    !isLogin && (<input className="form-control mb-2" name="name" type="text" placeholder="Name"
                    value={ formData.name }
                onChange={ handleOnChangeInput }
                 required />)
                }
                
                <input className="form-control mb-2" name="email" type="email" placeholder="Email" required 
                value={ formData.email }
                onChange={ handleOnChangeInput }
                />
                <input className="form-control mb-2" name="password" type="password" placeholder="Password" required 
                    value={ formData.password }
                    onChange={ handleOnChangeInput }
                />
                {
                    !isLogin && (<input className="form-control mb-2" name="password_confirmation" type="password" 
                        value={ formData.password_confirmation}
                        onChange={ handleOnChangeInput }
                        placeholder="Confirm Password" required />)
                }
                
                <button className="btn btn-primary w-100" type="submit">{ isLogin ? "Login": "Register"}</button>
            </form>
           <p className="mt-3 text-center">
  {isLogin ? " Don't have an account? Register " : " Already have an account? Click here to login " }
  <span onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer"}}>
{ isLogin ? "Login": "Register"}
  </span>
</p>

        </div>
    </div>
    </>
}

export default Auth;