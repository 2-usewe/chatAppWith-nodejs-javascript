//step .1 initialize the socket
var socket = io();

//step 2. connect to server
socket.on('connect',()=>{
  // console.log(socket.id,': connected');
});

//step 3. take textarea element and message-area element
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message-area');

//step 4. take user input
let name = '';

do {
  name = prompt("Please enter your name");
}
while (!name);

//step 5. add an event listener for for handling send message
textarea.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    // console.log(e.target.value);
  //step 6. call send message function
  sendMessage(e.target.value); //step 6.
  }

})

//step 6. create a function send message function

function sendMessage(message) {
  let msg = {
    user: name,
    message: message
  }
  // console.log(typeof msg);

  //step 7. call Append message
  appendMessage(msg, 'outgoing');
  textarea.value = '';

  //step 8.update to bottom scroll for display message area
  scrollBottom();

  //step 9. emit the message for listen on server
  socket.emit('message', msg);
}

// step 7. Append message in message are for display to client application
function appendMessage(msg, type) {
  //create a div element
  let mainDiv = document.createElement('div');

  //class name update following type (eg. outgoing)
  let className = type;

  //add class names for above div element
  mainDiv.classList.add(className, 'message');

  //create a markup
  let markup = `
  <h4>${msg.user}</h4>
  <p >${msg.message}</p>
  `;

  //add markup inside the div element
  mainDiv.innerHTML = markup;
  // console.log(mainDiv);

  // append the div element in our message Area document through appendChild() DOM method
  messageArea.appendChild(mainDiv);
}

//step 10. Receive real time message through socket
socket.on('message', (msg) => {
  appendMessage(msg, 'incomming');
  scrollBottom();
})

//step 8. bottom scroll for display message area
function scrollBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}