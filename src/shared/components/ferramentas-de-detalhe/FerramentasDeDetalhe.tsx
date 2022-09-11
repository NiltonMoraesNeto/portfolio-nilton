import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  mostrarBotaoNovoCarregando?: boolean;
  aoClicarEmNovo?: () => void;

  textoBotaoVoltar?: string;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  aoClicarEmVoltar?: () => void;

  textoBotaoApagar?: string;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  aoClicarEmApagar?: () => void;

  textoBotaoSalvar?: string;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  aoClicarEmSalvar?: () => void;

  textoBotaoSalvarEVoltar?: string;
  mostrarBotaoSalvarEVoltar?: boolean;
  mostrarBotaoSalvarEVoltarCarregando?: boolean;
  aoClicarEmSalvarEVoltar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo = "Novo",
  mostrarBotaoNovo = true,
  mostrarBotaoNovoCarregando = false,
  aoClicarEmNovo,

  textoBotaoVoltar = "Voltar",
  mostrarBotaoVoltar = true,
  mostrarBotaoVoltarCarregando = false,
  aoClicarEmVoltar,

  textoBotaoApagar = "Apagar",
  mostrarBotaoApagar = true,
  mostrarBotaoApagarCarregando = false,
  aoClicarEmApagar,

  textoBotaoSalvar = "Salvar",
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarCarregando = false,
  aoClicarEmSalvar,

  textoBotaoSalvarEVoltar = "Salvar e Voltar",
  mostrarBotaoSalvarEVoltar = false,
  mostrarBotaoSalvarEVoltarCarregando = false,
  aoClicarEmSalvarEVoltar,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      gap={1}
      alignItems="center"
      component={Paper}
    >
      {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={aoClicarEmSalvar}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar
          </Typography>
        </Button>
      )}
      {mostrarBotaoSalvarCarregando && <Skeleton width={110} height={60} />}

      {mostrarBotaoSalvarEVoltar &&
        !mostrarBotaoSalvarEVoltarCarregando &&
        !smDown &&
        !mdDown && (
          <Button
            variant="outlined"
            color="primary"
            disableElevation
            startIcon={<Icon>save</Icon>}
            onClick={aoClicarEmSalvarEVoltar}
          >
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Salvar e Voltar
            </Typography>
          </Button>
        )}
      {mostrarBotaoSalvarEVoltarCarregando && !smDown && !mdDown && (
        <Skeleton width={180} height={60} />
      )}

      {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={aoClicarEmApagar}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Apagar
          </Typography>
        </Button>
      )}
      {mostrarBotaoApagarCarregando && <Skeleton width={110} height={60} />}

      {mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={aoClicarEmNovo}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {textoBotaoNovo}
          </Typography>
        </Button>
      )}
      {mostrarBotaoNovoCarregando && <Skeleton width={110} height={60} />}

      {mostrarBotaoVoltar &&
        (mostrarBotaoNovo ||
          mostrarBotaoApagar ||
          mostrarBotaoSalvar ||
          mostrarBotaoSalvarEVoltar) && (
          <Divider variant="middle" orientation="vertical" />
        )}

      {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={aoClicarEmVoltar}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Voltar
          </Typography>
        </Button>
      )}
      {mostrarBotaoVoltarCarregando && !smDown && (
        <Skeleton width={110} height={60} />
      )}
    </Box>
  );
};
