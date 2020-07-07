//modifica os tipos que um biblioteca
// namespace é usado para sobrescrever uma
declare namespace Express{

    //Extende as propriedades do Express que já existem por padrão
    export interface Request{
        user:{
            id: string;
        }
    }

}
