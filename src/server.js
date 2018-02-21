const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// added route to get for our ES5 JS bundle.
// This bundle will be created by our babel
// watch/build scripts in package.json
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/bundle.js': htmlHandler.getBundle,
  '/style.css': htmlHandler.getCSS,
  '/getPost': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  notFound: jsonHandler.notFound,
};

const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addPost') {
    const res = response;

    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    // on end of upload stream.
    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();

      const bodyParams = query.parse(bodyString);
      console.log(bodyParams);

      jsonHandler.addPost(request, res, bodyParams);
    });
  }
};

const handleGet = (request, response, parsedUrl) => {
  // route to correct method based on url
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, request.method);
  } else {
    urlStruct.notFound(request, response, request.method);
  }
};


const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  // const params = query.parse(parsedUrl.query);
  console.log(parsedUrl.pathname);

  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else {
    handleGet(request, response, parsedUrl);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
