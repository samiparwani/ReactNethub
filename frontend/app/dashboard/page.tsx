"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { myAppHook } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

interface ProductType {
    title: string,
    description: string,
    cost: number,
    file: String,
    banner_image: File | null
}
const Dashboard: React.FC = () =>{

    const { isLoading, authToken } = myAppHook();
    const router = useRouter();
    const fileRef = React.useRef<HTMLInputElement>(null)
    const [ formData, setFormData] = useState<ProductType>({
        title: "",
        description: "",
        cost: 0,
        file: "",
        banner_image: null

    })
    useEffect(() =>{
        if(!authToken){
            router.push('/auth')
            return
        }        
    }, [authToken])


    const handleOnChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files){

            // File uploaded
            setFormData({
                ...formData,
                banner_image: event.target.files[0],
                file: URL.createObjectURL(event.target.files[0])
            })
        }else{

            setFormData({
            // No file uploaded
            ...formData,
            [event.target.name]: event.target.value
            });
        }
    }
    // fORM sUBMISSION
    const handleFormSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, formData, {
                headers:{
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            if(response.data.status){
                toast.success(response.data.message)
                setFormData({
                    title: "",
        description: "",
        cost: 0,
        file: "",
        banner_image: null
                });
                if(fileRef.current){
                    fileRef.current.value = "";
                }
            }
            console.log(response)
        }catch (error){
            console.log(error)
        }
 
    }
    return <>
        <div className="container mt-4">
        <div className="row">
           
            <div className="col-md-6">
                <div className="card p-4">
                    <h4>Add Product</h4>
                    <form onSubmit={ handleFormSubmit }>
                        <input className="form-control mb-2" 
                        value={ formData.title}
                        onChange={ handleOnChangeEvent }
                        name="title" placeholder="Title" required />
                        <input className="form-control mb-2" 
                        value={ formData.description}
                        onChange={ handleOnChangeEvent }
                        name="description" placeholder="Description" required />
                        <input className="form-control mb-2" 
                        value={ formData.cost}
                        onChange={ handleOnChangeEvent }
                        name="cost" placeholder="Cost" type="number" required />
                       <div className="mb-2">
                        {
                            formData.file && (
  <Image
    src={ formData.file}
    alt="Preview"
    id="bannerPreview"
    width={100}
    height={100}
    
  />
                            )
                        }

</div>
                        <input className="form-control mb-2"
                        ref={ fileRef}
                        onChange={ handleOnChangeEvent }
                        type="file" id="bannerInput" />
                        <button className="btn btn-primary" type="submit">Add Product</button>
                    </form>
                </div>
            </div>

            
            <div className="col-md-6">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Banner</th>
                            <th>Cost</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Sample Product</td>
                            <td>
  <Image
    src="/product.png"   // must be valid path or URL (not "#")
    alt="Product"
    width={50}
    height={50}
  />
</td>

                            <td>$100</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2">Edit</button>
                                <button className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
}

export default Dashboard;