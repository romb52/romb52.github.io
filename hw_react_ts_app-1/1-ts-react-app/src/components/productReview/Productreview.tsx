//import styles from './Productreview.module.css';
import React from 'react';


interface ReviewItem {
    reviewAutor: string;
    reviewDate: string;
    reviewText: string;
  }
  
  interface ProductReviewProps {
    productReview: ReviewItem[];
  }
  
  const Productreview: React.FC<ProductReviewProps> = ({ productReview }) => {
    return (
        <div>
      {/* <div className={styles.productRev}> */}
        <span>Рецензії:</span>
        <ul>
          {productReview.map((item, i) => (
            <li key={`${i + 1}-${item.reviewAutor}`}>
              <h4>{item.reviewAutor}</h4>
              <p>{item.reviewDate}</p>
              <p>{item.reviewText}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Productreview;