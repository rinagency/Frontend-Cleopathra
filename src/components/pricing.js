import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';
import { useGetProductsQuery } from '../services/ProductsApi';

const Pricing = () => {
  // Utiliza el hook useGetProductsQuery para obtener los productos
  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  if (error) {
    return <p>Error loading products: {error.message}</p>;
  }
  
  // Verifica que data.data y data.data[0].products estén presentes
  if (!data || !data.data || !Array.isArray(data.data)) {
    return <p>No products available.</p>;
  }
  
  const products = data.data;

  return (
        <>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
            {products.map((product) => (
              <div key={product.id} className="relative overflow-hidden rounded-md shadow-lg dark:shadow-gray-800">
                <div className="p-6">
                <h5 className="text-2xl leading-normal font-semibold">{product.name}</h5>
                <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover mb-4 rounded-md"
                onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                }}
                />
                <p className="text-slate-400 mt-2">{product.description}</p>
                <div className="flex mt-4">
                  <span className="text-lg font-semibold">$</span>
                  <span className="text-5xl font-semibold mb-0 ms-1">{product.price}</span>
                </div>
                <div className="mt-6">
                <Link to="/orderoption" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded">Comprar</Link>{' '}
                <Link to="" className="py-2 px-5 inline-flex items-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded">
                <span className="me-2"><FaShoppingCart /></span> Carrito
                </Link>
                </div>
              </div>
              </div>
            ))}
          </div>
        </>
      );
    };
    
    export default Pricing;
