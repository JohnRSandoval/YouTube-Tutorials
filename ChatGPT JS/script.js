let previous = null;

function summarize(prompt) {
  return new Promise(function (resolve) {
    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {YOUR API KEY}'
      },
      body: JSON.stringify({
        'model': 'text-davinci-003',
        'prompt': 'Summarize the following and mention the programming language: ' + prompt,
        'temperature': 0.5,
        'max_tokens': 4000
      })
    })
      // then response to json and set response.status to code
      .then(response => response.json())
      .then(data => {
        re = data.choices[0].text;
        resolve(re);
      });
  });
}

function call(prompt) {
  if (previous != null) {
    prompt = 'Previous chat summary - if code, use the programming language in previous: ' + previous + " " + prompt;
  }
  return new Promise(function (resolve) {
    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {YOUR API KEY}'
      },
      body: JSON.stringify({
        'model': 'text-davinci-003',
        'prompt': `Assistant is a highly inteligent programming assistant and will answer any question. 
        Surround code with the markdown qutations. Question: ` + prompt + ' Assistant: ',
        'temperature': 0.5,
        'max_tokens': 4000
      })
    })
      // then response to json and set response.status to code
      .then(response => response.json())
      .then(data => {
        re = data.choices[0].text;
        resolve(re);
      });
  });
}


// function that scrolls to the bottom of the div with class "scrollable-box"
function scrollToBottom() {
  let scrollableBox = document.querySelector('.scrollable-box');
  scrollableBox.scrollTop = scrollableBox.scrollHeight;
}

function clearInput() {
  document.querySelector('.input-box').value = '';
}

function addUserChat(text) {
  // set container = to last div with class "container"
  let container = document.querySelector('.placer');
  let userChat = document.createElement('div');
  userChat.setAttribute('class', 'container darker');
  let userName = document.createElement('h3');
  userName.innerText = 'User';
  let userText = document.createElement('p');
  userText.innerText = text;
  userChat.appendChild(userName);
  userChat.appendChild(userText);
  container.appendChild(userChat);
  scrollToBottom();
}

function addBotChat(text) {
  // set container = to last div with class "container"
  let container = document.querySelector('.placer');
  let botChat = document.createElement('div');
  botChat.setAttribute('class', 'container');
  let name = document.createElement('h3');
  name.innerText = 'GPT-3';
  let userText = document.createElement('div');
  userText.innerHTML = marked.parse(text);
  try{
    let lastCode = userText.querySelector('code:last-child');
    let lastPre = userText.querySelector('pre:last-child');
    lastPre.setAttribute('class', 'language-*');
    lastCode.setAttribute('class', 'language-*');
  }else(e){
    console.log(e);
  }
  botChat.appendChild(name);
  botChat.appendChild(userText);
  container.appendChild(botChat);
  scrollToBottom();


}



var input = document.querySelector('.input-box');
// on submit enter
input.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    var text = input.value;
    // if text is not empty
    if (text != '') {
      addUserChat(input.value);
      clearInput();
      call(text).then(function (result) {
        addBotChat(result);
        summarize(result).then(function (result2) {
          previous = result2;
        });
      });

    }
  }
});

