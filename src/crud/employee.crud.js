import axios from './axios.interceptor';
import baseUrl from './api.util';

export const EMPLOYEE = `${baseUrl}/grocery-employee`;


export function fetchAllEmployees() {
    return axios.get(EMPLOYEE);
}
export function fetchSingleEmployee(id) {
    const grpUL = `${EMPLOYEE}/${id}`;
    return axios.get(grpUL);
}
export function searchEmployeeName(txt) {
    const grpUL = `${EMPLOYEE}/search/${txt}`;
    return axios.get(grpUL);
}

export function createEmployee( empNme, empAddr, empRole, empPswd ) {
    return axios.post(EMPLOYEE, { 
        employee_name: empNme,
        employee_address: empAddr,
        employee_role: empRole,
        employee_password: empPswd
    });
}

export function loginEmployee( empNme, empPswd ) {
    const EMPLG = `${EMPLOYEE}/login/${empNme}`;
    return axios.post(EMPLG, { 
        employee_name: empNme,
        employee_password: empPswd
    });
}

export function updateEmployee(id,empNme, empAddr, empRole, empPswd) {
    const grpUL = `${EMPLOYEE}/${id}`;

    return axios.patch(grpUL, { 
        employee_name: empNme,
        employee_address: empAddr,
        employee_role: empRole,
        employee_password: empPswd
    });
}

export function deleteEmployee(id) {
    const grpUL = `${EMPLOYEE}/${id}`;
    return axios.delete(grpUL);
}