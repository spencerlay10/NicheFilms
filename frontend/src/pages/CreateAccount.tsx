import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const CreateAccount: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') {
      setPassword(value);
      updatePasswordStrength(value);
    }
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const updatePasswordStrength = (pwd: string) => {
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[!@#$%^&*]/.test(pwd);
    const isLong = pwd.length >= 8;

    const score = [hasUpper, hasLower, hasNumber, hasSpecial, isLong].filter(Boolean).length;

    if (score <= 2) setPasswordStrength('Weak');
    else if (score === 3 || score === 4) setPasswordStrength('Moderate');
    else if (score === 5) setPasswordStrength('Strong');
    else setPasswordStrength('');
  };

  const isPasswordStrong = (pwd: string) => {
    return (
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&
      /[a-z]/.test(pwd) &&
      /\d/.test(pwd) &&
      /[!@#$%^&*]/.test(pwd)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else if (!isPasswordStrong(password)) {
      setError(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
      );
    } else {
      setError('');
      setSuccess('');
      setLoading(true);
      try {
        const response = await fetch(
          'https://nichemovies-backend-byaza8g5hffjezf4.eastus-01.azurewebsites.net/register',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          }
        );

        if (response.ok) {
          setSuccess('Account created successfully! Redirecting to login...');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setPasswordStrength('');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError('Error registering. Try a different email.');
        }
      } catch (err) {
        console.error(err);
        setError('Error registering. Please try again later.');
      } finally {
        setLoading(false);
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

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '400px',
          width: '100%',
          padding: '2rem',
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderRadius: '8px',
        }}
      >
        <h1>Create Your Account</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
          {password && (
            <p>Password strength: <strong>{passwordStrength}</strong></p>
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'lime' }}>{success}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default CreateAccount;
