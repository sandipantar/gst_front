import axios from './axios.interceptor';
import baseUrl from './api.util';

export const PRODUCT = `${baseUrl}/grocery-product`;


export function fetchAllProducts() {
    return axios.get(PRODUCT);
}
export function fetchSingleUnit(id) {
    const unitUL = `${PRODUCT}/${id}`;
    return axios.get(unitUL);
}

export function createProduct( unitName,unitDesc ) {

    return axios.post(PRODUCT, { 
        unit_name: unitName,
        unit_description: unitDesc
    });
}

export function updateProduct(id,unitName,unitDesc) {
    const unitUL = `${PRODUCT}/${id}`;

    return axios.patch(unitUL, { 
        unit_name:unitName,
        unit_description: unitDesc
    });
    // return axios.patch(unitUL, { unitName });
}

export function deleteProduct(id) {
    const unitUL = `${PRODUCT}/${id}`;
    return axios.delete(unitUL);
}