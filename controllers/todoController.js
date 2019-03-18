module.exports = (app) => {
  app.get('/todo', (req, res) => {
    res.sender('todo');
  });
  app.post('/todo', (req, res) => {

  });
  app.delete('/todo', (req, res) => {

  });
};
