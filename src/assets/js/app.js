import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';
var globalResponseJson;
// $.ajax({
//     url: "../../app.json",
//     dataType: "json",

// }).then(function (response) {
//     // console.log(response);
//     globalResponseJson = response;
// });



// User 
var users = document.querySelectorAll("[data-userId]");
var usersArr = [...users];
var chat = document.querySelector(".chat__body");
// Creating the sidebar from the response 
document.addEventListener("DOMContentLoaded", function () {

    // alert("loader");
})


var sidebarDom = "";

const URL = "../../app.json";
fetch(URL)
    .then((resp) => {
        return resp.json();
    })
    // .then(function (response) {
    //     // Here you get the data to modify as you please
    //     globalResponseJson = response;
    //     console.log(globalResponseJson);

    // })
    .then(function (data) {
        globalResponseJson = data;
        console.log(data);

        globalResponseJson.users.map(user => {
            sidebarDom += createSidebarUser(user);
            // console.log(sidebarDom);

        });

        document.querySelector(".users").innerHTML = sidebarDom;
        console.log(sidebarDom);

    })
    .catch(function (error) {
        // If there is any error you will catch them here
        console.log("error happend");

    });




// var sidebarDom = `<div class="sidebar__element users">
//       <a href="#" class="user" data-userId="1">
//         <div class="user__avatar">
//           <span class="circle"></span>
//           <div class="user__avatar__container" style="background-image: url('../assets/img/tShelby.jpg')">
//           </div>
//         </div>
//       </a>
//       <a href="#" class="user" data-userId="2">
//         <div class="user__avatar">
//           <span class="circle"></span>
//           <div class="user__avatar__container" style="background-image: url('../assets/img/aShelby.jpg')">
//           </div>
//         </div>
//       </a>
//       <a href="#" class="user" data-userId="3">
//         <div class="user__avatar">
//           <span class="circle"></span>
//           <div class="user__avatar__container" style="background-image: url('../assets/img/jShelby.jpg')">
//           </div>
//         </div>
//       </a>
//       <a href="#" class="user" data-userId="4">
//         <div class="user__avatar">
//           <span class="circle"></span>
//           <div class="user__avatar__container" style="background-image: url('../assets/img/fShelby.jpg')">
//           </div>
//         </div>
//       </a>
//     </div>`
// Helpers 
// Empty function 
function empty(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}

function createSidebarUser(user) {
    return `
    <a href="#" class="user" data-userId="${user.id}">
    <div class="user__avatar">
            <span class="user--hover">${user.name}</span>
            <span class="circle ${user.status}"></span>
            <div class="user__avatar__container" style="background-image: url('../assets/img/${user.image}')">
            </div>
        </div>
    </a>`;
}
// Choosing a contact from the sidebar 
document.addEventListener("DOMContentLoaded", function () {
    // $(".users").on("click", ".user", userClicked());

    // $(".users").on("click", ".user", userClicked);
    document.querySelector(".users").addEventListener("click", function (event) {
        
        
        if (event.target.classList.contains("user")) {
           
            userClicked(event.target);
        }
    })

    function groupEvent(arr, event, fn) {
        arr.forEach(child => child.addEventListener(event, fn));
    }

    groupEvent(usersArr, "click", userClicked);

    function userClicked(clickedUser) {
        var userId = clickedUser.getAttribute("data-userId");
        // alert('user clicked');
        // Getting the choosen user 
        var user = globalResponseJson.users.filter((user) => {
            return user.id == userId
        })[0];
        // console.log(user);

        // Remove the current messages from the view 
        // while (chat.hasChildNodes()) {
        //     chat.removeChild(chat.lastChild);
        // }
        empty(chat);
        //Append the current user messages to the view 
        var thread = user.thread;
        var threadDom = "";

        // Loop through the thread if the key is admin append the value in a admin class if elese put in in user 
        for (var key in thread) {
            if (key == "admin") {
                threadDom += `
            <p class="admin__message chat__body__message">
                ${thread[key]}
            </p>`;
            } else {
                threadDom += `
            <p class="user__message chat__body__message">
                ${thread[key]}
            </p>`;
            }
            chat.innerHTML = threadDom;
        }
        // Make the current contact info appears in the head 
        var chatHead = document.querySelector(".chat__header");
        // Remove Current Head 
        // while (chatHead.hasChildNodes()) {
        //     chatHead.removeChild(chatHead.lastChild);
        // }
        empty(chatHead);
        // Current Contact Chat Header
        var currentContactHead = 
    `<a href = "#" class = "userChat" data-userId = "${user.id}" >
        <div class = "userChat__avatar" >
            <div class = "userChat__avatar__container" style = "background-image: url('../assets/img/${user.image}')" ></div>
        </div>
        <div class = "userChat__meta" >
            <div class = "userChat__name" >
                ${user.name} 
            </div>
            <div class = "userChat__status">
            ${user.status}
            </div>
        </div >
    </a>`;
        // Append the new chat Head
        chatHead.innerHTML = currentContactHead;


    };

    // usersArr.forEach(user => user.addEventListener("click", function () {
    //     var userId = this.getAttribute("data-userId");
    //     alert('user clicked');
    //     // Getting the choosen user 
    //     var user = globalResponseJson.users.filter((user) => {
    //         return user.id == userId
    //     })[0];
    //     // console.log(user);

    //     // Remove the current messages from the view 
    //     // while (chat.hasChildNodes()) {
    //     //     chat.removeChild(chat.lastChild);
    //     // }
    //     empty(chat);
    //     //Append the current user messages to the view 
    //     var thread = user.thread;
    //     var threadDom = "";

    //     // Loop through the thread if the key is admin append the value in a admin class if elese put in in user 
    //     for (var key in thread) {
    //         if (key == "admin") {
    //             threadDom += `
    //             <p class="admin__message chat__body__message">
    //                 ${thread[key]}
    //             </p>`;
    //         } else {
    //             threadDom += `
    //             <p class="user__message chat__body__message">
    //                 ${thread[key]}
    //             </p>`;
    //         }
    //         chat.innerHTML = threadDom;
    //     }
    //     // Make the current contact info appears in the head 
    //     var chatHead = document.querySelector(".chat__header");
    //     // Remove Current Head 
    //     // while (chatHead.hasChildNodes()) {
    //     //     chatHead.removeChild(chatHead.lastChild);
    //     // }
    //     empty(chatHead);
    //     // Current Contact Chat Header
    //     var currentContactHead = `<a href = "#" class = "userChat" data-userId = "${user.id}" >
    //         <div class = "userChat__avatar" >
    //             <div class = "userChat__avatar__container" style = "background-image: url('../assets/img/${user.image}')" ></div>
    //         </div>
    //         <div class = "userChat__meta" >
    //             <div class = "userChat__name" >
    //                 ${user.name} 
    //             </div>
    //             <div class = "userChat__status">
    //             ${user.status}
    //             </div>
    //         </div >
    //     </a>`;
    //     // Append the new chat Head
    //     chatHead.innerHTML = currentContactHead;


    // }));
});