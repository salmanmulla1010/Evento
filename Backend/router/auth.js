const mysql = require('mysql')
const express = require('express')
const cors = require('cors')
const router = express.Router()
router.use(express.json())
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')

const salt = 10
router.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET', 'PATCH', 'DELETE'],
    credentials: true,
  })
)
router.use(cookieParser())

const validation = (req, resp, next) => {
  const token = req.cookies.token
  if (!token) {
    return resp.json({
      Error: 'Not Authorized',
    })
  } else {
    jwt.verify(token, 'SECRET-KEY', (err, decoded) => {
      if (err) {
        return resp.json({ Error: 'No Token' })
      } else {
        req.name = decoded.name
        next()
      }
    })
  }
}

router.get('/', validation, (req, resp) => {
  return resp.json({ Status: 'Success', name: req.body })
})

const mydb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Evento',
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Add Visitors
const insertValue =
  'INSERT INTO `visitors` (`firstname`,`lastname`,`email`,`password`) VALUES(?)'

function db_post(insertValue) {
  return new Promise((resolve, reject) => {
    router.post('/register', (req) => {
      bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: 'error in password hashing' })

        const values = [
          req.body.firstname,
          req.body.lastname,
          req.body.email,
          hash,
        ]
        mydb.query(insertValue, [values], function (err, result) {
          if (err) {
            return reject(err)
          }
          console.log('Added Visitor----->', result)
          return resolve(values)
        })
      })
    })
  })
}

db_post(insertValue)
  .then((res) => console.log(res))
  .catch((err) => console.log(err))

////////////////////////////////////////////////////////////////////////////////////////////////////////
//get perticular visitors
router.get('/register/:email', (req, resp) => {
  const email = req.params.email
  const updateByEmail = 'SELECT * FROM visitors WHERE email = ?'
  mydb.query(updateByEmail, [email], (err, result) => {
    if (err) {
      console.log('Error Update Data By Email', err)
      resp
        .status(500)
        .json({ error: 'Internal Server Error From Get Visitors' })
    } else {
      resp.json(result[0])
    }
  })
})

//////////////////////////////////////////////////////////////////////////////////////////////////
//get perticular profile
router.get('/profile/:email', (req, resp) => {
  const email = req.params.email
  const updateByEmail = 'SELECT firstname FROM visitors WHERE email = ?'
  mydb.query(updateByEmail, [email], (err, result) => {
    if (err) {
      console.log('Error Update Data By Email', err)
      resp.status(500).json({ error: 'Internal Server Error From Get Profile' })
    } else {
      resp.json(result[0])
    }
  })
})
//////////////////////////////////////////////////////////////////////////////////////////////////
//update profile
const updateVisitors =
  'UPDATE `visitors` SET `firstname`=?, `lastname`=?, `email`=?, `password`=? WHERE email=?'

function visitorUpdate(updateVisitors) {
  return new Promise((resolve, reject) => {
    router.patch('/profile/:email', (req, res) => {
      const email = req.params.email

      // Check if the password is being updated
      if (req.body.password) {
        // Hash the new password
        bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
          if (err) {
            console.log('Error in password hashing:', err)
            return res.status(500).json({ Error: 'Error in password hashing' })
          }

          const values = [
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            hash, // Store the hashed password
          ]

          mydb.query(updateVisitors, [...values, email], (err) => {
            if (err) {
              console.log('Update error:', err)
              return reject(err)
            }
            console.log('Visitor Updated--->', req.body)
            return resolve(req.body)
          })
        })
      } else {
        // Password is not being updated, fetch the existing hashed password from the database
        mydb.query(
          'SELECT `password` FROM `visitors` WHERE `email` = ?',
          [email],
          (err, result) => {
            if (err) {
              console.log('Error fetching existing password:', err)
              return res
                .status(500)
                .json({ Error: 'Internal Server Error From Patch Profile' })
            }

            if (result.length === 0) {
              return res.status(404).json({ Error: 'User not found' })
            }

            const existingHashedPassword = result[0].password

            const values = [
              req.body.firstname,
              req.body.lastname,
              req.body.email,
              existingHashedPassword, // Use the existing hashed password
            ]

            mydb.query(updateVisitors, [...values, email], (err) => {
              if (err) {
                console.log('Update error:', err)
                return reject(err)
              }
              console.log('Visitor Updated=====>', req.body)
              return resolve(req.body)
            })
          }
        )
      }
    })
  })
}
visitorUpdate(updateVisitors)
  .then((resolve) => console.log('Update Resolve ----->', resolve))
  .catch((err) => console.log('Update Error ----->', err))

//////////////////////////////////////////////////////////////////////////////////////////////////
//Login Api
const validateValue = 'SELECT * FROM `visitors` WHERE `email`=?'
router.post('/login', (req, res) => {
  const value = req.body.email
  mydb.query(validateValue, [value], (err, data) => {
    if (err) {
      return res.json({ Error: 'Login Error' })
    }
    if (data.length > 0) {
      console.log('Password---->', req.body.password.toString())
      console.log('Bcrypt---->', data[0].password)
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, result) => {
          console.log('First Name---->', data[0].firstname)
          const name = data[0].firstname
          if (result) {
            const token = jwt.sign({ name }, 'SECRET-KEY', {
              expiresIn: '1d',
            })
            res.cookie('token', token)
            console.log('All Data---->', data)
            //Data Send to Frontend
            return res.json({ Status: 'Success', allData: data })
          } else {
            return res.json({ Error: 'Password Not Match' })
          }
        }
      )
    } else {
      return res.json({ Error: 'No Email Present' })
    }
  })
})

//////////////////////////////////////////////////////////////////////////////////////////////////
//Add Events
const insertEvent =
  'INSERT INTO `emenu`(`ename`, `edescription`, `edatetime`, `evenue`) VALUES (?)'
function eventPost(insertEvent) {
  return new Promise((resolve, reject) => {
    router.post('/addevent', (req) => {
      const values = [
        req.body.ename,
        req.body.edescription,
        req.body.edatetime,
        req.body.evenue,
      ]
      mydb.query(insertEvent, [values], (err) => {
        if (err) {
          console.log('Post error1', err)
          return reject(err)
        }
        return resolve(req.body)
      })
    })
  })
}
eventPost(insertEvent)
  .then((resolve) => console.log('Post Resolve----->', resolve))
  .catch((err) => console.log('Post error2', err))

//////////////////////////////////////////////////////////////////////////////////////////////////
//Get All Events
router.get('/addevent', (req, res) => {
  const sql = 'SELECT * FROM emenu'
  mydb.query(sql, (err, data) => {
    if (err) return res.json('Get Event Error---->', err)
    return res.json(data)
  })
})

//////////////////////////////////////////////////////////////////////////////////////////////////
//get perticular event by id
router.get('/addevent/:id', (req, resp) => {
  const id = req.params.id
  const updateById = 'SELECT * FROM emenu WHERE id = ?'
  mydb.query(updateById, [id], (err, result) => {
    if (err) {
      console.log('Error Update Data By Id', err)
      resp.status(500).json({ error: 'Internal Server Error From Get Event' })
    } else {
      resp.json(result[0])
    }
  })
})

//////////////////////////////////////////////////////////////////////////////////////////////////
//update event
const updateEvent =
  'UPDATE `emenu` SET `ename`=?, `edescription`=?, `edatetime`=?,`evenue`=? WHERE id=?'
function eventUpdate(updateEvent) {
  return new Promise((resolve, reject) => {
    router.patch('/updateevent/:id', (req) => {
      const values = [
        req.body.ename,
        req.body.edescription,
        req.body.edatetime,
        req.body.evenue,
      ]
      const id = req.params.id
      mydb.query(updateEvent, [...values, id], (err) => {
        if (err) {
          console.log('update error1', err)
          return reject(err)
        }
        return resolve(req.body)
      })
    })
  })
}
eventUpdate(updateEvent)
  .then((resolve) => console.log('Update Resolve----->', resolve))
  .catch((err) => console.log('update error2', err))

//////////////////////////////////////////////////////////////////////////////////////////////////
//Delete Event by id
const deleteEvent = 'DELETE FROM emenu WHERE id= ?'
function eventDelete(deleteEvent) {
  return new Promise((resolve, reject) => {
    router.delete('/addevent/:id', (req) => {
      const id = req.params.id
      mydb.query(deleteEvent, [id], (err) => {
        if (err) {
          console.log('update error1', err)
          return reject(err)
        }
        return resolve(id)
      })
    })
  })
}
eventDelete(deleteEvent)
  .then((resolve) => console.log('Delete Resolve----->', resolve))
  .catch((err) => console.log('Delete error2', err))

module.exports = router
