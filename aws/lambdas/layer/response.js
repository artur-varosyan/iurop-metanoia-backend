// HTTP Response Codes

// Successful Responses

function success(content) {
    return {
        statusCode: 200,
        body: JSON.stringify(content)
    };
}

function created(content) {
    return {
        statusCode: 201,
        body: JSON.stringify(content)
    };
}


// Client Error Responses

function badRequest(message) {
    return {
        statusCode: 400,
        body: JSON.stringify({
            error: message
        })
    };
}

function notFound(message) {
    return {
        statusCode: 404,
        body: JSON.stringify({
            error: message
        })
    };
}

// Server Error Responses

function serverError() {
    return {
        statusCode: 500,
        body: JSON.stringify({
            error: "A server error has occurred."
        })
    };
}

module.exports = {success, created, badRequest, notFound, serverError}