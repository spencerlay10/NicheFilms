import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const CreateAccount: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      setError('');
      try {
        const response = await fetch('https://nichemovies-backend-byaza8g5hffjezf4.eastus-01.azurewebsites.net/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          navigate('/login');
        } else {
          setError('Error registering. Try a different email.');
        }
      } catch (err) {
        console.error(err);
        setError('Error registering. Please try again later.');
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/52b3d4d0-5eb6-42e6-9427-5025a5fa98d8/00dfecba-3ff3-4d1e-a9e8-fb281bb33f4b/US-en-20240401-popsignuptwoweeks-perspective_alpha_website_medium.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        paddingTop: '60px',
        paddingBottom: '80px',
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 0,
        }}
      />

      {/* Create Account Box */}
      <div
        style={{
          position: 'relative',
          backgroundColor: 'rgba(0,0,0,0.75)',
          padding: '60px 68px 40px',
          borderRadius: '6px',
          width: '320px',
          zIndex: 1,
          boxShadow: '0 0 15px rgba(0,0,0,0.4)',
          marginBottom: '60px',
        }}
      >
        <h1 style={{ marginBottom: '25px' }}>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              backgroundColor: '#333',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              backgroundColor: '#333',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
            }}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              backgroundColor: '#333',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#8E3BFC',
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '4px',
              marginBottom: '15px',
              cursor: 'pointer',
            }}
          >
            Sign Up
          </button>

          {error && (
            <p style={{ color: '#e87c03', marginBottom: '15px' }}>{error}</p>
          )}

          <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
            Already have an account?{' '}
            <a
              href="/login"
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              Sign in now
            </a>
            .
          </div>

          {/* Back to Home Button */}
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#444',
              color: '#fff',
              border: '1px solid #666',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ← Back
          </button>
        </form>
      </div>

      {/* Footer */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <Footer />
      </div>
    </div>
  );
};

export default CreateAccount;
