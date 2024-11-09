import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function FormCadUsuarios(props) {
    const [usuario, setUsuario] = useState(props.usuarioSelecionado);
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissao(evento){
        const form = evento.currentTarget;
        if (form.checkValidity()){
            
            if (!props.modoEdicao){
                //cadastrar o usuario
                props.setListaDeUsuarios([...props.listaDeUsuarios, usuario]);
                //exibir tabela com o usuario incluído
                props.setExibirTabela(true);
            }
            else{
                //editar o usuario
                /*altera a ordem dos registros
                props.setListaDeUsuarios([...props.listaDeUsuarios.filter(
                    (item) => {
                        return item.codigo !== usuario.codigo;
                    }
                ), usuario]);*/

                //não altera a ordem dos registros
                props.setListaDeUsuarios(props.listaDeUsuarios.map((item) => {
                    if (item.codigo !== usuario.codigo)
                        return item
                    else
                        return usuario
                }));

                //voltar para o modo de inclusão
                props.setModoEdicao(false);
                props.setUsuarioSelecionado({
                    codigo:0,
                    cpf:"",
                    nome:"",
                    telefone:"",
                    email:"",
                    senha:""
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
        setUsuario({...usuario, [elemento]:valor});
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
                        value={usuario.codigo}
                        disabled={props.modoEdicao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={usuario.cpf}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o CPF do usuario!</Form.Control.Feedback>
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
                        value={usuario.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o CPF do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="telefone"
                        name="telefone"
                        value={usuario.telefone}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o telefone do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="email"
                        name="email"
                        value={usuario.email}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o email do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        id="senha"
                        name="senha"
                        value={usuario.senha}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a senha do usuario!</Form.Control.Feedback>
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