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
var database = firebase.firestore();
console.log('[');
database.collection("themes").get()
    .then((querySnapshot)=>{
        querySnapshot.forEach((doc) => {
            console.log('{ "id":"'+doc.id + '",');
            console.log('"items":[')
            line = doc.data();
            var siz=0;
            for(i in line) siz++;
            var cn=0;
            for (item in line){
                console.log('  {');
                console.log('   "key":"'+item+'",');
                data = line[item];
                console.log('   "type":"'+typeof(data)+'",');
                console.log('    "value":"' + escape(data) + '"');
                ++cn;
                if(cn==siz){
                    m="";
                }else {
                    m=",";
                }
                console.log('  }' + m);
            }
            console.log(']');
            console.log('},')
        })
        console.log("]")
    });
