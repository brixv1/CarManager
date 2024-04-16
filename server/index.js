const express = require('express')
const app = express()

const cors = require('cors')

const mysql = require('mysql2')

app.use(cors())
app.use(express.json())

//Your express Server Port (needs to be the same as on client, change it in the .env)
const ServerPort = 3001
//Your Db settings
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'vuetestdb',
  password: '1234',
})

//route to get all employees
app.get('/employees', function (req, res) {
  db.query(`SELECT * FROM employees`, function (err, result) {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

//route to get all cars. using query params for filtering
app.get('/cars', function (req, res) {
  let filterQuery = '';
  const values = [];

  // Check for brand filter
  if (req.query.brand && req.query.brand !== 'All') {
    values.push(req.query.brand);
    filterQuery += ` WHERE Brand = ?`;
  }

  // Check for employee filter
  if (req.query.employee && req.query.employee !== 'All') {
    if (filterQuery.length > 0) {
      filterQuery += ` AND`;
    } else {
      filterQuery += ` WHERE`;
    }
    values.push(req.query.employee);
    filterQuery += ` Employee = ?`;
  }

  // Check for TÜV filter
  if (req.query.tüv && req.query.tüv !== 'All') {
    const dateNow = new Date().toISOString().slice(0, 10);  // Get todays date in YYYY-MM-DD format
    if (filterQuery.length > 0) {
      filterQuery += ` AND`;
    } else {
      filterQuery += ` WHERE`;
    }
    if (req.query.tüv === 'Yes') {
      filterQuery += ` Tüv > ?`;
    } else if (req.query.tüv === 'No') {
      filterQuery += ` Tüv < ?`;
    }
    values.push(dateNow);
  }

  // Check for search query in the brand or name
  if (req.query.query) {
    const searchQuery = `%${req.query.query}%`;
    if (filterQuery.length > 0) {
      filterQuery += ` AND`;
    } else {
      filterQuery += ` WHERE`;
    }
    filterQuery += ` (Brand LIKE ? OR Name LIKE ?)`;
    values.push(searchQuery, searchQuery); // Add the search query twice for both columns
  }

  db.query(`SELECT * FROM cars${filterQuery}`, values, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send('Error retrieving cars from database');
    } else {
      res.send(result);
    }
  });
});


//gets all brands from the cars WITHOUT DUPICATES
app.get('/carbrands', function (req, res) {
  db.query('SELECT DISTINCT Brand FROM cars', function (err, result) {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

//gets a single car using req params as the id
app.get('/cars/:id', function (req, res) {
  const id = req.params.id
  db.query('SELECT * FROM `cars` WHERE Id = ?', id, function (err, result) {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

//adds a car
app.post('/addcar', (req, res) => {
  const brand = req.body.brand
  const name = req.body.name
  const fuel = req.body.fuel
  const employee = req.body.employee
  const tüv = req.body.tüv
  const notes = req.body.notes

  db.query(
    'INSERT INTO cars (Brand, Name, Fuel, Employee, Tüv, Notes) VALUES (?, ?, ?, ?, ?, ?)',
    [brand, name, fuel, employee, tüv, notes],
    (err, result) => {
      if (err) {
        console.log(err)
        res.send('Error adding car')
      } else {
        res.send('Car successfully added')
      }
    }
  )
})

//deletes a car
app.delete('/deletecar/:id', (req, res) => {
  const id = req.params.id
  db.query('DELETE FROM `cars` WHERE Id = ?', [id], function (err, result) {
    if (err) {
      console.log(err)
      res.status(500).send('Error deleting the car')
    } else {
      res.send('Car deleted successfully')
    }
  })
})

app.listen(ServerPort)
