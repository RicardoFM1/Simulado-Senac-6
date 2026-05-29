import { useEffect, useState } from "react";
import Api from "../../services/api";
import { Button, Card, Container, Stack } from "react-bootstrap";
import style from "./dashboard.module.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Tabela from "../Tabela/tabela";
import UsuariosModal from "../Modais/Usuarios/usuariosModal";
import DeleteModal from "../Modais/DeleteModal";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [show, setShow] = useState(false);
  const [showDeletar, setShowDeletar] = useState(false);
  const [usuarioEscolhido, setUsuarioEscolhido] = useState([]);

  const buscarDashboard = async () => {
    const res = await Api.get("/dashboard");

    if (res.status === 200) {
      setDashboard(res.data.dados);
      console.log(res.data.dados);
    }
  };

  const buscarUsuarios = async () => {
    const res = await Api.get("/usuario");

    if (res.status === 200) {
      setUsuarios(res.data.dados);
    }
  };

  useEffect(() => {
    buscarDashboard();
    buscarUsuarios();
    console.log(show);
  }, []);

  const handleEdit = (row) => {
    setShow(true);
    setUsuarioEscolhido(row);
    console.log(usuarioEscolhido);
  };

  const handleDelete = (row) => {
    setShowDeletar(true);
    setUsuarioEscolhido(row);
  };

  const handleClose = () => {
    buscarDashboard();
    buscarUsuarios();
    setShow(false);
    setShowDeletar(false);
  };

  const handleNovo = () => {
    setShow(true);
    setUsuarioEscolhido(null);
  };
  const handleConfirmDelete = async () => {
    try {
      const res = await Api.delete(
        `/usuario?email_usuario=${usuarioEscolhido.email}`,
      );
      if (res.status === 200) {
        toast.success(res.data.mensagem);
        setShowDelete(false);
        buscarDados();
      }
    } catch (err) {
      toast.error(err.response?.data?.mensagem || "Erro ao deletar usuário");
    }
  };

  const enviarDados = async (dados) => {
    try {
      let res;
      if (usuarioSelecionado) {
        res = await Api.put(
          `/usuario?email_usuario=${usuarioEscolhido.email}`,
          dados,
        );
      } else {
        res = await Api.post("/usuario", dados);
      }

      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.mensagem);
        setShow(false);
        buscarDados();
      }
    } catch (err) {
      const erros = err.response?.data?.erros;
      if (erros) {
        Object.values(erros).forEach((msg) => toast.error(msg));
      } else {
        toast.error(err.response?.data?.mensagem || "Erro ao salvar usuário");
      }
    }
  };

  const enviarDados = () => {};

  const columns = [
    { header: "Nº", accessor: "id_usuario" },

    { header: "Nome", accessor: "nome" },
    { header: "Email", accessor: "email" },
    { header: "Cpf", accessor: "cpf" },
    { header: "Cargo", accessor: "cargo" },
    {
      header: "Ações",
      accessor: "acoes",
      render: (row) => (
        <Stack gap={3} direction="horizontal">
          <Button
            className="ignorar-classe"
            variant="warning"
            onClick={() => handleEdit(row)}
          >
            <CiEdit />
          </Button>
          <Button
            className="ignorar-classe"
            variant="danger"
            onClick={() => handleDelete(row)}
          >
            <MdDelete />
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Container fluid>
        <h1 className="fw-bold">Dashboard</h1>
        <Stack gap={4} className="d-flex flex-column flex-lg-row mt-5">
          <Card className={style.card4}>
            <Card.Body>
              <p className="text-center">Total de convidados</p>
              <h5 className="text-center">
                {dashboard.convidados?.total ?? 0}
              </h5>
            </Card.Body>
          </Card>

          <Card className={style.card1}>
            <Card.Body>
              <p className="text-center">Total confirmados</p>
              <h5 className="text-center">
                {dashboard.convidados?.confirmados ?? 0}
              </h5>
            </Card.Body>
          </Card>

          <Card className={style.card2}>
            <Card.Body>
              <p className="text-center">Total não confirmados</p>
              <h5 className="text-center">
                {dashboard.convidados?.nao_confirmados ?? 0}
              </h5>
            </Card.Body>
          </Card>

          <Card className={style.card3}>
            <Card.Body>
              <p className="text-center">Total cancelados</p>
              <h5 className="text-center">
                {dashboard.convidados?.cancelados ?? 0}
              </h5>
            </Card.Body>
          </Card>
        </Stack>
        <Button
          className="mt-5 ignorar-classe"
          variant="info"
          onClick={handleNovo}
        >
          Adicionar novo
        </Button>
        <Tabela columns={columns} rows={usuarios} keyField={"id_usuario"} />
        <UsuariosModal
          show={show}
          dados={usuarioEscolhido}
          handleClose={handleClose}
          submit={enviarDados}
        />
        <DeleteModal
          show={showDeletar}
          handleClose={handleClose}
          handleConfirm={handleConfirmDelete}
          title="Excluir Usuário"
          message={`Tem certeza que deseja excluir o usuário ${usuarioEscolhido?.nome}?`}
        />
      </Container>
    </>
  );
};

export default Dashboard;
