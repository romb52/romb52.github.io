import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiFillLike } from "react-icons/ai";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import styles from './Post.module.css';

export default function Post() {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [isLoading, setIsLoading] = useState(true); 
    
    useEffect(() => {
        async function getPosts() {
            try {
                const res = await axios.get(`https://dummyjson.com/posts/${id}`);
                setPost(res.data);      
                setIsLoading(false);         
            } catch (error) {
                console.error('Error fetching post:', error); 
                setIsLoading(false);    
                window.location.href = '/404';                             
            }         
        }
        getPosts();        
      }, [id]);  
      
  
    return <>
 {!isLoading && Object.keys(post).length > 0 && (
    <section>
        <div className="container">
            <h1>Post { id }</h1>            
            <div className={styles.post} key={post.id}>
              
                <h3>{post.title}</h3>
                <p>
                  {post.body}
                </p>  
                <p>
                  {post.tags && post.tags.map((tag, index) => (
                    <span className={styles.tags} key={index}>
                      #{tag}
                      {index !== post.tags.length - 1 && " "}
                    </span>
                  ))}
                </p>              
                <p className={styles.likes}><AiFillLike size={20} />{post.reactions}</p>
                <Link to='/posts'><Button  variant="primary">Back to all posts.</Button></Link>                
             
            </div> 
        </div>
    </section>
     )}
    </>
}