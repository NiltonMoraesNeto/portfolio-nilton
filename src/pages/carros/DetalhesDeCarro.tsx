import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";
import Swal from "sweetalert2";
import { CarrosService } from "../../shared/services/api/carros/CarrosService";
import { Form } from "@unform/web";
import { VTextField } from "../../shared/forms";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { FormHandles } from "@unform/core";

interface IFormData {
  montadora: string;
  modelo: string;
  ano: number;
}

export const DetalhesDeCarro: React.FC = () => {
  const { id = "novo" } = useParams<"id">();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modelo, setModelo] = useState("");

  useEffect(() => {
    if (id !== "novo") {
      setIsLoading(true);
      CarrosService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          Swal.fire(result.message);
          navigate("/carros");
        } else {
          console.log(result);
          setModelo(result.modelo);
          formRef.current?.setData(result);
        }
      });
    }
    else{
      formRef.current?.setData({
        montadora: "",
        modelo: "",
        ano: "",
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    console.log(dados);
    setIsLoading(true);

    if (id === "novo") {
      CarrosService.create(dados).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          Swal.fire(result.message);
        } else {
          Swal.fire("Criado com sucesso!");
          navigate(`/carros/`);
        }
      });
    } else {
      CarrosService.updateById(Number(id), { id: Number(id), ...dados }).then(
        (result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            Swal.fire(result.message);
          } else {
            Swal.fire("Editado com sucesso!");
            navigate(`/carros/`);
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
        CarrosService.deleteById(id).then((result) => {
          if (result instanceof Error) {
            Swal.fire(result.message);
          } else {
            Swal.fire("Deletado com sucesso!", "", "success");
            navigate("/carros");
          }
        });
      } else if (result.isDenied) {
        Swal.fire("Nenhuma alteração feita!", "", "info");
      }
    });
  };

  return (
    <LayoutBasePages
      titulo={id === "novo" ? "Novo Carro" : modelo}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Novo"
          mostrarBotaoApagar={id !== "novo"}
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== "novo"}
          aoClicarEmNovo={() => navigate("/carros/detalhe/novo")}
          aoClicarEmVoltar={() => navigate("/carros")}
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
            {id === "novo" && (
              <Typography variant="h6">Criar Novo Carro</Typography>
            )}

            {id !== "novo" && (
              <Typography variant="h6">Editar Carro</Typography>
            )}
          </Grid>
          <Grid container spacing={2} padding={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <VTextField
                name="montadora"
                variant="outlined"
                label="Montadora"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <VTextField name="modelo" variant="outlined" label="Modelo" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <VTextField
                name="ano"
                variant="outlined"
                label="Ano"
                type="number"
                InputProps={{
                  inputProps: { min: "1900", max: "2025", step: "1" },
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Form>
    </LayoutBasePages>
  );
};
