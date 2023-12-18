import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import calculateWinner from "./Winner";

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [game, setGame] = useState(null);

  function handleClick(i) {
    if (game || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    const calculatedWinner = calculateWinner(nextSquares);
    if (calculatedWinner) {
      setGame(calculatedWinner);
    } else if (!nextSquares.includes(null)) {
      setGame("Draw");
    }
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setGame(null);
    setXIsNext(true);
  }

  let status;
  if (game) {
    status = `${game}`;
  } else if(game === "Draw") {
    status = `${game}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        {status}
      </Typography>
      <Grid container spacing={1} sx={{ marginTop: "20px" }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Grid item xs={4} key={i}>
            <Box
              sx={{
                width: "100px",
                height: "100px",
                border: "1px solid #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                cursor: "pointer",
                userSelect: "none",
                backgroundColor:
                  squares[i] === "X"
                    ? "#90caf9"
                    : squares[i] === "O"
                    ? "#ffcc80"
                    : "inherit",
              }}
              onClick={() => handleClick(i)}
            >
              {squares[i]}
            </Box>
          </Grid>
        ))}
      </Grid>
      {(game || game === "Draw") && (
        <Button
          variant="contained"
          color="primary"
          onClick={resetGame}
          style={{
            marginTop: "20px",
            backgroundColor: "#6eff8b",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Play Again
        </Button>
      )}
    </Container>
  );
}

export default Board;
