import { useEffect, useState } from "react";
import Api from "../../services/api";
import { Button, Card, Container, Stack } from "react-bootstrap";
import style from "./dashboard.module.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Tabela from "../Tabela/tabela";

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

  const buscarUsuarios = async() => {
    const res = await Api.get('/usuario')

    if(res.status === 200){
        setUsuarios(res.data.dados)
    }
  }

  useEffect(() => {
    buscarDashboard();
    buscarUsuarios();
  }, []);

  const handleEdit = (row) => {
    setShow(true);
    setUsuarioEscolhido(row);
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
          <Button className="ignorar-classe" variant="warning" onClick={handleEdit(row)}>
            <CiEdit />
          </Button>
          <Button className="ignorar-classe" variant="danger" onClick={handleDelete(row)}>
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

        <Tabela columns={columns} rows={usuarios} keyField={'id_usuario'} />

      </Container>
    </>
  );
};

export default Dashboard;
