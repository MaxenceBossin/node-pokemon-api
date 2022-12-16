const express = require('express')

const morgan = require('morgan')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const sequelize = require('./source/database/sequelize')

const app = express()
const port = 3000



/* Middleware */

app
    .use(favicon(__dirname + '/assets/image/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())
sequelize.initDb()
/* up serve */
app.listen(port, () => console.log(`l'application est démarré sur le port ${port}`))
