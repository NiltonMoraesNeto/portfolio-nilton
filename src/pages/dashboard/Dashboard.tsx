import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";


export const Dashboard: React.FC = () => {

    return(
        <LayoutBasePages titulo='Teste Oi' barraDeFerramentas={(
            <FerramentasDaListagem mostrarInputBusca textoBotaoNovo="Nova"/>
        )}>
            Testando
        </LayoutBasePages>
    );
};