import { Dispatch, SetStateAction } from "react";

export type FormBoxProps = {
  title: string;
  buttonText: string;
  onSubmit: (event: React.FormEvent) => void;
  switchText: string;
  switchPath: string;
  email: string;
  password: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
};
