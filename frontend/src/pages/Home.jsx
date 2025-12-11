import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Stack, Typography, Button } from "@mui/material";
import Edit from "@mui/icons-material/Edit";

interface InvitationInfo {
  groom_name: string;
  bride_name: string;
  message: string;
  venue_name: string;
  postal_code: string;
  address: string;
  open_time: string;
  start_time: string;
}

export default function Home(): JSX.Element {
  const navigate = useNavigate();
  const [invitationInfo, setInvitationInfo] = useState<InvitationInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    timeout: 5000,
  });

  useEffect(() => {
    api
      .get<InvitationInfo>("/api/v1/invitation-info")
      .then((res) => setInvitationInfo(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>loading</p>;
  if (!invitationInfo) return <p>データが見つかりません</p>;

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
        <Typography sx={{ fontWeight: "bold" }}>新郎</Typography>
        <Typography>{invitationInfo.groom_name}</Typography>

        <Typography sx={{ fontWeight: "bold" }}>新婦</Typography>
        <Typography>{invitationInfo.bride_name}</Typography>

        <Typography sx={{ fontWeight: "bold" }}>メッセージ</Typography>
        <Typography>{invitationInfo.message}</Typography>
      </Stack>

      <Stack
        spacing={2}
        display="flex"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Typography sx={{ fontWeight: "bold" }}>会場</Typography>
        <Typography>{invitationInfo.venue_name}</Typography>

        <Typography sx={{ fontWeight: "bold" }}>住所</Typography>
        <Typography>
          {invitationInfo.postal_code}
          {invitationInfo.address}
        </Typography>

        <Typography sx={{ fontWeight: "bold" }}>開場時間</Typography>
        <Typography>{invitationInfo.open_time}</Typography>

        <Typography sx={{ fontWeight: "bold" }}>開始時間</Typography>
        <Typography>{invitationInfo.start_time}</Typography>
      </Stack>

      <Button
        variant="contained"
        startIcon={<Edit />}
        color="primary"
        size="medium"
        onClick={() => navigate("/form")}
      >
        回答する
      </Button>
    </Stack>
  );
}
