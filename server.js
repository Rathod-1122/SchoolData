const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
let connection;

app.use('/schoolImages', express.static('schoolImages'));
// Code for Deployment
app.use(express.static(path.join(__dirname, 'userinterface/dist')));

app.listen(4500, () => {
  console.log("Server is running on port 4500");
});

let store = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'schoolImages/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: store });


let connectToMySql = () => {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  });
}

connectToMySql();
// AddSchoolData api
app.post('/addschooldata', upload.single('image'), (req, res) => {
  const { name, address, city, state, contact, emailId } = req.body;
  const image = req.file ? req.file.filename : null;

  const query = 'INSERT INTO schools (name, address, city, state, contact, emailId, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [name, address, city, state, contact, emailId, image];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error inserting school data:', error);
      return res.status(500).json({ status: 'error', message: 'Error adding school' });
    }
    res.json({ status: 'success', message: 'School added successfully' });
  });
});

// Show Schools api
app.get('/showschools', (req, res) => {
  const query = 'SELECT * FROM schools';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching schools:', error);
      return res.status(500).json({ status: 'error', message: 'Error fetching schools' });
    }
    res.json({ status: 'success', schools: results });
  });
});
