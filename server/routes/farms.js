const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Farm = require('../models/Farm');

const router = express.Router();

/* GET farms listing. */
router.post('/register', async (req, res, next) => {
  var username = req.body.username,
      password = req.body.password,
      email = req.body.email;

      const farmFromDb = await Farm.findOne({ email });
      
      if(farmFromDb) {
        return res.send('This email already exists!');
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      await Farm.create({ username, password: hashPassword, email });

      const token = jwt.sign({ username, email }, process.env.SECRET_JWT, { expiresIn: '1h' });

      res.send(token);
});

router.post('/login', async (req, res, next) => {
  var email = req.body.email,
      password = req.body.password;

      const farmFromDb = await Farm.findOne({ email });

      if(bcrypt.compare(password, farmFromDb.password)) {
        const token = jwt.sign({ username: farmFromDb.username, email }, process.env.SECRET_JWT, { expiresIn: '1h' });
        return res.send(token);
      }

      res.send('The username or password is wrong.');
});

router.get('/verify', (req, res, next) => {
  const token = req.header('authorization')
  jwt.verify(token, process.env.SECRET_JWT, function(err, decoded) {
    
    if(err) {
      res.status(404).send('Invalid token');
    } else {
      res.send(decoded);
    }
  });
});

module.exports = router;
