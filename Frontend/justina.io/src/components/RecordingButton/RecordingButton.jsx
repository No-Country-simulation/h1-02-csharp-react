import { MicrophoneIcon } from "../icons";
import useRecording from "../../hooks/useRecording";
import { useCallback } from "react";

export default function RecordingButton() {
  const { isNotSupported, isRecording, startRecording, stopRecording } =
    useRecording();
  const handleRecording = useCallback(() => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording, startRecording, stopRecording]);
  return (
    <button
      className={`transition-all duration-300 rounded-full shadow-glass-effect p-2  disabled:opacity-75 disabled:cursor-default ${
        isRecording
          ? "text-error-200 bg-primary-300"
          : "text-primary bg-transparent"
      }`}
      disabled={isNotSupported}
      onClick={handleRecording}
    >
      <MicrophoneIcon />
    </button>
  );
}
