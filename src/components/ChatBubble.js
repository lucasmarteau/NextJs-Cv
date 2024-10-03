export default function ChatBubble({ message, role }) {
    return (
        <div className={`chat-bubble ${role}`}>
            {message || "Aucune réponse"} {/* Affiche un message par défaut si rien n'est présent */}
        </div>
    );
}
