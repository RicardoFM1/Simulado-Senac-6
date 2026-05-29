import { useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import Api from "../../../Services/api";
import { toast } from "react-toastify";
import style from "./checkinsModal.module.css"

const CheckinModal = ({ convidados, show, handleClose, submit }) => {
    const [convidadoId, setConvidadoId] = useState("");


    useEffect(() => {
        if (show) {
            setConvidadoId("");
        }
    }, [show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!convidadoId) {
            toast.error("Selecione um convidado");
            return;
        }
        submit({ convidado_idconvidado: convidadoId });
    };

    return (
        <Modal className={style.modal} show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Realizar Check-in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Convidado</Form.Label>
                        <Form.Select
                            value={convidadoId}
                            onChange={(e) => setConvidadoId(e.target.value)}
                            required
                        >
                            <option value="">Selecione o convidado...</option>
                            {convidados.map(c => (
                                <option key={c.id_convidado} value={c.id_convidado}>
                                    {c.nome} {c.sobrenome} - {c.cpf}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="ignorar-classe" variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button className="ignorar-classe" type="submit" variant="success">Confirmar Check-in</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default CheckinModal;