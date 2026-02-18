"use client";

import React, { useEffect, useState } from "react";
import { myAppHook } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
import MainLayout from "@/components/template/layout/MainLayout";
import Loader from "@/components/Loader";
import Link from "next/link";
import Image from "next/image";

interface DashboardStats {
    totalProducts: number;
    recentProducts: any[];
    loading: boolean;
}

export default function DashboardPage() {
    const { authToken } = myAppHook();
    const router = useRouter();
    const [stats, setStats] = useState<DashboardStats>({
        totalProducts: 0,
        recentProducts: [],
        loading: true
    });

    useEffect(() => {
        if (!authToken) {
            router.push('/auth');
            return;
        }
        fetchDashboardData();
    }, [authToken]);

    const fetchDashboardData = async () => {
        try {
            const productsResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/products`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            
            const products = productsResponse.data.products ?? productsResponse.data ?? [];
            
            setStats({
                totalProducts: products.length,
                recentProducts: products.slice(0, 5),
                loading: false
            });
        } catch (error) {
            console.log(error);
            setStats(prev => ({ ...prev, loading: false }));
        }
    };

    if (stats.loading) {
        return <Loader />;
    }

    return (
        <MainLayout title="Dashboard">
            {/* Page Title */}
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">Dashboard</h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item active">Dashboard</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            {/* Welcome Card */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card bg-primary text-white">
                        <div className="card-body p-4">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                    <div className="avatar-lg rounded-circle bg-white bg-opacity-25 p-2">
                                        <i className="ri-user-3-line fs-1 text-white"></i>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-4">
                                    <h2 className="text-white mb-2">Welcome back!</h2>
                                    <p className="text-white-50 mb-0">Here's what's happening with your products today.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="row">
                <div className="col-xl-3 col-md-6">
                    <div className="card card-animate">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title bg-primary-subtle text-primary rounded-2 fs-2">
                                        <i className="ri-shopping-bag-line"></i>
                                    </span>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <p className="text-uppercase fw-medium text-muted mb-2">Total Products</p>
                                    <h4 className="mb-0">{stats.totalProducts.toLocaleString()}</h4>
                                </div>
                            </div>
                            <div className="mt-3">
                                <Link href="/products" className="text-primary text-decoration-none">
                                    View All Products <i className="ri-arrow-right-line align-bottom ms-1"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card card-animate">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title bg-success-subtle text-success rounded-2 fs-2">
                                        <i className="ri-user-line"></i>
                                    </span>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <p className="text-uppercase fw-medium text-muted mb-2">Active Users</p>
                                    <h4 className="mb-0">1</h4>
                                </div>
                            </div>
                            <div className="mt-3">
                                <span className="badge bg-success">Online</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card card-animate">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title bg-info-subtle text-info rounded-2 fs-2">
                                        <i className="ri-time-line"></i>
                                    </span>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <p className="text-uppercase fw-medium text-muted mb-2">Last Update</p>
                                    <h4 className="mb-0">{new Date().toLocaleDateString('en-US')}</h4>
                                </div>
                            </div>
                            <div className="mt-3">
                                <small className="text-muted">{new Date().toLocaleTimeString('en-US')}</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card card-animate">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title bg-warning-subtle text-warning rounded-2 fs-2">
                                        <i className="ri-star-line"></i>
                                    </span>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <p className="text-uppercase fw-medium text-muted mb-2">Quick Actions</p>
                                    <h4 className="mb-0">
                                        <Link href="/products" className="btn btn-sm btn-warning">
                                            Add Product
                                        </Link>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Products */}
            <div className="row mt-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between">
                            <h5 className="card-title mb-0">Recent Products</h5>
                            <Link href="/products" className="btn btn-sm btn-soft-primary">
                                View All <i className="ri-arrow-right-line ms-1"></i>
                            </Link>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th style={{ width: "60px" }}>#</th>
                                            <th style={{ width: "80px" }}>Image</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th style={{ width: "120px" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.recentProducts.length > 0 ? (
                                            stats.recentProducts.map((product, index) => (
                                                <tr key={product.id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {product.banner_image ? (
                                                            <Image
                                                                src={typeof product.banner_image === 'string' 
                                                                    ? product.banner_image 
                                                                    : "/assets/images/default-product.jpg"}
                                                                alt={product.title}
                                                                width={50}
                                                                height={50}
                                                                className="rounded"
                                                                unoptimized
                                                            />
                                                        ) : (
                                                            <div className="avatar-xs bg-light rounded d-flex align-items-center justify-content-center">
                                                                <i className="ri-image-line text-muted"></i>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td>{product.title}</td>
                                                    <td>
                                                        <span className="text-truncate d-inline-block" style={{ maxWidth: "200px" }}>
                                                            {product.description || "No description"}
                                                        </span>
                                                    </td>
                                                    <td>${product.cost?.toLocaleString()}</td>
                                                    <td>
                                                        <Link 
                                                            href="/products" 
                                                            className="btn btn-sm btn-soft-primary me-1"
                                                        >
                                                            <i className="ri-eye-line"></i>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="text-center py-4">
                                                    <div className="text-muted">
                                                        <i className="ri-inbox-line fs-1"></i>
                                                        <p className="mt-2">No products found</p>
                                                        <Link href="/products" className="btn btn-primary btn-sm">
                                                            Add Your First Product
                                                        </Link>
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

            {/* Quick Tips */}
            <div className="row mt-3">
                <div className="col-12">
                    <div className="card bg-light">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                    <i className="ri-information-line fs-1 text-primary"></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h5 className="mb-2">Quick Tips</h5>
                                    <p className="text-muted mb-0">
                                        Use the Products page to manage your inventory. You can add, edit, and delete products from there.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}