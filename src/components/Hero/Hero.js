import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import { SLIDE_DATA } from './constants';
import { PauseSVG, PlaySVG } from '../../assets/js/Icons';


const duration = 6000;

const useAutoplayProgress = (swiperRef) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const startTimeRef = useRef(null);
    const rafIdRef = useRef(null);

    // The main animation loop
    const loop = useCallback((now) => {
        if (!isPlaying) {
            rafIdRef.current = null;
            return;
        }

        if (!startTimeRef.current) startTimeRef.current = now;
        const elapsed = now - startTimeRef.current;
        const currentProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(Math.round(currentProgress));

        if (currentProgress >= 100 && swiperRef.current?.swiper) {
            swiperRef.current.swiper.slideNext();
            startTimeRef.current = performance.now(); // Reset timer for next slide
            setProgress(0);
        }

        rafIdRef.current = requestAnimationFrame(loop);
    }, [isPlaying, swiperRef]);

    // Start/Stop effect
    useEffect(() => {
        if (isPlaying) {
            startTimeRef.current = performance.now();
            rafIdRef.current = requestAnimationFrame(loop);
        } else {
            cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = null;
        }

        // Cleanup
        return () => {
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [isPlaying, loop]);

    // Toggle play/pause
    const togglePlayPause = useCallback(() => {
        setIsPlaying(prev => !prev);
    }, []);

    // Reset progress when slide changes externally
    const resetProgress = useCallback(() => {
        setProgress(0);
        startTimeRef.current = performance.now();
        if (!isPlaying) {
            // If manually changing slides while paused, the loop is not running.
            // We only need to reset the visual state. The next resume will restart the timer.
        }
    }, [isPlaying]);

    return { progress, isPlaying, togglePlayPause, resetProgress };
};

/**
 * Hero Swiper Component
 */
const Hero = () => {
    const swiperRef = useRef(null);
    const { progress, isPlaying, togglePlayPause, resetProgress } = useAutoplayProgress(swiperRef);
    const [activeBulletIndex, setActiveBulletIndex] = useState(0);

    // Function to render custom bullet
    const renderCustomBullet = (index, className) => {
        const isActive = index === activeBulletIndex;

        return (
            <span
                className={`${className} text-white opacity-1 w-auto h-auto bg-transparent`}
                data-index={index}
            >
                {isActive ? (
                    <div className="flex justify-center items-center">
                        <button
                            className="absolute z-10 cursor-pointer p-1"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent Swiper's default slide change
                                togglePlayPause();
                            }}
                        >
                            {isPlaying ? <PauseSVG /> : <PlaySVG />}
                        </button>
                        {/* The 'percentage' class and '--p' style are key to the progress indicator */}
                        <div
                            className={`percentage ${isActive && activeBulletIndex === swiperRef.current?.swiper?.realIndex ? 'show' : ''}`}
                            style={{ '--p': `${progress}%` }}
                        >
                            <div className="number w-[80%] aspect-square flex items-center justify-center bg-white rounded-full text-base font-extrabold text-[#1C69D4]">
                                {index + 1}
                            </div>
                        </div>
                    </div>
                ) : (
                    <span className="text-white text-sm font-medium">{index + 1}</span>
                )}
            </span>
        );
    };

    return (
        <div className="wrapper-slider relative w-full mx-auto text-neutral-800 bg-black">
            <Swiper
                ref={swiperRef}
                modules={[Pagination, EffectFade]}
                effect="fade"
                speed={1000}
                fadeEffect={{ crossFade: true }}
                loop={true}
                pagination={{
                    el: '.swiper-pagination',
                    clickable: true,
                    renderBullet: renderCustomBullet,
                }}
                onInit={(swiper) => {
                    swiperRef.current = { swiper };
                    setActiveBulletIndex(swiper.realIndex);
                }}
                onSlideChange={(swiper) => {
                    resetProgress();
                    setActiveBulletIndex(swiper.realIndex);
                }}
                className="main-slider"
            >
                {SLIDE_DATA.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="item relative w-screen h-screen px-5">
                            {slide.type === 'image' && (
                                <picture className="block">
                                    {/* Overlay for image */}
                                    <span className="absolute inset-0 bg-black/40 z-10" />
                                    <img
                                        src={slide.src}
                                        alt={slide.alt}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </picture>
                            )}
                            {slide.type === 'video' && (
                                <div className="video">
                                    {/* Overlay for video */}
                                    <span className="absolute inset-0 bg-black/40 z-10" />
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        poster={slide.poster}
                                        className="absolute w-full h-full object-cover inset-0"
                                    >
                                        <source src={slide.src} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            )}

                            {/* Text Content */}
                            <div className="parent-text p-12 relative z-20 text-white">
                                <div className="info-text flex flex-col gap-2">
                                    <h2 className="uppercase text-4xl font-light">
                                        Tum dicere exorsus est curne interiret at vero.
                                    </h2>
                                    <p className="text-2xl font-light">
                                        Torquem detraxit hosti et quidem rerum necessitatibus saepe eveniet, ut.
                                    </p>
                                    <a
                                        href="#"
                                        className="w-full max-w-[17.2rem] h-[5.5rem] text-sm mt-8 flex items-center justify-center bg-white text-black no-underline transition-colors duration-300 hover:bg-gray-200 hover:text-gray-700"
                                    >
                                        Aprende más
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Swiper Pagination Container */}
                <div className="swiper-pagination absolute bottom-20 w-full flex items-center gap-1 text-sm font-medium px-10 z-30" />
            </Swiper>
        </div>
    );
};

export default Hero;