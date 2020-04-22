const fs = require('fs');
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
var json = JSON.parse(fs.readFileSync("realtimestudy-86b4d-themes-export.json"));
var themes = firebase.firestore().collection("themes");
// deleteCollection(firebase.firestore(), themes, 500);

    toDate = (dt) => {
        if (dt==null||dt=="") return null;
        return new Date(dt);
    }
    toInt = (dt) => {
        if (dt==null||dt=="") return null;
        return parseInt(dt);
    }
for(i in json){
    // record = JSON.stringify(json[i]);
    record = json[i];
    theme = {
        name : record["name"],
        title : record["title"],
        abstract : record["abstract"],
        docs : record["docs"],
        github : record["github"],
        group : record["group"],
        purpose : record["purpose"],
        status : record["status"],
        progress : record["progress"],
        memo : record["memo"],
        priority : parseInt(record["priority"]),
        dependencies : record["dependencies"],
        planned_start : toDate(record["planed_start"]),
        actual_start : toDate(record["actual_start"]),
        duration : toInt(record["duration"]),
        planed_finish : toDate(record["planed_finish"]),
        actual_finish : toDate(record["actual_finish"]),
        created_at : toDate(record["created_at"]),
        updated_at : toDate(record["updated_at"])
    }
    themes.add(theme)
    .then(()=> {
        
    })
    .catch((error)=>{
        console.error("Error writeing document: ",error);
    });
}
