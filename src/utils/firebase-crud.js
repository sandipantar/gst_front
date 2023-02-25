import { addDoc, collection, getDocs, getDoc, doc, updateDoc, deleteDoc } from "@firebase/firestore";
import { firestore } from "../firebase/firebase";

export const add = (collectionName, data) => {
    const ref = collection(firestore, collectionName);
    try {
        addDoc(ref, data).then(res => {
            console.log("add res ", res);
        });
    } catch(err) {
        console.log(err);
    }
}

export const fetchAll = async (collectionName) => {
    const ref = collection(firestore, collectionName);
    try {
        getDocs(ref).then(res => {
            res.docs.map(doc => console.log(doc.id, doc.data()))
        });
    } catch(err) {
        console.log(err);
    }
}

export const fetchById = async (collectionName, id) => {
    const docRef = doc(firestore, collectionName, id);
    try {
        getDoc(docRef).then(res => {
            console.log(res.data());
        });
    } catch(err) {
        console.log(err);
    }
}

export const fetchByIdAndUpdate = async (collectionName, id, data) => {
    const docRef = doc(firestore, collectionName, id);
    try {
        if (docRef) {
            updateDoc(docRef, data).then(res => {
                console.log("update done");
            });
        } else {
            console.log("No data found");
        }
        
    } catch(err) {
        console.log(err);
    }
}

export const deleteById = async (collectionName, id) => {
    const docRef = doc(firestore, collectionName, id);
    try {
        deleteDoc(docRef).then(res => {
            console.log("Deleted");
        });
    } catch(err) {
        console.log(err);
    }
}
