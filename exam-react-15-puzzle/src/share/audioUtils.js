export const playSound = (soundFile) => {
    const audio = new Audio(`/sound/${soundFile}`);
    audio.play().catch((error) => {      
      console.error('Failed to play sound:', error);
    });
  };