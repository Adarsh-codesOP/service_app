export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  username: string;
  contact: string;
  created_at: string;
}

export interface AuthError {
  message: string;
} 