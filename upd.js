const http = require('http');
const fs = require('fs');
const ejs = require('ejs');


var firebase = require('firebase');


// const hostname = '127.0.0.1';
// const port = 3000;
const hostname = 'localhost';
const port = 2564;
const index = fs.readFileSync('./index.ejs', 'utf-8');


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

let people = firebase.firestore().ref('people/');
people.once('value', (snapshot)=> {
    let data = snapshot.val();
    console.log("data:"+data);
});
