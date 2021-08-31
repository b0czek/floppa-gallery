import React from "react";

import Separator from "./Separator";
import Chat from "./chat/Chat";
import Sidebar from "./Sidebar.jsx";
import "./App.css";

function App() {
    return (
        <div className="container">
            <Sidebar />
            <Separator />
            <Chat />
        </div>
    );
}

export default App;
