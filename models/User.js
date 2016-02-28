'use Strict';

var clc = require('cli-color');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var Sql = require('sequelize');
var sql = new Sql(process.env.DB_LOCAL_NAME, process.env.DB_LOCAL_USER, process.env.DB_LOCAL_PASS, {
  host: process.env.DB_LOCAL_HOST,
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
/*var sql = new Sql(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    encrypt: true
  }
});*/

// var EncryptedField = require('sequelize-encrypted');

// secret key should be 32 bytes hex encoded (64 characters)
// var key = process.env.SECRET_KEY;

// var enc_fields = EncryptedField(Sql, key);

var User = module.exports = sql.define('User', {
  userName: Sql.STRING,
  // password: enc_fields.vault('password'),
  password: Sql.STRING,
  email: Sql.STRING,
},
{
  // paranoid: true,
  instanceMethods: {
    verifyPassword: function(password, userPassword) {
      return bcrypt.compareSync(password, userPassword);
    },
    generateToken: function(secret, callback) {
      return eat.encode({id: this.id}, secret, callback);
    },
    generateHash: function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }
    
  }

});

User.sync({force: false})
.then(function() {
  console.log(clc.blue('::::::::     '), sql.databaseVersion());
})
/*.then(function () {
  return User.create({
  userName: 'TestUser',
  password: 'password',
  email: 'email@example.com'  
  });
})*/
.then(function() {
  console.log(clc.green('User created'));
  return User.findOne({
  where: {
    email: 'test@example.com'
  }
  })
  .then(function(user) {
    // var pwComp = bcrypt.hashSync('password', bcrypt.genSaltSync(8), null);
    var pw =    user.$modelOptions.instanceMethods.verifyPassword('password', user.dataValues.password);
    // var testF = user.$modelOptions.instanceMethods.testFunc;
    // var gh = user;
    console.log(clc.yellow('   ::::::    '), pw);
  })
});
