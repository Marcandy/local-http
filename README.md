# local-http

make simple REST requests with 0 config
```
request.get( "/api/users );
request.get( "https://www.url.com/api/users" );
/*
[
    {
          name: "John Doe
        , age: 44
        , email: "jdoe@example.com"
        , _id: 1
    }
    , {
          name: "Jane Doe"
        , age: 42
        , email: "janed@example.com'
        , _id: 2
    }
]
*/
```

```
request.get( "/api/users/2" );
{
      name: "Jane Doe
    , age: 42
    , email: "janed@example.com"
    , _id: 2
}
```

```
request.get( "/api/users?name=john" );
{
      name: "John Doe
    , age: 44
    , email: "jdoe@example.com"
    , _id: 1
}
```

```
request.get( "/api/users?name=john&age=29" ); // 404 not found
```


`request.post( "/api/users/", { name: "John Doe", email: "johnd@example.com" } );`
`request.put( "/api/users/1", { email: "johnnyd@example.com" } );`

set custom delays
`request.delay( 10 ); // response will resolve after 10ms`
`request.delay( 10, 50 ); // response will resolve between 10ms and 50ms`

simulate errors
```
request.config( {
    routes: {
        "/api/users": {
              statusCode: 500
            , error: "Internal Server Error"
        }
    }
} );
```
