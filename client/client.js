// function to handle our xhr response
const handleResponse = (xhr) => {
  // grab the content section
  const content = this.document.querySelector('#content');

  switch (xhr.status) {
    case 200: // if success
      content.innerHTML = '<b>Success</b>';
      break;
    case 400: // if bad request
      content.innerHTML = '<b>Bad Request</b>';
      break;
    case 204:
      content.innerHTML = '<b>Updated (No Content)</b>';
      break;
    case 201:
      content.innerHTML = '<b>Create</b>';
      break;
    default: // any other status
      content.innerHTML = '<b>Resource Not Found</b>';
      break;
  }
};

// function to send ajax
const sendAjax = (e) => {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', '/getPost');

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


  const sendRequestGET = e => sendAjax(e, userForm);

  const sendRequestPOST = e => sendPost(e, nameForm);

  userForm.addEventListener('submit', sendRequestGET);
  nameForm.addEventListener('submit', sendRequestPOST);
};

this.window.onload = init;
