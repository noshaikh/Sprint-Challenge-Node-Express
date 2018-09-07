# Review Questions

## What is Node.js?

Node.js is a runtime environment (a program that runs other programs), a platform used to execute JavaScript applications outside the browser.

## What is Express?

Express is a web application framework that sits on top of the Node.js web server (http server module). It’s like React, for your backend.

Expresss sits on top of the raw http server module provided by Node.js and adds extra functionality, like routing and middleware support, and a simpler API.

## Mention two parts of Express that you learned about this week.

    .	Middleware:
    .
    .	Routing: selects which request handler function is executed based on the URL visited and the HTTP method used. Provides a way to break an application into smaller parts based on the route.
    .

## What is Middleware?

functions that get the req and res objects and can operate on them and either return the response or call the next middleware in the pipeline.

## What is a Resource?

database info

## What can the API return to help clients know if a request was successful?

a response, 200 status code

## How can we partition our application into sub-applications?

routers

## What is express.json() and why do we need it?

built-in middleware for parsing JSON content out of the request body.
