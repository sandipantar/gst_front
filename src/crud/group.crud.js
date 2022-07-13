import axios from './axios.interceptor';
import baseUrl from './api.util';

export const GROUP = `${baseUrl}/grocery-group`;


export function fetchAllGroups() {
    return axios.get(GROUP);
}
export function fetchSingleGroup(id) {
    const grpUL = `${GROUP}/${id}`;
    return axios.get(grpUL);
}
export function searchGroupName(txt) {
    const grpUL = `${GROUP}/search/${txt}`;
    return axios.get(grpUL);
}

export function createGroup( grpName, grpAli, grpDesc ) {

    return axios.post(GROUP, { 
        group_name: grpName,
        group_alias: grpAli,
        group_description: grpDesc
    });
}

export function updateGroup(id,grpName, grpAli, grpDesc) {
    const grpUL = `${GROUP}/${id}`;

    return axios.patch(grpUL, { 
        group_name: grpName,
        group_alias: grpAli,
        group_description: grpDesc
    });
}

export function deleteGroup(id) {
    const grpUL = `${GROUP}/${id}`;
    return axios.delete(grpUL);
}