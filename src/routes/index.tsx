import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppThemeContext, useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const {toggleTheme} = useAppThemeContext();
  const {toggleDrawerOpen} = useDrawerContext();
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Button variant="contained" color="primary" onClick={toggleDrawerOpen}>Trocar Tema</Button>} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
