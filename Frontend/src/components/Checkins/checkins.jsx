import Api from "../../services/api";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import style from "./checkins.module.css";
import { Button, Card, Container, Stack } from "react-bootstrap";
import Tabela from "../Tabela/tabela";
import { useEffect, useState } from "react";
const Checkins = () => {
  const [checkins, setCheckins] = useState([]);
  const [show, setShow] = useState(false);

  const buscarCheckins = async () => {
    const res = await Api.get("/checkin");

    if (res.status === 200) {
      setCheckins(res.data);
    }
  };

  useEffect(() => {
    buscarCheckins();
  }, []);

 

 
 

  const handleClose = () => {
    buscarCheckins();
    setShow(false);
    
  };

  const handleNovo = () => {
    setShow(true);
  };

  const columns = [
    { header: "Nº", accessor: "id_checkin" },
    { header: "Usuario", accessor: "usuario_idusuario" },
    { header: "Convidado", accessor: "convidado_idconvidado" },
    { header: "Data e hora", accessor: "data_e_hora" }
  ];
  return (
    <Container>
      <h1 className="fw-bold">Checkins</h1>
      <Stack gap={4} className="d-flex flex-column flex-lg-row mt-5">
        <Card className={style.card1}>
          <Card.Body>
            <p className="text-center">Total de checkins</p>
            <h5 className="text-center">{checkins.total ?? 0}</h5>
          </Card.Body>
        </Card>
      </Stack>

      <Tabela
        columns={columns}
        rows={checkins.dados}
        keyField={"id_checkin"}
      />
    </Container>
  );
};

export default Checkins;
