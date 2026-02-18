"use client";

import { useState } from "react";
import { myAppHook } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const { login, register } = myAppHook();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.password_confirmation) {
          toast.error("Passwords do not match");
          setLoading(false);
          return;
        }
        await register(formData.name, formData.email, formData.password, formData.password_confirmation);
        toast.success("Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (error) {
      toast.error("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div className="bg-overlay"></div>
      <div className="auth-page-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5">
              <div className="card">
                <div className="card-header bg-primary">
                  <h4 className="text-white mb-0 text-center">{isLogin ? "Login" : "Register"}</h4>
                </div>
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <Image src="/assets/images/logo-dark.png" alt="Logo" height={30} width={150} />
                  </div>
                  <form onSubmit={handleSubmit}>
                    {!isLogin && (
                      <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                      </div>
                    )}
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    {!isLogin && (
                      <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required />
                      </div>
                    )}
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                      {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
                    </button>
                    <p className="text-center mt-3">
                      {isLogin ? "Don't have an account? " : "Already have an account? "}
                      <button type="button" className="btn btn-link p-0" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Register" : "Login"}
                      </button>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}