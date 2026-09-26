'use client';

import { useEffect, useRef } from 'react';

interface GrainTextProps {
  text: string;
  fontSize?: number;
  textColor?: string;
  fontWeight?: string;
}

export default function GrainText({ text, fontSize = 260, textColor = '#ffffff', fontWeight = 'bold' }: GrainTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Scale canvas height dynamically based on the font size passed
    const width = 1000;
    const height = fontSize * 3; 
    canvas.width = width;
    canvas.height = height;

    let particlesArray: Particle[] = [];
    // Scale the scatter radius based on the font size so the effect remains proportional
    let mouse = { x: -500, y: -500, radius: fontSize / 2.5 }; 

    const fontString = `bold ${fontSize}px "Times New Roman", Georgia, serif`;

    // 1. INITIAL MAPPING
    ctx.fillStyle = textColor;
    ctx.font = fontString;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

    const textCoordinates = ctx.getImageData(0, 0, width, height);

    class Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.vx = 0;
        this.vy = 0;
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          let force = -mouse.radius / distance;
          let angle = Math.atan2(dy, dx);
          this.vx += force * Math.cos(angle);
          this.vy += force * Math.sin(angle);
        }

        this.x += (this.originX - this.x) * 0.1 + this.vx;
        this.y += (this.originY - this.y) * 0.1 + this.vy;
        
        this.vx *= 0.55;
        this.vy *= 0.55;
      }

      draw() {
        ctx!.fillStyle = textColor;
        ctx!.fillRect(this.x, this.y, 2, 2);
      }
    }

    const init = () => {
      particlesArray = [];
      for (let y = 0; y < textCoordinates.height; y += 2) {
        for (let x = 0; x < textCoordinates.width; x += 2) {
          const index = (y * textCoordinates.width + x) * 4;
          if (textCoordinates.data[index + 3] > 128) {
            particlesArray.push(new Particle(x, y));
          }
        }
      }
    };
    init();

    let animationFrameId: number;
    
    // 2. THE RENDER SWAP LOOP
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      let allSettled = true;
      let isActivelyDisturbing = false; 

      for (let i = 0; i < particlesArray.length; i++) {
        let p = particlesArray[i];
        p.update();
        
        if (Math.abs(p.x - p.originX) > 0.5 || Math.abs(p.y - p.originY) > 0.5 || Math.abs(p.vx) > 0.1) {
          allSettled = false;
        }

        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        if (Math.sqrt(dx * dx + dy * dy) < mouse.radius) {
          isActivelyDisturbing = true;
        }
      }

      if (!isActivelyDisturbing && allSettled) {
        ctx.fillStyle = textColor;
        ctx.font = fontString;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, width / 2, height / 2);
      } else {
        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].draw();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      mouse.x = (e.clientX - rect.left) * scaleX;
      mouse.y = (e.clientY - rect.top) * scaleY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [text, fontSize, textColor]); // Added new props to dependency array

  return (
    // Removed the red background and forced min-heights. It now behaves like a transparent text container.
    <div className="flex justify-center items-center w-full overflow-hidden bg-transparent">
      <canvas 
        ref={canvasRef} 
        className="cursor-crosshair w-full max-w-[1000px] select-none"
      />
    </div>
  );
}