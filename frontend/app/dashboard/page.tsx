"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { myAppHook } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Console } from "console";

interface ProductType {
    id?: number,
    title: string,
    description?: string,
    cost?: number,
    file?: String,
    banner_image?: File | null
}
const Dashboard: React.FC = () => {

    const { isLoading, authToken } = myAppHook();
    const router = useRouter();
    const fileRef = React.useRef<HTMLInputElement>(null)
    const [products, setProducts] = useState<ProductType[]>([])
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [formData, setFormData] = useState<ProductType>({
        title: "",
        description: "",
        cost: 0,
        file: "",
        banner_image: null

    })
    useEffect(() => {
        if (!authToken) {
            router.push('/auth')
            return
        }
        fetchAllProducts();
    }, [authToken])


    const handleOnChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {

            // File uploaded
            setFormData({
                ...formData,
                banner_image: event.target.files[0],
                file: URL.createObjectURL(event.target.files[0])
            })
        } else {

            setFormData({
                // No file uploaded
                ...formData,
                [event.target.name]: event.target.value
            });
        }
    }
    // fORM sUBMISSION
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (isEdit) {
                //Edit Operation

                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/${formData.id}`, {
                    ...formData,
                    "_method": "PUT"
                }, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "multipart/form-data"
                    }


                })
                if (response.data.status) {
                    toast.success(response.data.message)
                    setFormData({
                        title: "",
                        description: "",
                        cost: 0,
                        file: "",
                        banner_image: null
                    });
                    if (fileRef.current) {
                        fileRef.current.value = "";
                    }
                }
                fetchAllProducts();

            } else {
                // Add Operation
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, formData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "multipart/form-data"
                    }
                })
                if (response.data.status) {
                    toast.success(response.data.message)
                    setFormData({
                        title: "",
                        description: "",
                        cost: 0,
                        file: "",
                        banner_image: null
                    });
                    if (fileRef.current) {
                        fileRef.current.value = "";
                    }
                }
                fetchAllProducts();
            }

        } catch (error) {
            console.log(error)
        }

    }

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/products`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            console.log(response.data); // inspect structure

            setProducts(response.data.products ?? response.data ?? []);

        } catch (error) {
            console.log(error);
            setProducts([]); // fallback
        }
    };

    const handleDeleteProduct = async (id: number) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        }
                    })
                    if (response.data.status) {
                        // toast.success(response.data.message)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        fetchAllProducts()
                    }
                } catch (error) {
                    console.log(error);
                }

            }
        });

    }
    return <>
        <div className="container mt-4">
            <div className="row">

                <div className="col-md-6">
                    <div className="card p-4">
                        <h4>{isEdit ? "Edit" : "Add"} Product</h4>
                        <form onSubmit={handleFormSubmit}>
                            <input className="form-control mb-2"
                                value={formData.title}
                                onChange={handleOnChangeEvent}
                                name="title" placeholder="Title" required />
                            <input className="form-control mb-2"
                                value={formData.description}
                                onChange={handleOnChangeEvent}
                                name="description" placeholder="Description" required />
                            <input className="form-control mb-2"
                                value={formData.cost}
                                onChange={handleOnChangeEvent}
                                name="cost" placeholder="Cost" type="number" required />
                            <div className="mb-2">
                                {
                                    formData.file && (
                                        <img
                                            src={formData.file}
                                            alt="Preview"
                                            id="bannerPreview"
                                            width={100}
                                            height={100}

                                        />

                                    )
                                }

                            </div>

                            <input className="form-control mb-2"
                                ref={fileRef}
                                onChange={handleOnChangeEvent}
                                type="file" id="bannerInput" />
                            <button className="btn btn-primary" type="submit">{isEdit ? "Update" : "Add"} Product</button>
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
                            {Array.isArray(products) &&
                                products.map((singleProduct) => (
                                    <tr key={singleProduct.id}>
                                        <td>{singleProduct.id}</td>
                                        <td>{singleProduct.title}</td>
                                        <td>
                                            {singleProduct.banner_image ? (
                                                <Image
                                                    src={singleProduct.banner_image}
                                                    alt={singleProduct.title}
                                                    width={50}
                                                    height={50}
                                                    unoptimized
                                                />
                                            ) : (
                                                <span>No Image</span>
                                            )}
                                        </td>

                                        <td>${singleProduct.cost}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => {
                                                    setFormData({
                                                        id: singleProduct.id,
                                                        title: singleProduct.title || "",
                                                        description: singleProduct.description || "",
                                                        cost: singleProduct.cost || 0,
                                                        file: singleProduct.banner_image || "",
                                                    })
                                                    setIsEdit(true)
                                                }}
                                            >
                                                Edit
                                            </button>

                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(singleProduct.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </>
}

export default Dashboard;