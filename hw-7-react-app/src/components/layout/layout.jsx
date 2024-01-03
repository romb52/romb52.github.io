import Footer from '../footer/Footer';
import Header from '../header/Header';
import { cloneElement } from 'react';



export default function Layout({ children }) {
   
    return (
        <>
            <Header/>
            {cloneElement(children)}
            <Footer />            
        </>)
}