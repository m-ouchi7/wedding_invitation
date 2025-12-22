import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import ArrowRight from "@mui/icons-material/ArrowRight";
import api from "../utils/api";
import ResponseComplete from "../components/InvitationResponse/ResponseComplete";
import ResponseForm from "../components/InvitationResponse/ResponseForm";

interface FormValues {
  first_name: string;
  middle_name: string;
  last_name: string;
  guest_side: string;
  email: string;
  postal_code: string;
  prefecture_code: string;
  city_code: string;
  town: string;
  building: string;
  attendance: string;
  allergy: string;
  message: string;
}

type FormErrors = {
  [K in keyof FormValues]?: string | string[];
};

export default function InvitationResponsePage(): JSX.Element {
  const navigate = useNavigate();
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues>({
    first_name: "",
    middle_name: "",
    last_name: "",
    guest_side: "1",
    email: "",
    postal_code: "",
    prefecture_code: " ", // 初期値設定とバリデーションのため半角スペースを入れている
    city_code: "",
    town: "",
    building: "",
    attendance: "1",
    allergy: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | TextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value as string }));
  };

  const validation = async (): Promise<boolean> => {
    try {
      setErrors({});
      const res = await api.post("/api/v1/guest-answer/validate", formValues);
      return true;
    } catch (err) {
      const status = err.response ? err.response.status : null;

      if (status === 422) {
        const errorData = err.response.data.error as FormErrors;
        setErrors(errorData);
        console.log("Validation Failed: ", errorData);
      } else {
        console.error(err);
        alert(
          "サーバーまたはネットワークエラーが発生しました。何度も続く場合は主催者に問い合わせてください。"
        );
      }
      return false;
    }
  };

  const handleToConfirm = async (e: FormEvent) => {
    e.preventDefault();
    const isValid = await validation();
    if (isValid) {
      setIsConfirm(!isConfirm);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/api/v1/guest-answer", formValues);
      setIsConfirm(!isConfirm);
      setIsComplete(!isComplete);
    } catch (err) {
      console.error(err);
      alert("サーバーエラーが発生しました");
    }
  };

  return (
    <Stack
      spacing={4}
      display="flex"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      {/* 送信後の画面 */}
      {!isConfirm && isComplete && (
        <>
          <ResponseComplete />
        </>
      )}

      {/* 入力中/確認中の画面 */}
      {!(!isConfirm && isComplete) && (
        <ResponseForm
          isConfirm={isConfirm}
          responseFormValues={formValues}
          handleChangeValue={handleChange}
          formErrors={errors}
        />
      )}

      {/* ボタン */}
      <Stack spacing={2} alignItems="center" sx={{ width: "100%" }}>
        {/* 送信後 */}
        {isComplete && !isConfirm && (
          <>
            <Button
              variant="contained"
              endIcon={<ArrowRight />}
              color="primary"
              sx={{ width: "60%" }}
              onClick={() => {
                setIsConfirm(!isConfirm);
                navigate();
              }}
            >
              回答内容を確認する
            </Button>
          </>
        )}
        {isComplete && (
          <>
            <Button
              variant="outlined"
              endIcon={<ArrowRight />}
              color="success"
              sx={{ width: "60%" }}
              onClick={() => navigate("/home")}
            >
              招待状ページへ戻る
            </Button>
          </>
        )}
        {/* 確認中 */}
        {!isComplete && isConfirm && (
          <>
            <Button
              variant="contained"
              endIcon={<ArrowRight />}
              color="primary"
              sx={{ width: "60%" }}
              onClick={() => setIsConfirm(!isConfirm)}
            >
              入力し直す
            </Button>
            <Button
              variant="contained"
              endIcon={<ArrowRight />}
              color="success"
              sx={{ width: "60%" }}
              onClick={handleSubmit}
            >
              送信する
            </Button>
          </>
        )}
        {/* 入力中 */}
        {!isComplete && !isConfirm && (
          <>
            <Button
              variant="contained"
              endIcon={<ArrowRight />}
              color="success"
              sx={{ width: "60%" }}
              onClick={handleToConfirm}
            >
              入力内容を確認する
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  );
}
