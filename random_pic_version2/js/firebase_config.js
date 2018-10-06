var config = {
  apiKey: "AIzaSyCUge0VCV2hwY5bnoTJVDVzuR1AVYefii4",
  authDomain: "game-bd9f8.firebaseapp.com",
  databaseURL: "https://game-bd9f8.firebaseio.com",
  projectId: "game-bd9f8",
  storageBucket: "",
  messagingSenderId: "690750323149"};
firebase.initializeApp(config);// Initialize Firebase
my_db = firebase.database().ref("/"+room_num+"/");
// var provider = new firebase.auth.GoogleAuthProvider(); 
// firebase.auth().signInWithPopup(provider).then(function(result) {      
//   var user_data = result.user.providerData[0];
//   var img = document.createElement("img");
//   img.src = user_data.photoURL;
//   $("#name_after").append(img);

// }).catch(function(error) {
//   // 處理錯誤
//   var errorCode     = error.code;
//   var errorMessage  = error.message;     
//   var email         = error.email;      // 使用者所使用的 Email
//   var credential    = error.credential;      
// });
