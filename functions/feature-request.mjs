import axios from 'axios';
import * as constants from '../.constants.js';
import path from 'path';
const fs  = require("fs-extra");
// import fs from "fs-extra";

const LOGPATH = path.join(__dirname,'featureRequestLog.json');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://frogeadmin22:<password>@serverlessfrogespresso1.qaftp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
exports.handler = async (event, context, callback) => {
  // const { method } = event.queryStringParameters
  console.log('ev body. ' ,event.body)
  try{
    const data = JSON.parse(event.body);
    const latest = log[0]
    const now = new Date.now();
    if(now-latest<30000){
      return { statusCode: 400, body: 'too soon man, too soon.' }
    }else{
      log[0] = now;
      log.push(data);
      fs.writeJsonSync(LOGPATH, log, {spaces:2});
      console.log('...appended to featureRequestLog.json')
      return { statusCode: 200, body: 'success' }
    }
  }catch(err){
    console.log('nah, error. ' ,err)
    return { statusCode: 400, body: JSON.stringify(err) }
  }

}
