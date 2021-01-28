const express = require('express');
const mongoose = require ('mongoose');

require('./models/Products')
require('./models/Category')
const Products = mongoose.model('products')
const Category = mongoose.model('category')

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost/product", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
  
}).then(() => {
    console.log("Conexão com o MongoDB realizada com sucesso!")
}).catch((erro) =>{
    console.log("Conexão com o Mongodb não foi realizada com sucesso")
});
//lista todos os produtos
app.get('/list', (req, res) => {
    Products.find({}).then((products) => {
        return res.json(products)
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum produto encontrado!"
        })
    })
});
//filtra pelo nome
app.get("/products/:title", (req, res) => {
    Products.findOne({ title: req.params.title}).then((product) => {
        return res.json(product);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum produto encontrado!"
        })
    })
})

//Cadastro de uma categoria
app.post('/category', (req, res) => {
    const category = Category.create(req.body, (err) => {
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


//Cadastra os produtos
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

//editando o produto e mudando sua categoria
app.put('/products/:id', (req, res) => {
    const product = Products.updateOne({ _id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error:true,
            message: "Error: Produto não editado"
        });
        return res.json({
            error: false,
            message: "Produto editado"
        })
    })
})

app.delete('/products/:id', (req, res) =>{
    const product = Products.deleteOne({_id: req.params.id}, (err) => {
        if(err) return res.status(400).json({
            error:true,
            message: "Error: Produto não excluido"
        });
        return res.json({
            error: false,
            message: "Produto excluido"
        })
    })
})

app.listen(8080, () => {
    console.log("Servidor em execução")
})