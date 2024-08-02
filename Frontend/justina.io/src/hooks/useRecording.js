import { useState, useRef } from "react";
import RecordingService from "./audioRecordingService";

const useRecording = () => {
  const [recorder, setRecorder] = useState();
  const [isNotSupported, setIsNotSupported] = useState(false);
  const audioChunks = useRef([]);

  const startRecording = () => {
    RecordingService.startRecording().then((newRecorder) => {
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

  const stopRecording = () => {
    return RecordingService.stopRecording(recorder, audioChunks.current).then(
      (audioBlob) => {
        audioChunks.current = [];
        setRecorder(undefined);
        const type = audioBlob.type;
        return [audioBlob, type];
      }
    );
  };

  return {
    isRecording: RecordingService.isRecording(recorder),
    isNotSupported,
    stopRecording,
    startRecording,
  };
};

export default useRecording;
