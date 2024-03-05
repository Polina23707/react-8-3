import { useState } from "react"
import { AuthContext } from "./AuthContext";
import { useContext } from "react";


interface IForm {
  login: string,
  password: string,
}

export default function AuthForm() {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const {token, setToken} = useContext(AuthContext);

  const onSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const formData: IForm = {
      login: login,
      password: password,
    }

    const postData = async (url: string, formData: IForm) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(formData),
        })
        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
          }
          throw new Error(response.statusText);
        }
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } catch (e: any) {
        console.error('Error: ' + e);
      } 
    }
    postData('http://localhost:7070/auth', formData);
  }

  return(
    <AuthContext.Consumer>
      {({}) => (
        <form className='form'>
          <input value={login} type='text' placeholder='Username' required onChange={e => setLogin(e.target.value)}></input>
          <input value={password} type='text' id='password' placeholder='Password' required onChange={e => setPassword(e.target.value)}></input>
          <button onClick={onSubmit}>Login</button>
        </form>
      )}
    </AuthContext.Consumer>
  )
}