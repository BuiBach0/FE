import axios from 'axios';

// Lấy token từ localStorage (hoặc từ nơi bạn lưu trữ token)
const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

// Tạo instance của Axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:9999/', // URL của API backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor để thêm Bearer Token vào mỗi request
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor để kiểm tra lỗi và làm mới token nếu token hết hạn
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Kiểm tra nếu lỗi là do token hết hạn và chưa gửi yêu cầu refresh token
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = getRefreshToken();

            if (refreshToken) {
                // Gọi API để refresh token
                const response = await axios.post('http://localhost:9999/auth/refresh-token', { refresh_token: refreshToken });

                if (response.status === 200) {
                    const newAccessToken = response.data.accessToken;

                    // Lưu lại token mới
                    localStorage.setItem('accessToken', newAccessToken);

                    // Cập nhật lại Authorization header với token mới
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    // Thực hiện lại request ban đầu với token mới
                    return axiosInstance(originalRequest);
                }
            }
        }
        return Promise.reject(error);
    }
);

// Export axiosInstance để sử dụng trong các component khác
export default axiosInstance;
