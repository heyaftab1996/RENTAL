import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { Box, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';

const ImageSlider = ({ placeId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const mainSliderRef = useRef(null);
  const thumbnailSliderRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/get-images-by-place/${placeId}`);
        const fetchedImages = response.data.data.map(image => image.file_name);

        setImages(fetchedImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (placeId) {
      fetchImages();
    }
  }, [placeId]);

  useEffect(() => {
    if (mainSliderRef.current) {
      mainSliderRef.current.slickGoTo(currentImageIndex);
    }
  }, [currentImageIndex]);

  const mainSliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const thumbnailSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleThumbnailPrev = () => {
    thumbnailSliderRef.current.slickPrev();
  };

  const handleThumbnailNext = () => {
    thumbnailSliderRef.current.slickNext();
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;

  const hasImages = images.length > 0;

  return (
    <Box sx={{ width: '100%', margin: 'auto', textAlign: 'center', position: 'relative' }}>
      {hasImages ? (
        <>
          {/* Main Image Slider */}
          <Slider ref={mainSliderRef} {...mainSliderSettings}>
            {images.map((image, index) => (
              <Box
                component="img"
                key={index}
                src={`http://localhost:3000/uploads/${image}`}
                alt={`slide ${index}`}
                sx={{
                  width: '100%',
                  height: 400,
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)', // Scale up on hover
                  },
                }}
              />
            ))}
          </Slider>

          {/* Thumbnail Slider with Arrow Buttons */}
          <Box sx={{ position: 'relative', marginTop: 2 }}>
            <Slider ref={thumbnailSliderRef} {...thumbnailSliderSettings}>
              {images.map((image, index) => (
                <Box
                  component="img"
                  key={index}
                  src={`http://localhost:3000/uploads/${image}`}
                  alt={`thumbnail ${index}`}
                  onClick={() => setCurrentImageIndex(index)}
                  sx={{
                    width: '100%',
                    height: 100,
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: currentImageIndex === index ? '2px solid blue' : 'none',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)', // Slightly smaller zoom for thumbnails
                    },
                  }}
                />
              ))}
            </Slider>

            {/* Custom Arrow Buttons for Thumbnail Slider */}
            <IconButton
              onClick={handleThumbnailPrev}
              sx={{
                position: 'absolute',
                top: '50%',
                left: -20,
                transform: 'translateY(-50%)',
                zIndex: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 255, 0.5)',
                },
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              onClick={handleThumbnailNext}
              sx={{
                position: 'absolute',
                top: '50%',
                right: -20,
                transform: 'translateY(-50%)',
                zIndex: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 255, 0.5)',
                },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <Box
          component="img"
          src={`http://localhost:3000/uploads/noimage.jpg`} // Ensure the path is correct
          alt="No images available"
          sx={{
            width: '100%',
            height: 400,
            objectFit: 'cover',
          }}
        />
      )}
    </Box>
  );
};

export default ImageSlider;
