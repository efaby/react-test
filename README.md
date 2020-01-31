# React Test

React Test is a react js application to show the sales graphic

## Installation


```bash
npm install
```

## Usage

```bash
npm start
```
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Contributing
Please create the client API first to use in authenticating endpoint and to get the access token to endpoints of models.

In a postman application call this endpoint with POST request, with email and password of the client API previously registered. 

```bash
http://localhost:5001/api/authenticate
```

The access token obtained, register in the token field in the Global.js file in the react application and restart.

## License
[MIT](https://choosealicense.com/licenses/mit/)