const express = require("express");

let port=process.env.PORT;
if(port==null|| port==""){
  port=3000;
}
const app=express();

app.use(express.static(__dirname+'/public'))
  
app.listen(port,()=>{
    console.log(`APP is running at ${port} port`)
});