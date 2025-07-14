import "./index.css";
import ImageUpload from "./components/ImageUpload";
import ImageSearch from "./components/ImageSearch";
import VoteImage from "./components/VoteImage";

function App() {
  return (
    <div className="app-container">
      <h1 style={{ textAlign: "center" }}>🖼️ Kuvaäänestys</h1>
      <VoteImage />
      <hr />
      <ImageUpload />
      <hr />
      <ImageSearch />
    </div>
  );
}

export default App;
