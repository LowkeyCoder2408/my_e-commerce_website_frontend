import { useState, useEffect, useMemo } from 'react';

function SlideShow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = useMemo(
    () => [
      {
        id: 1,
        url: 'https://res.cloudinary.com/dgdn13yur/image/upload/v1708149640/slider_1_hnvyrx.webp',
      },
      {
        id: 2,
        url: 'https://res.cloudinary.com/dgdn13yur/image/upload/v1708149634/slider_2_k4rcm0.webp',
      },
      {
        id: 3,
        url: 'https://res.cloudinary.com/dgdn13yur/image/upload/v1708149636/slider_3_u3t8ei.webp',
      },
      {
        id: 4,
        url: 'https://res.cloudinary.com/dgdn13yur/image/upload/v1708149636/slider_4_zk52gi.webp',
      },
      {
        id: 5,
        url: 'https://res.cloudinary.com/dgdn13yur/image/upload/v1708149634/slider_5_hfqyl2.webp',
      },
      {
        id: 6,
        url: 'https://res.cloudinary.com/dgdn13yur/image/upload/v1708149637/slider_6_lf0ixp.webp',
      },
      {
        id: 7,
        url: 'https://res.cloudinary.com/dgdn13yur/image/upload/v1708149635/slider_7_fqxb6i.webp',
      },
    ],
    [],
  );
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <div
      className="slideShow"
      style={{
        position: 'relative',
        marginTop: '70px',
      }}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image.url}
          alt={`Slide ${index + 1}`}
          style={{
            display: index === currentImageIndex ? 'block' : 'none',
            width: '100%',
            objectFit: 'cover',
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
        }}
      >
        {images.map((_, index) => (
          <div
            key={index}
            style={{
              transition: '0.4s',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor:
                index === currentImageIndex
                  ? '#ffefbb'
                  : 'rgba(255, 255, 255, 0.3)',
              margin: '0 5px',
              cursor: 'pointer',
            }}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default SlideShow;
