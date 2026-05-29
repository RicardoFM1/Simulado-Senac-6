import Api from "../../services/api";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import style from "./mesas.module.css";
import { Button, Card, Container, Stack } from "react-bootstrap";
import Tabela from "../Tabela/tabela";
import { useEffect, useState } from "react";
import MesaModal from "../Modais/Mesas/mesasModal";
import DeleteModal from "../Modais/DeleteModal";
import { toast } from "react-toastify";
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
    setShowDeletar(false);
  };

  const handleNovo = () => {
    setShow(true);
    setMesaEscolhida(null);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await Api.delete(`/mesa?id_mesa=${mesaEscolhida.id_mesa}`);
      if (res.status === 200) {
        toast.success(res.data.mensagem);
        setShowDelete(false);
        buscarMesas();
      }
    } catch (err) {
      toast.error(err.response?.data?.mensagem || "Erro ao deletar mesa");
    }
  };

  const enviarDados = async (dados) => {
    try {
      let res;
      if (mesaSelecionada) {
        res = await Api.put(`/mesa?id_mesa=${mesaEscolhida.id_mesa}`, dados);

        if (res.status === 200) {
          toast.success(res.data?.mensagem);
          handleClose();
        }
      } else {
        res = await Api.post("/mesa", dados);

        if (res.status === 201) {
          toast.success(res.data?.mensagem);
          handleClose();
        }
      }
    } catch (err) {
      const erros = err.response?.data?.erros;

      if (erros) {
        Object.values(erros).forEach((msg) => {
          toast.error(msg);
        });
      } else {
        toast.error(err.response?.data?.mensagem || "Erro ao enviar dados");
      }
    }
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
      <Button
        className="mt-5 ignorar-classe"
        variant="info"
        onClick={handleNovo}
      >
        Adicionar novo
      </Button>

      <Tabela columns={columns} rows={mesas.dados} keyField={"id_mesa"} />
      <MesaModal
        show={show}
        dados={mesaEscolhida}
        handleClose={handleClose}
        submit={enviarDados}
      />
      <DeleteModal
        show={showDeletar}
        handleClose={handleClose}
        handleConfirm={handleConfirmDelete}
        title="Excluir Mesa"
        message={`Tem certeza que deseja excluir a mesa ${mesaEscolhida?.id_mesa}?`}
      />
    </Container>
  );
};

export default Mesas;
