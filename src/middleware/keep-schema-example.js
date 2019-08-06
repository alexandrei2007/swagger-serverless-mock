"use strict";

var middleware = function(req, res, next) {

    // override the default implementation to keep the swagger examples
    if (req.method === "POST" || req.method === "PUT" || req.method === "DELETE")
    {
        res.body = {};
    }

    next();
};

module.exports = middleware;