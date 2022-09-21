const express = require('express')
const app = express()
const Contenedor = require('./index2.js')
const contenedor = new Contenedor('productos.txt')

const productos = async ()=>{
    let listaProductos=JSON.stringify(await contenedor.getAll())
    return listaProductos
}
const productoRandom = async (min,max)=>{
    let id = Math.floor(Math.random()*(max-min)+min)
    let productoRandom= JSON.stringify(await contenedor.getById(id))
    return productoRandom
}
app.get('/',(req,res)=>{
    res.send(`<h1 style="color:blue;display:flex;flex-direction:row;justify-content:center">Bienvenido al server</h1>`)
})
app.get('/productos', async (req, res) => {
    let products =await productos().catch('error al cargar la lista')
        res.send(`<section style="display:flex;flex-direction:column;aling-content:center;color:white;height:100%;background-color:black;font-size:150%">Lista de productos:${products}</section>`)
    })

app.get('/productoRandom', async (req, res) => {
    let product = await productoRandom(1,await contenedor.getLength()).catch('error al cargar producto')
    res.send(`<section style="display:flex;flex-direction:column;aling-content:center;color:violet;background-color:black;height:100%;font-size:150%">Producto: ${product}</section>`)
    })


const PORT = 8080
const server = app.listen(PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
        })
    server.on("error", error => console.log(`Error en servidor ${error}`))