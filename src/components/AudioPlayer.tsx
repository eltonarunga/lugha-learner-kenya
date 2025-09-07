import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, Volume2, VolumeX, RotateCcw, SkipBack, SkipForward } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  title?: string;
  subtitle?: string;
  autoplay?: boolean;
  showControls?: boolean;
  className?: string;
}

export function AudioPlayer({ 
  src, 
  title, 
  subtitle, 
  autoplay = false, 
  showControls = true,
  className = "" 
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (audio && duration) {
      const newTime = (value[0] / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const restart = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <audio 
          ref={audioRef}
          src={src}
          preload="metadata"
          autoPlay={autoplay}
        />
        
        {(title || subtitle) && (
          <div className="mb-4">
            {title && <h3 className="font-semibold">{title}</h3>}
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        )}

        {showControls && (
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <Slider
                value={[progressPercentage]}
                onValueChange={handleSeek}
                max={100}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => skip(-10)}
                disabled={!duration}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={restart}
                disabled={!duration}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>

              <Button
                size="lg"
                onClick={togglePlay}
                disabled={!duration}
                className="rounded-full"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => skip(10)}
                disabled={!duration}
              >
                <SkipForward className="h-4 w-4" />
              </Button>

              {/* Playback Speed */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPlaybackRate(playbackRate === 1 ? 0.75 : playbackRate === 0.75 ? 1.25 : 1)}
              >
                {playbackRate}x
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground w-8">
                {isMuted ? 0 : volume}%
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}