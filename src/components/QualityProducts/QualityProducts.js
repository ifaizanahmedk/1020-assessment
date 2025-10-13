import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import product1 from '@/assets/images/product-1.png';
import product2 from '@/assets/images/product-1.png';
import product3 from '@/assets/images/product-1.png';

gsap.registerPlugin(ScrollTrigger);

const products = [
  { id: 1, image: product1, title: 'Client 1', location: 'Dubai, United Arab Emirates' },
  { id: 2, image: product2, title: 'Client 2', location: 'Mumbai, India' },
  { id: 3, image: product3, title: 'Client 3', location: 'London, United Kingdom' },
];

const QualityProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    // Animate Title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 50%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Animate Description
    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 50%',
            toggleActions: 'play none none none',
          },
          delay: 0.3,
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 px-4 bg-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Title and Description */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 ref={titleRef} className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Quality Products
          </h2>
          <p
            ref={descRef}
            className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm lg:text-base"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat.
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="relative h-[500px] lg:h-[700px] flex items-center justify-center overflow-hidden">
          <Swiper
            modules={[EffectCoverflow, Pagination]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 10,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
            className="w-full max-w-5xl"
          >
            {products.map((product, index) => (
              <SwiperSlide key={product.id} className="!w-[250px] lg:!w-[350px]">
                <div
                  className={`relative w-full h-[350px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl transition-all duration-500 ${
                    index === currentIndex ? 'scale-100' : 'scale-90 opacity-80'
                  }`}
                >
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" draggable={false} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Slide Info */}
        <div className="text-center mt-12 lg:mt-16">
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            {products[currentIndex].title}
          </h3>
          <p className="text-muted-foreground text-sm lg:text-base">
            {products[currentIndex].location}
          </p>
        </div>
      </div>
    </section>
  );
};

export default QualityProducts;
