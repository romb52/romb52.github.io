import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Image from '../../components/Image/Image';
import { withLayout } from '../../components/Main/Main';
import { getImagesArr } from '../../share/reducers/images.reducer';
import { setActiveCards, resetLastTwoActiveCards } from '../../share/reducers/activeImages.reducer';
import { updateGameTime, updateClickCount } from '../../share/reducers/game.reducer';
import { playSound } from '../../share/audioUtils';

function Home() {
  const wrongCard = 'negative.mp3';
  const startGame = 'shuffle-cards.mp3';
  const showCard = 'flipcard.mp3';
  const winGame = 'success-fanfare.mp3';

  const activeCards = useSelector((state) => state.activeImages);
  const images = useSelector((state) => state.images);
  const dispatch = useDispatch();

  const gameTime = useSelector((state) => state.game.gameTime);
  const clickCount = useSelector((state) => state.game.clickCount);

  const changeActiveCard = (image, index) => {
    //console.log(image, index);
    dispatch(setActiveCards({ image, index }));
    dispatch(updateClickCount(clickCount + 1));
    playSound(showCard);
  };

  useEffect(() => {                                  //  update the game time
    if (clickCount > 0) {
      const interval = setInterval(() => {
        if (activeCards.length === 12) {
          playSound(winGame);
          clearInterval(interval);
        } else {
          dispatch(updateGameTime(gameTime + 1));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameTime, activeCards, clickCount, dispatch]);


  useEffect(() => {                          //get random hided img
    dispatch(getImagesArr());
    playSound(startGame);
  }, [dispatch]);


  useEffect(() => {
    if (activeCards.length >= 2 && activeCards.length % 2 === 0) {
      const [penultimateCard, lastCard] = activeCards.slice(-2);
      if (
        (penultimateCard.image !== lastCard.image) ||
        (penultimateCard.image === lastCard.image && penultimateCard.index === lastCard.index)
      ) {
        setTimeout(() => {
          dispatch(resetLastTwoActiveCards());
          playSound(wrongCard);
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