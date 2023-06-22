import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";

function VideoPlayer() {
  const SpeedValues = [-8, -4, -2, 1, 2, 4, 8];
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState({ playing: true });
  const [playback, setPlayBack] = useState(SpeedValues[3]);
  const [isReversePlayback, setIsReversePlayback] = useState(false);
  const ReverseSpeedRef = useRef(0);

  const handleRev = () => {
    console.log("Reverse button clicked");
    setIsReversePlayback((prev) => true);
    console.log("previous ReverseSpeed: ", ReverseSpeedRef.current);
    if (playback > 1) {
      const index = SpeedValues.indexOf(playback);
      setPlayBack((prev) => SpeedValues[index - 1]);
      console.log("After playbackRate: ", SpeedValues[index - 1]);
    } else if (ReverseSpeedRef.current === 0) {
      ReverseSpeedRef.current = SpeedValues[2];
      console.log("After ReverseSpeed: ", SpeedValues[2]);
    } else {
      const index = SpeedValues.indexOf(ReverseSpeedRef.current);
      if (index > 0) {
        ReverseSpeedRef.current = SpeedValues[index - 1];
        console.log("After ReverseSpeed: ", SpeedValues[index - 1]);
      }
    }
    ReversePlayback();
  };

  const handleFF = () => {
    console.log("Fast forward button clicked");
    console.log("previous playbackRate: ", playback);
    const index = SpeedValues.indexOf(playback);
    if (index < SpeedValues.length - 1 && ReverseSpeedRef.current === 0) {
      setPlayBack((prev) => SpeedValues[index + 1]);
      console.log("After playbackRate: ", SpeedValues[index + 1]);
    } else if (index < SpeedValues.length - 1) {
      if (ReverseSpeedRef.current === -2) {
        ReverseSpeedRef.current = 0;
        console.log("After ReverseSpeed: ", 0);
      } else {
        const index = SpeedValues.indexOf(ReverseSpeedRef.current);
        if (index < SpeedValues.length - 1) {
          ReverseSpeedRef.current = SpeedValues[index + 1];
          console.log("After ReverseSpeed: ", SpeedValues[index + 1]);
        }
      }
    }
  };

  const handleStop = () => {
    console.log("Stop button clicked");
    ReverseSpeedRef.current = 0;
    playerRef.current.seekTo(0);
    setPlaying({ playing: false });
  };

  const ReversePlayback = () => {
    const j = ReverseSpeedRef.current;
    console.log("Current ReverseSpeed value:", j);
    if (j !== 0) {
      let interv = 0;
      let s = 0;
      if (j > 0) {
        s = j / 2;
        interv = 50;
      } else {
        s = j / 2;
        interv = 50;
      }
      console.log("Jumping:", j);
      setPlayBack(1);
      playerRef.current.seekTo(playerRef.current.getCurrentTime());
      console.log("CurrentTime : ", playerRef.current.getCurrentTime());
      setPlaying({ playing: true });
      setTimeout(() => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + s);
      }, interv);
      if (playerRef.current.getCurrentTime() < Math.abs(j)) {
        setIsReversePlayback((prev) => false);
        ReverseSpeedRef.current = 0;
        playerRef.current.seekTo(0);
      }
    }
  };

  const handleCanPlay = () => {
    console.log("Video can play");
    if (isReversePlayback) {
      console.log("handleCanPlay condition ");
      ReversePlayback();
    }
  };

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        controls
        playing={playing?.playing}
        playbackRate={playback}
        width={560}
        height={340}
        onReady={handleCanPlay}
      />

      <div id="buttons">
        <button onClick={handleRev}>rev</button>
        <button onClick={handleFF}>ff</button>
        <button onClick={handleStop}>stop</button>
      </div>
    </div>
  );
}

export default VideoPlayer;
