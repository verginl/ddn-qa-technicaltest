const express = require('express');

const app = express();

const PORT = 3000;

const VALID_USER = {
  email: 'vergi@example.com',
  password: 'passwordVergi1!'
};

const loginAttempts = {};

const MAX_FAILED_ATTEMPTS = 3;
const LOCKOUT_ATTEMPTS = 5;

function handleFailedLogin(email) {
  if (!loginAttempts[email]) {
    loginAttempts[email] = 0;
  }

  loginAttempts[email]++;

  if (loginAttempts[email] > LOCKOUT_ATTEMPTS) {
    return {
      status: 429,
      message: 'Too many failed login attempts. Account Locked, Please try again later.'
    };
  }

  if (loginAttempts[email] > MAX_FAILED_ATTEMPTS) {
    return {
      status: 429,
      message: 'Too many failed login attempts. Please try again later.'
    };
  }

  return {
    status: 401,
    message: 'Invalid Email or Password'
  };
}


// TC-017 - Invalid Content-Type
app.use((req, res, next) => {
  if (
    req.method === 'POST' &&
    req.path === '/api/v1/auth/login'
  ) {
    const contentType = req.headers['content-type'];

    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        message: 'Invalid Content-Type'
      });
    }
  }

  next();
});


app.use(express.json());


app.post('/api/v1/auth/login', (req, res) => {

  console.log('Login request received');
  console.log('Request body:', req.body);

  // TC-020 - Timeout Simulation
  if (req.headers['x-test-timeout'] === 'true') {
    return res.status(408).json({
      message: 'Timeout'
    });
  }

  const { email, password } = req.body;


  // TC-010 - Empty Request Body
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: 'Invalid mandatory field Email and Password'
    });
  }


  // TC-008 - Missing Email
  if (email === undefined) {
    return res.status(400).json({
      message: 'Invalid mandatory field Email'
    });
  }


  // TC-009 - Missing Password
  if (password === undefined) {
    return res.status(400).json({
      message: 'Invalid mandatory field Password'
    });
  }


  // TC-005 - Empty Email
  if (email === '') {
    return res.status(400).json({
      message: 'Invalid mandatory field Email or Password'
    });
  }


  // TC-006 - Empty Password
  if (password === '') {
    return res.status(400).json({
      message: 'Invalid mandatory field Email or Password'
    });
  }


  // TC-013 - Email Data Type Invalid
  if (typeof email !== 'string') {
    return res.status(400).json({
      message: 'Invalid field format email'
    });
  }


  // TC-014 - Password Data Type Invalid
  if (typeof password !== 'string') {
    return res.status(400).json({
      message: 'Invalid field format password'
    });
  }


  // TC-011 - Email Maximum Length
  if (email.length > 30) {
    return res.status(400).json({
      message: 'Invalid field format email'
    });
  }


  // TC-012 - Password Maximum Length
  if (password.length > 30) {
    return res.status(400).json({
      message: 'Invalid field format password'
    });
  }


  // TC-021 - SQL Injection Payload on Email
  if (
    email.includes("' OR '1'='1") ||
    email.includes("' OR 1=1") ||
    email.includes("'--")
  ) {
    return res.status(401).json({
      message: 'Invalid Email or Password'
    });
  }


  // TC-022 - SQL Injection Payload on Password
  if (
    password.includes("' OR '1'='1") ||
    password.includes("' OR 1=1") ||
    password.includes("'--")
  ) {
    return res.status(401).json({
      message: 'Invalid Email or Password'
    });
  }


  // TC-004 - Invalid Email Format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'Invalid email format'
    });
  }


  // TC-003 - Email Not Registered
  if (email !== VALID_USER.email) {

    const result = handleFailedLogin(email);

    return res.status(result.status).json({
      message: result.message
    });
  }


  // TC-002 - Invalid Password
  if (password !== VALID_USER.password) {

    const result = handleFailedLogin(email);

    return res.status(result.status).json({
      message: result.message
    });
  }


  // TC-001 - Successful Login
  loginAttempts[email] = 0;

  return res.status(200).json({
    message: 'Successfull',
    token: 'mock-jwt-token-123456'
  });
});


// TC-019 - HTTP Method selain POST
app.all('/api/v1/auth/login', (req, res) => {
  return res.status(405).json({
    message: 'Method Not Allowed'
  });
});


// TC-018 - Invalid JSON
app.use((err, req, res, next) => {

  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    'body' in err
  ) {
    return res.status(400).json({
      message: 'Invalid JSON'
    });
  }

  next(err);
});


app.listen(PORT, () => {
  console.log('Mock server running');
  console.log(`http://localhost:${PORT}`);
});