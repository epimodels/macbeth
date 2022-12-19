import axios from 'axios';
import jwt_decode from "jwt-decode"

// Most of this code is taken with minor modification from
// Very Academy's Django Rest Framework Series.
// Crypto is heck so I don't want to explain it.

const baseURL = 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access_token')
            ? 'JWT ' + localStorage.getItem('access_token')
            : null,
            'Content-Type': 'application/json',
            accept: 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        // Network outage of some kind.
        if(typeof error.response === 'undefined') {
            alert(
                'A server/network error has occured. ' +
                'Please try again later. ' +
                'If the problem persists, please contact the administrator.'
            );
            return Promise.reject(error);
        }

        // unauthorized during refresh token attempt. new login required.
        if (
            error.response.status === 401 &&
            originalRequest.url === baseURL + 'auth/refresh/'
        ) {
            window.location.href = '/account/sign-in';
            return Promise.reject(error);
        }
        
        // bad request during registration attempt.
        if (
            error.response.status === 400 &&
            originalRequest.url === 'auth/register/'
        ) {
            if (error.response.data.password) {
                alert(error.response.data.password);
            }
            else if (error.response.data.email) {
                alert(error.response.data.email);
            }
            else if (error.response.data.over13) {
                alert('You have to verify you are over 13');
            }
            return Promise.reject(error);
        }
        
        // bad request during login attempt.
        if (
            error.response.status === 401 &&
            originalRequest.url === 'auth/login/'
        ) {
            alert('Invalid email or password.');
            return Promise.reject(error);
        }

        // New token's needed
        if (
            error.response.data.code === 'token_not_valid' &&
            error.response.status === 401 &&
            error.response.statusText === 'Unauthorized'
        ) {
            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken) {
                const tokenParts = jwt_decode(refreshToken)

                const now = Math.ceil(Date.now() / 1000); // convert to seconds.
                console.log(tokenParts.exp); // token expiration time in seconds.

                if(tokenParts.exp > now) { // New token time
                    return axiosInstance
                        .post(baseURL + 'auth/refresh/', {refresh: refreshToken})
                        .then((res) => {
                            localStorage.setItem('access_token', res.data.access);
                            axiosInstance.defaults.headers['Authorization'] =
                                'JWT ' + res.data.access
                            originalRequest.headers['Authorization'] =
                                'JWT ' + res.data.access

                            return axiosInstance(originalRequest);
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                } else {
                    console.log('Refresh token is expired', tokenParts.exp, now);
                    window.location.href = '/account/sign-in';
                }
            } else {
                console.log('No refresh token');
                window.location.href = '/account/sign-in';
            }
        }
    }
)


export default axiosInstance;