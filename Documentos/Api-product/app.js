const express = require('express');
const mongoose = require ('mongoose');

require('./models/Products')
const Products = mongoose.model('products')

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost/product", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("Conexão com o MongoDB realizada com sucesso!")
}).catch((erro) =>{
    console.log("Conexão com o Mongodb não foi realizada com sucesso")
});

app.get('/', (req, res) => {
    res.json({tittulo: "Como criar API"});
});

app.post('/products', (req, res) => {
    const product = Products.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: product not successfully registered"
        })

        return res.status(400).json({
            error: false,
            message: "Product successfully registered"
        })
    })
});

app.listen(8080, () => {
    console.log("Servidor em execução")
})