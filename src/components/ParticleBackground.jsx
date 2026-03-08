import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function generateParticles(count) {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: randomBetween(0, 100),
        y: randomBetween(0, 100),
        size: randomBetween(1, 4),
        duration: randomBetween(8, 20),
        delay: randomBetween(0, 10),
        opacity: randomBetween(0.1, 0.5),
    }));
}

const particles = generateParticles(60);

export default function ParticleBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
            {/* Gradient de fond profond */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 30% 50%, #0d0805 0%, #050505 60%, #000 100%)',
                }}
            />
            {/* Halo doré centré */}
            <div
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, rgba(212,175,55,0.01) 50%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                }}
            />
            {/* Particules flottantes */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        borderRadius: '50%',
                        background: '#D4AF37',
                        opacity: p.opacity,
                    }}
                    animate={{
                        y: [0, -30, 0, 20, 0],
                        x: [0, 15, -10, 5, 0],
                        opacity: [p.opacity, p.opacity * 2, p.opacity, p.opacity * 1.5, p.opacity],
                        scale: [1, 1.3, 0.8, 1.1, 1],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}
