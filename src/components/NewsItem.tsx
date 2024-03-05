export interface INewsItem {
  image: string,
  title: string,
  content: string,
  id: string,
}

export default function NewsItem({...item}: INewsItem) {
  return(
    <div className='news-item'>
      <img src={item.image}></img>
      <div>{item.title}</div>
      <div>{item.content}</div>
    </div>
  )
}