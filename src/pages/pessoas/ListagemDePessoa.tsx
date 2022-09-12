import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableFooter,
  Paper,
  LinearProgress,
  Pagination,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { Environment } from "../../shared/environment";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePages } from "../../shared/layouts";
import {
  IListagemPessoa,
  PessoasService,
} from "../../shared/services/api/pessoas/PessoasService";

export const ListagemDePessoa: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  //const { debounce } = useDebounce(3000, true);

  const [pessoa, setPessoa] = useState<IListagemPessoa[]>([]);
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
      PessoasService.getAll(pagina, busca).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
          console.log(result);
          setPessoa(result.data);
          setTotalCount(result.totalCount);
        }
      });
    });
  }, [busca, pagina]);

  return (
    <LayoutBasePages
      titulo="Listagem de Pessoas"
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="Nova Pessoa"
          mostrarInputBusca
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
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Pais</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pessoa.map((pessoas) => (
              <TableRow key={pessoas.id}>
                <TableCell>{pessoas.nome}</TableCell>
                <TableCell>{pessoas.email}</TableCell>
                <TableCell>{pessoas.empresa}</TableCell>
                <TableCell>{pessoas.pais}</TableCell>
                <TableCell>Ações</TableCell>
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
                    onChange={(_, newPage) => setSearchParams({busca, pagina: newPage.toString()}, {replace: true})}
                  />
                </TableCell>
              </TableRow>
            )}

            {isLoading && (
              <TableRow>
                <TableCell colSpan={5}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBasePages>
  );
};
