import React, { useContext, useEffect, useRef } from "react";
import { APIContext } from "../helpers/APIContext";

function ChatWindow({ Messages }) {
  const chatContainerRef = useRef(null);
  const { isgenerating } = useContext(APIContext);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [Messages]);

  return (
    <div className="col-lg-6 order-first">
      <div className="box mb-5">
        <div className="box-body pe-2">
          <section className="scroll-area">
            {Messages.map((message, index) => (
              <div key={index} className="msger-chat">
                {message.sender == "user" && (
                  <div className="msg-question">
                    <div
                      className="msg-img"
                      style={
                        {
                          // backgroundImage: `url(${userlogo})`,
                        }
                      }
                    ></div>
                    <div className="w-100">
                      <div ref={isgenerating ? chatContainerRef : null}>
                        {message.query}
                      </div>
                    </div>
                  </div>
                )}
                {message.sender == "ai" && (
                  <div className="msg-answer">
                    <div className="msg-answer-heading">Answer:</div>

                    <div
                      className="msg-answer-content"
                      ref={!isgenerating ? chatContainerRef : null}
                    ></div>
                  </div>
                )}
              </div>
            ))}
            {/* {isgenerating && <Loader showLoader={isgenerating} />} */}
            {Messages.length == 0 && (
              <div className="box-header">Ask Anything...</div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
