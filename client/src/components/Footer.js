import React from "react";
import { Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#4A6D7C", color: "#fff", padding: "20px 0" }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          Aldi-Dev © {new Date().getFullYear()}
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
