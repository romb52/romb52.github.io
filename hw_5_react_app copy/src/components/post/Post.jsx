// import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { AiFillLike } from "react-icons/ai";
// import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import styles from './Post.module.css';
import { useLocation } from 'react-router-dom';


export default function Post() {
    const location = useLocation();
    const { state } = location;
    console.log(state);
   
}