import "./ChatControls.scss";

const PostMessageIcon = () => (
    <svg width="30" height="30" viewBox="0 0 24 24">
        <polygon
            points="3 12 8.61 14.992 17 8 9 17.455 9 21 12.164 16.887 18 20 21 3"
            fill="#fff"
        />
    </svg>
);

const ChatControls = ({ controls }) => {
    return (
        <div className="controlsContainer">
            <form className="controls">
                <div className="controlsInput">
                    <input
                        type="text"
                        name="author"
                        value={controls.author}
                        onChange={controls.handleChange}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        name="text"
                        value={controls.text}
                        onChange={controls.handleChange}
                        placeholder="Message"
                    />
                </div>
                <button
                    type="submit"
                    value=""
                    onClick={controls.sendMessage}
                    className="sendMessage"
                >
                    <PostMessageIcon />
                </button>
            </form>
        </div>
    );
};
export default ChatControls;
