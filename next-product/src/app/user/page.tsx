'use client'

import React, { useEffect, useState } from 'react';
// Import necessary components
import Link from "next/link";
import Image from "next/image";

export default function User() {
  return (
    <>
      <div className="container-fluid position-relative p-0">
        <div className="container-fluid bg-primary py-5 bg-header mb-5">
          <div className="row py-5">
            <div className="col-12 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-4 text-white animated zoomIn">About Us</h1>
              <a href="/" className="h5 text-white">
                Home
              </a>
              <i className="far fa-circle text-white px-2"></i>
              <a href="/about" className="h5 text-white">
                About
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}