import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface ICommunity {
  id: string;
  categoryId: string;
  numberOfMembers: number;
  privacyType: "public" | "private" | "restricted";
  createdAt?: Timestamp;
  imageURL?: string;
}
