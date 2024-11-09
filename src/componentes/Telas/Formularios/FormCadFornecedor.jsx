import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function FormCadFornecedor(props) {
    const [fornecedor, setFornecedor] = useState(props.fornecedorSelecionado);
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissao(evento){
        const form = evento.currentTarget;
        if (form.checkValidity()){
            
            if (!props.modoEdicao){
                //cadastrar o fornecedor
                props.setListaDeFornecedores([...props.listaDeFornecedores, fornecedor]);
                //exibir tabela com o Fornecedor incluído
                props.setExibirTabela(true);
            }
            else{
                //editar o fornecedor
                /*altera a ordem dos registros
                props.setListaDeFornecedores([...props.listaDeFornecedores.filter(
                    (item) => {
                        return item.codigo !== fornecedor.codigo;
                    }
                ), fornecedor]);*/

                //não altera a ordem dos registros
                props.setListaDeFornecedores(props.listaDeFornecedores.map((item) => {
                    if (item.codigo !== fornecedor.codigo)
                        return item
                    else
                        return fornecedor
                }));

                //voltar para o modo de inclusão
                props.setModoEdicao(false);
                props.setFornecedorSelecionado({
                    codigo:0,
                    razaoSocial:"",
                    cnpj:"",
                    nomeFantasia:"",
                    telefone:""
                });
                props.setExibirTabela(true);
            }

        }
        else{
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();

    }

    function manipularMudanca(evento){
        const elemento = evento.target.name;
        const valor    = evento.target.value; 
        setFornecedor({...fornecedor, [elemento]:valor});
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="codigo"
                        name="codigo"
                        value={fornecedor.codigo}
                        disabled={props.modoEdicao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do fornecedor!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Razão Social</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="razaoSocial"
                        name="razaoSocial"
                        value={fornecedor.razaoSocial}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a Razão social do fornecedor!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>CNPJ</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="cnpj"
                        name="cnpj"
                        value={fornecedor.cnpj}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a CNPJ do fornecedor!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12">
                    <Form.Label>Nome Fantasia</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nomeFantasia"
                        name="nomeFantasia"
                        value={fornecedor.nomeFantasia}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe Nome Fantasia do fornecedor!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="telefone"
                        name="telefone"
                        value={fornecedor.telefone}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe Telefone do fornecedor!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? "Alterar":"Confirmar"}</Button>
                </Col>
                <Col md={{offset:1}}>
                    <Button onClick={()=>{
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
        </Form>

    );
}