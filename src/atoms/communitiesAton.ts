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

export interface ICommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

export interface ICommunityState {
  mySnippets: ICommunitySnippet[];
}

const defaultCommunityState: ICommunityState = {
  mySnippets: [],
};

export const communityState = atom<ICommunityState>({
  key: "communityState",
  default: defaultCommunityState,
});
