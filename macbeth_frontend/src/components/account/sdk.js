import axiosInstance from '../../axios';

export default function validateTokenAndObtainSession(tokenId) {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: tokenId
    };
    const data = {
        "token" : tokenId
    }
    console.log('validateTokenAndObtainSession data');
    return axiosInstance.post('auth/login/', data);
}
