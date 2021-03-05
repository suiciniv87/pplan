import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import CircularJSON from 'circular-json'

mongoose.connect('mongodb://192.168.0.40/local', {useNewUrlParser: true, useUnifiedTopology: true});
const peopleSchema = new mongoose.Schema({
    cliente: {
        'nome': String,
        'celular': Number,
        'documento': String
      },
      endereco: {
        'cep': Number,
        'estado': String,
        'cidade': String,
        'rua': String,
        'complemento': String,
      },
      produtos: {
        'produtos': [String]
      }
  }, { collection: 'people' });

const app = express()
const port = 3000
const people = mongoose.model('people', peopleSchema)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.post('/clientes', async (req, res) => {
    const dados = await people.create(req.body)
    
    return res.status(200).send(JSON.stringify(dados))
})
app.get('/clientes', async (req, res) => {
    await people.find({}, function(err, docs) {
        if(!err) {
            return res.status(200).send(docs)
        }
        else {
            res.send(err)
        }
    })
})

app.get('/clientes/:id', async (req, res) => {
    await people.findById(req.headers.id, function(err, cliente) {
        if (!err) {
            res.status(200).send(cliente)
        }
        else {
            res.send(err)
        }
    })
})

app.delete('/clientes/:id', async(req, res) => {
    console.log(req.headers.id)
    await people.deleteOne({ "_id": req.headers.id }, function(err, cliente) {
        if (!err) {
            res.status(200).send("Cliente excluído")
        }
        else {
            res.send(err)
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})