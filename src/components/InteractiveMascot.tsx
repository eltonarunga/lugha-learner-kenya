import { useState, useEffect } from 'react';
import mascotImage from '@/assets/lugha-mascot.png';

interface InteractiveMascotProps {
  isCorrect?: boolean | null;
  isAnswered?: boolean;
  encouragementMessage?: string;
}

const InteractiveMascot = ({ 
  isCorrect = null, 
  isAnswered = false,
  encouragementMessage = "You can do this!"
}: InteractiveMascotProps) => {
  const [animation, setAnimation] = useState('');
  const [message, setMessage] = useState(encouragementMessage);

  useEffect(() => {
    if (isAnswered && isCorrect !== null) {
      if (isCorrect) {
        setAnimation('animate-bounce');
        setMessage("Excellent work! 🎉");
      } else {
        setAnimation('animate-pulse');
        setMessage("Don't give up! Try again! 💪");
      }
      
      // Reset animation after 2 seconds
      const timer = setTimeout(() => {
        setAnimation('');
        setMessage(encouragementMessage);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isCorrect, isAnswered, encouragementMessage]);

  const handleMascotClick = () => {
    if (!isAnswered) {
      setAnimation('animate-pulse');
      const encouragingMessages = [
        "Take your time! 🤔",
        "You've got this! 💪",
        "Think carefully! 🧠",
        "I believe in you! ⭐",
        "Almost there! 🎯"
      ];
      const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
      setMessage(randomMessage);
      
      setTimeout(() => {
        setAnimation('');
        setMessage(encouragementMessage);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3 p-4">
      <div 
        className={`cursor-pointer transition-transform duration-300 hover:scale-105 ${animation}`}
        onClick={handleMascotClick}
      >
        <img 
          src={mascotImage} 
          alt="Lugha Learning Mascot" 
          className="w-24 h-24 object-contain"
        />
      </div>
      
      <div className="relative">
        <div className="bg-white dark:bg-card border border-border rounded-lg px-4 py-2 shadow-sm max-w-[200px] text-center">
          <p className="text-sm font-medium text-foreground">{message}</p>
        </div>
        {/* Speech bubble tail */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-border"></div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white dark:border-t-card"></div>
      </div>
    </div>
  );
};

export default InteractiveMascot;