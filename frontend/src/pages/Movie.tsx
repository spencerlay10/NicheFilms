import { Link } from 'react-router-dom';
import './Home.css';
import Footer from '../components/Footer';
import Header from '../components/Header'; // ✅ added

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
    <>
      <Header username="Rex" /> {/* ✅ inserted Header for testing */}

      <div className="home font-sans">



    <h1>Movie Stuff</h1>
    <h1>Movie Stuff</h1>
    <h1>Movie Stuff</h1>
    <h1>Movie Stuff</h1>
    <h1>Movie Stuff</h1>
    <h1>Movie Stuff</h1>
    <h1>Movie Stuff</h1>
    <h1>Movie Stuff</h1>
    <h1>Movie Stuff</h1>
    <h1>Movie Stuff</h1>
    <h1>Movie Stuff</h1>
    <h1>Movie Stuff</h1>
    <h1>Movie Stuff</h1>
    <h1>Movie Stuff</h1>
    <h1>Movie Stuff</h1>
    <h1>Movie Stuff</h1>
    



        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
