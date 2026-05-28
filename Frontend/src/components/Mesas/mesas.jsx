import Api from "../../services/api";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import style from "./mesas.module.css";
import { Button, Card, Container, Stack } from "react-bootstrap";
import Tabela from "../Tabela/tabela";
import { useEffect, useState } from "react";
const Mesas = () => {
  const [mesas, setMesas] = useState([]);
  const [show, setShow] = useState(false);
  const [showDeletar, setShowDeletar] = useState(false);
  const [mesaEscolhida, setMesaEscolhida] = useState([]);

  const buscarMesas = async () => {
    const res = await Api.get("/mesa");

    if (res.status === 200) {
      setMesas(res.data);
    }
  };

  useEffect(() => {
    buscarMesas();
  }, []);

  const handleEdit = (row) => {
    setShow(true);
    setMesaEscolhida(row);
  };

  const handleDelete = (row) => {
    setShowDeletar(true);
    setMesaEscolhida(row);
  };

  const handleClose = () => {
    buscarMesas();
    setShow(false);
    setShowDelete(false);
  };

  const handleNovo = () => {
    setShow(true);
    setMesaEscolhida(null);
  };

  const columns = [
    { header: "Nº", accessor: "id_mesa" },
    { header: "Capacidade", accessor: "capacidade" },
    { header: "Restricao", accessor: "restricao" },
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
      <h1 className="fw-bold">Mesas</h1>
      <Stack gap={4} className="d-flex flex-column flex-lg-row mt-5">
        <Card className={style.card1}>
          <Card.Body>
            <p className="text-center">Total de mesas</p>
            <h5 className="text-center">{mesas.total ?? 0}</h5>
          </Card.Body>
        </Card>
      </Stack>

      <Tabela columns={columns} rows={mesas.dados} keyField={"id_mesa"} />
    </Container>
  );
};

export default Mesas;
