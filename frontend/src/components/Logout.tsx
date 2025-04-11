import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../api/config';

const Logout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Regardless of success/failure, we want to route the user back to login
      if (response.ok) {
        // Optional: Clear frontend auth state here if you have context/state
        // Example: setAuthUser(null)

        // Ensure the cookie is cleared with the correct options
        Cookies.remove('.AspNetCore.Identity.Application', { path: '/', sameSite: 'None', secure: true });

        navigate('/login', { replace: true }); // Ensure clean history stack
      } else {
        console.error('Logout failed:', response.status);
        navigate('/login', { replace: true }); // Still route back
      }
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login', { replace: true });
    }
  };

  return (
    <a href="#" onClick={handleLogout}>
      {children}
    </a>
  );
};

export default Logout;
