// import axios from "axios";
import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";

export const APIContext = createContext({
  messages: [],
  setMessages: async () => {},
  chatinput: { input: "", send: false },
  setChatInput: async () => {},
  isgenerating: false,
  setIsGenerating: async () => {},
  setIsLoading: async () => {},
  isloading: false,
  UploadFile: async (formData) => {
    return { status: 0, msg: "", data: [] };
  },
  workflowData: null,
  workdata: null,
  UpdateWorkFlow: async () => {
    return { status: 0, msg: "", data: [] };
  },
  newworkflowData: null,
  setNewWorkflowData: async () => {},
});

const APIContextProvider = ({ children }) => {
  let url = process.env.REACT_APP_BASE_URL;
  const [messages, setMessages] = useState([]);
  const [chatinput, setChatInput] = useState({
    input: "",
    send: false,
  });
  const [isgenerating, setIsGenerating] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [workflowData, setWorkflowData] = useState(null);
  const [newworkflowData, setNewWorkflowData] = useState(null);
  const [workdata, setWorkData] = useState(null);

  const UploadFile = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${url}/upload-file/`, formData, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        maxBodyLength: Infinity,
      });
      if (response.status == 200 && response.data) {
        setWorkData(response.data);
        const work = await ConvertFlow(response.data);
        if (work.status) {
          return { status: 1, msg: "", data: response.data };
        } else {
          return work;
        }
      }
      return { status: 0, msg: "Error in Uploading the file", data: [] };
    } catch (err) {
      console.error("Error while uploading the file: ", err);
      return { status: 0, msg: "Error in Uploading the file", data: [] };
    } finally {
      setIsLoading(false);
    }
  };

  const ConvertFlow = async (data) => {
    const body = {
      process_data: data,
    };
    try {
      const response = await axios.post(`${url}/design-process-flow/`, body, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        maxBodyLength: Infinity,
      });
      if (response.status == 200 && response.data) {
        setWorkflowData(response.data);
        return { status: 1, msg: "", data: response.data };
      } else {
        return { status: 0, msg: "Error in Uploading the file", data: [] };
      }
    } catch (err) {
      return { status: 0, msg: "Error in Uploading the file", data: [] };
    } finally {
      setIsLoading(false);
    }
  };

  const UpdateWorkFlow = async (query) => {
    const body = {
      process_flow: workflowData,
      modifications: query,
    };
    let olddata = workflowData;
    try {
      setWorkData(null);
      setNewWorkflowData(null);
      const response = await axios.post(`${url}/modify-process-flow/`, body, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        maxBodyLength: Infinity,
      });

      if (response.status == 200 && response.data) {
        setWorkData(olddata);
        setNewWorkflowData(response.data);
        // setMessages((prev) => [
        //   ...prev,
        //   {
        //     sender: "ai",
        //     query: describeChanges(olddata, response.data),
        //   },
        // ]);
        return { status: 1, msg: "", data: response.data };
      } else {
        return { status: 0, msg: "Error in Uploading the file", data: [] };
      }
    } catch {
      console.error("");
    } finally {
    }
  };

  // const describeChanges = (oldJson, newJson) => {
  //   const changes = [];

  //   const oldNodes = Object.fromEntries(
  //     (oldJson.nodes || []).map((node) => [node.id, node])
  //   );
  //   const newNodes = Object.fromEntries(
  //     (newJson.nodes || []).map((node) => [node.id, node])
  //   );

  //   for (const [id, newNode] of Object.entries(newNodes)) {
  //     const oldNode = oldNodes[id];

  //     if (oldNode) {
  //       for (const key in newNode) {
  //         if (oldNode.hasOwnProperty(key) && oldNode[key] !== newNode[key]) {
  //           changes.push(
  //             `Changed ${key} (id: ${id}) from "${oldNode[key]}" to "${newNode[key]}"`
  //           );
  //         }
  //       }
  //     } else {
  //       changes.push(`Added a field ${JSON.stringify(newNode, null, 4)}`);
  //     }
  //   }

  //   return changes.join(", ");
  // };

  const apiContextValue = useMemo(
    () => ({
      messages,
      setMessages,
      chatinput,
      setChatInput,
      isgenerating,
      setIsGenerating,
      setIsLoading,
      isloading,
      UploadFile,
      workflowData,
      workdata,
      UpdateWorkFlow,
      newworkflowData,
      setNewWorkflowData,
    }),
    [
      messages,
      setMessages,
      chatinput,
      setChatInput,
      isgenerating,
      setIsGenerating,
      setIsLoading,
      isloading,
      UploadFile,
      workflowData,
      workdata,
      UpdateWorkFlow,
      newworkflowData,
      setNewWorkflowData,
    ]
  );

  return (
    <APIContext.Provider value={apiContextValue}>
      {children}
    </APIContext.Provider>
  );
};

export default APIContextProvider;
