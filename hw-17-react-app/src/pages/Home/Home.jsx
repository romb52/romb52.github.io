import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Image from '../../components/Image/Image';
import { withLayout } from '../../components/Main/Main';
import { getImagesArr } from '../../share/reducers/images.reducer';
import { setActiveCards, resetActiveCards } from '../../share/reducers/activeImages.reducer';

function Home() {
  const activeCards = useSelector((state) => state.activeImages);
  const images = useSelector((state) => state.images);
  const dispatch = useDispatch();

  const changeActiveCard = (image, index) => {
    //console.log(image, index);
    dispatch(setActiveCards({ image, index }));
  };

  useEffect(() => {
    dispatch(getImagesArr());
  }, [dispatch]);

  useEffect(() => {   
    if (activeCards.length >= 2 && activeCards.length % 2 === 0) {
      const [penultimateCard, lastCard] = activeCards.slice(-2);     
      if (
        (penultimateCard.image !== lastCard.image) ||
        (penultimateCard.image === lastCard.image && penultimateCard.index === lastCard.index)
      ) {        
        setTimeout(() => {
          dispatch(resetActiveCards());
        }, 1000);
      }
    }
  }, [activeCards, dispatch]);


 // console.log(activeCards);
 // console.log(images);

  return (
    <section>
      <div className='container home-container grid'>
        {images.map((image, index) => (
          <div key={`${image}-${index}`} className='grid-item'>
            <Image
              isOpen={activeCards.some(card => card.image === image && card.index === index)}
              src={image}
              changeActiveCard={() => changeActiveCard(image, index)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}



export default withLayout(Home);