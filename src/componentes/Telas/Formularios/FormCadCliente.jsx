import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function FormCadClientes(props) {
    const [cliente, setCliente] = useState(props.clienteSelecionado);
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissao(evento){
        const form = evento.currentTarget;
        if (form.checkValidity()){
            
            if (!props.modoEdicao){
                //cadastrar o cliente
                props.setListaDeClientes([...props.listaDeClientes, cliente]);
                //exibir tabela com o cliente incluído
                props.setExibirTabela(true);
            }
            else{
                //editar o cliente
                /*altera a ordem dos registros
                props.setListaDeClientes([...props.listaDeClientes.filter(
                    (item) => {
                        return item.codigo !== cliente.codigo;
                    }
                ), cliente]);*/

                //não altera a ordem dos registros
                props.setListaDeClientes(props.listaDeClientes.map((item) => {
                    if (item.codigo !== cliente.codigo)
                        return item
                    else
                        return cliente
                }));

                //voltar para o modo de inclusão
                props.setModoEdicao(false);
                props.setClienteSelecionado({
                    codigo:0,
                    nome:"",
                    cpf:"",
                    telefone:"",
                    email:""
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
        setCliente({...cliente, [elemento]:valor});
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
                        value={cliente.codigo}
                        disabled={props.modoEdicao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do cliente!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nome"
                        name="nome"
                        value={cliente.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a Nome do cliente!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={cliente.cpf}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o CPF do cliente!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Form.Group as={Col} md="4">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="telefone"
                        name="telefone"
                        value={cliente.telefone}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o Telefone do cliente!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="email"
                        name="email"
                        value={cliente.email}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o Email do cliente!</Form.Control.Feedback>
            </Form.Group>
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