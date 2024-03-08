// En el archivo services/ContactApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://backend-cleopathra.onrender.com/api/user/api/v1/' }),
  endpoints: (builder) => ({
    postContact: builder.mutation({
      query: (formData) => ({
        url: 'contactus/',
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
  }),
});

export const { usePostContactMutation } = contactApi;
