// import React from "react";
// import ReactFlow, {
//   Background,
//   Controls,
//   MiniMap,
//   useNodesState,
//   useEdgesState,
//   Handle,
// } from "reactflow";
// import "reactflow/dist/style.css";

// const CustomNode = ({ data }) => {
//   const { type, id, role, label, it_system } = data;

//   const isDecision = type === "decision";
//   const isTerminal = type === "start" || type === "end";

//   const baseStyle = {
//     width: isDecision ? 150 : 250,
//     height: isDecision ? 150 : "auto",
//     padding: isDecision ? 0 : 15,
//     border: "2px solid #333",
//     backgroundColor: "#fff",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     textAlign: "center",
//     borderRadius: isTerminal ? 50 : 10,
//     transform: isDecision ? "rotate(45deg)" : "none",
//     position: "relative",
//   };

//   const contentStyle = isDecision
//     ? { transform: "rotate(-45deg)", padding: 15 }
//     : {};

//   return (
//     <div style={baseStyle}>
//       <Handle type="target" position="top" style={{ background: "#555" }} />
//       <div style={contentStyle}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             fontSize: "0.8rem",
//           }}
//         >
//           <div>
//             <strong>ID:</strong> {id}
//           </div>
//           <div>
//             <strong>Role:</strong> {role}
//           </div>
//         </div>
//         <div style={{ margin: "8px 0", fontWeight: "bold", fontSize: "1rem" }}>
//           {label}
//         </div>
//         <div style={{ fontSize: "0.75rem" }}>
//           <strong>System:</strong> {it_system}
//         </div>
//       </div>
//       <Handle type="source" position="bottom" style={{ background: "#555" }} />
//     </div>
//   );
// };

// const nodeTypes = {
//   custom: CustomNode,
// };

// const WorkflowDiagram = ({ workflowData }) => {
//   const initialNodes = workflowData
//     ? workflowData.nodes.map((node, index) => ({
//         id: String(node.id),
//         type: "custom",
//         position: { x: index * 350, y: 100 },

//         data: { ...node },
//         draggable: false,
//         selectable: false,
//       }))
//     : [];

//   const initialEdges = workflowData
//     ? workflowData.edges.map((edge) => ({
//         id: `${edge.from}-${edge.to}`,
//         source: String(edge.from),
//         target: String(edge.to),
//         type: "default",
//         animated: !!edge.label,
//         label: edge.label || "",
//         labelBgStyle: { fill: "#fff", fillOpacity: 0.7 },
//         markerEnd: { type: "arrowclosed" },
//         style: {
//           strokeWidth: 3,
//           stroke: "#222",
//         },
//       }))
//     : [];

//   const [nodes, , onNodesChange] = useNodesState(initialNodes);
//   const [edges, , onEdgesChange] = useEdgesState(initialEdges);

//   return (
//     <div style={{ width: "100%", height: "30vh", overflowY: "auto" }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         nodeTypes={nodeTypes}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         fitView
//         nodesDraggable={false}
//         nodesConnectable={false}
//         elementsSelectable={false}
//         panOnDrag={true}
//         zoomOnScroll={false}
//         connectionLineType="default"
//       >
//         <MiniMap />
//         <Controls />
//         <Background variant="dots" gap={16} size={1} />
//       </ReactFlow>
//     </div>
//   );
// };

// export default WorkflowDiagram;

import React from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
} from "reactflow";
import "reactflow/dist/style.css";

const CustomNode = ({ data }) => {
  const { type, id, role = "-", label, it_system = "-" } = data;

  const isDecision = type === "decision";
  const isTerminal = type === "start" || type === "end";

  const baseStyle = {
    width: isDecision ? 150 : 250,
    height: isDecision ? 150 : "auto",
    padding: isDecision ? 0 : 15,
    border: "2px solid #333",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: isTerminal ? 50 : 10,
    transform: isDecision ? "rotate(45deg)" : "none",
    position: "relative",
  };

  const contentStyle = isDecision
    ? { transform: "rotate(-45deg)", padding: 15 }
    : {};

  return (
    <div style={baseStyle}>
      <Handle type="target" position="top" style={{ background: "#555" }} />
      <div style={contentStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.8rem",
          }}
        >
          <div>
            <strong>ID:</strong> {id}
          </div>
          <div>
            <strong>Role:</strong> {role}
          </div>
        </div>
        <div style={{ margin: "8px 0", fontWeight: "bold", fontSize: "1rem" }}>
          {label}
        </div>
        <div style={{ fontSize: "0.75rem" }}>
          <strong>System:</strong> {it_system}
        </div>
      </div>
      <Handle type="source" position="bottom" style={{ background: "#555" }} />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const WorkflowDiagram = ({ workflowData }) => {
  const initialNodes = workflowData
    ? workflowData.nodes.map((node, index) => ({
        id: String(node.id),
        type: "custom",
        position: { x: index * 300, y: 100 },
        data: {
          id: node.id,
          label: node.label,
          type: node.type,
          role: node.role || "-", // Default to "-" if undefined
          it_system: node.it_system || "-", // Default to "-" if undefined
        },
        draggable: false,
        selectable: false,
      }))
    : [];

  const initialEdges = workflowData
    ? workflowData.edges.map((edge, index) => ({
        id: `${edge.from}-${edge.to}`,
        source: String(edge.from),
        target: String(edge.to),
        type: "default",
        animated: !!edge.label,
        label: edge.label || "",
        labelBgStyle: { fill: "#fff", fillOpacity: 0.7 },
        markerEnd: { type: "arrowclosed" },
        style: {
          strokeWidth: 3,
          stroke: "#222",
        },
      }))
    : [];

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: "100%", height: "30vh", overflowY: "auto" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={true}
        zoomOnScroll={false}
        connectionLineType="default"
      >
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
};

export default WorkflowDiagram;
