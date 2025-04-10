import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Footer from '../components/Footer';
import logo from '../assets/CNICHE.png';
import { API_BASE_URL } from '../api/config';

// Define the Movie interface based on backend response
interface Movie {
  showId: string;
  title: string;
  posterUrl: string;
  averageRating: number;
  ratingCount: number;
}

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  const features = [
    'Cancel or switch plans anytime',
    'A safe place just for kids',
    'Watch on your favorite devices',
    'Stories tailored to your taste'
  ];

  const faqs = [
    'What is CineNiche?',
    'How much does CineNiche cost?',
    'Where can I watch?',
    'How do I cancel?',
    'What can I watch on CineNiche?',
    'Is CineNiche good for kids?'
  ];

  // 🔁 Dynamic Phrase Rotation
  const phrases = [
    'international masterpiece',
    'cult classic',
    'documentary',
    'independent film'
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setFade(true);
      }, 300); // timing must match CSS fade-out duration
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/Home/top-rated`);
        if (!response.ok) throw new Error('Failed to fetch trending movies');
        const data = await response.json();
        setTrendingMovies(data);
      } catch (err) {
        console.error('Error fetching trending movies:', err);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className="home font-sans">
      {/* Top Nav */}
      <div className="top-nav">
        <div className="logo"><img src={logo} alt="App Logo" className="logo-image" /></div>
        <div className="nav-actions">
          <Link to="/login" className="sign-in-btn">Sign In</Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
        <h1 className="hero-title">
          <span className="static-text">Find your next</span>
          <span className="dynamic-wrapper">
            <span className={`dynamic-word ${fade ? 'fade-in' : 'fade-out'}`}>
              &nbsp;{phrases[phraseIndex]}
            </span>
          </span>
        </h1>


          <h2>Starts at $5.97. Cancel anytime.</h2>
          <p>Ready to watch? Enter your email to create or restart your membership.</p>
          <div className="hero-input">
            <input type="email" placeholder="Email address" />
            <Link to="/createAccount" className="get-started-btn">
              Get Started →
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="features">
        <h2>More Reasons to Join</h2>
        <div className="features-grid">
          {features.map((text, i) => (
            <div key={i} className="feature-card">{text}</div>
          ))}
        </div>
      </div>

      {/* Trending Now */}
      <div className="trending-now">
        <h2>Trending Now</h2>
        <div className="trending-carousel">
          {trendingMovies.length > 0 ? (
            trendingMovies.map((movie) => (
              <div key={movie.showId} className="trending-item">
                <img src={movie.posterUrl} alt={movie.title} />
                <p className="text-center mt-2 font-semibold">{movie.title}</p>
                <p className="text-sm text-gray-400 text-center">
                  ⭐ {movie.averageRating.toFixed(1)} ({movie.ratingCount} ratings)
                </p>
              </div>
            ))
          ) : (
            <p>Loading trending movies...</p>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((question, i) => (
          <div key={i} className="faq-item">
            <p>{question}</p>
            <span>+</span>
          </div>
        ))}
        <div className="hero-input" style={{ marginTop: '2rem' }}>
          <p style={{ marginBottom: '0.5rem' }}>
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          <div className="hero-input">
            <input type="email" placeholder="Email address" />
            <Link to="/createAccount" className="get-started-btn">
              Get Started →
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
