import React, { useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { Box, Stack, Typography, Button } from "@mui/material"
import Edit from "@mui/icons-material/Edit"

export default function Home() {
  const navigate = useNavigate()
  const [invitationInfo, setInvitationInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
  });

  useEffect(() => {
    api.get("/api/v1/invitation-info")
      .then(res => setInvitationInfo(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>loading</p>
  if (!invitationInfo) return <p>データが見つかりません</p>

  return (
    <Stack
      spacing={6}
      display="flex"
      alignItems="center"
      sx={{ width: "100%" }}
          >
      <Stack
        spacing={2}
        display="flex"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Typography sx={{ fontWeight: "bold"}}>新郎</Typography>
        <Typography>{invitationInfo.groom_name}</Typography>
        
        <Typography sx={{ fontWeight: "bold"}}>新婦</Typography>
        <Typography>{invitationInfo.bride_name}</Typography>
        
        <Typography sx={{ fontWeight: "bold"}}>メッセージ</Typography>
        <Typography>{invitationInfo.message}</Typography>
      </Stack>

      <Stack
        spacing={2}
        display="flex"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Typography sx={{ fontWeight: "bold"}}>会場</Typography>
        <Typography>{invitationInfo.venue_name}</Typography>
        
        <Typography sx={{ fontWeight: "bold"}}>住所</Typography>
        <Typography>
          {invitationInfo.postal_code}
          {invitationInfo.address}
        </Typography>
        
        <Typography sx={{ fontWeight: "bold"}}>開場時間</Typography>
        <Typography>{invitationInfo.open_time}</Typography>
        
        <Typography sx={{ fontWeight: "bold"}}>開始時間</Typography>
        <Typography>{invitationInfo.start_time}</Typography>
      </Stack>

      <Button
        variant="contained"
        startIcon={<Edit />}
        color="primary"
        size="medium"
        onClick={ () => navigate("/answerForm") }
      >
        回答する
      </Button>
    </Stack>
  )
}
