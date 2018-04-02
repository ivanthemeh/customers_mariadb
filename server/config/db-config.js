module.exports = {
    //MongoDB configuration
    development: {
        db: 'mongodb://127.0.0.1:51714/clientdatafile',
        app: {
            name: 'customers db'
        }
    },
    production: {
        db: '',
        app: {
            name: 'customers db'
        }
    }
};
