import Job from "@/lib/model/job"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {jobId} = req.body
    if(jobId){
        
        try{
            const job = await Job.findOneAndUpdate({_id:jobId},{swPaid:true},{new:true})
          
                if(job.swPaid){
                    res.status(201).json(true)
                }else{
                    res.status(201).json(false)
                }
            
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide Proposal Id"})
    }
    
    
}