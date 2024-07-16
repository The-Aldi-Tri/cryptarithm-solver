import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#3f51b5", color: "#fff", padding: "20px 0" }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          Aldi-Dev © {new Date().getFullYear()}
        </Typography>
        <Typography variant="body2" align="center">
          Made with ❤️ by{" "}
          <Link color="inherit" href="https://github.com/The-Aldi-Tri">
            Aldi-Dev
          </Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
