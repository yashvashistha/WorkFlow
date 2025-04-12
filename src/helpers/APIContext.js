// import axios from "axios";
import axios from "axios";
import { createContext, useMemo, useState } from "react";

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
      console.log(response);
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
        const temp = await convertFlowchartData(response.data);
        console.log(temp, response.data);
        setWorkflowData(temp);
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

  const convertFlowchartData = async (data) => {
    const formattedNodes = data.nodes.map((node) => {
      const formattedNode = {
        id: node.id,
        label: node.label,
        type: node.type,
      };
      if (node.role) {
        formattedNode.role = node.role;
      }
      if (node.it_system) {
        formattedNode.it_system = node.it_system;
      }
      return formattedNode;
    });

    const formattedEdges = data.edges.map((edge) => {
      const formattedEdge = {
        from: edge.from,
        to: edge.to,
        type: edge.type,
      };
      if (edge.label) {
        formattedEdge.label = edge.label;
      }
      return formattedEdge;
    });

    return {
      nodes: formattedNodes,
      edges: formattedEdges,
    };
  };

  // const workflowData1 = {
  //   nodes: [
  //     { id: 0, label: "Start", type: "start", role: "", it_system: "" },
  //     {
  //       id: 1,
  //       label: "Create Targets",
  //       type: "process",
  //       role: "Manager - PMT",
  //       it_system: "MS Excel",
  //     },
  //     {
  //       id: 2,
  //       label: "Approve Targets",
  //       type: "decision",
  //       role: "GM Sales",
  //       it_system: "MS Word",
  //     },
  //     {
  //       id: 3,
  //       label: "Distribute Targets",
  //       type: "process",
  //       role: "Manager - PMT",
  //       it_system: "MS Outlook",
  //     },
  //     {
  //       id: 4,
  //       label: "Monitor Targets",
  //       type: "process",
  //       role: "Manager - PMT",
  //       it_system: "MS Excel",
  //     },
  //     {
  //       id: 5,
  //       label: "Share Updates",
  //       type: "process",
  //       role: "Manager - PMT",
  //       it_system: "MS Outlook",
  //     },
  //     {
  //       id: 6,
  //       label: "Meeting with Low Performers",
  //       type: "process",
  //       role: "SM Sales",
  //       it_system: "In Person",
  //     },
  //     {
  //       id: 7,
  //       label: "Discuss Improvement Plan",
  //       type: "decision",
  //       role: "SM Sales",
  //       it_system: "In Person",
  //     },
  //     {
  //       id: 8,
  //       label: "Track Performance",
  //       type: "process",
  //       role: "",
  //       it_system: "MS Excel",
  //     },
  //     { id: 9, label: "End", type: "end", role: "", it_system: "" },
  //   ],
  //   edges: [
  //     { from: 0, to: 1 },
  //     { from: 1, to: 2 },
  //     { from: 2, to: 3, label: "Targets Justified" },
  //     { from: 3, to: 4 },
  //     { from: 4, to: 5 },
  //     { from: 5, to: 6 },
  //     { from: 6, to: 7 },
  //     { from: 7, to: 8, label: "Performance Low" },
  //     { from: 8, to: 9 },
  //   ],
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
    ]
  );

  return (
    <APIContext.Provider value={apiContextValue}>
      {children}
    </APIContext.Provider>
  );
};

export default APIContextProvider;
