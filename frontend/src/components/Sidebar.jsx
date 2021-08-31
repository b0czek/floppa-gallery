import Banner from "./Banner";
import SidebarControl from "./SidebarControl";

import "./Sidebar.css";

import floppa from "../imgs/floppa-head.png";

const Sidebar = (props) => {
    return (
        <div className="sidebar">
            <div className="bannerContainer">
                <Banner className="banner" />
            </div>
            <div className="bannerUnderside">
                <SidebarControl text="we do it" imgPath={floppa} />
            </div>
            <div className="sidebarBottom">
                <SidebarControl text="Settings" imgPath="/icons/settings.svg" />
            </div>
        </div>
    );
};

export default Sidebar;
