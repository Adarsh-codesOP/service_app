import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const supabase = createBrowserSupabaseClient();

export const navigation = {
  home: '/',
  login: '/login',
  signup: '/signup',
};

export const handleAuth = () => {
  const router = useRouter();

  const redirectToLogin = () => {
    router.push(navigation.login);
  };

  const redirectToHome = () => {
    router.push(navigation.home);
  };

  const checkAuth = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        redirectToLogin();
        return false;
      }
      return true;
    } catch (error) {
      console.error('Auth check failed:', error);
      redirectToLogin();
      return false;
    }
  };

  return {
    redirectToLogin,
    redirectToHome,
    checkAuth,
  };
};

export default navigation; 