import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

export const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        config.headers['Authorization'] = `Bearer ${user.accessToken}`;
    }
    return config;
}, (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        console.error('Response error:', error.response?.status, error.message);

        if (error.response?.status === 403 || (error.response?.status === 401 && !originalRequest._retry)) {
            console.log('Token expired or invalid, attempting to refresh...');
            originalRequest._retry = true;

            try {
                const response = await axios.post(`${SERVER_URL}/api/user/refresh-token`, {}, {
                    withCredentials: true
                });
                
                console.log('Refresh token response:', response.data); // Add this line for debugging

                const { accessToken } = response.data?.data;

                if (!accessToken) {
                    throw new Error('No access token received from refresh token endpoint');
                }

                console.log('Token refreshed successfully');

                const user = JSON.parse(localStorage.getItem('user'));
                user.accessToken = accessToken;
                localStorage.setItem('user', JSON.stringify(user));

                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                localStorage.removeItem('user');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;