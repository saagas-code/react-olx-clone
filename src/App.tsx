import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { HeaderItem } from './components/partials/Header/index';
import { FooterItem } from './components/partials/Footer/index';
import { RequireAuth } from './contexts/RequireAuth';
import { NotFound } from './pages/NotFound/index';
import { SignIn } from './pages/SignIn/index';
import { SignUp } from './pages/SignUp/index';
import { AdPage } from './pages/AdPage/index';
import { useEffect, useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { Add } from './pages/Add/index';
import { Ads } from './pages/Ads/index';
import { Account } from './pages/Account/index';



function App() {
  const auth = useContext(AuthContext);
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if(token) {
        let request = async () => {
            let json = await auth.request(token)
        }
        request() 
    }
  }, [navigate])
  

  return (
      <>
        <HeaderItem />
        
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/minha-conta/:local' element={<RequireAuth><Account/></RequireAuth>} />
          <Route path='/login' element={<SignIn/>} />
          <Route path='/register' element={<SignUp/>} />
          <Route path='/ad/:id' element={<AdPage/>} />
          <Route path='/ads' element={<Ads/>} />

          <Route path='*' element={<NotFound/>} />
          <Route path='/add' element={<RequireAuth><Add/></RequireAuth>} />
        </Routes>

        <FooterItem />
      </>
  );
}

export default App;
