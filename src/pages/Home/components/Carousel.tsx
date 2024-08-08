import classNames from 'classnames/bind';
import styles from '../scss/Carousel.module.scss';

const cx = classNames.bind(styles);

const Carousel = () => {
  return (
    <div className="container">
      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide"
        style={{ borderRadius: '10px', overflow: 'hidden', margin: '30px 0' }}
      >
        <div className={`${cx('carousel-indicators')} carousel-indicator-scss`}>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="btn-slider active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            className="btn-slider"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
            className="btn-slider"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img
              src="https://res.cloudinary.com/dgdn13yur/image/upload/v1707982946/slider_1_aoilst.png"
              className="d-block w-100 slider-img"
              alt="Event 1"
              style={{
                borderRadius: '10px',
                height: 'var(--slider-height)',
              }}
            />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="https://res.cloudinary.com/dgdn13yur/image/upload/v1707984300/slider_2_ososh4.png"
              className="d-block w-100 slider-img"
              style={{
                borderRadius: '10px',
                height: 'var(--slider-height)',
              }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/dgdn13yur/image/upload/v1707988663/slider_3_wupkev.png"
              className="d-block w-100 slider-img"
              style={{
                borderRadius: '10px',
                height: 'var(--slider-height)',
              }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            width: '40px',
            height: '70px',
            borderTopRightRadius: '7px',
            borderBottomRightRadius: '7px',
            marginTop: 'calc(var(--slider-height) / 2 - 35px)',
          }}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            width: '40px',
            height: '70px',
            borderTopLeftRadius: '7px',
            borderBottomLeftRadius: '7px',
            marginTop: 'calc(var(--slider-height) / 2 - 35px)',
          }}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
