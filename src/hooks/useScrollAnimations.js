import { useEffect } from 'react';

const useScrollAnimations = () => {
  useEffect(() => {
    const animatedElements = document.querySelectorAll(
      '.slide-in, .slide-in-left, .slide-in-right, .fade-in, .bounce-in'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((el) => {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

export default useScrollAnimations;