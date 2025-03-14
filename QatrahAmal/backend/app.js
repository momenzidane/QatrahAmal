const express = require('express');
const createError = require('http-errors');
const middleware = require('./middleware');
const routes = require('./router');
const { returnJson } = require('./my_module/returnJson');

// Assign the global returnJson function
global.returnJson = returnJson;

// Assign the global createError fuction
global.createError = createError;

const cors = require("cors");


const port = process.env.PORT || 5000;
const app = express();
app.use(cors()); // السماح بجميع الطلبات

/**
 * Global unhandled rejection handler
 */
process.on('unhandledRejection', (reason) => {
    console.log("Global Handling Error: " + reason);
    process.exit(1);
});

/**
 * Adding global middleware
 */
middleware.global(app);

/**
 * Setting up routes
 */
routes(app);
console.log('Routes have been left');

/**
 * Handling 404 errors (Page Not Found)
 */
app.use((req, res, next) => {
    const error = createError(404, "Page not found");
    next(error);
});

app.use(express.json());


/**
 * General error handling
 */
app.use((error, req, res, next) => {
    // Ensure headers have not been sent already
    if (!res.headersSent) {
        return returnJson(res, error.status || 500, false, error.message || "Internal Server Error", null);
    }
});

/**
 * Start the server
 */
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
