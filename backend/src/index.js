//Import das bibliotecas. Elas precisam ter sido adicionadas via Yarn/NPM
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//Inicializando o Express
const app = express()

//Inicializando o Socket.io
const server = require('http').Server(app)
const io = require('socket.io')(server)

//Realizando a conexão com a base de dados MongoDB
mongoose.connect(
    'mongodb://gooweek:ph123456@ds155073.mlab.com:55073/goweek-ph', 
    {
        useNewUrlParser: true
    }
)

//Configurando o Socket.io
app.use((req, res, next) => {
    req.io = io

    return next()
})

//Configurando o Cors para permitir que aplicações acessem o backend externamente
app.use(cors())

//Configurando as rotas
app.use(express.json()) //Isto informa ao express que todas as requisições serão JSON
app.use(require('./routes.js'))

//Configurando a porta onde a aplicação será acionada
server.listen(3000, () => {
    console.log(':) Server started on port 3000')
})