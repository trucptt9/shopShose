const config = {
    app:{
        port: process.env.PORT || 2022,
    },

    db:{
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/webshop"
    }
};

module.exports = config;