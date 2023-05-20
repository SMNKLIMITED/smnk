import axios from "axios"

export type Rating={
  _id?:string,
  aboutSMNK:string,
  smnkRating:number,
  aboutSW:string,
  swRating:number,
  raterId:string,
  jobId:string
}
  //rating submit handler
  export const ratingSubmitHandler = async (values:Rating,router:any,url:string)=>{
    
    try{
        if(values.raterId && values.jobId){
                const res = await axios({
                    method:'POST',
                    url:`${process.env.SMNK_URL}api/rating/rate`,
                    data:values
                })
                const data = await res.data
                alert(data.message)
                if(data.successful){
                    router.push(url)
                }
          }else{
            console.log('Invalid request')
          }
            
        
  }catch(err:any){
    console.log(err)
    return err
  }
}

 //get skilled worker average rating
 export const getSWRating = async (userId:string,setRating:any,setError:any)=>{
    
  try{
      if(userId){
              const res = await axios({
                  method:'POST',
                  url:`${process.env.SMNK_URL}api/rating/sw/${userId}`
              })
              const data = await res.data
              setRating(data)
        }else{
          console.log('Invalid request')
        }
          
      
}catch(err:any){
  console.log(err)
  setError(err)
}
}

// export const unreadMessagesCount = async (receiverId:string)=>{
    
//   try{
//       if(receiverId){
//               const res = await axios({
//                   method:'GET',
//                   url:`${process.env.SMNK_URL}api/message/${receiverId}`,
//               })
//               const data = await res.data
//              return data
//         }else{
//           console.log('Invalid request')
//         }
          
      
// }catch(err:any){
//   console.log(err)
//   return err
// }
// }
// export const allMessages = async (receiverId:string)=>{
  
//   try{
//       if(receiverId){
//               const res = await axios({
//                   method:'POST',
//                   url:`${process.env.SMNK_URL}api/message/all-messages`,
//                   data:{receiverId}
//               })
//               const data = await res.data
//              return data
//         }else{
//           console.log('Invalid request')
//         }
          
      
// }catch(err:any){
//   console.log(err)
//   return err
// }
// }