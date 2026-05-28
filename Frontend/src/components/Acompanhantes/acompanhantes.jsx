import Api from "../../services/api";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import style from "./acompanhantes.module.css";
import { Button, Card, Container, Stack } from "react-bootstrap";
import Tabela from "../Tabela/tabela";
import { useEffect, useState } from "react";
const Acompanhantes = () => {
  const [acompanhantes, setAcompanhantes] = useState([]);
  const [show, setShow] = useState(false);
  const [showDeletar, setShowDeletar] = useState(false);
  const [acompanhanteEscolhido, setAcompanhanteEscolhido] = useState([]);

  const buscarAcompanhantes = async () => {
    const res = await Api.get("/acompanhante");

    if (res.status === 200) {
      setAcompanhantes(res.data);
    }
  };

  useEffect(() => {
    buscarAcompanhantes();
  }, []);

  const handleEdit = (row) => {
    setShow(true);
    setAcompanhanteEscolhido(row);
  };

  const handleDelete = (row) => {
    setShowDeletar(true);
    setAcompanhanteEscolhido(row);
  };

  const handleClose = () => {
    buscarAcompanhantes();
    setShow(false);
    setShowDeletar(false);
  };

  const handleNovo = () => {
    setShow(true);
    setAcompanhanteEscolhido(null);
  };

  const columns = [
    { header: "Nº", accessor: "id_acompanhante" },
    { header: "Nome", accessor: "nome" },
    { header: "Sobrenome", accessor: "sobrenome" },
    { header: "Email", accessor: "email" },
    { header: "Cpf", accessor: "cpf" },
    { header: "Idade", accessor: "idade" },
    { header: "Convidado", accessor: "convidado_idconvidado" },

    {
      header: "Ações",
      accessor: "acoes",
      render: (row) => (
        <Stack gap={3} direction="horizontal">
          <Button
            className="ignorar-classe"
            variant="warning"
            onClick={handleEdit(row)}
          >
            <CiEdit />
          </Button>
          <Button
            className="ignorar-classe"
            variant="danger"
            onClick={handleDelete(row)}
          >
            <MdDelete />
          </Button>
        </Stack>
      ),
    },
  ];
  return (
    <Container>
      <h1 className="fw-bold">Acompanhantes</h1>
      <Stack gap={4} className="d-flex flex-column flex-lg-row mt-5">
        <Card className={style.card1}>
          <Card.Body>
            <p className="text-center">Total de acompanhantes</p>
            <h5 className="text-center">{acompanhantes.total ?? 0}</h5>
          </Card.Body>
        </Card>
      </Stack>

      <Tabela
        columns={columns}
        rows={acompanhantes.dados}
        keyField={"id_acompanhante"}
      />
    </Container>
  );
};

export default Acompanhantes;
