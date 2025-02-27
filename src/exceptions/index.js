class BadRequestException extends Error {
    constructor(message = "Bad Request!") {
        super(message);
        this.name = "BadRequestException";
        this.statusCode = 400;
    }
}

class UnauthorizedException extends Error {
    constructor(message = "Unauthorized!") {
        super(message);
        this.name = "UnauthorizedException";
        this.statusCode = 401;
    }
}

class ForbiddenException extends Error {
    constructor(message = "Forbidden!") {
        super(message);
        this.name = "ForbiddenException";
        this.statusCode = 403;
    }
}

class NotFoundException extends Error {
    constructor(message = "Not Found!") {
        super(message);
        this.name = "NotFoundException";
        this.statusCode = 404;
    }
}

class ConflictException extends Error {
    constructor(message = "Conflict!") {
        super(message);
        this.name = "ConflictException";
        this.statusCode = 409;
    }
}

class InternalServerException extends Error {
    constructor(message = "Internal Server Error!") {
        super(message);
        this.name = "InternalServerException";
        this.statusCode = 500;
    }
}

module.exports = {
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    ConflictException,
    InternalServerException
};