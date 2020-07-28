# Wrapi
Wrap external API to internal API with Express.

WORK IN PROGRESS: just GET Method available

## Usage
```javascript

var express = require("express");

//Import wrapi
var wrapi = require("wrapi");

//Json with routes
var randomRoutes = require("./random.routes.json");

const app = express();

//Create a WRAPI
const wrapi_random = new wrapi.Wrapi();

//Add the routes to the WRAPI
wrapi_random.add(randomRoutes);

//Set express to use the WRAPI ROUTES with namespace before every route
app.use(`/${randomRoutes.namespace}`, wrapi_random.router);

const server = app.listen(8080, () => {
  console.log("listening on port 8080");
});

```

## Routes JSON Example
```javascript
{
  "namespace": "random",
  "base_url": "https://reqres.in",
  "api": [
    {
      "id": 1,
      "method": 0, //THIS IS A GET, WORK IN PROGRESS
      "srcRoute": "/api/users",
      "destRoute": "/users"
    },
    {
      "id": 2,
      "method": 0, //THIS IS A GET, WORK IN PROGRESS
      "srcRoute": "/api/users/:id",
      "destRoute": "/user/:id",
      "params": {}
    }
  ]
}
```
