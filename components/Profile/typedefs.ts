export interface ProfileUserData {
  name: string;
  avatar: string | null;
}

export interface ProfileHookData {
  userData: ProfileUserData;
  setUserData: React.Dispatch<React.SetStateAction<ProfileUserData>>;
  isLoading: boolean;
  handleSave: () => Promise<void>;
  handleDeleteAccount: () => void;
}
