import "./ChatHeader.scss";

const ChatHeader = ({ headerText }) => (
    <div className="chatHeader">
        <div className="wordart" data-content={headerText}>
            {headerText}
        </div>
    </div>
);
export default ChatHeader;
