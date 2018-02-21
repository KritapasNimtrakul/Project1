"use strict";

var handleResponse = function handleResponse(xhr) {
  var content = document.querySelector("#content");

  var obj = JSON.parse(xhr.response);

  console.dir(obj);

  switch (xhr.status) {
    case 200:
      content.innerHTML = "<b>Success</b>";
      break;
    case 201:
      content.innerHTML = "<b>Created Successfully</b>";
      break;
    case 204:
      content.innerHTML = "<b>No Content</b>";
      break;
    case 400:
      content.innerHTML = "<b>Bad Request</b>";
      break;
    case 404:
      content.innerHTML = "<b>Not Found</b>";
      break;
    default:
      content.innerHTML = "Error code not implemented by client.";
      break;
  }
};

var sendAjax = function sendAjax(url) {

      var xhr = new XMLHttpRequest();

      xhr.open('GET', '/getPost');

      xhr.setRequestHeader ("Accept", 'application/json');

    xhr.onload = function () {
    return handleResponse(xhr,true);
    };

      xhr.send();
              
      e.preventDefault();
      return false;

};

    var sendPost = function sendPost(e, nameForm) {

      var nameAction = nameForm.getAttribute('action');
      var nameMethod = nameForm.getAttribute('method');
      
      var titleFiled = nameForm.querySelector('#titleFiled');
      var infoField = nameForm.querySelector('#infoField');
      
      var xhr = new XMLHttpRequest();
      xhr.open(nameMethod, nameAction);

      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader ('Accept', 'application/json');
      
      xhr.onload = () => handleResponse(xhr);
      
      var formData = `title=${titleFiled.value}&info=${infoField.value}`;
      
      xhr.send(formData);
    
      e.preventDefault();
      return false;
    };

function stopRKey(evt) { 
  var evt = (evt) ? evt : ((event) ? event : null); 
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
  if ((evt.keyCode == 13) && (node.type=="text"))  {return false;} 
}

var init = function init() {
    document.onkeypress = stopRKey; 
    
        var userForm = document.querySelector('#userForm');
        var nameForm = document.querySelector('#nameForm');

        
        var sendRequestGET = function (e) {

            return sendAjax(e,userForm);
        }
        var sendRequestPOST = function (e) {

            return sendPost(e,nameForm);
        }
        userForm.addEventListener('submit', sendRequestGET);
        nameForm.addEventListener('submit', sendRequestPOST);
};

window.onload = init;
