import { Button, Card, Offcanvas, Stack } from "react-bootstrap";
import style from "./sidebar.module.css";
import Api from "../../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Sidebar = ({ telaAtiva, setTelaAtiva, show, setShow }) => {
  const [retrieve, setRetrieve] = useState([]);
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();
  const buscarRetrieve = async () => {
    const res = await Api.get("/retrieve");

    if (res.status === 200) {
      setRetrieve(res.data.dados);
      if (res.data.dados.cargo_usuario === "administrador") {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    }
  };

  useEffect(() => {
    buscarRetrieve();
  }, []);

  const handleSair = () => {
    localStorage.clear();
    navigate('/login')
  }
  return (
    <Offcanvas
      show={show}
      scroll={true}
      backdrop={false}
      className={style.sidebar}
    >
      <Offcanvas.Body className="mt-5">
        <p className="py-3">Navegação</p>
        {admin && (
          <>
            <h5 className="my-4">Administração:</h5>
            <Stack gap={3} className="mb-auto">
              <Button
                className="text-start"
                onClick={() => setTelaAtiva("dashboard")}
              >
                Dashboard / Usuários
              </Button>
            </Stack>
            <hr className="mt-5 mb-3" />
          </>
        )}

        <Stack gap={3}>
          <h5 className="my-4">Operacional:</h5>
          <Button
            className="text-start"
            onClick={() => setTelaAtiva("convidados")}
          >
            Convidados
          </Button>
          <Button
            className="text-start"
            onClick={() => setTelaAtiva("acompanhantes")}
          >
            Acompanhantes
          </Button>
          <Button
            className="text-start"
            onClick={() => setTelaAtiva("checkins")}
          >
            Checkin
          </Button>
          <Button className="text-start" onClick={() => setTelaAtiva("mesas")}>
            Mesa
          </Button>
        </Stack>
        <Card className="mt-5">
          <Card.Body>
            <p>{retrieve.email_usuario}</p>
            <p>{retrieve.cargo_usuario}</p>

            <Stack>
                <Button onClick={handleSair}>Sair</Button>
            </Stack>
          </Card.Body>
        </Card>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
