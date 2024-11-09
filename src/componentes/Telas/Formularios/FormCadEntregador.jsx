import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function FormCadEntregadores(props) {
    const [entregador, setEntregador] = useState(props.entregadorSelecionado);
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissao(evento){
        const form = evento.currentTarget;
        if (form.checkValidity()){
            
            if (!props.modoEdicao){
                //cadastrar o entregador
                props.setListaDeEntregadores([...props.listaDeEntregadores, entregador]);
                //exibir tabela com o entregador incluído
                props.setExibirTabela(true);
            }
            else{
                //editar o entregador
                /*altera a ordem dos registros
                props.setListaDeEntregadores([...props.listaDeEntregadores.filter(
                    (item) => {
                        return item.codigo !== entregador.codigo;
                    }
                ), entregador]);*/

                //não altera a ordem dos registros
                props.setListaDeEntregadores(props.listaDeEntregadores.map((item) => {
                    if (item.codigo !== entregador.codigo)
                        return item
                    else
                        return entregador
                }));

                //voltar para o modo de inclusão
                props.setModoEdicao(false);
                props.setEntregadorSelecionado({
                    codigo:0,
                    nome:"",
                    cpf:"",
                    cnh:""
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
        setEntregador({...entregador, [elemento]:valor});
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
                        value={entregador.codigo}
                        disabled={props.modoEdicao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do entregador!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nome"
                        name="nome"
                        value={entregador.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a descrição do entregador!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>CPF:</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={entregador.cpf}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o CPF do entregador!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>CNH:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="cnh"
                        name="cnh"
                        value={entregador.cnh}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a CNH do entregador!</Form.Control.Feedback>
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