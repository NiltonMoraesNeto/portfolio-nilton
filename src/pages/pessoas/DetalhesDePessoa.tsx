import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Form } from "@unform/web";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { FormHandles } from "@unform/core";
import { VTextField } from "../../shared/forms";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

interface IFormData {
  nome: string;
  profissao: string;
  email: string;
  sexo: string;
  empresa: string;
  pais: string;
  cidade: string;
  telefone: string;
  Cep: string;
  Idioma: string;
}

export const DetalhesDePessoa: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);

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
          formRef.current?.setData(result);
        }
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    console.log(dados);
    setIsLoading(true);

    if (id === "nova") {
      PessoasService.create(dados).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          Swal.fire(result.message);
        } else {
          Swal.fire("Criado com sucesso!");
          navigate(`/pessoas/`);
          //navigate(`/pessoas/detalhe/${result}`);
        }
      });
    } else {
      PessoasService.updateById(Number(id), { id: Number(id), ...dados }).then(
        (result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            Swal.fire(result.message);
          } else {
            Swal.fire("Editado com sucesso!");
            navigate(`/pessoas/`);
          }
        }
      );
    }
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
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmSalvarEVoltar={() => formRef.current?.submitForm()}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid item margin={2}>
            {id === "nova" && (
              <Typography variant="h6">Criar Nova Pessoa</Typography>
            )}

            {id !== "nova" && (
              <Typography variant="h6">Editar Pessoa</Typography>
            )}
          </Grid>
          <Grid container spacing={2} padding={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <VTextField
                name="nome"
                variant="standard"
                label="Nome"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <VTextField
                name="profissao"
                variant="standard"
                label="Profissão"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <VTextField
                name="email"
                variant="standard"
                label="E-mail"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
              <VTextField
                name="sexo"
                variant="standard"
                label="Sexo"
                fullWidth
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2} padding={2}>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
              <VTextField
                name="empresa"
                variant="standard"
                label="Empresa"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
              <VTextField
                name="pais"
                variant="standard"
                label="Pais"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
              <VTextField
                name="cidade"
                variant="standard"
                label="Cidade"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
              <VTextField
                name="telefone"
                variant="standard"
                label="Telefone"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
              <VTextField name="Cep" variant="standard" label="Cep" fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
              <VTextField
                name="Idioma"
                variant="standard"
                label="Idioma"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Form>
    </LayoutBasePages>
  );
};
