import React, { useState, useRef, useEffect } from "react";
import "./Vedioplayer.css";
import Waveform from "../src/components/Waveform/Waveform.js";

export default function Vedioplayer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const videoPlayer = videoRef.current;
    const canvas = canvasRef.current;

    if (videoPlayer && canvas) {
      const context = canvas.getContext("2d");

      const renderFrame = () => {
        context.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
        if (isPlaying) {
          requestAnimationFrame(renderFrame);
        }
      };

      if (isPlaying) {
        renderFrame();
      }
    }
  }, [isPlaying]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const videoPlayer = videoRef.current;
    setSelectedFile(file);

    const videoURL = URL.createObjectURL(file);
    setFileURL(videoURL);
    videoPlayer.src = videoURL;
    videoPlayer.load();
  };

  const playVideo = () => {
    const videoPlayer = videoRef.current;
    videoPlayer.play();
    setIsPlaying(true);
  };

  const pauseVideo = () => {
    const videoPlayer = videoRef.current;
    if (videoPlayer) {
      videoPlayer.pause();
      setIsPlaying(false);
    }
  };

  const changeplaystate = () => {
    const Vedioplayer = videoRef.current;
    if (Vedioplayer) {
      Vedioplayer.pause();
    } else {
      Vedioplayer.play();
    }
  };

  return (
    <>
      <h1>My Custom Video Player</h1>

      <br />
      <br />
      <div id="mycan">
        <canvas
          ref={canvasRef}
          onClick={changeplaystate}
          width="640"
          height="360"
          style={{ border: "1px solid #000" }}
        ></canvas>
        <br />
        <br />
        <input type="file" onChange={handleFileChange} accept="video/*" />
        <br />
        <br />

        {fileURL && (
          <div>
            <button onClick={playVideo} disabled={isPlaying}>
              Play
            </button>
            <button onClick={pauseVideo} disabled={!isPlaying}>
              Pause
            </button>{" "}
          </div>
        )}
        {selectedFile && <span>{videoRef?.current?.duration}s</span>}
      </div>

      <br />
      <br />
      <video ref={videoRef} style={{ display: "none" }} controls></video>
      {fileURL && (
        <Waveform
          isPlaying={isPlaying}
          height={100}
          waveColor="rgb(200, 0, 200)"
          progressColor="rgb(100, 0, 100)"
          url={fileURL}
        />
      )}
    </>
  );
}
