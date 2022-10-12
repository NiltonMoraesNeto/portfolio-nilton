import * as Yup from 'yup';

export default Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório!").min(3, "Nome deve ter pelo menos 3 caracteres!"),
    email: Yup.string().required().email(),
    empresa: Yup.string().required().min(5),
    profissao: Yup.string().required().min(5),
    sexo: Yup.string().required().min(5),
    /*pais: Yup.string().required().min(5),
    cidade: Yup.string().required().min(5),
    telefone: Yup.string().required().min(5),
    Cep: Yup.string().required().min(5),*/
    //Idioma: Yup.string().nullable().notRequired()
    //Idioma: Yup.string().nullable().optional()
    //Idioma: Yup.string().nullable().notRequired().optional()
    //Idioma: Yup.string().required().min(5),
  });