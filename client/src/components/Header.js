import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import BugReportIcon from "@mui/icons-material/BugReport";

export default function BasicAppBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
      <Container maxWidth="md">
        <Toolbar>
          <BugReportIcon
            size="large"
            edge="start"
            color="inherit"
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
}
