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
          <p style={{ textAlign: "justify" }}>
            <b>Cryptarithm</b>, also known as alphametics, cryptarithmetic,
            verbal arithmetic or word addition, is a type of mathematical game
            consisting of a mathematical equation among unknown numbers, whose
            digits are represented by letters of the alphabet. The goal is to
            identify the value of each letter. The name can be extended to
            puzzles that use non-alphabetic symbols instead of letters.{" "}
            <a href="https://en.wikipedia.org/wiki/Verbal_arithmetic">
              (Wikipedia)
            </a>
            <br />
            <br />
            Example:
            <br />
          </p>
          <img
            src="https://wikimedia.org/api/rest_v1/media/math/render/svg/60eeaf958fa73a6a989f00725cf7d4c3f516e929"
            alt="example of cryptarithm puzzle"
          />
          <p>
            The solution to this puzzle is O = 0, M = 1, Y = 2, E = 5, N = 6, D
            = 7, R = 8, and S = 9. <br /> <br />
            Traditionally, each letter should represent a different digit, and
            (as an ordinary arithmetic notation) the leading digit of a
            multi-digit number must not be zero. A good puzzle should have one
            unique solution, and the letters should make up a phrase (as in the
            example above).
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography fontWeight={"bold"}>
            How this web solve Cryptarithm?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <p>
            In short, it use <b>Brute Force</b>.<br />
            It tries all possible permutations of the unique letters obtained
            from the given equation.
            <br />
            <br />
            Example:
            <br />
            <img
              src="https://wikimedia.org/api/rest_v1/media/math/render/svg/60eeaf958fa73a6a989f00725cf7d4c3f516e929"
              alt="example of cryptarithm puzzle"
            />
            <br />
            <br />
            Unique letters: "D", "E", "M", "N", "O", "R", "S", "Y". (sorted by
            alphabetic)
            <br />
            <br />
            Possible solutions (Permutations):
          </p>
          <ul>
            <li>
              "D" = 0, "E" = 1, "M" = 2, "N" = 3, "O" = 4, "R" = 5, "S" = 6, "Y"
              = 7
            </li>
            <li>
              "D" = 0, "E" = 1, "M" = 2, "N" = 3, "O" = 4, "R" = 5, "S" = 6, "Y"
              = 8
            </li>
            <li>
              "D" = 0, "E" = 1, "M" = 2, "N" = 3, "O" = 4, "R" = 5, "S" = 6, "Y"
              = 9
            </li>
            <li>....</li>
          </ul>
          <p>
            After trying all possible solutions, it will return the valid
            solutions that satisfy the given equation. For above example: "D"=
            7, "E"= 5, "M"= 1, "N"= 6, "O"= 0, "R"= 8, "S"= 9, "Y"= 2
          </p>
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
