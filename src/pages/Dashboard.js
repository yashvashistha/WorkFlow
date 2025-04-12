import React, { useContext, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import { APIContext } from "../helpers/APIContext";
import WorkflowDiagram from "../components/WorkflowDiagram";
import FileUpload from "../components/FileUpload";
import ProcessTable from "../components/ProcessTable";

export default function Dashboard() {
  const { messages, workdata, workflowData, setMessages, UpdateWorkFlow } =
    useContext(APIContext);
  const [showTable, setShowTable] = useState(true);
  const [typing, setTyping] = useState({
    type: false,
    txt: "",
  });
  const [prevkey, setPrevKey] = useState("");

  const sendinput = async (text) => {
    setTyping({
      type: false,
      txt: "",
    });
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        query: text,
      },
    ]);
    await UpdateWorkFlow(text);
  };

  const handleInputChange = (e) => {
    setTyping((prevtype) => ({
      ...prevtype,
      txt: e.target.value.trimStart(),
    }));
    setPrevKey(e.key == undefined ? "" : e.key);
    if (
      e.key === "Enter" &&
      prevkey != "Shift" &&
      typing.txt !== "" &&
      typing.txt.trim()
    ) {
      sendinput(typing.txt);
    }
  };

  return (
    <div className="dashboard">
      <section className="upload" id="d-1">
        <FileUpload />
      </section>
      <section className="workflow" id="d-2">
        <h2>WorkFlow Diagram Generator</h2>

        {workdata && (
          <h4>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                setShowTable(!showTable);
              }}
            >
              {showTable ? "▲" : "▼"}
            </span>{" "}
            Uploaded Data:
          </h4>
        )}
        {workdata && showTable && <ProcessTable data={workdata} />}

        {workflowData && <h4>Generated Workflow Diagram:</h4>}
        {workflowData && <WorkflowDiagram workflowData={workflowData} />}
      </section>

      <section id="d-3">
        <ChatWindow Messages={messages} />

        <div className="" id="bottom-div">
          <textarea
            id="searchQuery"
            className="form-control"
            rows="2"
            placeholder="Enter here"
            value={typing.txt}
            onChange={handleInputChange}
            onKeyDown={handleInputChange}
          ></textarea>
        </div>
      </section>
    </div>
  );
}
