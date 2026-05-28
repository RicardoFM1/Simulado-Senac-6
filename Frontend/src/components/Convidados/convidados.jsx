import { Button, Card, Container, Stack } from "react-bootstrap";
import Tabela from "../Tabela/tabela";
import { useEffect, useState } from "react";
import style from "./convidados.module.css"
import Api from "../../services/api";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const Convidados = () => {
    
  const [convidados, setConvidados] = useState([]);
  const [show, setShow] = useState(false);
  const [showDeletar, setShowDeletar] = useState(false);
  const [convidadoEscolhido, setConvidadoEscolhido] = useState([]);

 
  const buscarConvidados = async() => {
    const res = await Api.get('/convidado')

    if(res.status === 200){
        setConvidados(res.data)
    }
  }

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
<Container>


      <h1 className="fw-bold">Convidados</h1>
      <Stack gap={4} className="d-flex flex-column flex-lg-row mt-5">
          <Card className={style.card1}>
            <Card.Body>
              <p className="text-center">Total de convidados</p>
              <h5 className="text-center">
                {convidados.total ?? 0}
              </h5>
            </Card.Body>
          </Card>

          
        </Stack>

        <Tabela columns={columns} rows={convidados.dados} keyField={'id_convidado'} />

      </Container>

  );
};

export default Convidados;
