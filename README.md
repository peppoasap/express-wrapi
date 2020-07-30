# Wrapi
Wrap external API to internal API with Express and Axios.

WORK IN PROGRESS: just basic method available

## Usage
```javascript

var express = require("express");

//Import wrapi
var wrapi = require("wrapi");

//Json with routes
var randomRoutes = require("./random.routes.json");

const app = express();

//Create a WRAPI
const wrapi_random = new wrapi.default();

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
      "method": "get",
      "srcRoute": "/api/users",
      "destRoute": "/users"
    },
    {
      "id": 2,
      "method": "get",
      "srcRoute": "/api/users/:id",
      "destRoute": "/user/:id",
      "params": {}
    },
    {
      "id": 3,
      "method": "post",
      "srcRoute": "/api/users",
      "destRoute": "/users"
    },
    {
      "id": 4,
      "method": "put",
      "srcRoute": "/api/users/:id",
      "destRoute": "/users/:id"
    },
    {
      "id": 5,
      "method": "delete",
      "srcRoute": "/api/users/:id",
      "destRoute": "/users/:id"
    }
  ]
}
```

### Result Example
- BASE_URL/api/users will be reachable going to localhost:PORT/random/users (random is the namespace, can be removed)
- BASE_URL/api/users/ID will be reachable going to localhost:PORT/random/user/ID


