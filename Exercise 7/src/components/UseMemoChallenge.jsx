// Import React and hooks for state and effect management
import React, { useState } from 'react';




// --- Utility functions ---

function relu(x) { // ReLU activation function
  return x.map(v => Math.max(0, v));
}
function reluDerivative(x) { // Derivative of ReLU
  return x.map(v => (v > 0 ? 1 : 0));
}
function sigmoid(x) { // Sigmoid activation function
  return x.map(v => 1 / (1 + Math.exp(-v)));
}
function sigmoidDerivative(x) { // Derivative of sigmoid
  return x.map(v => v * (1 - v));
}
function matMul(a, b) { // Matrix multiplication
  return a.map(row =>
    b[0].map((_, j) =>
      row.reduce((sum, val, i) => sum + val * b[i][j], 0)
    )
  );
}
function addBias(mat, bias) { // Add bias vector to each row of matrix
  return mat.map(row => row.map((v, i) => v + bias[i]));
}
function transpose(mat) { // Transpose a matrix
  return mat[0].map((_, i) => mat.map(row => row[i]));
}
function subtract(a, b) { // Element-wise subtraction of matrices
  return a.map((row, i) => row.map((v, j) => v - b[i][j]));
}
function multiply(a, b) { // Element-wise multiplication of matrices
  return a.map((row, i) => row.map((v, j) => v * b[i][j]));
}
function scalarMultiply(mat, scalar) { // Multiply matrix by scalar
  return mat.map(row => row.map(v => v * scalar));
}
function randomMatrix(rows, cols) { // Generate random matrix
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.random() * 2 - 1)
  );
}
function zeroMatrix(rows, cols) { // Generate zero matrix
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0)
  );
}

// --- Dataset: XOR problem ---
const DATASET = [
  { input: [0, 0], target: [0] }, // Input/target pairs for XOR
  { input: [0, 1], target: [1] },
  { input: [1, 0], target: [1] },
  { input: [1, 1], target: [0] }
];

// --- Main React component ---
export default function UseMemoChallenge() {
  // State: weights and biases for each layer
  const [W1, setW1] = useState(randomMatrix(2, 4)); // Weights for layer 1
  const [b1, setB1] = useState(Array(4).fill(0));   // Biases for layer 1
  const [W2, setW2] = useState(randomMatrix(4, 4)); // Weights for layer 2
  const [b2, setB2] = useState(Array(4).fill(0));   // Biases for layer 2
  const [W3, setW3] = useState(randomMatrix(4, 4)); // Weights for layer 3
  const [b3, setB3] = useState(Array(4).fill(0));   // Biases for layer 3
  const [W4, setW4] = useState(randomMatrix(4, 1)); // Weights for output layer
  const [b4, setB4] = useState(Array(1).fill(0));   // Biases for output layer

  // State: activations, loss, gradients, and UI step
  const [activations, setActivations] = useState({}); // Stores activations for all layers
  const [loss, setLoss] = useState(null);             // Stores current loss
  const [grads, setGrads] = useState({});             // Stores gradients for all layers
  const [step, setStep] = useState('');               // UI step indicator
  const [epoch, setEpoch] = useState(0);              // Track epoch count

  // --- Forward pass: compute activations and loss ---
  function forwardPass(weights = { W1, b1, W2, b2, W3, b3, W4, b4 }) {
    // Prepare input as a matrix (batch size = 4)
    const X = DATASET.map(d => d.input);
    // Layer 1: input -> hidden1 (ReLU)
    const z1 = addBias(matMul(X, weights.W1), weights.b1);
    const a1 = relu(z1.flat()).reduce((acc, v, i) => {
      if (i % 4 === 0) acc.push([]);
      acc[acc.length - 1].push(v);
      return acc;
    }, []);
    // Layer 2: hidden1 -> hidden2 (ReLU)
    const z2 = addBias(matMul(a1, weights.W2), weights.b2);
    const a2 = relu(z2.flat()).reduce((acc, v, i) => {
      if (i % 4 === 0) acc.push([]);
      acc[acc.length - 1].push(v);
      return acc;
    }, []);
    // Layer 3: hidden2 -> hidden3 (ReLU)
    const z3 = addBias(matMul(a2, weights.W3), weights.b3);
    const a3 = relu(z3.flat()).reduce((acc, v, i) => {
      if (i % 4 === 0) acc.push([]);
      acc[acc.length - 1].push(v);
      return acc;
    }, []);
    // Output layer: hidden3 -> output (Sigmoid)
    const z4 = addBias(matMul(a3, weights.W4), weights.b4);
    const a4 = sigmoid(z4.flat()).map(v => [v]);
    // Compute loss (mean squared error)
    const Y = DATASET.map(d => d.target);
    const mse = a4.reduce((sum, row, i) => sum + Math.pow(row[0] - Y[i][0], 2), 0) / 4;
    // Store activations and loss in state
    setActivations({ X, z1, a1, z2, a2, z3, a3, z4, a4, Y });
    setLoss(mse);
    return { X, z1, a1, z2, a2, z3, a3, z4, a4, Y, mse };
  }

  // --- Button handlers ---
  function handleForwardPass() { // Run forward pass
    forwardPass();
    setStep('forward');
    setGrads({});
  }

  function handleBackprop() { // Run backpropagation
    // Use stored activations from last forward pass
    if (!activations.a4) return;
    const { X, z1, a1, z2, a2, z3, a3, z4, a4, Y } = activations;
    // Output layer error
    const dz4 = a4.map((row, i) => [2 * (row[0] - Y[i][0]) * sigmoidDerivative([row[0]])[0]]);
    const dW4 = matMul(transpose(a3), dz4);
    const db4 = dz4.reduce((acc, row) => acc.map((v, i) => v + row[i]), Array(1).fill(0));
    // Hidden3 layer
    const da3 = matMul(dz4, transpose(W4));
    const dz3 = multiply(da3, reluDerivative(z3.flat()).map(v => [v]).reduce((acc, v, i) => {
      if (i % 4 === 0) acc.push([]);
      acc[acc.length - 1].push(v[0]);
      return acc;
    }, []));
    const dW3 = matMul(transpose(a2), dz3);
    const db3 = dz3.reduce((acc, row) => acc.map((v, i) => v + row[i]), Array(4).fill(0));
    // Hidden2 layer
    const da2 = matMul(dz3, transpose(W3));
    const dz2 = multiply(da2, reluDerivative(z2.flat()).map(v => [v]).reduce((acc, v, i) => {
      if (i % 4 === 0) acc.push([]);
      acc[acc.length - 1].push(v[0]);
      return acc;
    }, []));
    const dW2 = matMul(transpose(a1), dz2);
    const db2 = dz2.reduce((acc, row) => acc.map((v, i) => v + row[i]), Array(4).fill(0));
    // Hidden1 layer
    const da1 = matMul(dz2, transpose(W2));
    const dz1 = multiply(da1, reluDerivative(z1.flat()).map(v => [v]).reduce((acc, v, i) => {
      if (i % 4 === 0) acc.push([]);
      acc[acc.length - 1].push(v[0]);
      return acc;
    }, []));
    const dW1 = matMul(transpose(X), dz1);
    const db1 = dz1.reduce((acc, row) => acc.map((v, i) => v + row[i]), Array(4).fill(0));
    setGrads({ dW1, db1, dW2, db2, dW3, db3, dW4, db4 });
    setStep('backprop');
  }

  function handleGradientDescent() { // Run one step of gradient descent
    if (!grads.dW1) return;
    const lr = 0.1; // Learning rate
    // Update weights and biases for each layer
    const newW1 = W1.map((row, i) => row.map((v, j) => v - lr * grads.dW1[i][j]));
    const newB1 = b1.map((v, i) => v - lr * grads.db1[i] / 4);
    const newW2 = W2.map((row, i) => row.map((v, j) => v - lr * grads.dW2[i][j]));
    const newB2 = b2.map((v, i) => v - lr * grads.db2[i] / 4);
    const newW3 = W3.map((row, i) => row.map((v, j) => v - lr * grads.dW3[i][j]));
    const newB3 = b3.map((v, i) => v - lr * grads.db3[i] / 4);
    const newW4 = W4.map((row, i) => row.map((v, j) => v - lr * grads.dW4[i][j]));
    const newB4 = b4.map((v, i) => v - lr * grads.db4[i] / 4);
    setW1(newW1);
    setB1(newB1);
    setW2(newW2);
    setB2(newB2);
    setW3(newW3);
    setB3(newB3);
    setW4(newW4);
    setB4(newB4);
    // Immediately run forward pass with new weights to update loss/activations
    setTimeout(() => {
      forwardPass({ W1: newW1, b1: newB1, W2: newW2, b2: newB2, W3: newW3, b3: newB3, W4: newW4, b4: newB4 });
      setStep('descent');
    }, 0);
  }

  // --- Epoch handler: run multiple gradient descent steps ---
  function handleEpoch() {
    let count = 10; // Number of epochs per click
    function runEpoch(i) {
      if (i === 0) {
        setEpoch(e => e + count);
        return;
      }
      handleBackprop();
      setTimeout(() => {
        handleGradientDescent();
        setTimeout(() => runEpoch(i - 1), 10);
      }, 10);
    }
    runEpoch(count);
  }

  // --- Helper: pretty print a matrix ---
  function printMatrix(mat, decimals = 3) {
    return (
      <pre style={{ fontSize: 12, margin: 0 }}>
        {mat.map(row => row.map(v => v.toFixed(decimals)).join('\t')).join('\n')}
      </pre>
    );
  }

  // --- Helper: color for node activation ---
  function nodeColor(val) {
    // Blue for low, pink for high
    const c = Math.round(200 + 55 * val);
    return `rgb(${c},${180 - 80 * val},${236 - 100 * val})`;
  }

  // --- Neural Network Diagram (SVG) ---
  function NeuralNetDiagram() {
    // Use activations for node values, fallback to zeros
    const { X = [[0,0],[0,0],[0,0],[0,0]], a1 = zeroMatrix(4,4), a2 = zeroMatrix(4,4), a3 = zeroMatrix(4,4), a4 = zeroMatrix(4,1) } = activations;
    // Layout: 2 input, 4x3 hidden, 1 output
    const layers = [
      X, a1, a2, a3, a4
    ];
    const nodeRadius = 16;
    const layerGap = 90;
    const nodeGap = 44;
    const svgWidth = 500;
    const svgHeight = 260;
    // For each layer, draw nodes and lines
    return (
      <svg width={svgWidth} height={svgHeight} style={{ background: '#232946', borderRadius: 12, margin: '0 auto', display: 'block', marginBottom: 18 }}>
        {/* Draw connections */}
        {layers.slice(0, -1).map((layer, li) =>
          layer.map((row, i) =>
            layers[li + 1].map((_, j) => (
              <line
                key={`line-${li}-${i}-${j}`}
                x1={40 + li * layerGap}
                y1={svgHeight/2 - (layer.length-1)*nodeGap/2 + i*nodeGap}
                x2={40 + (li+1)*layerGap}
                y2={svgHeight/2 - (layers[li+1].length-1)*nodeGap/2 + j*nodeGap}
                stroke="#b8c1ec33"
                strokeWidth={1}
              />
            ))
          )
        )}
        {/* Draw nodes */}
        {layers.map((layer, li) =>
          layer.map((row, i) => {
            // For output, row is [val], for others, row is array
            const val = Array.isArray(row) ? (li === 0 ? row[0] : row[i % row.length]) : row;
            return (
              <g key={`node-${li}-${i}`}>
                <circle
                  cx={40 + li * layerGap}
                  cy={svgHeight/2 - (layer.length-1)*nodeGap/2 + i*nodeGap}
                  r={nodeRadius}
                  fill={nodeColor(val)}
                  stroke="#eebbc3"
                  strokeWidth={li === 0 ? 2 : 1}
                />
                <text
                  x={40 + li * layerGap}
                  y={svgHeight/2 - (layer.length-1)*nodeGap/2 + i*nodeGap + 5}
                  textAnchor="middle"
                  fontSize={li === 4 ? 13 : 12}
                  fill="#232946"
                  fontWeight={700}
                >
                  {val !== undefined ? val.toFixed(2) : '0.00'}
                </text>
              </g>
            );
          })
        )}
        {/* Layer labels */}
        <text x={40} y={30} fill="#b8c1ec" fontSize={13}>Input</text>
        <text x={40+layerGap} y={30} fill="#b8c1ec" fontSize={13}>Hidden 1</text>
        <text x={40+2*layerGap} y={30} fill="#b8c1ec" fontSize={13}>Hidden 2</text>
        <text x={40+3*layerGap} y={30} fill="#b8c1ec" fontSize={13}>Hidden 3</text>
        <text x={40+4*layerGap} y={30} fill="#b8c1ec" fontSize={13}>Output</text>
      </svg>
    );
  }

  // --- UI: render the neural network simulator ---
  return (
    <div style={{
      background: 'linear-gradient(135deg, #232946 60%, #393e60 100%)',
      color: '#fff',
      borderRadius: 20,
      padding: 28,
      maxWidth: 750,
      margin: '40px auto',
      boxShadow: '0 6px 32px #0003',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Inline CSS for button hover and focus */}
      <style>{`
        .nn-btn {
          background: #eebbc3;
          color: #232946;
          border: none;
          border-radius: 10px;
          padding: 10px 22px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s, color 0.2s;
          box-shadow: 0 2px 8px #0001;
          outline: none;
        }
        .nn-btn:hover, .nn-btn:focus {
          background: #fff;
          color: #232946;
          box-shadow: 0 4px 16px #eebbc3aa;
        }
        .nn-btn.secondary {
          background: #b8c1ec;
        }
        .nn-btn.secondary:hover, .nn-btn.secondary:focus {
          background: #fff;
          color: #232946;
          box-shadow: 0 4px 16px #b8c1ecaa;
        }
        .nn-btn.tertiary {
          background: #fffffe;
          color: #232946;
        }
        .nn-btn.tertiary:hover, .nn-btn.tertiary:focus {
          background: #eebbc3;
          color: #232946;
          box-shadow: 0 4px 16px #eebbc3aa;
        }
      `}</style>
      {/* Title */}
      <h2 style={{ marginTop: 0, letterSpacing: 1 }}>Neural Network Simulator</h2>
      {/* Subtitle */}
      <div style={{ color: '#b8c1ec', marginBottom: 18 }}>
        <span style={{ fontSize: 17, fontWeight: 500 }}>A simple 3-hidden-layer neural net (ReLU, Sigmoid) trained on XOR.</span>
        <br />
        <small>
          Each button runs a step. See activations, loss, and weights below.<br />
          <span style={{ color: '#eebbc3' }}>Tip:</span> Hover buttons for explanations.
        </small>
      </div>
      {/* Neural Network Diagram */}
      <NeuralNetDiagram />
      {/* Buttons for each process */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 22, flexWrap: 'wrap' }}>
        <button
          onClick={handleForwardPass}
          className="nn-btn"
          title="Compute activations layer-by-layer for all samples. Shows output and loss."
        >
          Forward Pass
        </button>
        <button
          onClick={handleBackprop}
          className="nn-btn secondary"
          title="Calculate gradients for all weights and biases using backpropagation."
        >
          Backpropagation
        </button>
        <button
          onClick={handleGradientDescent}
          className="nn-btn tertiary"
          title="Apply weight update rule (gradient descent) and see new loss."
        >
          Gradient Descent
        </button>
        <button
          onClick={handleEpoch}
          className="nn-btn"
          title="Run 10 epochs (forward, backprop, descent) automatically."
        >
          Epoch ×10
        </button>
      </div>
      {/* Show current loss */}
      {loss !== null && (
        <div style={{ marginBottom: 16, fontSize: 17 }}>
          <b>Loss (MSE):</b> <span style={{ color: '#eebbc3' }}>{loss.toFixed(5)}</span>
          <span style={{ marginLeft: 18, color: '#b8c1ec', fontSize: 15 }}>Epoch: {epoch}</span>
        </div>
      )}
      {/* Show activations if available */}
      {activations.a4 && (
        <div style={{
          background: '#121629',
          borderRadius: 10,
          padding: 16,
          marginBottom: 16,
          overflowX: 'auto'
        }}>
          <b>Activations (output):</b>
          {printMatrix(activations.a4, 4)}
        </div>
      )}
      {/* Show gradients if available */}
      {step === 'backprop' && grads.dW1 && (
        <div style={{
          background: '#121629',
          borderRadius: 10,
          padding: 16,
          marginBottom: 16,
          overflowX: 'auto'
        }}>
          <b>Sample Gradients (dW1):</b>
          {printMatrix(grads.dW1, 4)}
        </div>
      )}
      {/* Show weights if just updated */}
      {step === 'descent' && (
        <div style={{
          background: '#121629',
          borderRadius: 10,
          padding: 16,
          marginBottom: 16,
          overflowX: 'auto'
        }}>
          <b>Weights (W1, first 2 rows):</b>
          {printMatrix(W1.slice(0, 2), 4)}
        </div>
      )}
      {/* Responsive note */}
      <div style={{ color: '#b8c1ec', fontSize: 14, marginTop: 14 }}>
        <b>Dataset:</b> XOR (inputs: [0,0], [0,1], [1,0], [1,1])<br />
        <b>Output:</b> 1 if inputs differ, else 0.<br />
        <b>Try:</b> Run Forward Pass, then Backpropagation, then Gradient Descent repeatedly.<br />
        <span style={{ color: '#eebbc3' }}>All math and code is manual, no ML libraries used.</span>
      </div>
    </div>
  );
}