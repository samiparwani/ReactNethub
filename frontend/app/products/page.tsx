"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { myAppHook } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import MainLayout from "@/components/template/layout/MainLayout";
import Loader from "@/components/Loader";


interface ProductType {
    id?: number;
    title: string;
    description?: string;
    cost?: number;
    file?: string;
    banner_image?: string | File | null;
}

export default function ProductsPage() {
    const { authToken } = myAppHook();
    const router = useRouter();
    const fileRef = useRef<HTMLInputElement>(null);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [formData, setFormData] = useState<ProductType>({
        title: "",
        description: "",
        cost: 0,
        file: "",
        banner_image: null
    });

    useEffect(() => {
        if (!authToken) {
            router.push('/auth');
            return;
        }
        fetchAllProducts();
    }, [authToken]);

    const handleOnChangeEvent = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = event.target as HTMLInputElement;
        
        if (target.files) {
            setFormData({
                ...formData,
                banner_image: target.files[0],
                file: URL.createObjectURL(target.files[0])
            });
        } else {
            setFormData({
                ...formData,
                [target.name]: target.value
            });
        }
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (isEdit) {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/products/${formData.id}`,
                    {
                        ...formData,
                        "_method": "PUT"
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
                if (response.data.status) {
                    toast.success(response.data.message);
                    resetForm();
                }
            } else {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/products`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
                if (response.data.status) {
                    toast.success(response.data.message);
                    resetForm();
                }
            }
            fetchAllProducts();
            setShowModal(false);
        } catch (error) {
            console.log(error);
            toast.error("Operation failed");
        }
    };

    const resetForm = () => {
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
        setIsEdit(false);
    };

    const fetchAllProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/products`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setProducts(response.data.products ?? response.data ?? []);
        } catch (error) {
            console.log(error);
            setProducts([]);
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (id: number) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.delete(
                    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        }
                    }
                );
                if (response.data.status) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Product has been deleted.",
                        icon: "success",
                        confirmButtonText: "OK"
                    });
                    fetchAllProducts();
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to delete product");
            }
        }
    };

    const handleEdit = (product: ProductType) => {
        setFormData({
            id: product.id,
            title: product.title || "",
            description: product.description || "",
            cost: product.cost || 0,
            file: typeof product.banner_image === 'string' ? product.banner_image : "",
            banner_image: product.banner_image
        });
        setIsEdit(true);
        setShowModal(true);
    };

    const getImageUrl = (image: string | File | null | undefined): string => {
        if (!image) return "";
        if (typeof image === 'string') return image;
        if (image instanceof File) return URL.createObjectURL(image);
        return "";
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <MainLayout title="Product Management">
            {/* Page Title */}
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">Product Management</h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item">
                                    <Link href="/dashboard">Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Products</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <h5 className="mb-0">Product List</h5>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    resetForm();
                                    setShowModal(true);
                                }}
                            >
                                <i className="ri-add-line align-bottom me-1"></i>
                                Add New Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover table-striped mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th style={{ width: "60px" }}>#</th>
                                            <th style={{ width: "80px" }}>Image</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th style={{ width: "150px" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.length > 0 ? (
                                            products.map((product, index) => (
                                                <tr key={product.id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {product.banner_image ? (
                                                            <Image
                                                                src={getImageUrl(product.banner_image)}
                                                                alt={product.title}
                                                                width={50}
                                                                height={50}
                                                                className="rounded"
                                                                unoptimized
                                                            />
                                                        ) : (
                                                            <div className="avatar-sm bg-light rounded d-flex align-items-center justify-content-center">
                                                                <i className="ri-image-line fs-4 text-muted"></i>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="fw-medium">{product.title}</td>
                                                    <td>
                                                        <span className="d-inline-block text-truncate" style={{ maxWidth: "250px" }}>
                                                            {product.description || "No description"}
                                                        </span>
                                                    </td>
                                                    <td>${product.cost?.toLocaleString()}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-warning btn-sm me-1"
                                                            onClick={() => handleEdit(product)}
                                                            title="Edit"
                                                        >
                                                            <i className="ri-edit-line"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleDeleteProduct(product.id!)}
                                                            title="Delete"
                                                        >
                                                            <i className="ri-delete-bin-line"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="text-center py-5">
                                                    <div className="text-muted">
                                                        <i className="ri-inbox-line fs-1"></i>
                                                        <p className="mt-3 mb-3">No products found</p>
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={() => {
                                                                resetForm();
                                                                setShowModal(true);
                                                            }}
                                                        >
                                                            Add Your First Product
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add/Edit Product Modal */}
            {showModal && (
                <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {isEdit ? "Edit Product" : "Add New Product"}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleFormSubmit}>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Product Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleOnChangeEvent}
                                                placeholder="Enter product title"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Price ($)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="cost"
                                                value={formData.cost}
                                                onChange={handleOnChangeEvent}
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                                required
                                            />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                rows={3}
                                                value={formData.description}
                                                onChange={handleOnChangeEvent}
                                                placeholder="Enter product description"
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label className="form-label">Product Image</label>
                                            {formData.file && (
                                                <div className="mb-2">
                                                    <Image
                                                        src={formData.file}
                                                        alt="Preview"
                                                        width={100}
                                                        height={100}
                                                        className="rounded border"
                                                        unoptimized
                                                    />
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                className="form-control"
                                                ref={fileRef}
                                                onChange={handleOnChangeEvent}
                                                accept="image/*"
                                            />
                                            <small className="text-muted">
                                                Allowed formats: JPG, PNG, GIF
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        {isEdit ? "Update Product" : "Save Product"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}