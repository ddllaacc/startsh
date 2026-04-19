import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface PixelFireworksProps {
  variant?: 'red' | 'green';
}

export function PixelFireworks({ variant = 'red' }: PixelFireworksProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [particleId, setParticleId] = useState(0);

  useEffect(() => {
    // Create fireworks burst at intervals
    const burstInterval = setInterval(() => {
      const newParticles: Particle[] = [];
      const burstX = Math.random() * 220 + 40; // Random x position
      const burstY = Math.random() * 10 + 10; // Vary starting height (halved)
      const colors = variant === 'green' 
        ? ['#00ff00', '#ffffff', '#cccccc']
        : ['#ff0000', '#ffffff', '#cccccc'];
      
      // Create 10-15 particles per burst
      const particleCount = Math.floor(Math.random() * 6) + 10;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.8;
        const speed = Math.random() * 1.25 + 1; // Halved speed
        const sizes = [2, 2, 2, 3, 3, 4]; // Weighted toward smaller sizes
        
        newParticles.push({
          id: particleId + i,
          x: burstX,
          y: burstY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 70,
          maxLife: 70,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: sizes[Math.floor(Math.random() * sizes.length)],
        });
      }
      
      setParticleId(prev => prev + particleCount);
      setParticles(prev => [...prev, ...newParticles]);
    }, 800); // New burst every 0.8 seconds

    // Animation loop
    const animationInterval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.09, // Gravity
            life: p.life - 1,
          }))
          .filter(p => p.life > 0 && p.y < 75) // Remove dead or off-screen particles (halved)
      );
    }, 1000 / 30); // 30 FPS

    return () => {
      clearInterval(burstInterval);
      clearInterval(animationInterval);
    };
  }, [particleId, variant]);

  return (
    <div className="relative w-full h-18 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            width: `${particle.size * 2}px`,
            height: `${particle.size * 2}px`,
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            backgroundColor: particle.color,
            opacity: particle.life / particle.maxLife,
            boxShadow: `0 0 ${particle.size}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
}
