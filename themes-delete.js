var firebase = require('firebase');

let config = {
    apiKey: "AIzaSyA_GFe5vbgy5cxrbfZdoyOmQS6AKnWy1qE",
    authDomain: "realtimestudy-86b4d.firebaseapp.com",
    databaseURL: "https://realtimestudy-86b4d.firebaseio.com",
    projectId: "realtimestudy-86b4d",
    storageBucket: "realtimestudy-86b4d.appspot.com",
    messagingSenderId: "627175746116",
    appId: "1:627175746116:web:301a205b55039b4ac2ea11",
    measurementId: "G-YVN66VG1RV"
};

try {
    firebase.initializeApp(config);
} catch(e) {
    console.log(e);
}
const db = firebase.firestore();
//firebaseのサイトにあるコード（少し改修）
const deleteCollection = (db, collectionRef, batchSize) => {
    const query = collectionRef.orderBy('__name__').limit(batchSize);
    return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
    });
}

//削除のメインコード
const deleteQueryBatch = (db, query, batchSize, resolve, reject) => {
    query.get()
        .then((snapshot) => {
             //検索結果が0件なら処理終わり
            if (snapshot.size == 0) {
                return 0;
            }
             //削除のメイン処理
            const batch = db.batch();
            snapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });
             //一旦処理サイズをreturn
            return batch.commit().then(() => {
                return snapshot.size;
            })
        })
        .then((numDeleted) => {
             //もう対象のデータが0なら処理終わり
            if (numDeleted == 0) {
                resolve();
                return;
            }
             //あだあるなら、再度処理
            process.nextTick(() => {
                deleteQueryBatch(db, query, batchSize, resolve, reject);
            });
        })
        .catch(reject);
}
//実行
const colRef = db.collection("themes");
deleteCollection(db, colRef, 500);