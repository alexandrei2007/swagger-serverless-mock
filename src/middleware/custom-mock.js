"use strict";

var fs = require('fs');
var path = require('path');

var middleware = function(req, res, next) 
{
    if (req && req.headers)
    {
        var response = req.headers['x-custom-response'];

        if (response)
        {
            var status = 200;
            if (response === 'error404') 
            {
                status = 404;
            } 
            else if (response === 'error500') 
            {
                status = 500;
            }
        
            var file = path.resolve(__dirname.split(path.sep).pop(), '..', 'responses', response + '.json');

            try 
            {
                if (fs.existsSync(file))
                {
                    var data = fs.readFileSync(file, 'utf8');
                    var json = JSON.parse(data);
                    res.status(status).send(json);
                    return;
                }
            } 
            catch (err) 
            {
                console.error(err);
            }
        }
    }

    next();
};

module.exports = middleware;