import React from "react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Button,
  Typography,
  TextField,
  Stack,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { PREFECTURES } from "../../const/prefectures";

interface ResponseFormProps {
  isConfirm: boolean;
  responseFormValues: FormValues;
  handleChangeValue: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formErrors: Record<string, string>;
}

export default function ResponseForm({
  isConfirm,
  responseFormValues,
  handleChangeValue,
  formErrors,
}): JSX.Element {
  return (
    <form>
      <Stack spacing={1} alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="h6">出欠</Typography>
        <FormControl
          disabled={isConfirm}
          sx={{
            "& .MuiFormControlLabel-label.Mui-disabled": { color: "#000" },
          }}
        >
          <RadioGroup
            row
            name="attendance"
            value={responseFormValues.attendance}
            onChange={handleChangeValue}
          >
            <FormControlLabel value="1" control={<Radio />} label="ご出席" />
            <FormControlLabel value="0" control={<Radio />} label="ご欠席" />
          </RadioGroup>
        </FormControl>
      </Stack>

      <Stack spacing={1} alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="h6">お名前</Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            name="last_name"
            value={responseFormValues.last_name}
            label="姓"
            onChange={handleChangeValue}
            required
            disabled={isConfirm}
            error={!!formErrors.last_name}
            helperText={formErrors.last_name}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000",
              },
            }}
          />
          <TextField
            name="middle_name"
            value={responseFormValues.middle_name}
            label="ミドルネーム"
            onChange={handleChangeValue}
            disabled={isConfirm}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000",
              },
            }}
          />
          <TextField
            name="first_name"
            value={responseFormValues.first_name}
            label="名"
            onChange={handleChangeValue}
            required
            disabled={isConfirm}
            error={!!formErrors.first_name}
            helperText={formErrors.first_name}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000",
              },
            }}
          />
        </Stack>
      </Stack>

      <Stack spacing={1} alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="h6">新郎 / 新婦</Typography>
        <FormControl
          disabled={isConfirm}
          sx={{
            "& .MuiFormControlLabel-label.Mui-disabled": { color: "#000" },
          }}
        >
          <RadioGroup
            row
            name="guest_side"
            value={responseFormValues.guest_side}
            onChange={handleChangeValue}
          >
            <FormControlLabel value="1" control={<Radio />} label="新郎" />
            <FormControlLabel value="0" control={<Radio />} label="新婦" />
          </RadioGroup>
        </FormControl>
      </Stack>

      <Stack spacing={1} alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="h6">メールアドレス</Typography>
        <TextField
          name="email"
          value={responseFormValues.email}
          label="sample@gmail.com"
          onChange={handleChangeValue}
          required
          fullWidth
          disabled={isConfirm}
          error={!!formErrors.email}
          helperText={formErrors.email}
          sx={{
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000",
            },
          }}
        />
      </Stack>

      <Stack spacing={1} alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="h6">住所</Typography>
        <Stack spacing={1.5} sx={{ width: "100%" }}>
          <TextField
            name="postal_code"
            value={responseFormValues.postal_code}
            label="郵便番号"
            helperText="例：123-4567"
            onChange={handleChangeValue}
            required
            disabled={isConfirm}
            error={!!formErrors.postal_code}
            helperText={
              isConfirm || formErrors.postal_code
                ? formErrors.postal_code
                : "例：000-0000"
            }
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000",
              },
            }}
            fullWidth
          />
          <FormControl disabled={isConfirm} fullWidth>
            <Select
              name="prefecture_code"
              value={responseFormValues.prefecture_code}
              onChange={handleChangeValue}
              required
              error={!!formErrors.prefecture_code}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000",
                },
              }}
            >
              <MenuItem key="0" value=" ">
                都道府県を選択してください
              </MenuItem>
              {PREFECTURES.map((p) => (
                <MenuItem key={p.code} value={p.code}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name="city_code"
            value={responseFormValues.city_code}
            label="市区町村"
            onChange={handleChangeValue}
            required
            disabled={isConfirm}
            error={!!formErrors.city_code}
            helperText={
              isConfirm || formErrors.city_code
                ? formErrors.city_code
                : "例：船橋市"
            }
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000",
              },
            }}
            fullWidth
          />
          <TextField
            name="town"
            value={responseFormValues.town}
            label="町名"
            onChange={handleChangeValue}
            required
            disabled={isConfirm}
            error={!!formErrors.town}
            helperText={
              isConfirm || formErrors.town
                ? formErrors.town
                : "例：○○町１丁目１－１"
            }
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000",
              },
            }}
            fullWidth
          />
          <TextField
            name="building"
            value={responseFormValues.building}
            label="建物名"
            helperText="例：○○コーポ○○号室"
            helperText={isConfirm ? "" : "例：○○コーポ○○号室"}
            onChange={handleChangeValue}
            disabled={isConfirm}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000",
              },
            }}
            fullWidth
          />
        </Stack>
      </Stack>

      <Stack spacing={1} alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="h6">アレルギー</Typography>
        <TextField
          name="allergy"
          value={responseFormValues.allergy}
          helperText={isConfirm ? "" : "エビ、イカ、卵など"}
          InputProps={{ sx: { height: 100 } }}
          onChange={handleChangeValue}
          disabled={isConfirm}
          sx={{
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000",
            },
          }}
          fullWidth
        />
      </Stack>

      <Stack spacing={1} alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="h6">メッセージ</Typography>
        <TextField
          name="message"
          value={responseFormValues.message}
          InputProps={{ sx: { height: 200 } }}
          onChange={handleChangeValue}
          disabled={isConfirm}
          sx={{
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000",
            },
          }}
          fullWidth
        />
      </Stack>
    </form>
  );
}
