import { Link } from 'react-router-dom';
import './Home.css';
import Footer from '../components/Footer';


const Home = () => {
  const movies = [
    { id: 1, title: 'Beauty in Black', image: '/assets/beauty-in-black.jpg' },
    { id: 2, title: 'The Life List', image: '/assets/the-life-list.jpg' },
    { id: 3, title: 'Devil May Cry', image: '/assets/devil-may-cry.jpg' },
    { id: 4, title: 'Adolescence', image: '/assets/adolescence.jpg' },
    { id: 5, title: 'The Electric State', image: '/assets/the-electric-state.jpg' },
    { id: 6, title: 'Squid Game', image: '/assets/squid-game.jpg' },
    { id: 7, title: 'The Twister', image: '/assets/the-twister.jpg' },
    { id: 8, title: 'Counterattack', image: '/assets/counterattack.jpg' }
  ];

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

  return (
    <div className="home font-sans">
    {/* Top Nav */}
    <div className="top-nav">
      <div className="logo">CINENICHE</div>
      <div className="nav-actions">
        {/* Optional: Language dropdown could go here */}
        <Link to="/login" className="sign-in-btn">Sign In</Link>
      </div>
    </div>
    
    

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Unlimited movies, TV shows, and more</h1>
          <h2>Starts at $7.99. Cancel anytime.</h2>
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
            <div key={i} className="feature-card">
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Trending Now */}
      <div className="trending-now">
        <h2>Trending Now</h2>
        <div className="trending-carousel">
          {movies.map((movie) => (
            <div key={movie.id}>
              <img src={movie.image} alt={movie.title} />
              <p className="text-center mt-2">{movie.title}</p>
            </div>
          ))}
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
