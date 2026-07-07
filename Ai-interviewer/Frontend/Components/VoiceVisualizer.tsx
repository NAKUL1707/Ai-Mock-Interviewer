// Components/VoiceVisualizer.tsx

import { useEffect, useRef } from "react";

interface VoiceVisualizerProps {
  isListening: boolean;
}

export default function VoiceVisualizer({ isListening }: VoiceVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isListening) {
      startVisualizer();
    } else {
      stopVisualizer();
    }

    return () => stopVisualizer();
  }, [isListening]);

  const startVisualizer = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      drawBars();
    } catch (err) {
      console.error("Mic access failed:", err);
    }
  };

  const stopVisualizer = () => {
    cancelAnimationFrame(animationRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    analyserRef.current = null;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const drawBars = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext("2d")!;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barCount = 28;
      const barWidth = 4;
      const gap = 4;
      const totalWidth = barCount * (barWidth + gap);
      const startX = (canvas.width - totalWidth) / 2;

      for (let i = 0; i < barCount; i++) {
        const value = dataArray[i] / 255;
        const barHeight = Math.max(4, value * canvas.height);
        const x = startX + i * (barWidth + gap);
        const y = (canvas.height - barHeight) / 2;

        ctx.fillStyle = `rgba(37, 99, 235, ${0.4 + value * 0.6})`;
        ctx.fillRect(x, y, barWidth, barHeight);
      }
    };

    draw();
  };

  if (!isListening) return null;

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", gap: "8px", marginBottom: "8px",
    }}>
      <canvas
        ref={canvasRef}
        width={200}
        height={48}
        style={{ borderRadius: "8px" }}
      />
      <p style={{ color: "#dc2626", fontSize: "12px", margin: 0 }}>
        Listening... speak your answer
      </p>
    </div>
  );
}