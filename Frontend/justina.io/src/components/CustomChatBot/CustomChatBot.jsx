import ChatBot from "react-chatbotify";
import avatar from "../../assets/imgs/caraJustinabot.png";
import { useMemo } from "react";
import useChatbotStore from "../../store/useChatbotStore";
import { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";

const styles = {
  headerStyle: {
    background: "var(--color-primary)",
    color: "#fff",
    padding: "10px",
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    userSelect: "none",
  },
};

const CustomChatBot = () => {
  const containerRef = useRef();
  const { openChatBot, setOpenChatbot, ref } = useChatbotStore();
  useClickOutside(containerRef, () => setOpenChatbot(false), ref);
  const settings = useMemo(
    () => ({
      general: {
        embedded: true,
        fontFamily: "Noto Sans",
        showFooter: false,
      },
      chatHistory: { disabled: true },
      notification: { disabled: true },
      audio: { disabled: true },
      voice: { disabled: true },
      emoji: { disabled: true },
      fileAttachment: { disabled: true },
      botBubble: {
        avatar: avatar,
        showAvatar: true,
        name: "Justinabot",
      },
      header: {
        showAvatar: true,
        avatar: avatar,
        title: "Justina Chatbot",
      },
      chatWindow: {
        autoJumpToBottom: true,
        showScrollbar: false,
      },
    }),
    []
  );
  const flow = {
    start: {
      message: "¿En que te puedo ayudar?",
      chatDisabled: true,
      options: ["¿Qué es la Ley Justina?", "¿Qué es Justion io?"],
      path: async (params) => {
        const option = params.userInput;
        if (option === "¿Qué es Justion io?") {
          return "res_platform";
        } else {
          return "res_leyjustina";
        }
      },
    },
    res_leyjustina: {
      chatDisabled: false,
      message: async (params) => {
        await params.injectMessage(
          "La plataforma está destinada principalmente a tres tipos de usuarios: centros médicos, médicos y pacientes. Los centros médicos pueden dar de alta o baja a sus médicos, mientras que los médicos pueden visualizar de forma digital la información de sus pacientes. Por su parte, los pacientes pueden administrar sus tareas, medicamentos, tomar notas, y consultar su historial clínico, entre otras funcionalidades."
        );
        return new Promise((resolve) =>
          setTimeout(
            () => resolve("Puedo ayudarte en alguna otra cosa puedo ayudarte?"),
            2000
          )
        );
      },
      options: ["si", "no"],
      path: async (params) => {
        const option = params.userInput;
        return option === "si" ? "loop" : "";
      },
      function: (params) => {
        const option = params.userInput;
        if (option === "no") {
          setOpenChatbot(!openChatBot);
        }
      },
    },
    res_platform: {
      chatDisabled: false,

      message: async (params) => {
        await params.injectMessage(
          "La plataforma está destinada principalmente a tres tipos de usuarios: centros médicos, médicos y pacientes. Los centros médicos pueden dar de alta o baja a sus médicos, mientras que los médicos pueden visualizar de forma digital la información de sus pacientes. Por su parte, los pacientes pueden administrar sus tareas, medicamentos, tomar notas, y consultar su historial clínico, entre otras funcionalidades."
        );

        return new Promise((resolve) =>
          setTimeout(
            () => resolve("Puedo ayudarte en alguna otra cosa puedo ayudarte?"),
            2000
          )
        );
      },
      options: ["si", "no"],
      path: async (params) => {
        const option = params.userInput;
        return option === "si" ? "loop" : "";
      },
      function: (params) => {
        const option = params.userInput;
        if (option === "no") {
          setOpenChatbot(!openChatBot);
        }
      },
    },
    loop: {
      message: "En que exactamente?",
      chatDisabled: true,
      options: ["¿Qué es la Ley Justina?", "¿Qué es Justion io?"],
      path: async (params) => {
        const option = params.userInput;
        if (option === "¿Qué es Justion io?") {
          return "res_platform";
        } else {
          return "res_leyjustina";
        }
      },
    },
  };
  return (
    <div
      ref={containerRef}
      className={`fixed bottom-0 left-[15rem] z-50 transition-all duration-300 ${
        openChatBot ? "h-auto bottom-0 opacity-100" : "h-0 -bottom-4 opacity-0"
      }`}
    >
      {openChatBot ? (
        <ChatBot styles={styles} settings={settings} flow={flow} />
      ) : undefined}
    </div>
  );
};

export default CustomChatBot;
