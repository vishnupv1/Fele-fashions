const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== 'abcd-efgh-ijlk-1234') {
         res.end( 'Unauthorized' );
    }
    next();
};

module.exports = apiKeyMiddleware