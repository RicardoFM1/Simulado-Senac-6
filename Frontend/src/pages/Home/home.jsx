import { Col, Container, Row } from "react-bootstrap"
import Header from "../../components/Header/header"
import Sidebar from "../../components/Sidebar/sidebar"
import Dashboard from "../../components/Dashboard/dashboard"
import Convidados from "../../components/Convidados/convidados"
import Acompanhantes from "../../components/Acompanhantes/acompanhantes"
import Checkins from "../../components/Checkins/checkins"
import Mesas from "../../components/Mesas/mesas"

const Home = ({setTelaAtiva, telaAtiva, setShow, show}) => {
    console.log(telaAtiva)
    return (
        <>
        <Header show={show} setShow={setShow}/>
        <Container fluid className="px-0 d-none d-lg-block">

        <Row>
            <Col lg={3}>
            <Sidebar telaAtiva={telaAtiva} setTelaAtiva={setTelaAtiva} show={show} setShow={setShow}/>
            </Col>

            <Col className="p-5" xs={12} lg={show ? 8 : 12}>
            <main>
                {telaAtiva === 'dashboard' && <Dashboard/>}
                {telaAtiva === 'convidados' && <Convidados/>}
                {telaAtiva === 'acompanhantes' && <Acompanhantes/>}
                {telaAtiva === 'checkins' && <Checkins/>}
                {telaAtiva === 'mesas' && <Mesas/>}

            </main>
            </Col>
        </Row>
        </Container>
        </>
    )
}


export default Home