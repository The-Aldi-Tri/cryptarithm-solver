import * as React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import dotenv from "dotenv";

const Form = ({ setSolved, setSolutions, setEquation }) => {
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

  const formik = useFormik({
    initialValues: {
      operand1: "",
      operator: "+",
      operand2: "",
      equalMark: "=",
      result: "",
      allowLeadingZero: false,
    },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const { allowLeadingZero, ...rest } = values;
        const equation = Object.values(rest).join(" ").toUpperCase();
        const uniqueLetters = Array.from(
          new Set(equation.match(/[A-Z]/g))
        ).sort();

        if (uniqueLetters.length > 10) {
          return alert(
            `Not solvable because unique letters are more than 10.\nUnique letters: ${uniqueLetters.join(
              ", "
            )}`
          );
        }

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/cryptarithms`,
          { equation }
        );
        setSolved(true);
        allowLeadingZero
          ? setSolutions(response.data.data.solutions)
          : setSolutions(response.data.data.noLeadingZeroSolutions);
        setEquation(equation);
      } catch (e) {
      } finally {
        // Whether the submission was successful or not, always set submitting state back to false
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
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
        margin="dense"
        fullWidth
        inputProps={{
          style: { textTransform: "uppercase", textAlign: "right" },
        }}
      />

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
        margin="dense"
        fullWidth
        inputProps={{
          style: { textTransform: "uppercase", textAlign: "right" },
        }}
      />
      <div style={{ display: "flex" }}>
        <FormControl sx={{ minWidth: 75 }} size="small" margin="dense">
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
        margin="dense"
        fullWidth
        inputProps={{
          style: { textTransform: "uppercase", textAlign: "right" },
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              value={formik.values.allowLeadingZero}
              onClick={formik.handleChange}
            />
          }
          label="Allow Leading Zero"
          name="allowLeadingZero"
        />
        <Tooltip
          title={
            <React.Fragment>
              <Typography component="p" fontSize={"small"}>
                {`Allow zero to be in front of other numbers such "069". Example: SEND + MORE = MONEY  --> 7531 + 0825 = 08356`}
              </Typography>
            </React.Fragment>
          }
          placement="bottom"
        >
          <HelpOutlineIcon />
        </Tooltip>
      </Box>

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
  );
};

export default Form;
