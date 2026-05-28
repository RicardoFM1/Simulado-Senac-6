import { useEffect, useState } from "react";
import Api from "../../services/api";
import { Card } from "react-bootstrap";

const Dashboard = () => {
    const [dashboard, setDashboard] = useState([])

    const buscarDashboard = async() => {
        const res = await Api.get('/dashboard')

        if(res.status === 200){
            setDashboard(res.data.dados)
        }
    }

    useEffect(() => {
        buscarDashboard()
    }, [])
    return (
        <>
        <h1 className="fw-bold">Dashboard</h1>
        <Card>

        </Card>
        </>
    )

}

export default Dashboard;