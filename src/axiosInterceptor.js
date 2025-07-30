import axiosInstance, { setAuthToken } from './axiosInstance';
import { useContext, useEffect } from 'react';
import { UserContext } from './UserContext';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const useAxiosInterceptor = () => {
  const { token, refreshToken, logout, setToken } = useContext(UserContext);

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
          if (isRefreshing) {
            return new Promise(function (resolve, reject) {
              failedQueue.push({ resolve, reject });
            })
              .then((newToken) => {
                originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
                return axiosInstance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const response = await axiosInstance.post('/user/refreshToken', { refreshToken });

            const newAccessToken = response.data.accessToken;

            setToken(newAccessToken);
            setAuthToken(newAccessToken);

            processQueue(null, newAccessToken);

            originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;

            return axiosInstance(originalRequest);
          } catch (err) {
            processQueue(err, null);
            logout();
            return Promise.reject(err);
          } finally {
            isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [token, refreshToken, logout, setToken]);
};
