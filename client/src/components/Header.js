import * as React from "react";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { BugReport } from "@mui/icons-material";

const BasicAppBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#4A6D7C" }}>
      <Container maxWidth="sm" disableGutters>
        <Toolbar>
          <BugReport
            size="large"
            color="inherit"
            edge="start"
            aria-label="icon"
            sx={{ mr: 2 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cryptarithm Solver
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default BasicAppBar;
