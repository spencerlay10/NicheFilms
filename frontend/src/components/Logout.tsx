import { useNavigate } from 'react-router-dom';

const Logout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Logout failed:', response.status);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <a href="#" onClick={handleLogout}>
      {children}
    </a>
  );
};

export default Logout;
