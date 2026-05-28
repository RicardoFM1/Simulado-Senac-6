import { Button, Container, Navbar, Stack } from "react-bootstrap";
import style from "./header.module.css"
import { IoMdMenu } from "react-icons/io";
import { MdMenuOpen } from "react-icons/md";

const Header = ({setShow, show}) => {
    return (
        <>
        

        <Navbar className={style.navbar}>
            <Stack direction="horizontal" gap={4} className="mx-2">
            <Button onClick={() => setShow(!show)}>{show ? <MdMenuOpen size={25}/> : <IoMdMenu size={25}/> }</Button>
            <Navbar.Brand className="fw-bold fs-3 ">Senac Wedding</Navbar.Brand>
            </Stack>
        </Navbar>
     
        </>
    )
}

export default Header;