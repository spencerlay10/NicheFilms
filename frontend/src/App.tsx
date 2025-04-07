import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import CreateAccount from './pages/CreateAccount';
// import Login from './pages/Login';
// import Movie from './pages/Movie';
// import Privacy from './pages/Privacy';
// import ProductDetail from './pages/ProductDetail';



function App() {
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="login" element={<Login />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/productDetail" element={<ProductDetail />} />
        <Route path="/createAccount" element={<CreateAccount />} /> */}
      </Routes>

    </div>
  )
}

export default App
