

export default function NewsItem({item}) {
  return(
    <div className='news-item'>
      <img src={item.image}></img>
      <div>{item.title}</div>
      <div>{item.content}</div>
    </div>
  )
}