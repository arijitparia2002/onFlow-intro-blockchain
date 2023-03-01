import React, { useState, useEffect } from "react";

function PhotoGallery({image}) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const searchQuery = image;
    const apiKey = "AIzaSyAKjK3G5WIcxr6m4NrcaVew-rMO7fP0A60";
    const searchEngineId = "b47a1ea0a1d994370";
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${searchQuery}&searchType=image&num=6`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const photoUrls = data.items.map((item) => item.link);
        setPhotos(photoUrls);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="grid grid-flow-row text-center">
      <h2 className="text-3xl font-bold my-3 py-4 mb-8">Your Pictures</h2>
      <div className="grid grid-cols-3 gap-4 p-10 m-8">
        {photos.map((photo) => (
          <img key={photo} src={photo} alt="" />
        ))}
      </div>
    </div>
  );
}

export default PhotoGallery;
