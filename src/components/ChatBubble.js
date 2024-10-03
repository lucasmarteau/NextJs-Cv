import PropTypes from 'prop-types';

export default function ChatBubble({ message = "Aucune réponse", role }) {
    return (
        <div className={`chat-bubble ${role}`}>
            {message}
        </div>
    );
}

ChatBubble.propTypes = {
    message: PropTypes.string,
    role: PropTypes.oneOf(['user', 'assistant']).isRequired,
};
