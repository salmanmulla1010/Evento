const express = require('express')
const app = express()
app.use(require('./router/auth'))
app.use(express.json())
app.listen(5000, () => {
  console.log('server is ruuning at post no 5000')
})
