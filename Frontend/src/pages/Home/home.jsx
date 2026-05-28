import { Col, Container, Row } from "react-bootstrap"
import Header from "../../components/Header/header"
import Sidebar from "../../components/Sidebar/sidebar"

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
                {telaAtiva === 'dashboard' &&}
            </main>
            </Col>
        </Row>
        </Container>
        </>
    )
}


export default Home