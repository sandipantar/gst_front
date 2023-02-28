import { addDoc, collection, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where, Timestamp, getCountFromServer } from "@firebase/firestore";
import { firestore } from "../firebase/firebase";

export const add = async (collectionName, data) => {
    const ref = collection(firestore, collectionName);
    try {
        data.createdAt = Timestamp.fromDate(new Date());
        return await addDoc(ref, data)
        .then(res => {
            console.log("add res ", res);
            return {success: true};
        })
        .catch(err => {
            console.log("err at add ", err);
            return {error: true, msg: err};
        });
    } catch(err) {
        console.log(err);
    }
}

export const fetchAll = async (collectionName) => {
    const ref = collection(firestore, collectionName);
    try {
        return await getDocs(ref)
        .then(res => {
            let obj = {};
            const arr = [];
            if (res.docs && res.docs.length) {
                res.docs.forEach(doc => {
                    obj.id = doc.id;
                    obj.otherDetails = doc.data();
                });
                arr.push({...obj});
                obj = {};
            }
            return {success: true, data: arr};
        })
        .catch(err => {
            console.log("err at list ", err);
            return {error: true, msg: err};
        });;
    } catch(err) {
        console.log(err);
    }
}

export const fetchById = async (collectionName, id) => {
    const docRef = doc(firestore, collectionName, id);
    try {
        if (docRef) {
            return await getDoc(docRef)
            .then(res => {
                console.log(res.data());
                return {success: true, data: res.data()};
            })
            .catch(err => {
                console.log("err at details ", err);
                return {error: true, msg: err};
            });
        } else {
            console.log("No data found");
        }
        
    } catch(err) {
        console.log(err);
    }
}

export const fetchByIdAndUpdate = async (collectionName, id, data) => {
    const docRef = doc(firestore, collectionName, id);
    try {
        if (docRef) {
            return await updateDoc(docRef, data)
            .then(res => {
                console.log("update done");
                return {success: true};
            })
            .catch(err => {
                console.log("err at edit ", err);
                return {error: true, msg: err};
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
        return await deleteDoc(docRef)
        .then(res => {
            return {success: true}
        })
        .catch(err => {
            console.log("err at delete ", err);
            return {error: true, msg: err};
        });
    } catch(err) {
        console.log(err);
    }
}

export const getCount = async (collectionName, isGST) => {
    const ref = collection(firestore, collectionName);
    try {
        const q = query(ref, where("isNonGst", "==", isGST));
        const snapshot = await getCountFromServer(q);
        return snapshot.data().count;
    } catch(err) {
        console.log(err);
    }
};