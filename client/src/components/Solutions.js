import { Box, CardContent, Divider, Grid, Typography } from "@mui/material";

const Solutions = ({ solutions, equation }) => {
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
      <Grid container spacing={0.5}>
        {!solutions ? (
          <Grid item xs={12} sm={12} sx={{ border: "1px solid black" }}>
            <Typography align="center" sx={{ fontWeight: "bold" }}>
              No solutions found
            </Typography>
          </Grid>
        ) : (
          <>
            {
              <Grid item xs={12} sm={12}>
                <Typography align="center" sx={{ fontWeight: "bold" }}>
                  Equation:
                </Typography>
              </Grid>
            }
            {
              <>
                <Grid item xs={3} sm={4.5}></Grid>
                <Grid item xs={6} sm={3}>
                  {equation
                    .split("=")[0]
                    .split(/[+-]/)
                    .map((operand) => {
                      return <Typography align="right">{operand}</Typography>;
                    })}
                  <div style={{ display: "flex" }}>
                    <Typography>
                      {equation.includes("+") ? "+" : "-"}
                    </Typography>
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
                    {equation.split("=")[1]}
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={4.5}></Grid>
              </>
            }
            {Object.values(solutions).map((sol, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                key={index}
                sx={{ border: "1px solid black" }}
              >
                <CardContent>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {`Solution ${index + 1}:`}
                  </Typography>
                  <Grid container spacing={0.5}>
                    {Object.entries(sol).map(([key, value]) => {
                      return (
                        <Grid item xs={12 / 5} sm={12 / 5}>
                          <Typography>{`${key} = ${value}`}</Typography>
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Typography sx={{ mt: "10px" }}>Substituted:</Typography>
                  <Grid container spacing={0.5}>
                    <Grid item xs={3} sm={4.5}></Grid>
                    <Grid item xs={6} sm={3}>
                      {equation
                        .split("=")[0]
                        .split(/[+-]/)
                        .map((operand) => {
                          return (
                            <Typography align="right">
                              {operand
                                .split("")
                                .map((char) => sol[char] || char)
                                .join("")}
                            </Typography>
                          );
                        })}
                      <div style={{ display: "flex" }}>
                        <Typography>
                          {equation.includes("+") ? "+" : "-"}
                        </Typography>
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
                        {equation
                          .split("=")[1]
                          .split("")
                          .map((char) => sol[char] || char)
                          .join("")}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sm={4.5}></Grid>
                  </Grid>
                </CardContent>
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Solutions;
