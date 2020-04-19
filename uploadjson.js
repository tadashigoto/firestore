const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
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

var  people = firebase.firestore().collection("people");
people.get().then(function(doc) {
    doc.forEach((line) => {
        data = line.data();
        console.log('name:'+data.name);
        console.log('mail:'+data.mail);
        console.log('age:'+data.age);
    });
    process.exit(0);
}).catch(function(error) {
    console.log("Error getting document:", error);
});
