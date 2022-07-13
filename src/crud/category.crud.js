import axios from './axios.interceptor';
import baseUrl from './api.util';

export const CATEGORY = `${baseUrl}/grocery-category`;


export function fetchAllCategories() {
    return axios.get(CATEGORY);
}
export function fetchSingleUnit(id) {
    const catUL = `${CATEGORY}/${id}`;
    return axios.get(catUL);
}
export function searchCatName(txt) {
    const catUL = `${CATEGORY}/search/${txt}`;
    return axios.get(catUL);
}

export function createCategory( catName, catAli, catDesc ) {

    return axios.post(CATEGORY, { 
        category_name: catName,
        category_alias: catAli,
        category_description: catDesc
    });
}

export function updateCategory(id,catName, catAli, catDesc) {
    const catUL = `${CATEGORY}/${id}`;

    return axios.patch(catUL, { 
        category_name: catName,
        category_alias: catAli,
        category_description: catDesc
    });
    // return axios.patch(unitUL, { unitName });
}

export function deleteCategory(id) {
    const catUL = `${CATEGORY}/${id}`;
    return axios.delete(catUL);
}