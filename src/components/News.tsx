import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
// import { useContext } from "react";
import NewsItem from "./NewsItem";

export default function News() {
  // const {profile, setProfile, token, setToken} = useContext(AuthContext);

  const [news, setNews] = useState([]);

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
        setNews(data);
      } catch (e: any) {
        console.error('Error: ' + e);
      } 
    }
    getData('http://localhost:7070/private/news', localStorage.token);
  }, [])

  return(
    <AuthContext.Consumer>
      {({}) => (
        <div className='news'>
          {news.map((item) => <NewsItem key={item.id} item={item}/>)}
        </div>
      )}
    </AuthContext.Consumer>
  )
}