import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include', // i think this may have done it.

  // baseUrl: 'http://localhost:5001',
  // mode: 'no-cors',
  // method: 'POST',
})

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}),
})
