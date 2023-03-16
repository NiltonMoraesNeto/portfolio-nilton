import * as Yup from 'yup';

export default Yup.object().shape({
  montadora: Yup.string().required("Campo obrigatório!").min(3, "Montadora deve ter pelo menos 3 caracteres!"),
  modelo: Yup.string().required("Campo obrigatório!").min(3, "Montadora deve ter pelo menos 3 caracteres!"),
    ano: Yup.string().required().min(4)
  });
  