export interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordErrors {
  old?: string;
  mismatch?: string;
  general?: string;
}

export interface ChangePasswordHookData {
  formData: ChangePasswordFormData;
  setFormData: React.Dispatch<React.SetStateAction<ChangePasswordFormData>>;
  showOld: boolean;
  setShowOld: (show: boolean) => void;
  showNew: boolean;
  setShowNew: (show: boolean) => void;
  showConfirm: boolean;
  setShowConfirm: (show: boolean) => void;
  isLoading: boolean;
  errors: ChangePasswordErrors;
  handleChangePassword: () => Promise<void>;
}
