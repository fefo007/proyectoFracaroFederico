const express = require('express')
const app = express()
// const Contenedor = require('./index2.js')
const fs = require('fs');


class Contenedor {
    constructor (text){
        this.text=text
    }
    async getLength(){
        let productList = await this.getAll()
        return productList.length
    }
    
    async save(product){
        try{
        let productsCollect=await fs.promises.readFile(this.text)
        let productsCollectToObject=JSON.parse(productsCollect)
        let productId=productsCollectToObject.length > 0 ? productsCollectToObject.length+1 : 1
        product.id=productId
        productsCollectToObject.push(product)
        console.log(productsCollectToObject)
        await fs.promises.writeFile(this.text,JSON.stringify(productsCollectToObject))
        }
        catch(error){
            console.log(`error de lectura`,error)
        }
    }
    async getById(idProduc){
        try{
        let productsCollect=await fs.promises.readFile(this.text)
        let productsCollectToObject=JSON.parse(productsCollect)
        let resultProduct=productsCollectToObject.find(produc=>produc.id===idProduc)
        if (resultProduct){
            console.log(resultProduct)
            return resultProduct
        }
        else{
            console.log(`producto no encontrado`)
        }
        }
        catch(error){
            console.log(`error de lectura`,error)
        }
    }
    async getAll(){
        try{
        let productsCollect=await fs.promises.readFile(this.text)
        let productsCollectToObject=JSON.parse(productsCollect)
        console.log(productsCollectToObject)
        return productsCollectToObject;
        }
        catch(error){
            console.log(`error de lectura`,error)
        }
    }
    async deleteById(idProduc){
        try{
        let productsCollect=await fs.promises.readFile(this.text)
        let productsCollectToObject=JSON.parse(productsCollect)
        let resultProduct=productsCollectToObject.find(produc=>produc.id==idProduc)
        let indice=productsCollectToObject.indexOf(resultProduct)
        productsCollectToObject.splice(indice,1);
        await fs.promises.writeFile(this.text,JSON.stringify(productsCollectToObject))
        }
        catch(error){
            console.log(`error de lectura`,error)
        }
    }

    async deleteAll(){
        try{
        let productsCollect=await fs.promises.readFile(this.text)
        let productsCollectToObject=JSON.parse(productsCollect)
        productsCollectToObject=[]
        console.log(productsCollectToObject)
        await fs.promises.writeFile(this.text,JSON.stringify(productsCollectToObject))
        }
        catch(error){
            console.log(`error de lectura`,error)
        }
    }
}

const prod1={
    name:'Control Sony Dualshock 4',
    price:23.559,
    thumbnail:'https://www.fravega.com/p/control-sony-dualshock-4-jet-black-20032465/'}
const prod2 ={
    name:'Smart TV 4K UHD Samsung 50"',
    price:134.999,
    thumbnail:'https://www.fravega.com/p/smart-tv-4k-uhd-samsung-50-un50au7000-502182/'}
const prod3 ={
    name:'Celular Motorola Edge 30 Pro 256 GB',
    price:189.999,
    thumbnail:'https://www.fravega.com/p/celular-motorola-edge-30-pro-256-gb-verde-control-781777/'}
const prod4 ={
    name:'Lavarropas Carga Frontal Longvie 8 Kg 1200 RPM',
    price:95.999,
    thumbnail:'https://www.fravega.com/p/lavarropas-carga-frontal-longvie-8-kg-1200-rpm-l18012-170131/'}
const prod5 ={
    name:'Bicicleta Mountain Bike Cuadro Aluminio Rodado 29” Nordic X3',
    price:49.999,
    thumbnail:'https://www.fravega.com/p/bicicleta-mountain-bike-cuadro-aluminio-rodado-29-nordic-x3-negro-verde-560985/'}

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


const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
        })
    server.on("error", error => console.log(`Error en servidor ${error}`))
