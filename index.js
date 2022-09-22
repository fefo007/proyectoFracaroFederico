const fs = require('fs');


class Contenedor {
    constructor (text){
        this.text=text
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
    async getLength(){
        let listPorducts = await this.getAll()
        return await listPorducts.length
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

    // let contenedor = new Contenedor('productos.txt')
    // const useContenedor = async ()=>{
    //     await contenedor.save(prod1)
    //     await contenedor.save(prod2)
    //     await contenedor.save(prod3)
    //     await contenedor.save(prod4)
    //     await contenedor.save(prod5)
    //     // await contenedor.deleteAll()
    //     // await contenedor.getAll()
    //     // await contenedor.getById(3)
    //     // await contenedor.deleteById(3)
    // }
    // useContenedor()

    module.exports=Contenedor