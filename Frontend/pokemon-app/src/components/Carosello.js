import React, { useState, useEffect } from 'react';
import 'bootstrap';
import './Carousel.css'; // Assicurati di creare e importare questo file CSS

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const captions = [
    {
      title: "Gabbo",
      subtitle: "Il ragazzo che cerca la ragazza",
    },
    {
      title: "Tizi",
      subtitle: "Il ragazzo che ha sempre un drink in mano in discoteca",
    },
    {
      title: "Sami",
      subtitle: "Il ragazzo che sta fresco in ospedale dopo aver sentito ITALIA UNO",
    },
    {
      title: "Max",
      subtitle: "Il ragazzo sempre carico a PALLETTONI",
    },
  ];

  useEffect(() => {
    const carouselElement = document.getElementById('carouselExampleCaptions');
    const handleSlide = (event) => {
      setCurrentSlide(event.to);
    };

    carouselElement.addEventListener('slide.bs.carousel', handleSlide);

    return () => {
      carouselElement.removeEventListener('slide.bs.carousel', handleSlide);
    };
  }, []);

  return (
    <div>
      <div id="carouselExampleCaptions" className="carousel carousel-dark slide" data-bs-ride="carousel" data-bs-interval="10000">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/287.png" className="d-block w-50 mx-auto" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png" className="d-block w-50 mx-auto" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/143.png" className="d-block w-50 mx-auto" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/068.png" className="d-block w-50 mx-auto" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="carousel-caption-container">
        <h2>{captions[currentSlide].title}</h2>
        <h5>{captions[currentSlide].subtitle}</h5>
      </div>
    </div>
  );
}

export default Carousel;
