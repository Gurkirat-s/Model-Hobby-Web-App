const express = require('express');
const session = require('express-session');
const dao = require('./dao.js');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.argv[2] || 4000;

app.enable('trust proxy');
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    proxy: true,
  })
);

app.use(express.json());

// app.use(express.static(path.join(__dirname, "public")));

// Enable CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', '*');
//   next();
// });

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
  })
);

app.get('/api/products/:id', (req, res) => {
  console.log(`From ${req.ip}, Request ${req.url}`);
  console.log(req.params);
  dao.getProducts(req.params, function (rows) {
    let response;
    if (rows.length === 1) {
      response = rows;
    } else {
      response = new Error('No Products found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(response[0]));
    res.end();
  });
});

app.get('/api/products/category/:id', (req, res) => {
  console.log(`From ${req.ip}, Request ${req.url}`);
  console.log(req.params);
  const catQuery = {
    catId: req.params.id,
  };
  console.log(catQuery);
  dao.getProducts(catQuery, function (rows) {
    let response;
    if (rows.length > 1) {
      response = rows;
    } else {
      response = new Error('No Products found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(response));
    res.end();
  });
});

app.get('/api/products/vendor/:id', (req, res) => {
  console.log(`From ${req.ip}, Request ${req.url}`);
  console.log(req.params);
  const venQuery = {
    venId: req.params.id,
  };
  console.log(venQuery);
  dao.getProducts(venQuery, (rows) => {
    let response;
    if (rows.length >= 1) {
      response = rows;
    } else {
      response = new Error('No Products found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(response));
    res.end();
  });
});

app.get('/api/cart', (req, res) => {
  console.log(`From ${req.ip}, Request ${req.url}`);
  if (!req.session.cart) {
    req.session.cart = [];
  }
  console.log(req.session.cart);
  console.log(req.sessionID);
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(req.session.cart));
  res.end();
});

// req is an object with id and qty.
app.post('/api/cart/update', (req, res) => {
  console.log(`From ${req.ip}, Request ${req.url}`);
  console.log('body');
  console.log(req.body);
  console.log(req.sessionID);
  if (!req.session.cart) {
    req.session.cart = [];
  }
  const idParam = {
    id: req.body.id,
  };
  dao.getProducts(idParam, function (items) {
    const prod = items[0];
    // If the product is a real product
    if (prod.id == req.body.id) {
      let existsInCart = false;
      //Checks if already inside cart
      for (i = 0; i < req.session.cart.length; i++) {
        if (req.session.cart[i].id == req.body.id) {
          existsInCart = true;
          // req.session.cart[i].qty = Number(req.session.cart[i].qty) + Number(req.body.qty);
          req.session.cart[i].qty = Number(req.body.qty);

          if (req.session.cart[i].qty <= 0) {
            req.session.cart.splice(i, 1);
          }
          break;
        }
      }

      if (existsInCart || req.body.qty <= 0) {
      } else {
        req.body.qty = Number(req.body.qty);
        req.session.cart.push(req.body);
      }
    }

    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(req.session.cart));
    res.end();
  });
});

app.get('/api/vendors', (req, res) => {
  console.log(`From ${req.ip}, Request ${req.url}`);

  dao.getVendors(req.query, (rows) => {
    let response;

    if (rows.length >= 1) {
      response = rows;
    } else {
      response = new Error('No vendors found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(response));
    res.end();
  });
});

app.get('/api/catalog', (req, res) => {
  console.log(`From ${req.ip}, Request ${req.url}`);

  // calls getCatalog function in dao
  dao.getCatalog(req.query, function (rows) {
    let response;

    // Expected response is one or more rows or categories.
    if (rows.length >= 1) {
      response = rows;
    } else {
      response = new Error('No Products found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(response));
    res.end();
  });
});

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`server listening to ${host}:${port}`);
});
