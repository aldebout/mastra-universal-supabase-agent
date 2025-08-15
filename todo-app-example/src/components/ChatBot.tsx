import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { session } = useAuth();

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: `${
        import.meta.env.VITE_MASTRA_BASE_URL || "http://localhost:4111"
      }/api/agents/supabaseExplorer/stream`,
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
      id: session?.user.id,
    });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  console.log({ handleSubmit, input, messages, isLoading, handleInputChange });

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        💬
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "350px",
        height: "500px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
        border: "1px solid #e0e0e0",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "12px 12px 0 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "16px" }}>Chat Assistant</h3>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
            padding: "0",
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "16px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {messages.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "#666",
              fontSize: "14px",
              padding: "20px",
            }}
          >
            Hi! How can I help you today?
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: "flex",
              justifyContent:
                message.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "80%",
                padding: "8px 12px",
                borderRadius: "18px",
                backgroundColor:
                  message.role === "user" ? "#007bff" : "#f1f3f5",
                color: message.role === "user" ? "white" : "#333",
                fontSize: "14px",
                lineHeight: "1.4",
              }}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                maxWidth: "80%",
                padding: "8px 12px",
                borderRadius: "18px",
                backgroundColor: "#f1f3f5",
                color: "#333",
                fontSize: "14px",
                lineHeight: "1.4",
              }}
            >
              Typing...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        style={{
          padding: "16px",
          borderTop: "1px solid #e0e0e0",
          display: "flex",
          gap: "8px",
        }}
      >
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          disabled={isLoading}
          style={{
            flex: 1,
            padding: "8px 12px",
            border: "1px solid #e0e0e0",
            borderRadius: "20px",
            fontSize: "14px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "20px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
