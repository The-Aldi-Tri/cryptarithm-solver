import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

import Form from "./Form";
import Solutions from "./Solutions";

const Body = () => {
  const [solved, setSolved] = React.useState(false);
  const [equation, setEquation] = React.useState("");
  const [solutions, setSolutions] = React.useState([]);

  return (
    <Container maxWidth="md" sx={{ flexGrow: 1, pt: "30px" }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography fontWeight={"bold"}>What is Cryptarithm?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>in progress...</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography fontWeight={"bold"}>
            How this web solve Cryptarithm?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>in progress...</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography fontWeight={"bold"}>Solver</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Form
            setSolved={setSolved}
            setEquation={setEquation}
            setSolutions={setSolutions}
          />
          {!solved ? null : (
            <Solutions solutions={solutions} equation={equation} />
          )}
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default Body;
