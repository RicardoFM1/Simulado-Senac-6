import { Button, Offcanvas, Stack } from "react-bootstrap";
import style from "./sidebar.module.css";

const Sidebar = ({ telaAtiva, setTelaAtiva, show, setShow }) => {
    
  return (
    <Offcanvas
      show={show}
      scroll={true}
      backdrop={false}
      className={style.sidebar}
    >
      <Offcanvas.Body className="mt-5">
        <p className="py-3">Navegação</p>
        <h5 className="my-4">Administração:</h5>
        <Stack gap={3}>
          <Button className="text-start" onClick={() => setTelaAtiva("dashboard")}>
            Dashboard
          </Button>
          <hr className="mt-5 mb-3" />

          <h5 className="my-4">Operacional:</h5>
          <Button className="text-start" onClick={() => setTelaAtiva("convidados")}>
            Convidados
          </Button>
          <Button
            className="text-start"
            onClick={() => setTelaAtiva("acompanhantes")}
          >
            Acompanhantes
          </Button>
          <Button className="text-start" onClick={() => setTelaAtiva("checkins")}>
            Checkin
          </Button>
          <Button className="text-start" onClick={() => setTelaAtiva("mesas")}>
            Mesa
          </Button>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
