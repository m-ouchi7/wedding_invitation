import React, { useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import axios from "axios"
import { Box, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Button, Typography, TextField, Stack } from "@mui/material"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"

export default function Submit() {
  const [data, setData] = useState(null)
  const [isConfirm, setIsConfirm] = useState(false)
  const [formValues, setFormValues] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    guest_side: "1",
    email: "",
    postal_code: "",
    prefecture_code: "",
    city_code: "",
    town: "",
    building: "",
    attendance: "1",
    allergy: "",
    message: ""
  })

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async() => {
    try {
      await api.post("/api/v1/guest-answer", formValues)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form>
      <Stack
        spacing={3}
        display="flex"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Stack spacing={1} alignItems="center" sx={{width: "100%"}}>
          <Typography variant="h6">
           出欠
          </Typography>
          <FormControl>
            <RadioGroup
              row
              name="attendance"
              value={formValues.attendance}
              onChange={handleChange}
              >
              <FormControlLabel value="1" control={<Radio />} label="ご出席" />
              <FormControlLabel value="0" control={<Radio />} label="ご欠席" />
            </RadioGroup>
          </FormControl>
        </Stack>

        <Stack spacing={1} alignItems="center" sx={{width: "100%"}}>
          <Typography variant="h6">
            お名前
          </Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              name="first_name"
              value={formValues.first_name}
              label="姓"
              onChange={handleChange}
              required
            />
            <TextField
              name="middle_name"
              value={formValues.middle_name}
              label="ミドルネーム"
              onChange={handleChange}
            />
            <TextField
              name="last_name"
              value={formValues.last_name}
              label="名"
              onChange={handleChange}
              required
            />
          </Stack>
        </Stack>

        <Stack spacing={1} alignItems="center" sx={{width: "100%"}}>
          <Typography variant="h6">
            新郎 / 新婦
          </Typography>
          <FormControl>
            <RadioGroup
              row
              name="guest_side"
              value={formValues.guest_side}
              onChange={handleChange}
              >
              <FormControlLabel value="1" control={<Radio />} label="新郎" />
              <FormControlLabel value="0" control={<Radio />} label="新婦" />
            </RadioGroup>
          </FormControl>
        </Stack>

        <Stack spacing={1} alignItems="center" sx={{width: "100%"}}>
        <Typography variant="h6">
          メールアドレス
        </Typography>
          <TextField
            name="email"
            value={formValues.email}
            label="sample@gmail.com"
            onChange={handleChange}
            required
            fullWidth
          />
        </Stack>
        
         <Stack spacing={1} alignItems="center" sx={{width: "100%"}}>
          <Typography variant="h6">
            住所
          </Typography>
          <Stack spacing={1} sx={{width: "100%"}}>
            <TextField
              name="postal_code"
              value={formValues.postal_code}
              label="郵便番号"
              helperText="例：123-4567"
              onChange={handleChange}
              required
              fullWidth
              />
            <TextField
              name="prefecture_code"
              value={formValues.prefecture_code}
              label="都道府県"
              helperText="例：千葉県"
              onChange={handleChange}
              required
              fullWidth
              />
            <TextField
              name="city_code"
              value={formValues.city_code}
              label="市町村"
              helperText="例：船橋市"
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="city_code"
              value={formValues.city_code}
              label="町名"
              helperText="例：○○町１丁目１－１"
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="city_code"
              value={formValues.city_code}
              label="建物名"
              helperText="例：○○コーポ○○号室"
              onChange={handleChange}
              fullWidth
            />
          </Stack>
        </Stack>
        
        <Stack spacing={1} alignItems="center" sx={{width: "100%"}}>
        <Typography variant="h6">
          アレルギー
        </Typography>
          <TextField
            name="allergy"
            value={formValues.allergy}
            helperText="エビ、イカ、卵など"
            InputProps={{ sx: { height: 100 }}}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
        
        <Stack spacing={1} alignItems="center" sx={{width: "100%"}}>
        <Typography variant="h6">
          メッセージ
        </Typography>
          <TextField
            name="message"
            value={formValues.message}
            InputProps={{ sx: { height: 200 }}}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </Stack>

      
      <Button
        variant="contained"
        endIcon={<ArrowRightIcon />}
        color="primary"
        size="medium"
        onClick={handleSubmit}
      >
        入力内容を確認する
      </Button>
    </form>
  )
}
