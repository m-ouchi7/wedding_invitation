import React, { useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import Submit from './pages/Submit'
import { Box } from "@mui/material"

export default function App() {
  return (
    // <Home />
    <Box
      display="flex"
      alignItems="center"
      sx={{ maxWidth: 393, mx: "auto", p: "0 20px" }}
    >
      <Submit />
    </Box>
  )
}
