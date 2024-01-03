import { BsFillStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
//import { useState } from 'react';

const RatingStars = ({ rating }) => {
  //const [stars, setStars] = useState(0);

  const roundedRating = parseFloat(rating.toFixed(1));
  console.log(roundedRating);
  const starIcons = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.round(roundedRating)) {
      starIcons.push(<BsFillStarFill key={i} color="#ffbc42" />);
    } else if (roundedRating - i > 0.5) {
      starIcons.push(<BsStarHalf key={i} color="#ffbc42" />);
    } else {
      starIcons.push(<BsStar key={i} color="#ffbc42" />);
    }
  }

  return <div>{starIcons}</div>;
};

export default RatingStars;