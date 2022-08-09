const dataBase = firebase.database().ref();

const allMessages = document.querySelector("#all-messages");
const usernameElem = document.querySelector("#username");
const messageElem = document.querySelector("#message");
const sendBtn = document.querySelector("#send-btn");
sendBtn.onclick = updateDB;


function updateDB(event){
    event.preventDefault(); 
    let data = {
        USERNAME: usernameElem.value,
        MESSAGE: messageElem.value
    }
   console.log(data);
   dataBase.push(data);

   messageElem.value = "";
}


dataBase.on("child_added", addMessageToBoard);

function addMessageToBoard(rowData){
    console.log(rowData);

    let data = rowData.val();
    console.log("RECIEVED FROM DATABASE", data);

    let singleMessage = makeSingleMessageHTML(data.USERNAME, data.MESSAGE)
    allMessages.append(singleMessage);
}

function makeSingleMessageHTML(usernameTxt, messageTxt){
    
    let parentDiv = document.createElement("div");
    parentDiv.setAttribute("class", "single-message");

    let usernameP = document.createElement("p");  
    usernameP.classList.add("single-message-username");

    usernameP.innerHTML = usernameTxt + ":";
    parentDiv.append(usernameP);

    let messageP = document.createElement("p");
    messageP.innerHTML = messageTxt;

    parentDiv.append(messageP);
    return parentDiv;
}
