const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default: {
        SECRET: "q1w2e3r4t5y6u7i8o9p0",
        DATABASE: 'mongodb://localhost:27017/softech'
    }
}

exports.get = function get(env){
    return config[env] || config.default;
}