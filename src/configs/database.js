const db = {
    connection: {
        redis: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD,
            cache_prefix: process.env.REDIS_CACHE_PREFIX,
        }
    }
};

module.exports = db;
