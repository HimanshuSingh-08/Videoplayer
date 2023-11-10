import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export const useWavesurfer = (containerRef, options) => {
  const [wavesurfer, setWavesurfer] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current
    });

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  return wavesurfer;
};

export default Waveform = (props, { isPlaying }) => {
  const containerRef = useRef();
  const wavesurfer = useWavesurfer(containerRef, props);

  useEffect(() => {
    if (!wavesurfer) return;

    if (isPlaying) wavesurfer.play();
    else wavesurfer.pause();
  }, [wavesurfer]);

  return (
    <div>
      <div
        ref={containerRef}
        className="waveformContainer"
        style={{ minHeight: "120px" }}
      />
    </div>
  );
};
