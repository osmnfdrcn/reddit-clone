import { atom } from "recoil";

export interface IAuthenticationModalState {
  open: boolean;
  view: "login" | "signup" | "resetPassword";
}

const defaultModalState: IAuthenticationModalState = {
  open: false,
  view: "login",
};

export const authenticationModalState = atom<IAuthenticationModalState>({
  key: "authenticationModalState",
  default: defaultModalState,
});
