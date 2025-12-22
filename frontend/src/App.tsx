import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import InvitationResponsePage from './pages/InvitationResponsePage'
import { Box } from "@mui/material"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

export default function App(): JSX.Element {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{ maxWidth: 393, mx: "auto", p: "20px" }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/response" element={<InvitationResponsePage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  )
}
