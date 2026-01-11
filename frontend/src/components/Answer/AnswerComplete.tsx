import React from "react";
import { Typography } from "@mui/material";

export default function AnswerComplete(): React.JSX.Element {
  return (
    <>
      <Typography variant="h6">送信完了</Typography>
      <Typography textAlign="center">
        ご回答ありがとうございます。
        <br />
        メールアドレスに入力内容を送信しました。
      </Typography>
    </>
  )
}
