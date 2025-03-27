import { useState } from "react";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [mode, setMode] = useState(null); // "AI" or "PVP"
  const [difficulty, setDifficulty] = useState("Easy");

  const checkWinner = (squares) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of winningCombinations) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.includes(null) ? null : "Draw";
  };

  const winner = checkWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    if (winner && winner !== "Draw") {
      setScore((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));
    }
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  if (!mode) {
    return (
      <div className="flex flex-col items-center p-4 bg-gray-900 min-h-screen text-white">
        <h1 className="text-3xl font-bold mb-6 text-yellow-400">Tic-Tac-Toe</h1>
        <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg mb-4 w-full max-w-xs" onClick={() => setMode("PVP")}>Play with Friend</button>
        <button className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg w-full max-w-xs" onClick={() => setMode("AI")}>Play with AI</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Tic-Tac-Toe</h1>
      {mode === "AI" && (
        <div className="mb-4">
          <label className="mr-2 text-lg">Difficulty:</label>
          <select className="p-2 bg-gray-700 border border-gray-600 rounded-lg text-lg text-white" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="Easy">Easy</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      )}
      <div className="mb-4">
        <p className="text-lg">Score - X: {score.X} | O: {score.O}</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-yellow-400 flex items-center justify-center text-3xl font-bold rounded-lg bg-gray-800 hover:bg-gray-700"
            onClick={() => handleClick(index)}
            disabled={winner !== null || cell !== null}
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && <p className="mt-4 text-xl font-semibold text-yellow-400">{winner === "Draw" ? "It's a draw!" : `Winner: ${winner}`}</p>}
      <button className="mt-4 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg w-full max-w-xs" onClick={handleReset}>Restart</button>
    </div>
  );
}
