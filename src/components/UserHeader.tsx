import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { useContext } from "react";

export default function UserHeader() {
  const {profile, setProfile, token, setToken} = useContext(AuthContext);

  useEffect(() => {
    const getData = async (url: string, token: string) => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {Authorization: `Bearer ${token}`},
        })
        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
          }
          throw new Error(response.statusText);
        }
        const data = await response.json();
        // console.log(data);
        setProfile(data);
      } catch (e: any) {
        console.error('Error: ' + e);
      } 
    }
    getData('http://localhost:7070/private/me', localStorage.token);
  }, [])

  const onLogout = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    localStorage.removeItem('token');

    setToken(null);
    setProfile({
        avatar:'',
        id: '',
        login: '',
        name: '',
    });
  }

  return(
    <AuthContext.Consumer>
      {({token, setToken, profile, setProfile}) => (
        <div className='header-profile'>
          <div>Hello, {profile.name}</div>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </AuthContext.Consumer>
  )
}