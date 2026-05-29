import Api from "../../services/api";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import style from "./acompanhantes.module.css";
import { Button, Card, Container, Stack } from "react-bootstrap";
import Tabela from "../Tabela/tabela";
import { useEffect, useState } from "react";
import AcompanhanteModal from "../Modais/Acompanhantes/acompanhantesModal";
import DeleteModal from "../Modais/DeleteModal";
import { toast } from "react-toastify";

const Acompanhantes = () => {
  const [acompanhantes, setAcompanhantes] = useState([]);
  const [convidados, setConvidados] = useState([]);
  const [show, setShow] = useState(false);
  const [showDeletar, setShowDeletar] = useState(false);
  const [acompanhanteEscolhido, setAcompanhanteEscolhido] = useState([]);

  const buscarAcompanhantes = async () => {
    const res = await Api.get("/acompanhante");

    if (res.status === 200) {
      setAcompanhantes(res.data);
    }
  };
  const buscarConvidados = async () => {
    try {
      const res = await Api.get("/convidado");
      setConvidados(res.data.dados);
    } catch (err) {
      toast.error("Erro ao buscar convidados");
      console.log(err);
    }
  };

  useEffect(() => {
    buscarAcompanhantes();
    buscarConvidados();
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

  const deletarAcompanhante = async () => {
    try {
      const res = await Api.delete(
        `/acompanhante?id_acompanhante=${acompanhanteEscolhido.id_acompanhante}`,
      );
      if (res.status === 200) {
        toast.success(res.data.mensagem);
        await buscarAcompanhantes();
        setShowDeletar(false);
      }
    } catch (err) {
      toast.error(
        err.response?.data.mensagem || "Erro ao deletar acompanhante",
      );
    }
  };

  const enviarDadosForm = async (dados, editando) => {
    try {
      if (editando) {
        const res = await Api.put(
          `/acompanhante?id_acompanhante=${acompanhanteEscolhido.id_acompanhante}`,
          dados,
        );
        if (res.status === 200) {
          toast.success(res.data.mensagem);
          handleClose();
        }
      } else {
        const res = await Api.post("/acompanhante", dados);
        if (res.status === 201) {
          toast.success(res.data.mensagem);
          handleClose();
        }
      }
    } catch (err) {
      toast.error(err.response?.data.mensagem || "Erro ao enviar dados");
    }
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
      <h1 className="fw-bold">Acompanhantes</h1>
      <Stack gap={4} className="d-flex flex-column flex-lg-row mt-5">
        <Card className={style.card1}>
          <Card.Body>
            <p className="text-center">Total de acompanhantes</p>
            <h5 className="text-center">{acompanhantes.total ?? 0}</h5>
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
      <Tabela
        columns={columns}
        rows={acompanhantes.dados}
        keyField={"id_acompanhante"}
      />
      <AcompanhanteModal
        show={show}
        convidados={convidados}
        dados={acompanhanteEscolhido}
        handleClose={handleClose}
        onSubmit={enviarDadosForm}
      />
      <DeleteModal
        show={showDeletar}
        handleClose={handleClose}
        handleConfirm={deletarAcompanhante}
        title="Excluir Acompanhante"
        message={`Tem certeza que deseja excluir o acompanhante ${acompanhanteEscolhido?.nome}?`}
      />
    </Container>
  );
};

export default Acompanhantes;
