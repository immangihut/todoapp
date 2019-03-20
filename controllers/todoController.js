const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb+srv://usertest:pwdtest@firstcluster-l5iyw.mongodb.net/test?retryWrites=true');

// create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);
/*
var itemOne = Todo({item: 'buy flowers'}).save((err) => {
  if(err) throw err;
  console.log('item saved');
});

var data = [
  {item: 'get milk'},
  {item: 'walk dog'},
  {item: 'coding'}
];
*/

const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => {
  app.get('/todo', (req, res) => {
    Todo.find({}, (err, data) => {
      if(err) throw err;
      res.render('todo', {todos: data});
    });
  });
  app.post('/todo', urlencodedParser, (req, res) => {
    let newTodo = Todo(req.body).save((err, data) => {
      if(err) throw err;
      res.json(data);
    });
  });
  app.delete('/todo/:item', (req, res) => {
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
      if(err) throw err;
      res.json(data);
    });
  });
};
