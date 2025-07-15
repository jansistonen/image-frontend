import { useEffect, useState } from "react";
import axios from "axios";
import { useSwipeable } from "react-swipeable";

export default function VoteImage() {
  const [currentImage, setCurrentImage] = useState(null);
  const [nextImage, setNextImage] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const fetchRandomImage = async () => {
    const res = await axios.get("https://image-backend-giso.onrender.com/random-image");
    return res.data;
  };

  const preloadNextImage = async () => {
    const img = await fetchRandomImage();
    setNextImage(img);
  };

  const startVote = async (direction) => {
    if (animating || !currentImage) return;

    setSwipeDirection(direction);
    setAnimating(true);

    await axios.post("https://image-backend-giso.onrender.com/vote", {
      id: currentImage.id,
      direction,
    });

    setTimeout(() => {
      setCurrentImage(nextImage);
      setSwipeDirection(null);
      setAnimating(false);
      preloadNextImage();
    }, 500);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => startVote("left"),
    onSwipedRight: () => startVote("right"),
    trackMouse: true,
  });

  useEffect(() => {
    const initImages = async () => {
      const first = await fetchRandomImage();
      const second = await fetchRandomImage();
      setCurrentImage(first);
      setNextImage(second);
    };
    initImages();
  }, []);

  return (
    <div className="vote-image-wrapper" {...swipeHandlers}>
      {nextImage && (
        <img
          src={nextImage.url}
          alt="Seuraava"
          className="swipe-image next-image"
        />
      )}

      {currentImage && (
        <img
          src={currentImage.url}
          alt="Nykyinen"
          className={`swipe-image current-image ${
            swipeDirection === "left"
              ? "swipe-left"
              : swipeDirection === "right"
              ? "swipe-right"
              : ""
          }`}
        />
      )}

      <div className="swipe-buttons">
        <button onClick={() => startVote("left")} className="vote-button red">👎</button>
        <button onClick={() => startVote("right")} className="vote-button green">👍</button>
      </div>
    </div>
  );
}
