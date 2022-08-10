const express = require('express')
const config = require('./src/config/index')
const errorMiddleware = require('./src/middlewares/error-handler')
const app = express()
const PORT = config.PORT || 5000

app.use(express.json());

require('./src/routes')(app)
app.use(errorMiddleware)

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started work on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()