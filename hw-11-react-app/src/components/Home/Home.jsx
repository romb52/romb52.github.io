import { useState, useEffect } from "react";

export default function Home() {
  const [username, setUsername] = useState('');
  useEffect(() => {
    setUsername(localStorage.getItem('username')||localStorage.getItem('email'));
  }, []);
  return (
    <div className='container'>
      <h1>Hello {username}</h1>
    </div>
  );
}
