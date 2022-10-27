import axios from 'axios';
const { MongoClient, ServerApiVersion } = require('mongodb');
import * as constants from '../.constants.js';
import fs from 'fs-extra';
const ethers = require('ethers');
const { Wallet, utils  } = ethers;
const { parseEther, parseUnits, formatUnits, defaultAbiCoder,hexValue  } = ethers.utils;
/**@param {string} account
 * @param {Array} authParams [authMsg, authSig] */
const isVerified = async (account,authParams) => {const [authMsg, authSig] = authParams;const verify = await provider.request({ method: "personal_ecRecover", params: [authMsg, authSig] });return (verify === account.toLowerCase())}
let history = {};
const rateLimit = (ip, timeout = 60 * 1000) => {if (history[ip] > Date.now() - timeout) {throw new Error("Rate Limit Exceeded");}history[ip] = Date.now();}
const infuraCreds=()=>({ projectId: '0eaa508254d64389be2f25787cc66181', projectSecret: '306cfa7578f84ae8bbf41322194284ed'})
const alchemyUrl=(network)=>{return `https://eth-${network}.alchemyapi.io/v2/`+{ 'mainnet': 'YWE92jZV3auxZkWKd_dTH7Xk2rNNZBJn', 'rinkeby': 'WIJxZy97BL0WG0RQZFvWUeu74Yeqg5as', 'ropsten': 'cWCtBK24kbl-oSybYisKWNUXwSft1BRA' }[network]}
const infuraUrl=(n)=>`https://${n}.infura.io/v3/${infuraCreds().projectId}`
const getProvider=(n)=>new ethers.providers.InfuraProvider(n, infuraCreds())
const getProviderGeth=(n)=>new ethers.providers.JsonRpcProvider()
const provider = getProvider('mainnet')


//https://www.mongodb.com/developer/how-to/atlas-serverless-quick-start/
//https://www.mongodb.com/docs/manual/reference/method/js-collection/
const uriAtlas = "mongodb+srv://frogeadmin22:x5wCOlap6iWpQoKG@serverlessfrogespresso1.qaftp.mongodb.net/FrogeSLMDB?retryWrites=true&w=majority";
const clientAtlas = new MongoClient(uriAtlas, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


exports.handler = async (event, context, callback) => {
  // const { method } = event.queryStringParameters
  console.log('ev body: ' ,event.body)
  const data = JSON.parse(event.body);

  if(!await isVerified(data.account, data.authParams)){
    return { statusCode: 401, body: "Unauthorized" };
  }
  try {rateLimit(event.headers["client-ip"], 60000);
  } catch (error) {return { statusCode: 429 };}

  try{
    const promise = new Promise((resolve, reject) => {
      try{
        clientAtlas.connect(err => {
          const collection = clientAtlas.db("FrogeSLMDB").collection("history");

          const updOne = collection.updateOne({
            account:data.account
          },{
            account:data.account, history:data.newHistory
          },{
            upsert:true
          }
        )

          if(updOne.matchedCount<1 || updOne.modifiedCount<1 || !updOne.acknowledged){
            //could not update, so insert new doc
            collection.insertOne(data).then(() => {
              clientAtlas.close();
              resolve()
            });
          }else{

          }
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
