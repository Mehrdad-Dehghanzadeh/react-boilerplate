import axios from 'axios'
import { onRequest } from '@services/interceptors/onRequest/onFulfilled'
import { onRejectedRequest } from '@services/interceptors/onRequest/onRejected'
import { onResponse } from '@services/interceptors/onResponse/onFulfilled'
import { onRejectResponse } from '@services/interceptors/onResponse/onRejected'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'lang': 'fa'
  }
})

axiosInstance.interceptors.request.use(onRequest, onRejectedRequest)
axiosInstance.interceptors.response.use(onResponse, onRejectResponse)
