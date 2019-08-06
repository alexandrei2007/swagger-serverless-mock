const serverless = require('serverless-http');
const express = require('express');
const req = require('require-yml')

const createMiddleware = require('swagger-express-middleware');
const customMockMiddleware = require('./middleware/custom-mock');
const keepSchemaExampleMiddleware = require('./middleware/keep-schema-example');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = req('./swagger.yaml');

let app = express();
const port = process.env.PORT || 3000
const startWebServer = process.env.START_WEBSERVER || true

// mock middleware
createMiddleware('swagger.yaml', app, function(err, middleware) {

    app.use(
        middleware.metadata(),
        middleware.CORS(),
        middleware.files(),
        middleware.parseRequest(),
        middleware.validateRequest(),
        customMockMiddleware,
        keepSchemaExampleMiddleware,
        middleware.mock()
    );

    if (startWebServer) {
        app.listen(port, function() {
            console.log('The mock is now running at http://localhost:' + port);
        });
    }
});

// docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// serverless export
module.exports.handler = serverless(app);