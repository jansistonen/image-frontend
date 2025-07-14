import { useEffect, useState } from "react";
import axios from "axios";

export default function VoteImage() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomImage = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://image-backend-giso.onrender.com/random-image");//https://image-backend-k3uq.onrender.com
      
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

    try {
      await axios.post("https://image-backend-giso.onrender.com/vote", {//https://image-backend-k3uq.onrender.com
        
        id: image.id,
        direction,
      });
      fetchRandomImage(); // Näytä uusi kuva
    } catch (err) {
      console.error("Failed to vote", err);
    }
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  if (loading) return <p className="text-center">Ladataan kuvaa...</p>;
  if (!image) return <p className="text-center text-red-600">Ei kuvia saatavilla.</p>;

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <img src={image.url} alt="Äänestettävä" className="responsive-image" />
      <div className="flex justify-between gap-4">
        <button
          onClick={() => sendVote("left")}
          className="bg-red-500 text-white px-4 py-2 rounded w-1/2"
        >
          👎 Ei jatkoon
        </button>
        <button
          onClick={() => sendVote("right")}
          className="bg-green-500 text-white px-4 py-2 rounded w-1/2"
        >
          👍 Jatkoon
        </button>
      </div>
    </div>
  );
}
