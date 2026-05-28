import { Button, Card, Container, Form, InputGroup, Stack } from "react-bootstrap";
import { MdAttachEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {toast} from 'react-toastify'
import style from "./login.module.css";
import { useState } from "react";
import Api from "../../services/api";
import { useNavigate } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [verSenha, setVerSenha] = useState(false)

  const navigate = useNavigate()

  const enviarDados = async(e) => {
    e.preventDefault(); 

    try{
        const res = await Api.post('/usuario/login', formData)

        if(res.status === 200){
        toast.success('Usuário logado com sucesso')
        localStorage.setItem("token", res.data.token)
        navigate('/')
        }
    }catch(err){
        const erros = err.response?.data?.erros
       

        if(erros){
            Object.values(erros).forEach((msg) => {
                toast.error(msg)
            })
        }
        else{
            toast.error(err.response?.data.mensagem)
        }
    }
  };

  const handleChange = (e) => {
    const {name, value}= e.target;

    if(!name) return;

    setFormData((prev) => ({...prev, [name]: value}))

  };

  return (
    <>
      <Container className={style.Container}>
        <Card className={style.Card}>
          <Card.Header>
            <Card.Title className="text-center p-2 fw-bold fs-2">
              Senac Wedding
            </Card.Title>
            <Card.Subtitle className="text-mute">
              O sistema de organização de casamentos
            </Card.Subtitle>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={enviarDados}>
              <Stack gap={3}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <MdAttachEmail size={25}/>
                    </InputGroup.Text>
                    <Form.Control
                    name="email"
                      placeholder="Seu melhor email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      required
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Senha</Form.Label>
                    <InputGroup>
                    <InputGroup.Text><RiLockPasswordFill size={25}/></InputGroup.Text>
                    <Form.Control
                    name="senha" 
                    type={verSenha ? 'text' : 'password'}
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder="Sua senha"
                    required
                    />
                    <Button onClick={() => setVerSenha(!verSenha)}>{verSenha ? <FaEye/> : <FaEyeSlash/> }</Button>
                    </InputGroup>
                </Form.Group>
              </Stack>
              <hr />
              <Stack>

              <Button type="submit">Fazer login</Button>
              </Stack>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Login;
