import { useEffect, useState } from 'react'
import './App.css'
import AuthForm from './components/AuthForm'
import UserHeader from './components/UserHeader'
import { AuthContext } from './components/AuthContext'
import Landing from './components/Landing'
import News from './components/News'

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState({
      avatar:'',
      id: '',
      login: '',
      name: '',
    });

  return(
    <AuthContext.Provider value={{token, setToken, profile, setProfile}}>
      <header className='header'>
        <div>Neto Social</div>
        {(!token && !localStorage.token) && <AuthForm />}
        {(!!token || !!localStorage.token) && <UserHeader />}
      </header>
      <main>
        {(!token && !localStorage.token) && <Landing />}
        {(!!token || !!localStorage.token) && <News />}
      </main>
    </AuthContext.Provider>
  )
}

export default App
