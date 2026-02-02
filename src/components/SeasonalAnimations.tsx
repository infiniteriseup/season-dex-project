import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const SeasonalAnimations: React.FC = () => {
  const { currentSeason } = useTheme();

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {currentSeason === 'spring' && <SpringAnimation />}
      {currentSeason === 'summer' && <SummerAnimation />}
      {currentSeason === 'fall' && <FallAnimation />}
      {currentSeason === 'winter' && <WinterAnimation />}
    </div>
  );
};

// Spring Animation - Floating petals
const SpringAnimation: React.FC = () => {
  const petals = Array.from({ length: 20 }, (_, i) => i);
  
  return (
    <>
      <style>{`
        @keyframes float-petal {
          0% {
            transform: translateY(-10vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(100px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes sway {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(30px);
          }
        }
      `}</style>
      {petals.map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: '-10vh',
            width: '10px',
            height: '10px',
            background: `rgba(255, ${150 + Math.random() * 100}, ${180 + Math.random() * 75}, 0.7)`,
            borderRadius: '50% 0 50% 0',
            animation: `float-petal ${15 + Math.random() * 10}s linear infinite, sway ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </>
  );
};

// Summer Animation - Sun rays and floating particles
const SummerAnimation: React.FC = () => {
  const particles = Array.from({ length: 30 }, (_, i) => i);
  
  return (
    <>
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(110vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-10vh) scale(1);
            opacity: 0;
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
      `}</style>
      
      {/* Sun rays */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(255, 220, 100, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse-glow 4s ease-in-out infinite',
        }}
      />
      
      {/* Floating particles */}
      {particles.map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            bottom: '-10vh',
            width: `${3 + Math.random() * 5}px`,
            height: `${3 + Math.random() * 5}px`,
            background: `rgba(255, ${200 + Math.random() * 55}, 100, 0.4)`,
            borderRadius: '50%',
            animation: `float-up ${20 + Math.random() * 15}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </>
  );
};

// Fall Animation - Falling leaves
const FallAnimation: React.FC = () => {
  const leaves = Array.from({ length: 25 }, (_, i) => i);
  
  return (
    <>
      <style>{`
        @keyframes fall-leaf {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes swing {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-50px);
          }
          75% {
            transform: translateX(50px);
          }
        }
      `}</style>
      {leaves.map((i) => {
        const leafColors = ['rgba(255, 140, 0, 0.7)', 'rgba(218, 165, 32, 0.7)', 'rgba(139, 69, 19, 0.7)', 'rgba(205, 92, 92, 0.7)'];
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: '-10vh',
              width: '15px',
              height: '15px',
              background: leafColors[Math.floor(Math.random() * leafColors.length)],
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              animation: `fall-leaf ${12 + Math.random() * 8}s linear infinite, swing ${4 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        );
      })}
    </>
  );
};

// Winter Animation - Falling snowflakes
const WinterAnimation: React.FC = () => {
  const snowflakes = Array.from({ length: 50 }, (_, i) => i);
  
  return (
    <>
      <style>{`
        @keyframes fall-snow {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes drift {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(40px);
          }
        }
        
        @keyframes shimmer {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
      {snowflakes.map((i) => {
        const size = 3 + Math.random() * 5;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: '-10vh',
              width: `${size}px`,
              height: `${size}px`,
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '50%',
              boxShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
              animation: `fall-snow ${15 + Math.random() * 10}s linear infinite, drift ${3 + Math.random() * 2}s ease-in-out infinite, shimmer ${2 + Math.random()}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        );
      })}
    </>
  );
};
