// Importa los métodos necesarios de Redux Toolkit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define el servicio para la API de productos
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/v1/product/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '',
    }),
    searchProducts: builder.query({
      query: (query) => `search/?query=${query}`,
    }),
    // Agrega más endpoints según tus necesidades
  }),
});

export const { useGetProductsQuery, useSearchProductsQuery } = productApi;
