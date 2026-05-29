import { Button, Card, Container, Stack } from "react-bootstrap";
import Tabela from "../Tabela/tabela";
import { useEffect, useState } from "react";
import style from "./convidados.module.css";
import Api from "../../services/api";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import ConvidadoModal from "../Modais/Convidados/convidadosModal";
import DeleteModal from "../Modais/DeleteModal";
import { toast } from "react-toastify";

const Convidados = () => {
  const [convidados, setConvidados] = useState([]);
  const [show, setShow] = useState(false);
  const [showDeletar, setShowDeletar] = useState(false);
  const [convidadoEscolhido, setConvidadoEscolhido] = useState([]);

  const buscarConvidados = async () => {
    const res = await Api.get("/convidado");

    if (res.status === 200) {
      setConvidados(res.data);
    }
  };

  useEffect(() => {
    buscarConvidados();
  }, []);

  const handleEdit = (row) => {
    setShow(true);
    setConvidadoEscolhido(row);
  };

  const handleDelete = (row) => {
    setShowDeletar(true);
    setConvidadoEscolhido(row);
  };

  const handleClose = () => {
    buscarConvidados();
    setShow(false);
    setShowDeletar(false);
  };

  const handleNovo = () => {
    setShow(true);
    setConvidadoEscolhido(null);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await Api.delete(
        `/convidado?email_convidado=${convidadoEscolhido.email}`,
      );
      if (res.status === 200) {
        toast.success(res.data.mensagem);
        showDeletar(false);
        buscarConvidados();
      }
    } catch (err) {
      toast.error(err.response?.data?.mensagem || "Erro ao deletar convidado");
    }
  };

  const enviarDados = async (dados) => {
    try {
      let res;
      if (convidadoSelecionado) {
        res = await Api.put(
          `/convidado?email_convidado=${convidadoEscolhido.email}`,
          dados,
        );

        if (res.status === 200) {
          toast.success(res.data?.mensagem);
          handleClose();
        
        }
      } else {
        res = await Api.post("/convidado", dados);

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
    { header: "Nº", accessor: "id_convidado" },
    { header: "Nome", accessor: "nome" },
    { header: "Sobrenome", accessor: "sobrenome" },
    { header: "Email", accessor: "email" },
    { header: "Cpf", accessor: "cpf" },
    { header: "Telefone", accessor: "telefone" },
    { header: "Categoria", accessor: "categoria" },
    { header: "Confirmacao", accessor: "confirmacao" },
    { header: "Nº da mesa", accessor: "mesa_idmesa" },

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
      <h1 className="fw-bold">Convidados</h1>
      <Stack gap={4} className="d-flex flex-column flex-lg-row mt-5">
        <Card className={style.card1}>
          <Card.Body>
            <p className="text-center">Total de convidados</p>
            <h5 className="text-center">{convidados.total ?? 0}</h5>
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
        rows={convidados.dados}
        keyField={"id_convidado"}
      />
      <ConvidadoModal
        show={show}
        dados={convidadoEscolhido}
        handleClose={handleClose}
        submit={enviarDados}
      />
       <DeleteModal
                show={showDeletar}
                handleClose={handleClose}
                handleConfirm={handleConfirmDelete}
                title="Excluir Convidado"
                message={`Tem certeza que deseja excluir o convidado ${convidadoEscolhido?.nome}?`}
            />
    </Container>
  );
};

export default Convidados;
