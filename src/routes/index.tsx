import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, ListagemDePessoa, ListagemDeCarro } from "../pages";
import { useAppThemeContext, useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const {toggleTheme} = useAppThemeContext();
  const { setDrawerOptions} = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Página Inicial',
        icon: 'span',
        path: '/pagina-inicial'
      },
      {
        label: 'Pessoas',
        icon: 'emoji_people',
        path: '/pessoas'
      },
      {
        label: 'Carros',
        icon: 'car_rental',
        path: '/carros'
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/pessoas" element={<ListagemDePessoa />} />
      {/*<Route path="/pessoas/detalhe/:id" element={<Dashboard />} />*/}

      <Route path="/carros" element={<ListagemDeCarro />} />
      {/*<Route path="/carros/detalhe/:id" element={<Dashboard />} />*/}

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
