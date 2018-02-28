"use strict";

const parseJSON = (xhr, content) => {
  // parse response (obj will be empty in a 204 updated)
  if (xhr.response) {
    const obj = JSON.parse(xhr.response);
    console.dir(obj);

    // if message in response, add to screen
    if (obj.title && obj.info) {
      const div = document.createElement('div');
      div.id = 'title';
      div.className = 'title';
      const h2 = document.createElement('h2');
      const p = document.createElement('p');
      const tempTitle = document.createTextNode(obj.title);
      const tempInfo = document.createTextNode(obj.info);
      h2.appendChild(tempTitle);
      p.appendChild(tempInfo);
      div.appendChild(h2);
      div.appendChild(p);
      const colors = ['#ED20B4', '#FF6828', '#FFFB3A', '#3BE832', '#23B1FF'];
      const random_color = colors[Math.floor(Math.random() * colors.length)];
      div.style.backgroundColor = random_color;
      content.appendChild(div);
    } else {
      alert(`${obj.id}: ${obj.message}`);
    }
  }
};


const handleResponse = (xhr) => {
  // grab the content section
  const content = this.document.querySelector('#content');
  const searchContent = this.document.querySelector('#searchContent');

  if (xhr.status !== 204) {
    if (xhr.status === 200) {
      content.style.display = 'none';
      searchContent.style.display = 'block';
      parseJSON(xhr, searchContent);
    } else {
      content.style.display = 'block';
      searchContent.style.display = 'none';
      parseJSON(xhr, content);
    }
  } else {
    // if the status code is 204 update on screen content
    const nameForm = this.document.querySelector('#nameForm');
    const titleField = nameForm.querySelector('#titleField');
    const infoField = nameForm.querySelector('#infoField');
    const divtag = document.getElementsByClassName('title');
    for (let x = 0; x < divtag.length; x++) {
      console.log(titleField.value);
      console.log(divtag[x].firstChild.textContent);
      if (divtag[x].firstChild.textContent === titleField.value) {
        divtag[x].lastChild.textContent = infoField.value;
      }
    }
  }
};

// function to send ajax
const sendAjax = (e, userForm) => {
  const nameAction = userForm.getAttribute('action');
  const nameMethod = userForm.getAttribute('method');
  const seachField = userForm.querySelector('#searchField');


  const xhr = new XMLHttpRequest();

  xhr.open(nameMethod, `${nameAction}?search=${seachField.value}`);

  xhr.setRequestHeader('Accept', 'application/json');

  xhr.onload = () => handleResponse(xhr, true);

  xhr.send();

  e.preventDefault();
  return false;
};

const sendPost = (e, nameForm) => {
  const nameAction = nameForm.getAttribute('action');
  const nameMethod = nameForm.getAttribute('method');

  const titleField = nameForm.querySelector('#titleField');
  const infoField = nameForm.querySelector('#infoField');

  const xhr = new XMLHttpRequest();
  xhr.open(nameMethod, nameAction);

  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Accept', 'application/json');

  xhr.onload = () => handleResponse(xhr);

  const formData = `title=${titleField.value}&info=${infoField.value}`;

  xhr.send(formData);


  e.preventDefault();
  return false;
};

const stopRKey = (evt) => {
  const evt1 = (evt) || ((event) || null);
  const node = (evt1.target) ? evt1.target : ((evt1.srcElement) ? evt1.srcElement : null);
  if ((evt1.keyCode === 13) && (node.type === 'text')) { return false; }
};

// initialization function
const init = () => {
  document.onkeypress = stopRKey;
  const userForm = this.document.querySelector('#userForm');
  const nameForm = this.document.querySelector('#nameForm');
  const button = this.document.querySelector('.button');
  const closeButton = this.document.querySelector('.closeBtn');

  button.addEventListener('click', (e) => {
    document.getElementById('overlay').style.display = 'block';
  });
  closeButton.addEventListener('click', (e) => {
    document.getElementById('overlay').style.display = 'none';
    nameForm.querySelector('#titleField').value = '';
    nameForm.querySelector('#infoField').value = '';
  });


  const sendRequestGET = e => sendAjax(e, userForm);

  const sendRequestPOST = e => sendPost(e, nameForm);

  userForm.addEventListener('submit', (e) => {
    sendRequestGET(e);
  });
  nameForm.addEventListener('submit', (e) => {
    sendRequestPOST(e);
  });
};

this.window.onload = init;
