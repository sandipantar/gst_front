import axios from './axios.interceptor';
import baseUrl from './api.util';

export const HSN = `${baseUrl}/grocery-hsn`;


export function fetchAllHSN() {
    return axios.get(HSN);
}
export function fetchSingleHSN(id) {
    const hsnUL = `${HSN}/${id}`;
    return axios.get(hsnUL);
}
export function searchHsnName(txt) {
    const hsnUL = `${HSN}/search/${txt}`;
    return axios.get(hsnUL);
}

export function createHSN( hsnUser,hsnCompliance,productDesc,ruleStDate,ruleEndDate,taxPercent,taxAlt1,taxAlt2,taxBase,rateCondition ) {

    return axios.post(HSN, { 
        hsn_user: hsnUser,
        hsn_compliance: hsnCompliance,
        product_desc: productDesc,
        rule_stDate: ruleStDate,
        rule_endDate: ruleEndDate,
        tax_percent: taxPercent,
        tax_alt1: taxAlt1,
        tax_alt2: taxAlt2,
        tax_base: taxBase,
        rate_condition: rateCondition
    });
}

export function updateHSN(id,hsnUser,hsnCompliance,productDesc,ruleStDate,ruleEndDate,taxPercent,taxAlt1,taxAlt2,taxBase,rateCondition) {
    const hsnUL = `${HSN}/${id}`;

    return axios.patch(hsnUL, { 
        hsn_user: hsnUser,
        hsn_compliance: hsnCompliance,
        product_desc: productDesc,
        rule_stDate: ruleStDate,
        rule_endDate: ruleEndDate,
        tax_percent: taxPercent,
        tax_alt1: taxAlt1,
        tax_alt2: taxAlt2,
        tax_base: taxBase,
        rate_condition: rateCondition
    });
    // return axios.patch(unitUL, { unitName });
}

export function deleteHSN(id) {
    const hsnUL = `${HSN}/${id}`;
    return axios.delete(hsnUL);
}