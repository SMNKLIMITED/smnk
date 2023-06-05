
import { NextApiResponse } from "next";
import { multerHandler, multerUpload } from '@/lib/multer';
import dbConnect from '@/lib/mongoose';
import methodOverride from 'method-override'
import mongoose from "mongoose";
import Grid from 'gridfs-stream'
import User from "@/lib/model/userModel";

export const config = {
  api:{
      bodyParser:false
  }
}



 multerHandler.use(methodOverride('_method')).use(multerUpload().single('sub'))
  .post(async (req:any, res:NextApiResponse)=>{
    //connect to database and get database and connection objects
    const dbAndConnection = await dbConnect()
    //init gfs
    let gfs
    
    //create collection for profile pics uploads
    dbAndConnection?.connection.once('open',()=>{
      //init stream
      gfs = Grid(dbAndConnection.db,mongoose.mongo)
      gfs.collection('dps')
    })
    const {type,userId} = req.body
    const pop = req.file.filename
 const sub = {type,pop}
   await User.findByIdAndUpdate(req.body.userId,{subscription:sub})
   res.status(201).json({message: `${pop} was successfully uploaded`,successful:true})
  })
  
  export default multerHandler