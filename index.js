'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const conn = require('./settings/config');

mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(conn.db_name, (err, res) => {
   if (err) {
      console.log('Ocurrió un error: -> ' + err)
      return;
   } else {
      try {
         app.listen(conn._port, () => {
            console.log('Conectao al puerto: ' + conn._port);
         });
      } catch (error) {
         console.log('*****' + error.message + '*****')
      }
   }
});