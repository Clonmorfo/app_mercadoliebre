/*Ejemplo de como poner una imagen con hiperviculo
    <a href="https://google.com">
        <img src="https://bit.ly/2WDMapV" width="560" alt="">
    </a>

    primero genero un anchor <a> que tiene dentro la imagen
*/



const express = require("express");
const path = require("path");

const app = express();


/*Config public*/
app.use(express.static(path.resolve(__dirname, "public")))

/* Routes */
app.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "./views/index.html"))
})

app.get("/ofertas", (req, res)=> {
    res.sendFile(path.resolve(__dirname, "./views/ofertas.html"))
})



app.listen(3000, () =>{
    console.log("Server corriendo en el puerto 3000");
})
