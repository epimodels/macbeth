import axiosInstance from '../../axios';

export default function validateTokenAndObtainSession({data, tokenId}) {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: tokenId
    };

    console.log('validateTokenAndObtainSession data');
    return axiosInstance.post('auth/login/', data);
}
