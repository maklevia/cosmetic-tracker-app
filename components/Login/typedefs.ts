import { LoginCredentials } from "@/api/types/auth";

export interface LoginFormData extends LoginCredentials {}

export interface LoginHookData {
  formData: LoginFormData;
  setFormData: React.Dispatch<React.SetStateAction<LoginFormData>>;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  isLoading: boolean;
  handleLogin: () => Promise<void>;
}
