import io from 'socket.io-client';
import './App.css';
import React from 'react';
function App() {
  const [activeConnections, setActiveConnections] = React.useState(0);

  React.useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.emit('activeConnections');
    socket.on('activeConnections', (connections) => {
      console.log(connections)
      setActiveConnections(connections);
    })
  }, []);

  return (
    <div className="App">
      activeConnections: {activeConnections}
    </div>
  );
}

export default App;
