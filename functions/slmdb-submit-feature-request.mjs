import axios from 'axios';
const { MongoClient, ServerApiVersion } = require('mongodb');
import * as constants from '../.constants.js';
import fs from 'fs-extra';
//https://www.mongodb.com/developer/how-to/atlas-serverless-quick-start/
const uriAtlas = "mongodb+srv://frogeadmin22:x5wCOlap6iWpQoKG@serverlessfrogespresso1.qaftp.mongodb.net/FrogeSLMDB?retryWrites=true&w=majority";
const clientAtlas = new MongoClient(uriAtlas, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let latest = Date.now()
let history = {};
const rateLimit = (ip, timeout = 60 * 1000) => {
  if (history[ip] > Date.now() - timeout) {
    throw new Error("Rate Limit Exceeded");}
  history[ip] = Date.now();
}

exports.handler = async (event, context, callback) => {
  // const { method } = event.queryStringParameters
  console.log('ev body: ' ,event.body)

  try {rateLimit(event.headers["client-ip"], 2 * 60 * 1000);
  } catch (error) {return { statusCode: 429 };}

  try{
    const data = JSON.parse(event.body);

    const promise = new Promise((resolve, reject) => {
      try{
        clientAtlas.connect(err => {
          const collection = clientAtlas.db("FrogeSLMDB").collection("epics");
          // perform actions on the collection object
          collection.insertOne(
            data
          )
          .then(() => {
            clientAtlas.close();
            resolve()
          });
        });
      }catch(err){
        console.log('slmdb failed: ' ,err)
        reject(err)
      }
    });
    return promise.then((res)=>{
      return { statusCode: 200, body: "success" }
    })

  }catch(err){
    console.log('nah, error. ' ,err)
    return { statusCode: 502, body: JSON.stringify(err) }
  }

}
