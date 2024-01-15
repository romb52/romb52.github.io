import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Image from '../../components/Image/Image';
import { withLayout } from '../../components/Main/Main';
import { getImagesArr } from '../../share/reducers/images.reducer';
import { setActiveCards } from '../../share/reducers/activeImages.reducer';

function Home() {
  const activeCards = useSelector((state) => state.activeImages);
  const images = useSelector((state) => state.images);
  const dispatch = useDispatch();

  const changeActiveCard = (image) => {
    dispatch(setActiveCards(image));
  };

  useEffect(() => {
    dispatch(getImagesArr());
  }, [dispatch]);

  console.log(activeCards);
  console.log(images);



  return (
    <section>
      <div className='container home-container grid'>
        {images.map((image, index) => (
          <div key={`${image}-${index}`} className='grid-item'>
            <Image
              isOpen={activeCards.includes(image) }
              src={image}
              changeActiveCard={() => changeActiveCard(image)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default withLayout(Home);