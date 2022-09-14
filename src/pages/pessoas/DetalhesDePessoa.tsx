import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import Swal from "sweetalert2";
import { Form } from "@unform/web";
import { VTextField } from "../../shared/forms";
import { Button, Grid } from "@mui/material";

export const DetalhesDePessoa: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);
      PessoasService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          Swal.fire(result.message);
          navigate("/pessoas");
        } else {
          console.log(result);
          setNome(result.nome);
        }
      });
    }
  }, [id]);

  const handleSave = () => {
    console.log("save");
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Deseja realmente apagar?",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Sim",
      denyButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        PessoasService.deleteById(id).then((result) => {
          if (result instanceof Error) {
            Swal.fire(result.message);
          } else {
            Swal.fire("Deletado com sucesso!", "", "success");
            navigate("/pessoas");
          }
        });
      } else if (result.isDenied) {
        Swal.fire("Nenhuma alteração feita!", "", "info");
      }
    });
  };

  return (
    <LayoutBasePages
      titulo={id === "nova" ? "Nova Pessoa" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoApagar={id !== "nova"}
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== "nova"}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
          aoClicarEmVoltar={() => navigate("/pessoas")}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmSalvar={() => {}}
          aoClicarEmSalvarEVoltar={() => {}}
        />
      }
    >
      <Form onSubmit={(dados) => console.log(dados)}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <VTextField name="nome" variant="standard" label="Nome"/>
          </Grid>
          <Grid item xs={2}>
            <VTextField name="profissao" variant="standard" label="Profissão"/>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={12}>
          <Grid item xs={5}>
            <Button variant="outlined" type="submit">
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Form>
    </LayoutBasePages>
  );
};
