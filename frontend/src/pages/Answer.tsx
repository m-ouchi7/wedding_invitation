import React, { useState, ChangeEvent, FormEvent, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { isError, post } from "../utils/api";
import AnswerComplete from "../components/Answer/AnswerComplete";
import AnswerForm from "../components/Answer/AnswerForm";
import { SelectChangeEvent } from "@mui/material/Select";
import { FormButton } from "../components/UI/Buttons//FormButton";
import {
  FormErrors,
  formReducer,
  FormValues,
  initialState,
} from "./AnswerReducer";

export type FormChangeEvent =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | SelectChangeEvent<string>;

export default function Answer(): React.JSX.Element {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { values, errors, isConfirm, isComplete } = state;

  const handleChange = (e: FormChangeEvent) => {
    const { name, value } = e.target;

    if (!name) return;

    dispatch({ type: "UPDATE_FIELD", name: name as keyof FormValues, value });
  };

  const validation = async (): Promise<boolean> => {
    dispatch({ type: "SET_ERRORS", errors: {} });
    const res = await post<void>(
      "/api/v1/guest-answer/validate",
      values as unknown as Record<string, string>
    );

    if (isError(res)) {
      if (res.status === 422) {
        dispatch({ type: "SET_ERRORS", errors: res.error as FormErrors });
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
      dispatch({ type: "SET_CONFIRM", isConfirm: true });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await post(
      "/api/v1/guest-answer",
      values as unknown as Record<string, string>
    );

    if (isError(res)) {
      console.error(res.error);
      alert(
        "エラーが発生しました。何度も続く場合は主催者に問い合わせてください。"
      );
      return;
    }

    dispatch({ type: "SET_COMPLETE", isComplete: true });
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
          answerFormValues={values}
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
            onClick={() => dispatch({ type: "SET_CONFIRM", isConfirm: true })}
          />
        )}
        {!isComplete && isConfirm && (
          <>
            <FormButton
              color="primary"
              label="入力し直す"
              onClick={() =>
                dispatch({ type: "SET_CONFIRM", isConfirm: false })
              }
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
