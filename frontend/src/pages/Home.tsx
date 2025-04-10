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

// Define FAQ interface
interface FAQ {
  question: string;
  answer: string;
}

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  // Add state to track which FAQ is open (null means none are open)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const features = [
    'Unite with other niche viewers',
    'Enjoy personal recommendations',
    'Watch on your favorite devices',
    'Stories tailored to your taste'
  ];

  const faqs: FAQ[] = [
    {
      question: 'What is CineNiche\'s niche?',
      answer: 'We specialize in independent films, documentaries, international movies, and cult classics – all personalized to your unique taste.'
    },
    {
      question: 'How much does CineNiche cost?',
      answer: 'CineNiche plans start at $5.97 per month. No extra costs, no contracts, cancel anytime.'
    },
    {
      question: 'Where can I watch?',
      answer: 'Watch anywhere, anytime. Sign in with your CineNiche account to watch instantly on the web from your personal computer or on any internet-connected device with the CineNiche app, including smart TVs, smartphones, tablets, streaming media players and game consoles.'
    },
    {
      question: 'How do I cancel?',
      answer: 'CineNiche is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.'
    },
    {
      question: 'How can I discover new content on CineNiche?',
      answer: 'CineNiche has an extensive library of international films, documentaries, cult classics, indies, and more. Our algorithm learns from your viewing habits to recommend content that matches your unique taste.'
    },
    {
      question: 'Is CineNiche good for kids?',
      answer: 'The Kids experience is included in your membership to give parents control while kids enjoy family-friendly content. Kids profiles feature PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don\'t want kids to see.'
    }
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

  // Function to toggle FAQ open/close
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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
          <p>We're lucky you found us. Ready to explore?</p>
          <div className="hero-input">
            <Link to="/createAccount" className="get-started-btn" style={{ padding: '1rem 2rem', fontSize: '1.25rem' }}>
              Dive in →
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
        {faqs.map((faq, i) => (
          <div key={i} className="faq-container">
            <div className="faq-item" onClick={() => toggleFaq(i)}>
              <p>{faq.question}</p>
              <div className={`faq-icon ${openFaqIndex === i ? 'open' : ''}`}></div>
            </div>
            <div className={`faq-answer ${openFaqIndex === i ? 'open' : ''}`}>
              <div className="faq-answer-content">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem' }}>
            Ready to watch? Create or restart your membership.
          </p>
          <div className="hero-input" style={{ justifyContent: 'center' }}>
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