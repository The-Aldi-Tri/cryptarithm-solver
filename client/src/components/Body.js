import * as React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { CardContent, Typography, Grid } from "@mui/material";

const createAlphabeticSchema = (errorMessage) =>
  yup
    .string()
    .matches(/^[A-Za-z]+$/, errorMessage)
    .required();

const schema = yup.object().shape({
  operand1: createAlphabeticSchema(
    "Operand 1 must contain only alphabetic characters"
  ),
  operator: yup
    .string()
    .matches(/^[+-]+$/, "Operator must be either + or -")
    .required("Operator is required"),
  operand2: createAlphabeticSchema(
    "Operand 2 must contain only alphabetic characters"
  ),
  result: createAlphabeticSchema(
    "Result must contain only alphabetic characters"
  ),
});

export default function Body() {
  const [solved, setSolved] = React.useState(false);
  const [equation, setEquation] = React.useState("");
  const [solutions, setSolutions] = React.useState([]);

  const formik = useFormik({
    initialValues: {
      operand1: "",
      operator: "+",
      operand2: "",
      equation: "=",
      result: "",
    },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const equation = Object.values(values).join(" ").toUpperCase();
        const response = await axios.post(
          "http://127.0.0.1:3001/cryptarithms",
          { equation }
        );
        setSolved(true);
        setSolutions(response.data.data?.solutions);
        setEquation(equation);
      } catch (e) {
      } finally {
        // Whether the submission was successful or not, always set submitting state back to false
        setSubmitting(false);
      }
    },
  });
  return (
    <Container
      component={Paper}
      elevation={5}
      maxWidth="md"
      sx={{ minHeight: "100vh" }}
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          m: "auto",
        }}
      >
        <TextField
          label="Operand 1"
          name="operand1"
          required
          value={formik.values.operand1}
          error={formik.touched.operand1 && Boolean(formik.errors.operand1)}
          helperText={formik.touched.operand1 && formik.errors.operand1}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
          inputProps={{ style: { textTransform: "uppercase" } }}
        />
        <FormControl
          sx={{ minWidth: 75 }}
          size="small"
          fullWidth
          margin="normal"
        >
          <InputLabel>Operator</InputLabel>
          <Select
            label="Operator"
            name="operator"
            value={formik.values.operator}
            onChange={formik.handleChange}
          >
            <MenuItem value={"+"}> + </MenuItem>
            <MenuItem value={"-"}> - </MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Operand 2"
          name="operand2"
          required
          value={formik.values.operand2}
          error={formik.touched.operand2 && Boolean(formik.errors.operand2)}
          helperText={formik.touched.operand2 && formik.errors.operand2}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
          inputProps={{ style: { textTransform: "uppercase" } }}
        />
        <Divider>=</Divider>
        <TextField
          label="Result"
          name="result"
          required
          value={formik.values.result}
          error={formik.touched.result && Boolean(formik.errors.result)}
          helperText={formik.touched.result && formik.errors.result}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
          inputProps={{ style: { textTransform: "uppercase" } }}
        />
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ mt: 2, mb: 2 }}
          disabled={formik.isSubmitting}
          endIcon={formik.isSubmitting ? <CircularProgress size={20} /> : null}
        >
          {formik.isSubmitting ? "Solving..." : "Solve"}
        </Button>
      </Box>
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
          {!solved ? null : !solutions ? (
            <Grid item xs={12} sm={12}>
              <Typography align="center">No solutions found</Typography>
            </Grid>
          ) : (
            solutions.map((sol, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <CardContent>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {`Solution ${index + 1}:`}
                  </Typography>
                  <Typography>
                    {Object.entries(sol)
                      .map(([key, value]) => `${key} = ${value}`)
                      .join(", ")}
                  </Typography>
                  <Typography>{`Equation: ${equation}`}</Typography>
                  <Typography>{`Substituted: ${equation
                    .split("")
                    .map((char) => sol[char] || char)
                    .join("")}`}</Typography>
                </CardContent>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Container>
  );
}
