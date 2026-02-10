import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { isError, post } from "../utils/api";
import AnswerComplete from "../components/Answer/AnswerComplete";
import AnswerForm from "../components/Answer/AnswerForm";
import { SelectChangeEvent } from "@mui/material/Select";
import { FormButton } from "../components/UI/Buttons//FormButton";

export type FormChangeEvent =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | SelectChangeEvent<string>;

export interface FormValues {
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

export type FormErrors = {
  [K in keyof FormValues]?: string | string[];
};

export default function Answer(): React.JSX.Element {
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

  const handleChange = (e: FormChangeEvent) => {
    const { name, value } = e.target;

    if (!name) return;

    setFormValues((prev) => ({
      ...prev,
      [name as keyof FormValues]: value,
    }));
  };

  const validation = async (): Promise<boolean> => {
    setErrors({});
    const res = await post<void>(
      "/api/v1/guest-answer/validate",
      formValues as unknown as Record<string, string>
    );

    if (isError(res)) {
      if (res.status === 422) {
        setErrors(res.error as FormErrors);
      } else {
        alert(
          "エラーが発生しました。何度も続く場合は主催者に問い合わせてください。"
        );
      }
      return false;
    }

    return true;
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

    const res = await post(
      "/api/v1/guest-answer",
      formValues as unknown as Record<string, string>
    );

    if (isError(res)) {
      console.error(res.error);
      alert(
        "エラーが発生しました。何度も続く場合は主催者に問い合わせてください。"
      );
      return;
    }

    setIsConfirm(!isConfirm);
    setIsComplete(!isComplete);
  };

  return (
    <Stack
      spacing={4}
      display="flex"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      {!isConfirm && isComplete && (
        <>
          <AnswerComplete />
        </>
      )}

      {!(!isConfirm && isComplete) && (
        <AnswerForm
          isConfirm={isConfirm}
          answerFormValues={formValues}
          handleChangeValue={handleChange}
          formErrors={errors}
        />
      )}

      <Stack
        spacing={2}
        alignItems="center"
        sx={{ width: "100%", paddingBottom: 4 }}
      >
        {isComplete && !isConfirm && (
          <FormButton
            color="primary"
            label="回答内容を確認する"
            onClick={() => {
              setIsConfirm(!isConfirm);
            }}
          />
        )}
        {!isComplete && isConfirm && (
          <>
            <FormButton
              color="primary"
              label="入力し直す"
              onClick={() => setIsConfirm(!isConfirm)}
            />
            <FormButton label="送信する" onClick={handleSubmit} />
          </>
        )}
        {!isComplete && !isConfirm && (
          <FormButton label="入力内容を確認する" onClick={handleToConfirm} />
        )}
        <FormButton
          variant="outlined"
          label="招待状ページへ戻る"
          onClick={() => navigate("/home")}
        />
      </Stack>
    </Stack>
  );
}
