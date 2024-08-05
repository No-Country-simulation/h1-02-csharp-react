import { MicrophoneIcon } from "../icons";
import useRecording from "../../hooks/useRecording";
import handleBlobToBase64 from "../../hooks/handleBlobToBase64";
import transcript from "../../hooks/useTranscript";
import { getEncoding } from "../../hooks/handleAudioRecording";

export default function RecordingButton({ setNewNoteText }) {
  const {
    isNotSupported,
    isRecording,
    startRecordingAudio,
    stopRecordingAudio,
  } = useRecording();

  const handleRecording = () => {
    if (!isRecording) {
      startRecordingAudio();
      return;
    }
    stopRecordingAudio().then(([audio, type]) =>
      handleBlobToBase64(audio).then((base64) =>
        transcript(base64, getEncoding(type)).then((text) => {
          setNewNoteText(text);
        })
      )
    );
  };
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
