import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getUserInfo } from '@/lib/utils/user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function UserInfoLink(){
    const router = useRouter()
   
    const {user} = useSelector((state:RootState)=>state.users)
    const [data,setData] = useState<any>()
   
      
    
    useEffect(()=>{
      (
        async()=>{
          const res = await getUserInfo(user._id)
          setData(res.data)
        }
      )()
    },[user._id])

if(!data) return(
    <ListItemButton sx={{ ml: 8 }} onClick={()=>{
        router.push('/dashboard/individual/add-personal-info') 
    }}>       
        <ListItemText  primary={'Add Personal Info'} />
  </ListItemButton>
)
    return(
        <ListItemButton sx={{ ml: 8 }} onClick={()=>{
            router.push(`/dashboard/individual`)
        }}>
            <ListItemText  primary={`Personal Info`} />
        </ListItemButton>
    )
}