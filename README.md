# Swagger serverless mock

Enables a swagger mock and documentation using serverless (aws lambda).

## Local

```bash
cd src
npm start
```

This will start the server at `http://localhost:3000/docs`

Testing the mock api:

```bash
curl -X GET "http://localhost:3000/v1/pet/findByStatus?status=pending" -H "accept: application/json"
```

You can override the response by placing a json file in the `responses` folder and passing its name in the header `x-custom-response`

```bash
curl -X GET "http://localhost:3000/v1/pet/findByStatus?status=pending" -H "accept: application/json" -H "x-custom-response: success"
```

## Serverless deploy

The file `secrets.dev.yml` contains the region and aws profile required for deployment.

```bash
npm install
serverless deploy
```
