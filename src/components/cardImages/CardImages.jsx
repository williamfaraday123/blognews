"use client"

import { useEffect, useState } from 'react';
import styles from './cardImages.module.css';

const CardImages = ({ BlogID }) => {
    const [images, setImages] = useState([]);
/*     const [fullscreen, setFullscreen] = useState(false); */
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`/api/image/read?BlogID=${BlogID}`);
                if (!response.ok) {
                    throw error;
                }
                const rows = await response.json();
                setImages(rows);
                console.log(`images:`, rows);
            } catch (error) {
                alert(`Error in fetching images ${error.message}`);
            } finally {
                setLoading(false);
            }
        }

        if (BlogID)
            fetchImages();
    }, [BlogID]);

    const handleNext = (e) => {
        e.stopPropagation(); // Prevent closing fullscreen
        setCurrentImageIndex((prevIndex) =>
            prevIndex < images.length - 1 ? prevIndex + 1 : 0
        );
    };

    const handlePrev = (e) => {
        e.stopPropagation(); // Prevent closing fullscreen
        setCurrentImageIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : images.length - 1
        );
    };

/*     const toggleFullscreen = () => {
        setFullscreen((prevState) => !prevState);
    };
 */
    if (loading)
        return <div>Loading Images...</div>
    return (
        <div className={styles.imageContainer}>
            <div className={styles.slider}>
                <div
                    className={styles.slides}
                    style={{
                        transform: `translateX(-${currentImageIndex * 100}%)`,
                    }}
                >
                    {images?.map((image, index) => (
                        <img
                            key={index}
                            src={image.image}
                            alt={`Blog Image ${index + 1}`}
                            className={styles.image}
                            /* onClick={toggleFullscreen} */
                        />
                    ))}
                </div>
            </div>
{/*          
            <button onClick={handlePrev} className={styles.navButton}>
                &#8592;
            </button>
            <button onClick={handleNext} className={styles.navButton}>
                &#8594;
            </button> */}
{/* 
            {fullscreen && (
                <div className={styles.fullscreenOverlay}>
                    <div className={styles.fullscreenOverlayContent}>
                        <button
                            onClick={handlePrev}
                            className={`${styles.navButton} ${styles.fullscreenNavButton}`}
                        >
                            &#8592;
                        </button>
                        <img
                            src={images[currentImageIndex]?.image}
                            className={styles.fullscreenImage}
                        />
                        <button
                            onClick={handleNext}
                            className={`${styles.navButton} ${styles.fullscreenNavButton}`}
                        >
                            &#8594;
                        </button>
                    </div>
                    <button
                        onClick={toggleFullscreen}
                        className={styles.exitButton}
                    >
                        Exit Fullscreen
                    </button>
                </div>
            )} */}
        </div>
    );
};

export default CardImages;