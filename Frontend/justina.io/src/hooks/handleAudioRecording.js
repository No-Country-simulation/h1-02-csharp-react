const REGEX = /audio\/(\w+)(?:;codecs=\w+)?/;

function getSupportedMimetype() {
  let mimeType = "";

  if (MediaRecorder.isTypeSupported("audio/flac")) {
    mimeType = "audio/flac";
  } else if (MediaRecorder.isTypeSupported("audio/wav")) {
    mimeType = "audio/wav";
  } else if (MediaRecorder.isTypeSupported('audio/webm')) {
    mimeType = 'audio/webm';
  }  else if (MediaRecorder.isTypeSupported("audio/amr")) {
    mimeType = "audio/amr";
  } else if (MediaRecorder.isTypeSupported("audio/aac")) {
    mimeType = "audio/aac";
  } else if (MediaRecorder.isTypeSupported("audio/mpeg")) {
    mimeType = "audio/mpeg";
  } else if (MediaRecorder.isTypeSupported("audio/mp3")) {
    mimeType = "audio/mp3";
  } else if (MediaRecorder.isTypeSupported("audio/ogg")) {
    mimeType = "audio/ogg";
  } else if (MediaRecorder.isTypeSupported("audio/x-m4a")) {
    mimeType = "audio/x-m4a";
  } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
    mimeType = "audio/mp4";
  }
  console.log({ mimeType });
  return mimeType;
}

export function getEncoding(type) {
  const match = REGEX.exec(type);
  const ext = match ? match[1] : "";
  if (ext === "wav" || ext === "ogg") {
    return "WEBM_OPUS";
  } else if (ext === "flac") {
    return "FLAC";
  } else if (ext === "mp3" || ext === "mpeg" || ext === "webm") {
    return "MP3";
  } else if (ext === "amr") {
    return "AMR";
  }

  return "ENCODING_UNSPECIFIED";
}

export async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: getSupportedMimetype(),
    });
    return mediaRecorder;
  } catch (err) {
    console.error("Error in MediaRecorder ", err);
    return undefined;
  }
}
export async function stopRecording(mediaRecorder, audioChunks) {
  return new Promise((resolve, reject) => {
    if (mediaRecorder) {
      mediaRecorder.onstop = () => {
        const type = mediaRecorder?.mimeType;
        const audioBlob = new Blob(audioChunks, {
          type: type.includes(";") ? type.split(";")[0] : type,
        });
        resolve(audioBlob);
      };

      mediaRecorder.stop();
    } else {
      reject("No recording in progress");
    }
  });
}

export function isRecording(mediaRecorder) {
  return (
    !!mediaRecorder &&
    (mediaRecorder.state === "recording" || mediaRecorder.state === "paused")
  );
}

export function isPaused(mediaRecorder) {
  return !!mediaRecorder && mediaRecorder.state === "paused";
}

export function pauseRecording(mediaRecorder) {
  if (this.isRecording(mediaRecorder)) {
    mediaRecorder?.pause();
  }
}

export function resumeRecording(mediaRecorder) {
  if (this.isPaused(mediaRecorder)) {
    mediaRecorder?.resume();
  }
}

export default {
  resumeRecording,
  startRecording,
  pauseRecording,
  isPaused,
  isRecording,
  stopRecording,
};
