export interface ForgotPasswordFormData {
  email: string;
  newPassword: string;
}

export interface ForgotPasswordHookData {
  formData: ForgotPasswordFormData;
  setFormData: React.Dispatch<React.SetStateAction<ForgotPasswordFormData>>;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  isLoading: boolean;
  handleReset: () => Promise<void>;
}
