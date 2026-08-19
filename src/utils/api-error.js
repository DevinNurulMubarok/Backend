export class ApiError extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
