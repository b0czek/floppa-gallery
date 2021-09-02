import "./ChatControls.scss";

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
                <input
                    type="submit"
                    value=""
                    onClick={controls.sendMessage}
                    className="sendMessage"
                />
            </form>
        </div>
    );
};
export default ChatControls;
