import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";
import Swal from "sweetalert2";
import { CarrosService } from "../../shared/services/api/carros/CarrosService";
import { LinearProgress } from "@mui/material";

export const DetalhesDeCarro: React.FC = () => {
  const { id = "novo" } = useParams<"id">();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [modelo, setModelo] = useState("");

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);
      CarrosService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          Swal.fire(result.message);
          navigate("/carros");
        } else {
            console.log(result);
            setModelo(result.modelo);
        }
      });
    }
  }, [id]);

  const handleSave = () => {
    console.log("save");
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Deseja realmente apagar?',
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    }).then((result) => {

      if (result.isConfirmed) {
        CarrosService.deleteById(id)
          .then(result => {
            if(result instanceof Error){
              Swal.fire(result.message);
            }
            else{              
              Swal.fire('Deletado com sucesso!', '', 'success');
              navigate("/carros");
            }
          });
        
      } else if (result.isDenied) {
        Swal.fire('Nenhuma alteração feita!', '', 'info');
      }
    })
    
  };

  return (
    <LayoutBasePages
    titulo={id === 'novo' ? 'Novo Carro' : modelo }
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Novo"
          mostrarBotaoApagar={id !== "novo"}
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== "novo"}
          aoClicarEmNovo={() => navigate("/carros/detalhe/novo")}
          aoClicarEmVoltar={() => navigate("/carros")}
          aoClicarEmApagar={() => {}}
          aoClicarEmSalvar={() => {}}
          aoClicarEmSalvarEVoltar={() => {}}
        />
      }
    >
        {isLoading && (
            <LinearProgress variant="indeterminate"/>
        )}
      <p>DetalhesDeCarro - {id}</p>
    </LayoutBasePages>
  );
};
