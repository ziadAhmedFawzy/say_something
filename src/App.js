import './style/App.css'
import Card from "./component/card"
import { useEffect, useState } from 'react'
export default function App() {
  const [title,setTitle] = useState('');
  const [desc,setDesc] = useState('');
  const [data,setData] = useState([])

  const HandleSubmit = (e) => {
    e.preventDefault();
    // send-opinions
    fetch("https://server-eta-pied-79.vercel.app/send-opinions", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title: title,
          description: desc,
      })
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("هناك مشكلة في إرسال البيانات!");
        }
        return res.json();
    })
    .then(() => {
        setTitle("");
        setDesc("");
    })
    .catch((err) => {
        console.log(err);
    });

  };

  useEffect(() => {
    fetch("https://server-eta-pied-79.vercel.app/get-opinions", {
      method: "GET",
      headers: {
        "Content-Type":"application/json",
      }
    }).then((response) => {
      if(!response.ok) {
        throw new Error("you have probelm to GET request!");
      }
      return response.json();
    })
    .then((data) => setData(data))
  }, [])

  return (
    <div className="container">
      <h1>say something!</h1>
      <form onSubmit={HandleSubmit}>
        <div>
          <label htmlFor="title">title</label>
          <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          type="text" 
          id="title" 
          minLength='5' />
        </div>
        <div>
          <label htmlFor="thinking">What are you thinking?</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} maxLength='1000' placeholder="write untill 1000 characters" id="thinking"></textarea>
        </div>
        <div className='send'>
          <button type='submit'>post</button>
        </div>
      </form>
      <div className="show">
        <h3 style={{textAlign: "center", cursor: 'default'}}>show opinions</h3>
        {data.map((e,i) => 
          <Card key={i} title={e.title} description={e.description} />
        )}
      </div>
    </div>
  )
}