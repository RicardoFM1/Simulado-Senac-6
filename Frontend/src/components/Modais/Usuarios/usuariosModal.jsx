import { useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import style from "./usuariosModal.module.css";

const UsuariosModal = ({ dados, show, handleClose, submit }) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
    cargo: "",
  });
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    if (dados) {
      setEditando(true);
      setFormData(dados);
    } else {
      setEditando(false);
      setFormData({
        nome: "",
        email: "",
        cpf: "",
        senha: "",
        cargo: "",
      });
    }
    console.log(show);
  }, [dados, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (!name) console.log("Sem nome no campo");

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    submit(dados);
  };

  return (
    <Modal show={show} onHide={handleClose} className={style.modal}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editando ? "Editar Usuário" : "Novo Usuário"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={3}>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Senha {editando && "(deixe em branco para não alterar)"}
              </Form.Label>
              <Form.Control
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                required={!editando}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cargo</Form.Label>
              <Form.Select
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                required={!editando}
              >
                <option value="">Selecione...</option>
                <option value="administrador">Administrador</option>
                <option value="ceremonialista">Cerimonialista</option>
              </Form.Select>
            </Form.Group>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="ignorar-classe"
            variant="secondary"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button type="submit" className="ignorar-classe" variant="success">
            {editando ? "Salvar" : "Criar"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UsuariosModal;
