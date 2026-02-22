export type FormValues = {
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
};

export type FormErrors = {
  [K in keyof FormValues]?: string | string[];
};

export type FormState = {
  values: FormValues;
  errors: FormErrors;
  isConfirm: boolean;
  isComplete: boolean;
};

export type FormAction =
  | { type: "UPDATE_FIELD"; name: keyof FormValues; value: string }
  | { type: "SET_ERRORS"; errors: FormErrors }
  | { type: "SET_CONFIRM"; isConfirm: boolean }
  | { type: "SET_COMPLETE"; isComplete: boolean };

export const initialState: FormState = {
  values: {
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
  },
  errors: {},
  isConfirm: false,
  isComplete: false,
};

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        values: {
          ...state.values,
          [action.name]: action.value,
        },
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };
    case "SET_CONFIRM":
      return {
        ...state,
        isConfirm: action.isConfirm,
      };
    case "SET_COMPLETE":
      return {
        ...state,
        isComplete: action.isComplete,
        isConfirm: false,
      };
    default:
      return state;
  }
}
