const express = require('express')
const meadServer = express()

meadServer.get('/', (req, res) => res.send('Hello World!'))

meadServer.listen(3000, () => console.log('Example app listening on port 3000'))