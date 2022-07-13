import axios from './axios.interceptor';
import baseUrl from './api.util';

export const BACKENDUSER = `${baseUrl}/admin`;
export const LOGINADMIN = `${baseUrl}/auth/adminLogin`;
export const LOGOUTADMIN = `${baseUrl}/auth/adminLogout`;
export const COURSES = `${baseUrl}/course`;
export const MODULES = `${baseUrl}/crsmodule`;
export const STUDENTS = `${baseUrl}/student`;
export const STUDENTREGB = `${baseUrl}/student/student`;

// all admin operation
export function fetchBackendUser() {
    return axios.get(BACKENDUSER);
}
export function fetchTeacher() {
    const TEACHERS = `${BACKENDUSER}/teacher`;
    return axios.get(TEACHERS);
}
export function createAdmin( adminName,adminEmail,adminPhone,adminPswd,adminSplzn,degree,position,location ) {
    return axios.post(BACKENDUSER, { adminName,adminEmail,adminPhone,adminPswd,adminSplzn,degree,position,location });
}
export function deleteAdmin(slug) {
    const delAdm = `${BACKENDUSER}/${slug}`;
    return axios.delete(delAdm);
}
export function loginAdmin( adminEmail,adminPswd ) {
    return axios.post(LOGINADMIN, { adminEmail,adminPswd });
}
export function logoutAdmin( adminEmail ) {
    return axios.post( LOGOUTADMIN, { adminEmail });
}
// all admin operation

//all basic course operation
export function fetchCourses() {
    return axios.get(COURSES);
}
export function fetchSingleCourse(slug) {
    const sCors = `${COURSES}/${slug}`;
    return axios.get(sCors);
}
export function createCourse( couseName,couseTenure,noSingleModule,cPrice,sPrice ) {
    return axios.post(COURSES, { 
        couseName:couseName,
        couseTenure:couseTenure, 
        noSingleModule:noSingleModule,
        coursePrice: {
            corporatePrice:cPrice,
            selfPrice:sPrice
        }
    });
}
export function updateCourse(slug,couseName,couseTenure,noSingleModule,cPrice,sPrice) {
    const sCors = `${COURSES}/${slug}`;
    return axios.patch(sCors,{ 
        couseName:couseName,
        noSingleModule:noSingleModule,
        coursePrice: {
            corporatePrice:cPrice,
            selfPrice:sPrice
        },
        couseTenure:couseTenure
    });
}
export function deleteCourse(slug) {
    const sCors = `${COURSES}/${slug}`;
    return axios.delete(sCors);
}
//all basic course operation

// all module operation
export function addModule( courseID,slug,courseName,moduleCount,moduleName,predur,postdur,exitdur,cPrice,sPrice,moduleTeacher ) {
    return axios.post(MODULES, { 
        pCourseID: courseID,
        pCourseSlug: slug,
        pCourseName: courseName,
        modID : moduleCount,
        moduleName:moduleName,
        modulePrice: {
            corporatePrice: cPrice,
            selfPrice: sPrice
        },
        examTime: {
            preTest : predur,
            postTest : postdur,
            exitTest : exitdur
        },
        moduleTeacher:moduleTeacher
    });
}
export function getCourseModules( slug ) {
    const moduleURL = `${MODULES}/${slug}`;
    return axios.get(moduleURL);
}
export function fetchSingleModule( modID ) {
    const moduleURL = `${MODULES}/modDetail/${modID}`;
    return axios.get(moduleURL);
}
export function getModule( slug,modID ) {
    const moduleURL = `${MODULES}/${slug}/${modID}`;
    return axios.get(moduleURL);
}
export function deleteModule( modID ) {
    const moduleURL = `${MODULES}/${modID}`;
    return axios.delete(moduleURL);
}
export function addQuestionModule( modID,moduleExam ) {
    const addQuestionURL = `${MODULES}/question/${modID}`;
    return axios.post(addQuestionURL, { moduleExam });
}
export function uploadContent( modID,moduleContent ) {

    const addQuestionURL = `${MODULES}/content/${modID}`;

    return axios({
        method: "post",
        url: addQuestionURL,
        data: moduleContent,
        headers: { "Content-Type": "multipart/form-data" },
    });
    // return axios.post(addQuestionURL, { moduleContent }, {'content-type': 'multipart/form-data'});
}
export function updateModuleInfo( modID,modDtl ) {
    const modDtlURL = `${MODULES}/${modID}`;
    return axios.patch(modDtlURL, { modDtl });
}
// all module operation

// all student operation
export function fetchStudents() {
    return axios.get(STUDENTS);
}
export function fetchSingleStudent(slug) {
    const getStd = `${STUDENTS}/${slug}`;
    return axios.get(getStd);
}
export function createStudent( studentName,studentAddress1,studentCity,studentPin,studentEmail,studentPassword,studentPhone1,studentMedRegNo ) {
    return axios.post(STUDENTS, { 
        studentName:studentName,
        studentAddress:{
            address: studentAddress1,
            city:studentCity,
            pin:studentPin
        },
        studentEmail:studentEmail,
        studentPassword:studentPassword,
        source: "Admin",
        studentPhone: {
            mobile:studentPhone1,
            whatsapp:studentPhone1
        },
        studentProfDtls: {
            medRegNo:studentMedRegNo
        } 
    });
}
export function editStudent1(slug,studentName,studentAddress1,studentCity,studentPin,studentEmail,studentPhone1,studentMedRegNo) {
    const edtStd = `${STUDENTS}/${slug}`;
    return axios.patch(edtStd, { 
        studentName:studentName,
        studentAddress:{
            address: studentAddress1,
            city:studentCity,
            pin:studentPin
        },
        studentEmail:studentEmail,
        studentPhone: {
            mobile:studentPhone1,
            whatsapp:studentPhone1
        },
        studentProfDtls: {
            medRegNo:studentMedRegNo
        } 
    });
}
export function editStudentPermisn(studentEmail) {
    const edtStd = `${STUDENTS}/permission/${studentEmail}`;
    return axios.patch(edtStd, { 
        studentName:"asd"
    });
}
export function deleteStudent1(slug) {
    const delStd = `${STUDENTS}/${slug}`;
    return axios.delete(delStd);
}
// all student operation
