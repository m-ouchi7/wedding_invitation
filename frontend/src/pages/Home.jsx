import React, { useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import axios from "axios";
// import { Box, Typography } from "@mui/material";

export default function App() {
  const [invitationInfo, setInvitationInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("/api/v1/invitation-info")
      .then(res => setInvitationInfo(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>loading</p>
  if (!invitationInfo) return <p>データが見つかりません</p>

  return (
    <>
      <p>{invitationInfo.groom_name}</p>
      {/* <Box component="dl" sx={{ width: 300 }}>
        <Typography component="dt" sx={{ fontWeight: "bold", mt: 1 }}>新郎</Typography>
        <Typography component="dd" sx={{ ml: 2 }}>{invitationInfo.groom_name}</Typography>
        
        <Typography component="dt" sx={{ fontWeight: "bold", mt: 1 }}>新婦</Typography>
        <Typography component="dd" sx={{ ml: 2 }}>{invitationInfo.bride_name}</Typography>
        
        <Typography component="dt" sx={{ fontWeight: "bold", mt: 1 }}>メッセージ</Typography>
        <Typography component="dd" sx={{ ml: 2 }}>{invitationInfo.message}</Typography>
      </Box>

      <Box component="dl" sx={{ width: 300 }}>
        <Typography component="dt" sx={{ fontWeight: "bold", mt: 1 }}>会場</Typography>
        <Typography component="dd" sx={{ ml: 2 }}>{invitationInfo.venue_name}</Typography>
        
        <Typography component="dt" sx={{ fontWeight: "bold", mt: 1 }}>住所</Typography>
        <Typography component="dd" sx={{ ml: 2 }}>
          {invitationInfo.postal_code}
          {invitationInfo.address}
        </Typography>
        
        <Typography component="dt" sx={{ fontWeight: "bold", mt: 1 }}>開場時間</Typography>
        <Typography component="dd" sx={{ ml: 2 }}>{invitationInfo.open_time}</Typography>
        
        <Typography component="dt" sx={{ fontWeight: "bold", mt: 1 }}>開始時間</Typography>
        <Typography component="dd" sx={{ ml: 2 }}>{invitationInfo.start_time}</Typography>
      </Box> */}
    </>
  )
}
