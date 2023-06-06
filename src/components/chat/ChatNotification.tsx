import React, { useEffect, useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import {
  Badge,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import { seeAllChats, unSeenChats } from "@/lib/chat";

function ChatNotification() {
  const { _id } = useSelector((state: RootState) => state.users.user);

  const [count, setCount] = useState(0);

  const router = useRouter();

  
  useEffect(() => {
    
      setInterval(async()=>{
        const data = await unSeenChats(_id);
        setCount(data);
      },100)
      
  }, [_id]);

 
  return (
    <>
      <IconButton
        onClick={async() => {
          await seeAllChats(_id)
         router.push('/chat')
        }}
        size="large"
        edge="start"
        aria-label="menu"
        sx={{ mr: 2,color:'white' }}
      >
        <Badge badgeContent={count} color="error">
          <ChatIcon/>
        </Badge>
      </IconButton>
    
    </>
  );
}

export default ChatNotification;

