        import React, { useState, useEffect } from "react";
        import io from "socket.io-client";

        const ChatScreen = () => {

          const socket = io('localhost:3000');
          

          useEffect(() => {
          }, []);

          return (
            <div className="chatScreen">HI</div>
          );
        };

        export default ChatScreen;

        