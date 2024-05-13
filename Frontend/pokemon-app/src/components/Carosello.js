import React from 'react';
import 'bootstrap';

function Carousel() {
  return (
    <div id="carouselExampleCaptions" className=" carousel carousel-dark slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/287.png" className="d-block w-50 mx-auto" align="center" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <br></br>
            <h2>Gabriele Chini</h2>
            <h5>Il ragazzo che cerca la ragazza</h5>
          </div>
        </div>
        <div className="carousel-item">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" className="d-block w-50 mx-auto" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h2>Tiziano Manfredi</h2>
            <h5>Il ragazzo che ha sempre un drink in mano in discoteca</h5>
          </div>
        </div>
        <div className="carousel-item">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png" className="d-block w-50 mx-auto" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h2>Sami</h2>
            <h5>Il ragazzo che sta fresco in ospdeale dopo aver sentito ITALIA UNO</h5>
          </div>
        </div>
      <div className="carousel-item">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png" className="d-block w-50 mx-auto" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h2>Max</h2>
            <h5>Il ragazzo sempre carico a PALLETTONI</h5>
          </div>
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
  );
}

export default Carousel;