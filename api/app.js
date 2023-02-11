import express from "express"
import mongoose from "mongoose";
import bodyParser from 'body-parser'
import _ from "lodash";
import dotenv from 'dotenv';
dotenv.config();

let port=process.env.PORT;
if(port==null|| port==""){
  port=3000;
}
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const result={
    companyName:String,
    country:String,
    greenIndex:String
  };

mongoose.connect(process.env.mongoURL)
    mongoose.connection.on('connected',()=>{
        console.log("Connected to db sucessfully");
    })
    mongoose.connection.on('disconnected',()=>{
        console.log("Database disconnected");
    })

    mongoose.connection.on('error',()=>{
        console.log("error while connecting",error);
    })

    const dataSchema=new mongoose.Schema({
        companyName:String,
        country:String,
        greenIndex:String
      });

      

      const Data=mongoose.model("Data",dataSchema);

        app.get("/",function(req,res){
            Data.find({},(err,dbcontent)=>{
              if(err){
                console.log(err);
                res.send("data not found!")
                }
               else{
                   res.send(dbcontent);
               }
            });
        });

        app.get("/company/:name",(req,res)=>{
            var flag=0;
            let name=req.params.name;
            let nameM=_.lowerCase(name);
            Data.find({},(err,dbcontent)=>{
              if(err){
                console.log(err);
              }
              else{
                for(var i=0;i<dbcontent.length;i++){
                  if(nameM===_.lowerCase(dbcontent[i].companyName)){
                    result.companyName=dbcontent[i].companyName,
                    result.country=dbcontent[i].country,
                    result.greenIndex=dbcontent[i].greenIndex
                    res.send(result);
                    flag=1;
                    break;
                  }
                }
                if(flag==0)
                    res.send("Data not found!");
              }
            });
          
          });

          app.get("/country/:name",(req,res)=>{
            var countries=[];
            var countryflag=0;
            let name=req.params.name;
            let nameM=_.lowerCase(name);
            Data.find({},(err,dbcontent)=>{
              if(err){
                console.log(err);
              }
              else{
                for(var i=0;i<dbcontent.length;i++){
                  if(nameM===_.lowerCase(dbcontent[i].country)){
                    countries.push({
                       companyName :dbcontent[i].companyName,
                        country :dbcontent[i].country,
                        greenIndex :dbcontent[i].greenIndex
                    }
                        )
                    countryflag=1;
                }
            }

                if(countryflag==0)
                    res.send("Country not found!");
                else
                    res.send(countries);
              }
            });
          
          });

app.listen(port,()=>{
    console.log(`APP is running at ${port} port`)
});