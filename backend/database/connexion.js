const MongoClient = require('mongodb').MongoClient;

var _dbConnection;
var _connection;

var database = {}
database.get = () => {
    return _dbConnection;
}

//DB_URL = "mongodb+srv://admin:admin123456789@cluster0.eqwhlbk.mongodb.net/test?retryWrites=true&w=majority"
database.connect = () => {
    return new Promise(async (resolve, reject) => {
        try {
            _connection = await MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true })
            _dbConnection = _connection.db("db-garage")
            if (!_dbConnection) {
                throw new Error('Unable to connect to database')
            } else {
                resolve(_dbConnection)
            } 
        } catch (e) {
            reject(e)
        }
    })
}

database.close = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await _connection.close()
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = database