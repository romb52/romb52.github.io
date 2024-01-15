import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Image from '../../components/Image/Image';
import { withLayout } from '../../components/Main/Main';
import { getImagesArr } from '../../share/reducers/images.reducer';
import { setActiveCards } from '../../share/reducers/activeImages.reducer';

function Home() {
  //const [activeCards, setActiveCards] = useState(-1);
  const activeCards = useSelector(state => state.activeImages);
  const images = useSelector((state) => state.images);
  const dispatch = useDispatch();
  const changeActiveCard = (image) => {
    dispatch(setActiveCards(image));
  };
  useEffect(() => {
    dispatch(getImagesArr());
  }, []);

  return (
    <section>
      <div className='container home-container'>
        {images.map((image, index) => (
          <Image
            key={`${image}-${index}`}
            isOpen={activeCards.includes(image) ? true : false}
            src={image}
            changeActiveCard={changeActiveCard}
          />
        ))}
      </div>
    </section>
  );
}

export default withLayout(Home);
