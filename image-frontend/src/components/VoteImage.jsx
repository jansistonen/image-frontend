import { useEffect, useState } from "react";
import axios from "axios";
import { useSwipeable } from "react-swipeable";

export default function VoteImage() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomImage = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://image-backend-giso.onrender.com/random-image");
      setImage(res.data);
    } catch (err) {
      console.error("Failed to fetch image", err);
      setImage(null);
    } finally {
      setLoading(false);
    }
  };

  const sendVote = async (direction) => {
    if (!image) return;
    await axios.post("https://image-backend-giso.onrender.com/vote", {
      id: image.id,
      direction,
    });
    fetchRandomImage();
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => sendVote("left"),
    onSwipedRight: () => sendVote("right"),
    trackMouse: true,
  });

  if (loading) return <p>Ladataan kuvaa...</p>;
  if (!image) return <p>Ei kuvia saatavilla.</p>;

  return (
    <div {...swipeHandlers} className="vote-container">
      <img
        src={image.url}
        alt="Äänestettävä"
        className="responsive-image fade-in"
      />
      <div className="button-row">
        <button onClick={() => sendVote("left")} className="vote-button red">👎</button>
        <button onClick={() => sendVote("right")} className="vote-button green">👍</button>
      </div>
    </div>
  );
}
