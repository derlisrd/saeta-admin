import Icon from "@/components/ui/icon";
import { Typography, Button, Container, Box, Slide } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom"; // Si estás usando React Router

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "80vh",
  padding: theme.spacing(3),
  textAlign: "center",
}));



function NotFoundPage() {
  return (
    <StyledContainer maxWidth="sm">
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Box>
          <Box sx={{ fontSize: "10rem", color: "primary.main", mb: 2 }}>
            🤔
          </Box>
          <Typography variant="h4" gutterBottom>
            Página no encontrada
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Lo sentimos, la página que estás buscando no existe.
          </Typography>
          <Box mt={3}>
            <Button
              startIcon={<Icon name="arrow-narrow-left-dashed" />}
              component={RouterLink} // Usa Link de React Router si estás navegando dentro de la app
              to="/"
              variant="contained"
              color="primary"
            >
              Volver al inicio
            </Button>
          </Box>
        </Box>
      </Slide>
    </StyledContainer>
  );
}

export default NotFoundPage;
