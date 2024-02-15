export const playSound = (soundFile) => {
    const audio = new Audio(`/sound/${soundFile}`);
    audio.play().catch((error) => {      
      console.error('Failed to play sound:', error);
    });
  };

  export const soundNames = {       //звукові ефекти
    makeMove: 'flipcard.mp3',
    winGame: 'success-fanfare.mp3'
};