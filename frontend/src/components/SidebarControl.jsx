import "./SidebarControl.css";

const SidebarControl = (props) => {
    return (
        <div className="controlContainer">
            <div className="controlIconContainer">
                <img src={props.imgPath} alt={props.imgAlt} className="controlIcon" />
            </div>
            <div className="controlText">
                <span>{props.text}</span>
            </div>
        </div>
    );
};
export default SidebarControl;
