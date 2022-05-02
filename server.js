const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 4000;

const sales = require('./sales');

const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;
  if(!username) {
    res.status(400).json({ error: 'Please enter your user name' });
    return;
  }
  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }
  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);
  if(!existingUserData) {
    users.addUserData(username, sales.makeSalesList());
  }
  res.cookie('sid', sid);
  res.json(users.getUserData(username).getSales());
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(sid) {
    res.clearCookie('sid');
  }
  if(username) {
    // Delete the session, but not the user data
    sessions.deleteSession(sid);
  }
  // We don't report any error if sid or session didn't exist
  // Because that means we already have what we want
  res.json({ username });
});

// data
app.get('/api/sales', (req, res) => {
  // Session checks for these are very repetitive - a good place to abstract out
  // I've left the repetitive sections here for ease of learning
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).getSales());
});

app.post('/api/sales', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  //console.log("req body", req.body.customer);
  const  customer  = req.body.customer;
  const  price  = req.body.price;
  const  product  = req.body.product;


  if(!customer || !price ||!product) {
    res.status(400).json({ error: 'required-input' });
    return;
  }
  if(isNaN(price)) {
    res.status(409).json({ error: 'price-require-number' });
    return;
  }

  const salesList = users.getUserData(username);

  const id = salesList.addSale(customer, product,price);
  
  res.json(salesList.getSale(id));
});

app.get('/api/sales/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const todoList = users.getUserData(username);
  const { id } = req.params;
  if(!todoList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No record with id ${id}` });
    return;
  }
  res.json(todoList.getSale(id));
});

app.put('/api/sales/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const todoList = users.getUserData(username);
  const { id } = req.params;
  const { task, done=false } = req.body;
  // Full Replacement required for a PUT
  if(!task) {
    res.status(400).json({ error: 'required' });
    return;
  }
  if(!todoList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  todoList.updateSale(id, { task, done });
  res.json(todoList.getSale(id));
});

app.patch('/api/sales/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const { task, done } = req.body;
  const todoList = users.getUserData(username);
  if(!todoList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No record with id ${id}` });
    return;
  }
  todoList.updateSale(id, { task, done });
  res.json(todoList.getSale(id));
});

app.delete('/api/sales/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const todoList = users.getUserData(username);
  const exists = todoList.contains(id);
  if(exists) {
    todoList.deleteSale(id);
  }
  res.json({ message: exists ? ` ${id} deleted` : ` ${id} did not exist` });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

