import { Box, CardContent, Divider, Grid, Typography } from "@mui/material";
import ForwardIcon from "@mui/icons-material/Forward";

const Solutions = ({ solutions, equation }) => {
  const [leftSide, rightSide] = equation.split("=");
  const operands = leftSide.split(/[+-]/);
  const operator = equation.includes("+") ? "+" : "-";

  const substituteLetter = (string, map) => {
    return string
      .split("")
      .map((char) => (map[char] !== undefined ? map[char] : char))
      .join("");
  };

  const EquationInArithmeticNotation = (operands, operator, result) => {
    return (
      <>
        {operands.map((operand, i) => {
          return (
            <Typography align="right" key={`operand-${i}`}>
              {operand}
            </Typography>
          );
        })}
        <div style={{ display: "flex" }}>
          <Typography>{operator}</Typography>
          <Divider
            orientation="horizontal"
            flexItem
            style={{
              margin: "auto",
              marginLeft: "5px",
              flexGrow: 1,
              borderBottom: "2px solid #000",
            }}
          />
        </div>
        <Typography align="right" sx={{ mb: "10px" }}>
          {result}
        </Typography>
      </>
    );
  };

  return (
    <Box
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        m: "auto",
        mt: "20px",
      }}
    >
      <Grid container spacing={1}>
        {solutions.length === 0 ? (
          <Grid item xs={12} sm={12}>
            <Typography align="center" sx={{ fontWeight: "bold" }}>
              No solutions found
            </Typography>
          </Grid>
        ) : (
          Object.values(solutions).map((sol, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              key={`solution-${index}`}
              sx={{ border: "1px solid black" }}
            >
              <CardContent>
                <Typography sx={{ fontWeight: "bold" }}>
                  {`Solution ${index + 1}:`}
                </Typography>
                <Grid container spacing={0.5}>
                  {Object.entries(sol).map(([key, value]) => {
                    return (
                      <Grid item xs={12 / 5} sm={12 / 5} key={`entry-${key}`}>
                        <Typography>{`${key} = ${value}`}</Typography>
                      </Grid>
                    );
                  })}
                </Grid>
                <Typography sx={{ mt: "10px" }}>Result:</Typography>
                <Grid container spacing={0.5}>
                  <Grid item xs={4} sm={4}>
                    {EquationInArithmeticNotation(
                      operands,
                      operator,
                      rightSide
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ForwardIcon fontSize="large" />
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    {operands.map((operand, i) => {
                      return (
                        <Typography align="right" key={`substituted-${i}`}>
                          {substituteLetter(operand, sol)}
                        </Typography>
                      );
                    })}
                    <div style={{ display: "flex" }}>
                      <Typography>{operator}</Typography>
                      <Divider
                        orientation="horizontal"
                        flexItem
                        style={{
                          margin: "auto",
                          marginLeft: "5px",
                          flexGrow: 1,
                          borderBottom: "2px solid #000",
                        }}
                      />
                    </div>
                    <Typography align="right">
                      {substituteLetter(rightSide, sol)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Solutions;
