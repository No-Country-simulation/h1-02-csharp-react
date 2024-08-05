import api from "../api/axios"

const useTranscript = async (audio, encoding)=>{
    return await api.post("/api/Speech/transcribe", {audio, encoding}).then((res)=>{
        
        return res.transcription;
    });
}

export default useTranscript;