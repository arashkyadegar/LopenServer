import { MongoClient } from "mongodb";
import 'dotenv/config'

export class MongoDb {
     static client :MongoClient | undefined;
     private constructor(){}
     static async dbconnect(collectionName:string):Promise<any> {
          const dbUrl = process.env.MONGOOSE_URI;
               if(this.client == undefined){
               this.client = await MongoClient.connect(`${dbUrl}`);
               }
               return this.client.db('lopenDb').collection(collectionName);

     }
     
}

