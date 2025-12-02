import React, { useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import axios from "axios"
import { Box, Typography } from "@mui/material"

export default function Submit() {
  const [invitationInfo, setInvitationInfo] = useState(null)
  const [data, setData] = useState(null)

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
  });
  
  useEffect(() => {
    api.post("/api/v1/guest-answer", data)
      .then(() => {
        navigate("/confirm-page") // 確認用ページに遷移
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <>
    </>
  )
}
