'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltSetters = useRef<{
    rotateX: (value: number) => void;
    rotateY: (value: number) => void;
    scaleX: (value: number) => void;
    scaleY: (value: number) => void;
  } | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.set(card, {
      transformPerspective: 1000,
      transformOrigin: 'center center',
      force3D: true,
    });

    tiltSetters.current = {
      rotateX: gsap.quickTo(card, 'rotationX', {
        duration: 0.35,
        ease: 'power3.out',
      }),
      rotateY: gsap.quickTo(card, 'rotationY', {
        duration: 0.35,
        ease: 'power3.out',
      }),
      scaleX: gsap.quickTo(card, 'scaleX', {
        duration: 0.35,
        ease: 'power3.out',
      }),
      scaleY: gsap.quickTo(card, 'scaleY', {
        duration: 0.35,
        ease: 'power3.out',
      }),
    };

    return () => {
      gsap.killTweensOf(card);
      tiltSetters.current = null;
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const setters = tiltSetters.current;
    if (!card || !setters) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X inside element
    const y = e.clientY - rect.top;  // Mouse Y inside element

    // Calculate center point
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Get rotation angle (max 15 degrees tilt)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setters.rotateX(rotateX);
    setters.rotateY(rotateY);
    setters.scaleX(1.02);
    setters.scaleY(1.02);
  };

  const handleMouseLeave = () => {
    const setters = tiltSetters.current;
    if (!setters) return;

    setters.rotateX(0);
    setters.rotateY(0);
    setters.scaleX(1);
    setters.scaleY(1);
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
    >
      {children}
    </div>
  );
}