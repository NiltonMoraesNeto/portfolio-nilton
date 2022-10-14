import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";
import { CarrosService } from "../../shared/services/api/carros/CarrosService";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import BarChart from "../graficos/BarChart";
import {UserData} from "../graficos/data";
import {UserTeste} from "../graficos/data2";

export const Dashboard: React.FC = () => {
  const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
  const [totalCountPessoas, setTotalCountPessoas] = useState(0);
  const [isLoadingCarros, setIsLoadingCarros] = useState(true);
  const [totalCountCarros, setTotalCountCarros] = useState(0);
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.ano),
    datasets: [{
      label: "Teste",
      data: UserData.map((data) => data.ano)
    }]
  });

  const [userData2, setUserData2] = useState({
    labels: "oi",
    datasets: [{
      label: "Carros",
      data: totalCountCarros
    }]
  });

  useEffect(() => {
    setIsLoadingPessoas(true);
    setIsLoadingCarros(true);

    PessoasService.getAll().then((result) => {
      setIsLoadingPessoas(false);
      if (result instanceof Error) {
        alert(result.message);
        return;
      } else {
        setTotalCountPessoas(result.totalCount);
      }
    });

    CarrosService.getAll().then((result) => {
        setIsLoadingCarros(false);
        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
            setTotalCountCarros(result.totalCount);
        }
      });
  }, []);

  return (
    <LayoutBasePages
      titulo="Dashboard"
      barraDeFerramentas={
        <FerramentasDeDetalhe
          mostrarBotaoNovo={false}
          mostrarBotaoSalvar={false}
          mostrarBotaoApagar={false}
          mostrarBotaoVoltar={false}
        />
      }
    >
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de Pessoas
                  </Typography>
                  <Box
                    padding={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!isLoadingPessoas && (
                      <Typography variant="h1">{totalCountPessoas}</Typography>
                    )}
                    {isLoadingPessoas && (
                      <Typography variant="h5">Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de Carros
                  </Typography>
                  <Box
                    padding={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!isLoadingCarros && (
                      <Typography variant="h1">{totalCountCarros}</Typography>
                    )}
                    {isLoadingCarros && (
                      <Typography variant="h5">Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        
      </Box>

      {/*<Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            
            <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
              <Card>
                <CardContent>
                <BarChart chartData={userData2} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        
      </Box>*/}
    </LayoutBasePages>
  );
};
