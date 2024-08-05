import { useState, useRef } from "react";
import {startRecording,stopRecording,isRecording} from "./handleAudioRecording";

const useRecording = () => {
  const [recorder, setRecorder] = useState();
  const [isNotSupported, setIsNotSupported] = useState(false);
  const audioChunks = useRef([]);

  const startRecordingAudio = () => {
    startRecording().then((newRecorder) => {
      if (newRecorder) {
        newRecorder.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };
        newRecorder.start();
        setRecorder(newRecorder);
      } else {
        setIsNotSupported(true);
      }
    });
  };

  const stopRecordingAudio = () => {
    return stopRecording(recorder, audioChunks.current).then(
      (audioBlob) => {
        audioChunks.current = [];
        setRecorder(undefined);
        const type = audioBlob.type;
        return [audioBlob, type];
      }
    );
  };

  return {
    isRecording: isRecording(recorder),
    isNotSupported,
    startRecordingAudio,
    stopRecordingAudio,
  };
};

export default useRecording;
