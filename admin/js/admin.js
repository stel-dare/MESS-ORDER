//FIrebase Databae Reference
let database = firebase.database();
const storageService = firebase.storage();
const storageRef = storageService.ref();
/***************************************Side bar Nav*******************************/
//Getting the menu bar
let menuBar = document.getElementById('menu-bar');
//Getting sidebar
let sideBar = document.getElementById('mySidenav');
//Get sidebar close character
let sideClose = document.getElementById('sideclosebtn');
//Function for showing side bar
let showSideBar =() => sideBar.style.width = "250px";
//Function to close side bar
let closeSideBar =() => sideBar.style.width = "0%";
//Event listener for side bars
menuBar.addEventListener('click',showSideBar);
sideClose.addEventListener('click',closeSideBar);

/*******************************Side bar Nav End*************************************/

/*******Menu Page Script**************/
let getMenu = () => {
  let menuData;
  let fragment = document.createDocumentFragment();
  database.ref('Menu').once('value').then(function(snapshot) {
  //var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  let menuData = snapshot.val();
  console.log(snapshot.val());
  for (let key in menuData){
    let foodItem = document.createElement("div");
    foodItem.classList.add("menuDiv");
    foodItem.innerHTML = '<div class="foodImg"><img src="' + menuData[key].ImageUrl+'"></div><span>' + menuData[key].Name + '</span>'  ;
    fragment.appendChild(foodItem);
  }
  document.querySelector('.foodItems').appendChild(fragment);
  //console.log();
});

//let menuDiv = document.createElement("div");
//menuDiv.classList.add("menuDiv");





}
window.addEventListener('load',getMenu);

let toggleForm = () => document.getElementById('addControl').classList.toggle('hide');


let foodImage;

let handleFileUploadChange = (e) => {
  foodImage = e.target.files[0];
}

let handleFileUploadSubmit = (e) => {

  const uploadTask = storageRef.child(`images/${foodImage.name}`).put(foodImage); //create a child directory called images, and place the file inside this directory

  uploadTask.on('state_changed', (snapshot) => {
  // Observe state change events such as progress, pause, and resume
  }, (error) => {
    // Handle unsuccessful uploads
    console.log(error);
  }, () => {
     // Do something once upload is complete
     //let imageUrl;
     document.getElementById('addControl').classList.toggle('hide');
    // alert('SUCCESS');
     storageRef.child(`images/${foodImage.name}`).getDownloadURL().then((url) => {
       database.ref('Menu').push({
         Name: document.getElementById('name').value,
         Day: document.getElementById('day').value,
         Cost:document.getElementById('price').value,
         ImageUrl:url
       });
     });

     console.log('success');
  });
}

document.getElementById('uploadImage').addEventListener('change', handleFileUploadChange);

document.getElementById('addButton').addEventListener('click', handleFileUploadSubmit);
