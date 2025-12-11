import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AnswerForm from './pages/AnswerForm'
import { Box } from "@mui/material"

export default function App(): JSX.Element {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{ maxWidth: 393, mx: "auto", p: "20px" }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<AnswerForm />} />
        </Routes>
      </BrowserRouter>
    </Box>
  )
}
