/* export const FIREBASE_CONFIG=  {
    apiKey: "AIzaSyCoUukE0yvx5ivd80JWR8t0HMS9NfOGUZM",
    authDomain: "isusa-325cd.firebaseapp.com",
    databaseURL: "https://isusa-325cd.firebaseio.com",
    projectId: "isusa-325cd",
    storageBucket: "",
    messagingSenderId: "804905274777",
    appId: "1:804905274777:web:ef9c66eefbb0a4f640d708"
  }; */

  export const FIREBASE_CONFIG=  {
    apiKey: "AIzaSyAjgsgG64rlvT-IH2dMbsqtn9lsBSsc4ZM",
    authDomain: "isusa2.firebaseapp.com",
    databaseURL: "https://isusa2.firebaseio.com",
    projectId: "isusa2",
    storageBucket: "isusa2.appspot.com",
    messagingSenderId: "1080968045482",
    appId: "1:1080968045482:web:2922a0a4926b9b8696c1d3"
  };

  export const snapshotToArray = snapshot =>{
    let returnArray=[];
    snapshot.forEach(element=>{
      let item =element.val();
      item.key=element.key;
      returnArray.push(item);
    });
    return returnArray;
  }