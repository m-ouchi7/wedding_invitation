import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Answer from './pages/Answer'
import { Box } from "@mui/material"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

export default function App(): React.JSX.Element {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{ maxWidth: 393, mx: "auto", p: "20px" }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/answer" element={<Answer />} />
        </Routes>
      </BrowserRouter>
    </Box>
  )
}
