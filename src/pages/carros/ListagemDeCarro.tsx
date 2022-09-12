import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Paper,
  } from "@mui/material";
  import { useEffect, useMemo, useState } from "react";
  import { useSearchParams } from "react-router-dom";
  import { FerramentasDaListagem } from "../../shared/components";
  import { useDebounce } from "../../shared/hooks";
  import { LayoutBasePages } from "../../shared/layouts";
  import {
    IListagemCarro,
    CarrosService,
  } from "../../shared/services/api/carros/CarrosService";
  
  export const ListagemDeCarro: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();
    //const { debounce } = useDebounce(3000, true);
  
    const [carro, setCarro] = useState<IListagemCarro[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
  
    const busca = useMemo(() => {
      return searchParams.get("busca") || "";
    }, [searchParams]);
  
    useEffect(() => {
      setIsLoading(true);
      debounce(() => {
        CarrosService.getAll(1, busca).then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
            return;
          } else {
            console.log(result);
            setCarro(result.data);
            setTotalCount(result.totalCount);
          }
        });
      });
    }, [busca]);
  
    return (
      <LayoutBasePages
        titulo="Listagem de Carros"
        barraDeFerramentas={
          <FerramentasDaListagem
            textoBotaoNovo="Novo Carro"
            mostrarInputBusca
            textoDaBusca={busca}
            aoMudarTextoDeBusca={(texto) =>
              setSearchParams({ busca: texto }, { replace: true })
            }
          />
        }
      >
        <TableContainer component={Paper} variant={"outlined"} sx={{ m: 1, width: "auto"}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Montadora</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Ano</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carro.map(carros => (
                  <TableRow key={carros.id}>
                  <TableCell>{carros.montadora}</TableCell>
                  <TableCell>{carros.modelo}</TableCell>
                  <TableCell>{carros.ano}</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </LayoutBasePages>
    );
  };
  