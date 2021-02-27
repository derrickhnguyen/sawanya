import * as React from "react";
import Carousel, { Modal, ModalGateway } from "react-images";
import Masonry from "react-masonry-css";
import "./App.css";
import images from "./images.json";

function App() {
  const { smallImages, largeImages } = images;

  const [shouldShowHearts, setShouldShowHearts] = React.useState(false);
  const [shouldShowImages, setShouldShowImages] = React.useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  const toggleImageModal = (index) => () => {
    console.log({ index });
    setSelectedImageIndex(index);
    setIsImageModalOpen(!isImageModalOpen);
  };

  const handleOnClick = () => {
    setShouldShowHearts(true);
    const htmlEl = document.querySelector("html");
    const bodyEl = document.querySelector("body");

    htmlEl.style.height = "initial";
    htmlEl.style.width = "initial";
    bodyEl.style.height = "initial";
    bodyEl.style.width = "initial";

    setShouldShowImages(true);
  };

  return (
    <div id="container">
      {!shouldShowHearts ? (
        <div id="intro">
          <h1>My Love ❤</h1>
          <button id="click-me-btn" onClick={handleOnClick}>
            <img
              alt=""
              style={{ borderRadius: "99999px" }}
              src="https://res.cloudinary.com/derrickhnguyen/image/upload/c_fill,h_500,r_max,w_500/v1614459448/sawanya/IMG_0569_copy.jpg"
            />
          </button>
        </div>
      ) : null}
      {shouldShowHearts ? (
        <div className="hearts">
          <div className="heart"></div>
          <div className="heart"></div>
          <div className="heart"></div>
          <div className="heart"></div>
        </div>
      ) : null}
      {shouldShowImages ? (
        <Masonry
          breakpointCols={{ default: 3, 1800: 2, 1200: 1 }}
          className="my-masonry-grid fade-in"
          columnClassName="my-masonry-grid_column"
        >
          {smallImages.map(({ source }, index) => (
            <button
              class="image-btn"
              key={index}
              onKeyUp={(e) => {
                if (e.keyCode === 13) {
                  toggleImageModal(index)();
                }
              }}
              onClick={toggleImageModal(index)}
            >
              <img alt="" src={source} />
            </button>
          ))}
        </Masonry>
      ) : null}
      <ModalGateway>
        {isImageModalOpen && (
          <Modal onClose={toggleImageModal()}>
            <Carousel currentIndex={selectedImageIndex} views={largeImages} />
          </Modal>
        )}
      </ModalGateway>
    </div>
  );
}

export default App;
