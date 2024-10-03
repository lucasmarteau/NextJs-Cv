export default function ChatBubble({ message, role }) {
    return (
        <div className={`chat-bubble ${role}`}>
            {message}
        </div>
    );
}
