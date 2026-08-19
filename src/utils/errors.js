export const globalError = (err, _req, res, _next) => {
    const message = err.message || "Something went wrong";
    const status = err.status || 500;
    res.status(status).send({
        message,
    });
};
export const notFoundError = (_req, res) => {
    res.status(404).send({
        message: "Route not found",
    });
};
