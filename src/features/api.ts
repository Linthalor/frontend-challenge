import axios, { AxiosRequestConfig } from 'axios';

// TOOD: have this configurable based on deployment.
export const baseUrl = 'http://localhost:3001/api/';

// TODO: this is where we'd do any sort of auth token refresh if needed.
const axiosInstance = axios.create();

export const appGet = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const { headers, ...remainingConfig } = config || { headers: {} };
  return axiosInstance
    .get<T>(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      ...remainingConfig,
    })
    .then(({ data }) => data);
}

export const appPost = async <T, K = any>(
  url: string,
  data: K,
  config?: AxiosRequestConfig
): Promise<T> => {
  const { headers, ...remainingConfig } = config || { headers: {} };
  return axiosInstance
    .post<T>(url, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      ...remainingConfig,
    })
    .then(({ data }) => data);
}