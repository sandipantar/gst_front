import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import baseUrl from './api.util';
import ApiErrorMessage from './api.errorMessage';

const getToken = () => {
    let authToken = localStorage.getItem('authTokenPCAdmin');
    const token = authToken ? authToken : '';
    return token;
};

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export const setupAxios = (store) => {
    // Add a request interceptor
    axios.interceptors.request.use(
        function (config) {
            delete config.headers.Authorization;
            const token = getToken();
            if (token) {
                config.headers['x-auth-token'] = token;
            }
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
        function (response) {
            if (!response.data.success) {
                if (response.data.errorCode === 1000) {}

                toast.error(ApiErrorMessage[response.data.errorCode], {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                        paddingLeft: '12px'
                    }
                });
                return Promise.reject();
            }
            return response;
        },
        function (error) {
            if (error.response) {
                toast.error(ApiErrorMessage[error.response.data.errorCode], {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                        paddingLeft: '12px'
                    }
                });
            } else if (error.request) {
                // console.log(error.request);
            } else {
                // console.log('Error', error.message);
            }
            
            return Promise.reject(error);
        }
    );
};

export default axios;
