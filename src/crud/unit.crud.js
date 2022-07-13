import axios from './axios.interceptor';
import baseUrl from './api.util';

export const UNIT = `${baseUrl}/grocery-unit`;


export function fetchAllUnits() {
    return axios.get(UNIT);
}
export function fetchSingleUnit(id) {
    const unitUL = `${UNIT}/${id}`;
    return axios.get(unitUL);
}
export function searchUnitName(txt) {
    const unitUL = `${UNIT}/search/${txt}`;
    return axios.get(unitUL);
}

export function createUnit( unitName,unitDesc ) {

    return axios.post(UNIT, { 
        unit_name: unitName,
        unit_description: unitDesc
    });
}

export function updateUnit(id,unitName,unitDesc) {
    const unitUL = `${UNIT}/${id}`;

    return axios.patch(unitUL, { 
        unit_name:unitName,
        unit_description: unitDesc
    });
    // return axios.patch(unitUL, { unitName });
}

export function deleteUnit(id) {
    const unitUL = `${UNIT}/${id}`;
    return axios.delete(unitUL);
}