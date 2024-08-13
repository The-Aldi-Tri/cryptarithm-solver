import * as React from "react";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import logo from "../logo512.png";

const BasicAppBar = () => {
  const logoHeight = 40;
  return (
    <AppBar position="static" sx={{ backgroundColor: "#4A6D7C" }}>
      <Container maxWidth="sm">
        <Toolbar>
          <img
            src={logo}
            alt="Logo"
            style={{ height: logoHeight, marginRight: 5, borderRadius: "8px" }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, lineHeight: `${logoHeight}px` }}
          >
            Cryptarithm Solver
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default BasicAppBar;
