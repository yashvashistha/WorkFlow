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
  const { type, id, role, label, it_system } = data;

  const isDecision = type === "decision";
  const isStart = type === "start";
  const isEnd = type === "end";
  const isConditional = type === "conditional";
  const isProcess = type === "process";

  let backgroundColor = "#fff";
  if (isStart) backgroundColor = "lightgreen";
  else if (isEnd) backgroundColor = "lightpink";
  else if (isConditional) backgroundColor = "darkblue";
  else if (isProcess) backgroundColor = "lightblue";

  const baseStyle = {
    minWidth: isDecision ? 150 : 250,
    maxWidth: isDecision ? 200 : 300,
    padding: isDecision ? 0 : 15,
    border: "2px solid #333",
    backgroundColor,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: isStart || isEnd ? 50 : 10,
    transform: isDecision ? "rotate(45deg)" : "none",
    position: "relative",
    boxSizing: "border-box",
    overflowWrap: "break-word",
    wordWrap: "break-word",
    whiteSpace: "normal",
    color: backgroundColor === "darkblue" ? "white" : "black",
  };

  const contentStyle = {
    transform: isDecision ? "rotate(-45deg)" : "none",
    padding: 15,
    wordWrap: "break-word",
    overflowWrap: "break-word",
    whiteSpace: "normal",
  };

  return (
    <div style={baseStyle}>
      <Handle type="target" position="top" style={{ background: "#555" }} />
      <div style={contentStyle}>
        {(id || role) && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.8rem",
              flexWrap: "wrap",
              gap: "4px",
            }}
          >
            {id && id !== "-" && (
              <div>
                <strong>ID:</strong> {id}
              </div>
            )}
            {role && role !== "-" && (
              <div>
                <strong>Role:</strong> {role}
              </div>
            )}
          </div>
        )}
        <div style={{ margin: "8px 0", fontWeight: "bold", fontSize: "1rem" }}>
          {label}
        </div>
        {it_system && it_system !== "-" && (
          <div style={{ fontSize: "0.75rem" }}>
            <strong>System:</strong> {it_system}
          </div>
        )}
      </div>
      <Handle type="source" position="bottom" style={{ background: "#555" }} />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

// const WorkflowDiagram = ({ workflowData }) => {
//   const initialNodes = workflowData
//     ? workflowData.nodes.map((node, index) => ({
//         id: String(node.id),
//         type: "custom",
//         position: { x: index * 500, y: 100 },
//         data: {
//           id: node.id,
//           label: node.label,
//           type: node.type,
//           role: node.role || "-",
//           it_system: node.it_system || "-",
//         },
//         draggable: false,
//         selectable: false,
//       }))
//     : [];

//   const initialEdges = workflowData
//     ? workflowData.edges.map((edge) => {
//         const isConditionalEdge =
//           edge.label && edge.label.toLowerCase().includes("condition");

//         return {
//           id: `${edge.from}-${edge.to}`,
//           source: String(edge.from),
//           target: String(edge.to),
//           type: "default",
//           animated: !!edge.label,
//           label: edge.label || "",
//           labelBgStyle: { fill: "#fff", fillOpacity: 0.7 },
//           markerEnd: { type: "arrowclosed" },
//           style: {
//             strokeWidth: 3,
//             stroke: isConditionalEdge ? "darkblue" : "#222",
//           },
//         };
//       })
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

const WorkflowDiagram = ({ workflowData }) => {
  const initialNodes = workflowData
    ? workflowData.nodes.map((node, index) => ({
        id: String(node.id),
        type: "custom",
        position: { x: index * 500, y: 100 },
        data: {
          id: node.id,
          label: node.label,
          type: node.type,
          role: node.role || "-",
          it_system: node.it_system || "-",
        },
        draggable: false,
        selectable: false,
      }))
    : [];

  const initialEdges = workflowData
    ? workflowData.edges.map((edge) => {
        const isConditionalEdge =
          edge.label && edge.label.toLowerCase().includes("condition");

        return {
          id: `${edge.from}-${edge.to}`,
          source: String(edge.from),
          target: String(edge.to),
          type: "straight",
          animated: !!edge.label,
          label: edge.label || "",
          labelBgStyle: { fill: "#fff", fillOpacity: 0.7 },
          markerEnd: { type: "arrowclosed" },
          style: {
            strokeWidth: 3,
            stroke: isConditionalEdge ? "darkblue" : "#222",
          },
        };
      })
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
        connectionLineType="straight"
      >
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
};

export default WorkflowDiagram;
