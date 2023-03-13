import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import { useAuthContext } from "../../contexts";

interface ILoginProps{
    children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({children}) => {

    const {isAuthenticated, login} = useAuthContext();


    if(isAuthenticated) return(
        <>{children}</>
    );

    return(
        <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
            <Card>
                <CardContent>
                    <Box display='flex' flexDirection='column' gap={2} width={250}>

                        <Typography variant='h6' align='center'>Identifique-se</Typography>
                        <TextField
                        label='Email'
                        type='email'
                        fullWidth
                        />
                        <TextField 
                        label='Senha'
                        type='password'
                        fullWidth
                        />
                    </Box>
                    
                </CardContent>
                <CardActions>
                    <Box width='100%' display='flex' justifyContent='center'>
                        <Button variant='contained' onClick={() => login('', '')}>
                            Entrar
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
};