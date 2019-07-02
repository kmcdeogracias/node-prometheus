const express = require('express')
const prometheus = require('./utils/prometheus')

const app = express()
const port = 3000

app.get('/', (req, res) => res.send({status: 'OK', message: 'Hello World'}))
app.get('/users', (req, res) => res.send({status: 'OK', message: 'This is a user'}))
app.listen(port, () => console.log(`App listening to port ${port}`))

app.use(prometheus.requestCounters)
app.use(prometheus.responseCounters)

prometheus.injectMetricsRoute(app)
prometheus.startCollection()
