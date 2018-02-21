const users = {};

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const success = (request, response, method) => {
  const responseJSON = {
    users,
  };
  if (method === 'GET') {
    return respondJSON(request, response, 200, responseJSON);
  } else if (method === 'HEAD') {
    return respondJSON(request, response, 200);
  }
  return respondJSON(request, response, 404);
};

const notFound = (request, response, method) => {
  if (method === 'GET') {
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };
    return respondJSON(request, response, 404, responseJSON);
  } else if (method === 'HEAD') {
    return respondJSON(request, response, 404);
  }
  return respondJSON(request, response, 404);
};

const badRequest = (request, response) => {
  const responseJSON = {
    message: 'Name and age are both required',
    id: 'missing Params',
  };

  return respondJSON(request, response, 400, responseJSON);
};

const addPost = (request, response, body) => {
  if (!body.title || !body.info) {
    return badRequest(request, response);
  }
  let responseCode = 201;


  if (users[body.title]) {
    responseCode = 204;
  } else {
    users[body.title] = {};
  }
  users[body.title].title = body.title;
  users[body.title].info = body.info;

  if (responseCode === 201) {
    const responseJSON = {
      message: 'Created Successfully',
    };
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};


module.exports = {
  success,
  notFound,
  addPost,
  badRequest,
};
