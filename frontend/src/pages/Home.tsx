import './Home.css';


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
      <div className="bg-black text-white font-sans">
        {/* Hero Section */}
        <div className="relative h-screen flex flex-col justify-center items-center text-center bg-cover bg-center" style={{ backgroundImage: `url('/assets/netflix-background.jpg')` }}>
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="relative z-10 max-w-2xl px-4">
            <h1 className="text-5xl font-bold mb-4">Unlimited movies, TV shows, and more</h1>
            <h2 className="text-xl mb-6">Starts at $7.99. Cancel anytime.</h2>
            <p className="mb-4">Ready to watch? Enter your email to create or restart your membership.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="px-4 py-3 w-72 rounded-md text-black"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold">
                Get Started →
              </button>
            </div>
          </div>
        </div>
  
        {/* Feature Callout */}
        <div className="bg-gray-900 py-10 px-4 text-center">
          <h2 className="text-2xl mb-6">More Reasons to Join</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((text, i) => (
              <div key={i} className="bg-gray-800 p-4 rounded-md">
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Trending Now Section */}
        <div className="py-10 px-6">
          <h2 className="text-3xl font-bold mb-6">Trending Now</h2>
          <div className="flex gap-4 overflow-x-auto">
            {movies.map((movie, i) => (
              <div key={movie.id} className="min-w-[160px]">
                <img src={movie.image} alt={movie.title} className="rounded-md w-full h-60 object-cover" />
                <p className="text-center mt-2 font-medium">{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* FAQ Section */}
        <div className="bg-black py-10 px-4 max-w-3xl mx-auto">
          <h2 className="text-2xl text-center mb-6">Frequently Asked Questions</h2>
          {faqs.map((question, i) => (
            <div key={i} className="bg-gray-800 rounded-md mb-3 px-4 py-3 cursor-pointer hover:bg-gray-700">
              <div className="flex justify-between items-center">
                <p>{question}</p>
                <span className="text-xl font-bold">+</span>
              </div>
            </div>
          ))}
          <div className="mt-8 text-center">
            <p className="mb-4">Ready to watch? Enter your email to create or restart your membership.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="px-4 py-3 w-72 rounded-md text-black"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold">
                Get Started →
              </button>
            </div>
          </div>
        </div>
  
        {/* Footer */}
        <footer className="bg-black text-sm text-gray-400 py-10 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
            {['FAQ', 'Help Center', 'Account', 'Media Center', 'Investor Relations', 'Jobs', 'Netflix Shop', 'Redeem Gift Cards', 'Buy Gift Cards', 'Ways to Watch', 'Terms of Use', 'Privacy', 'Cookie Preferences', 'Corporate Information', 'Contact Us', 'Ad Choices'].map((link, i) => (
              <a key={i} href="#" className="hover:underline">
                {link}
              </a>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p>Questions? Call <a href="tel:1-800-123-4567" className="underline">1-800-123-4567</a></p>
            <button className="mt-2 px-4 py-2 border border-gray-500 rounded">🌐 English</button>
          </div>
        </footer>
      </div>
    );
  };
  
  export default Home;
