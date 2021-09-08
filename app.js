const express = require("express");
const path = require("path");

const app = express();


/*Config public*/
app.use(express.static(path.resolve(__dirname, "public")))
/* Routes */
app.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "./views/home.html"))
})




app.listen(3000, () =>{
    console.log("Server corriendo en el puerto 3000");
})
