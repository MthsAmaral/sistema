import { Alert } from "react-bootstrap";
import FormCadProdutos from "./Formulario/FormCadProduto";
import Pagina from "../layouts/Pagina";
import { useEffect, useState } from "react";
import TabelaProdutos from "./Tabelas/TabelaProdutos";
import { produtos } from "../../dados/mockProdutos";
import { consultarProduto } from "../../servicos/servicoProduto.js";

export default function TelaCadastroProduto(props) {
    const [produtos, setProdutos] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeProdutos, setListaDeProdutos] = useState(produtos);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState({
        codigo:0,
        descricao:"",
        precoCusto:0,
        precoVenda:0,
        qtdEstoque:0,
        urlImagem:"",
        dataValidade:""

    });

    useEffect(()=>{
        consultarProduto().then((lista)=>{
            setListaDeProdutos(lista)
        })
    },[])//lista vazia -> didMount
   
    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Produto
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaProdutos listaDeProdutos={listaDeProdutos}
                                        setListaDeProdutos={setListaDeProdutos} 
                                        setModoEdicao={setModoEdicao}
                                        setProdutoSelecionado={setProdutoSelecionado}
                                        setExibirTabela={setExibirTabela} /> :
            
                        <FormCadProdutos listaDeProdutos={listaDeProdutos}
                                         setListaDeProdutos={setListaDeProdutos}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}
                                         produtoSelecionado={produtoSelecionado}
                                         setProdutoSelecionado={setProdutoSelecionado}
                                         setExibirTabela={setExibirTabela}
                                         />
                }
            </Pagina>
        </div>
    );

}