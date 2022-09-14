import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableFooter,
  LinearProgress,
  CircularProgress,
  Pagination,
  IconButton,
  Icon,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { Environment } from "../../shared/environment";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePages } from "../../shared/layouts";
import {
  IListagemCarro,
  CarrosService,
} from "../../shared/services/api/carros/CarrosService";
import Swal from 'sweetalert2'

export const ListagemDeCarro: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  //const { debounce } = useDebounce(3000, true);
  const navigate = useNavigate();

  const [carro, setCarro] = useState<IListagemCarro[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      CarrosService.getAll(pagina, busca).then((result) => {
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
  }, [busca, pagina]);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Deseja realmente apagar?',
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        CarrosService.deleteById(id)
          .then(result => {
            if(result instanceof Error){
              Swal.fire(result.message);
            }
            else{
              setCarro(oldCarros => {
                return [
                  ...oldCarros.filter(oldCarro => oldCarro.id !== id),
                ];
              });
              Swal.fire('Deletado com sucesso!', '', 'success');
            }
          });
        
      } else if (result.isDenied) {
        Swal.fire('Nenhuma alteração feita!', '', 'info');
      }
    })
    
  };

  return (
    <LayoutBasePages
      titulo="Listagem de Carros"
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="Novo Carro"
          mostrarInputBusca
          aoClicarEmNovo={() => navigate("/carros/detalhe/novo")}
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto, pagina: "1" }, { replace: true })
          }
        />
      }
    >
      <TableContainer
        component={Paper}
        variant={"outlined"}
        sx={{ m: 1, width: "auto" }}
      >
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
            {carro.map((carros) => (
              <TableRow key={carros.id}>
                <TableCell>{carros.montadora}</TableCell>
                <TableCell>{carros.modelo}</TableCell>
                <TableCell>{carros.ano}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => navigate(`/carros/detalhe/${carros.id}`)}><Icon>edit_rounded</Icon></IconButton>
                  <IconButton size="small" onClick={() => handleDelete(carros.id)}><Icon>clear_rounded</Icon></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}

          <TableFooter>
            {totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS && (
              <TableRow>
                <TableCell colSpan={5}>
                  <Pagination
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    page={pagina}
                    onChange={(_, newPage) =>
                      setSearchParams(
                        { busca, pagina: newPage.toString() },
                        { replace: true }
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            )}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4}>
                  <CircularProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBasePages>
  );
};
