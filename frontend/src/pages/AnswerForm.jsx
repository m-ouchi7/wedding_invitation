import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { useNavigate } from 'react-router-dom'
import { PREFECTURES } from "../const/prefectures";
import axios from "axios"
import { Box, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Button, Typography, TextField, Stack, Select, MenuItem, InputLabel } from "@mui/material"
import ArrowRight from "@mui/icons-material/ArrowRight"

export default function AnswerForm() {
  const navigate = useNavigate()
  const [isConfirm, setIsConfirm] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSubmitted, setShowSubmitted] = useState(false)
  const [formValues, setFormValues] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    guest_side: "1",
    email: "",
    postal_code: "",
    prefecture_code: "0",
    city_code: "",
    town: "",
    building: "",
    attendance: "1",
    allergy: "",
    message: ""
  })
  const [errors, setErrors] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    guest_side: "",
    email: "",
    postal_code: "",
    prefecture_code: "",
    city_code: "",
    town: "",
    building: "",
    attendance: "",
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

  const handleToConfirm = (e) => {
    e.preventDefault()

    // バリデーションを通過したら確認画面を表示
    if (validation()) {
      setIsConfirm(true)
    }
  }

  const validation = () => {
    const newErrors = {}

    if (!formValues.last_name.trim()) {
      newErrors.last_name = "姓を入力してください"
    }

    if (!formValues.first_name.trim()) {
      newErrors.first_name = "名を入力してください"
    }

    if (!formValues.email.trim()) {
      newErrors.email = "メールアドレスを入力してください"
    } else if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formValues.email)) {
      newErrors.email = "正しいメールアドレスを入力してください"
    }

    if (!formValues.postal_code.trim()) {
      newErrors.postal_code = "郵便番号を入力してください"
    } else if (formValues.postal_code.length > 9) {
      newErrors.postal_code = "８文字以内で入力してください"
    }

    if (formValues.prefecture_code === "0") {
      newErrors.prefecture_code = "都道府県を選択してください"
    }

    if (!formValues.city_code.trim()) {
      newErrors.city_code = "市区町村名を入力してください"
    }

    if (!formValues.town.trim()) {
      newErrors.town = "町名を入力してください"
    }

    setErrors(newErrors)

    // エラーが1つもなければtrueを返す
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post("/api/v1/guest-answer", formValues)
      setShowSubmitted(true)
    } catch (err) {
      console.error(err)
      alert("送信エラーが発生しました。")
      setIsConfirm(false)
    }
  }

  // 送信後の画面
  if (showSubmitted) {
    return (
      <Stack
        spacing={4}
        display="flex"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Typography variant="h6">送信完了</Typography>
        <Typography textAlign="center">
          ご回答ありがとうございます。<br />
          メールアドレスに入力内容を送信しました。
        </Typography>
        <Stack
          spacing={2}
          display="flex"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Button
            variant="contained"
            endIcon={<ArrowRight />}
            color="primary"
            sx={{width: "60%"}}
            onClick={() => {
              setShowSubmitted(false)
              setIsSubmitted(true)
            }}
          >
            回答内容を確認する
          </Button>
          <Button
                variant="outlined"
                endIcon={<ArrowRight />}
                color="success"
                sx={{width: "60%"}}
                onClick={ () => navigate("/") }
          >
            招待状ページへ戻る
          </Button>
        </Stack>
      </Stack>
    )

  // 入力中/確認中の画面
  } else {
    return (
      <form>
        <Stack
          spacing={4}
          display="flex"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Stack spacing={1} alignItems="center" sx={{width: "100%"}}>
            <Typography variant="h6">
            出欠
            </Typography>
            <FormControl
              disabled={isConfirm}
              sx={{ "& .MuiFormControlLabel-label.Mui-disabled": { color: "#000" } }}
            >
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
                name="last_name"
                value={formValues.last_name}
                label="姓"
                onChange={handleChange}
                required
                disabled={isConfirm}
                error={!!errors.last_name}
                helperText={errors.last_name}
                sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000" } }}
              />
              <TextField
                name="middle_name"
                value={formValues.middle_name}
                label="ミドルネーム"
                onChange={handleChange}
                disabled={isConfirm}
                sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000" } }}
              />
              <TextField
                name="first_name"
                value={formValues.first_name}
                label="名"
                onChange={handleChange}
                required
                disabled={isConfirm}
                error={!!errors.first_name}
                helperText={errors.first_name}
                sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000" } }}
              />
            </Stack>
          </Stack>

          <Stack spacing={1} alignItems="center" sx={{width: "100%"}}>
            <Typography variant="h6">
              新郎 / 新婦
            </Typography>
            <FormControl
              disabled={isConfirm}
              sx={{ "& .MuiFormControlLabel-label.Mui-disabled": { color: "#000" } }}
            >
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
              disabled={isConfirm}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000" } }}
            />
          </Stack>
          
          <Stack spacing={1} alignItems="center" sx={{width: "100%"}}>
            <Typography variant="h6">
              住所
            </Typography>
            <Stack spacing={1.5} sx={{width: "100%"}}>
              <TextField
                name="postal_code"
                value={formValues.postal_code}
                label="郵便番号"
                helperText="例：123-4567"
                onChange={handleChange}
                required
                disabled={isConfirm}
                error={!!errors.postal_code}
                helperText={isConfirm || errors.postal_code ? errors.postal_code : "例：000-0000"}
                sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000" } }}
                fullWidth
              />
              <TextField
                select
                name="prefecture_code"
                value={formValues.prefecture_code}
                onChange={handleChange}
                required
                disabled={isConfirm}
                error={!!errors.prefecture_code}
                sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000" } }}
                fullWidth
              >
                <MenuItem key="0" value="0">都道府県を選択してください</MenuItem>
                {PREFECTURES.map(p => (
                  <MenuItem key={p.code} value={p.code}>{ p.name }</MenuItem>
                ))}
              </TextField>
              <TextField
                name="city_code"
                value={formValues.city_code}
                label="市区町村"
                onChange={handleChange}
                required
                disabled={isConfirm}
                error={!!errors.city_code}
                helperText={isConfirm || errors.city_code ? errors.city_code : "例：船橋市"}
                sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000" } }}
                fullWidth
              />
              <TextField
                name="town"
                value={formValues.town}
                label="町名"
                onChange={handleChange}
                required
                disabled={isConfirm}
                error={!!errors.town}
                helperText={isConfirm || errors.town ? errors.town : "例：○○町１丁目１－１"}
                sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000" } }}
                fullWidth
              />
              <TextField
                name="building"
                value={formValues.building}
                label="建物名"
                helperText="例：○○コーポ○○号室"
                helperText={isConfirm ? "" : "例：○○コーポ○○号室"}
                onChange={handleChange}
                disabled={isConfirm}
                sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000" } }}
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
                helperText={isConfirm ? "" : "エビ、イカ、卵など"}
              InputProps={{ sx: { height: 100 } }}
              onChange={handleChange}
              disabled={isConfirm}
              sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000" } }}
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
              InputProps={{ sx: { height: 200 } }}
              onChange={handleChange}
              disabled={isConfirm}
              sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#000" } }}
              fullWidth
            />
          </Stack>
        
          <Stack spacing={2} alignItems="center" sx={{ width: "100%" }}>
            {/* 確認中 */}
            {isConfirm && !isSubmitted && (
              <Button
                variant="contained"
                endIcon={<ArrowRight />}
                color="primary"
                sx={{width: "60%"}}
                onClick={ () => setIsConfirm(false) }
              >
                入力し直す
              </Button>
            )}
            
            {/* 入力中は確認ボタン、確認中は送信ボタンを表示 */}
            {!isSubmitted && (
              <Button
                variant="contained"
                endIcon={<ArrowRight />}
                color="success"
                sx={{width: "60%"}}
                onClick={isConfirm ? handleSubmit : handleToConfirm }
              >
                { isConfirm ? "送信する" : "入力内容を確認する" }
              </Button>
            )}

            {/* 送信後 */}
            {isSubmitted && (
              <Button
                    variant="outlined"
                    endIcon={<ArrowRight />}
                    color="success"
                    sx={{width: "60%"}}
                    onClick={ () => navigate("/") }
              >
                招待状ページへ戻る
              </Button>
            )}
          </Stack>
        </Stack>
      </form>
    )
  }
}
