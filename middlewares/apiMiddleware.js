const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    console.log(apiKey);
    if (apiKey === 'abcd-efgh-ijlk-1234') {
        next();
    } else {
        // Render the error page
        return res.status(403).json('Unauthorized access');
    }
};
module.exports = apiKeyMiddleware