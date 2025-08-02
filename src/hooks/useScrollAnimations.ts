import { useEffect } from 'react';

export const useScrollAnimations = () => {
  useEffect(() => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all elements with fade-in-observer class
    const fadeElements = document.querySelectorAll('.fade-in-observer');
    fadeElements.forEach((el) => observer.observe(el));

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1); // Different speeds for different elements
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    // Smooth scroll behavior
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(
          (link as HTMLAnchorElement).getAttribute('href') || ''
        );
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

// Hook for adding stagger animations to lists
export const useStaggeredAnimations = (selector: string, delay: number = 100) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      (element as HTMLElement).style.animationDelay = `${index * delay}ms`;
    });
  }, [selector, delay]);
};

// Hook for adding hover animations
export const useHoverAnimations = () => {
  useEffect(() => {
    const addHoverEffects = () => {
      // Add hover lift effect to cards
      const cards = document.querySelectorAll('.hover-lift');
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          card.classList.add('transform', '-translate-y-2', 'shadow-2xl');
        });
        card.addEventListener('mouseleave', () => {
          card.classList.remove('transform', '-translate-y-2', 'shadow-2xl');
        });
      });

      // Add hover scale effect
      const scaleElements = document.querySelectorAll('.hover-scale');
      scaleElements.forEach((element) => {
        element.addEventListener('mouseenter', () => {
          element.classList.add('scale-105');
        });
        element.addEventListener('mouseleave', () => {
          element.classList.remove('scale-105');
        });
      });
    };

    // Add effects after a small delay to ensure DOM is ready
    const timer = setTimeout(addHoverEffects, 100);
    
    return () => clearTimeout(timer);
  }, []);
};
