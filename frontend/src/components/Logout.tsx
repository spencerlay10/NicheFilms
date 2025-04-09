import { useNavigate } from 'react-router-dom';

const Logout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:5001/logout', {
        method: 'POST',
        credentials: 'include', // important: ensures cookies are sent
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Whether it succeeds or not, route to login
      if (response.ok) {
        console.log('Logged out successfully');
      } else {
        console.warn('Logout may have failed:', response.status);
      }

      navigate('/login', { replace: true });
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
