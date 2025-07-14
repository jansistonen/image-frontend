import { useState } from "react";
import axios from "axios";

export default function ImageSearch() {
  const [id, setId] = useState("");
  const [imageData, setImageData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    if (!id.trim()) return;

    try {
      const res = await axios.get(`https://image-backend-k3uq.onrender.com/image/${id}`);
      setImageData(res.data);
      setNotFound(false);
    } catch (err) {
      setImageData(null);
      setNotFound(true);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Syötä kuvan ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="border p-2 w-full"
      />
      <button onClick={handleSearch} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Hae kuva
      </button>

      {notFound && <p className="mt-4 text-red-600">Kuvaa ei löytynyt.</p>}

      {imageData && (
        <div className="mt-4">
          <img src={imageData.url} alt="Haettu kuva" className="responsive-image" />
          {imageData.percentage !== null ? (
            <p className="mt-2">👍 {imageData.percentage}% käyttäjistä äänesti jatkoon</p>
          ) : (
            <p className="mt-2">Ei vielä ääniä.</p>
          )}
        </div>
      )}
    </div>
  );
}
