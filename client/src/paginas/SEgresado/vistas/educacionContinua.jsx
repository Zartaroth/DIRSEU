import React, { useEffect, useState } from "react";
import { getTableByIdRequest, registerInscriptionEgresados } from "../../../api/api";
import { Phone, MapPin, Calendar, Users, ArrowUp, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useAuth } from "../../../context/AuthProvider";
import Navbar from "../componentes/nav";

const CapacitacionCard = ({ id, nombre, descripcion, lugar, fecha_inicio, fecha_fin, cupo_maximo }) => {
    const [errorResponse, setErrorResponse] = useState("");
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [alreadySubscribedDialogOpen, setAlreadySubscribedDialogOpen] = useState(false);
    const auth = useAuth();

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    };

    const handleSubscribe = async () => {
        try {
            if (auth.getUser().type !== "egresado") {
                setErrorResponse("Solo Egresados pueden inscribirse");
                return;
            }
    
            const response = await registerInscriptionEgresados({
                table: "capacitaciones",
                entidad_id: id,
                egresado_id: auth.getUser().id,
            });
            const json = await response.json();
    
            if (response.ok) {
                setErrorResponse("");
                setSuccessDialogOpen(true);
            } else if (json.error === "Ya se realizo una Inscripcion Previa") {
                // Caso: Ya inscrito
                setAlreadySubscribedDialogOpen(true);
            } else {
                // Otros errores
                setErrorResponse(json.error);
            }
        } catch (error) {
            console.error(error);
            setErrorResponse("Error al inscribirse.");
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4 border-2 border-blue-500 transition-transform transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-black">{nombre}</h2>
            <p className="text-gray-700 mt-2 mb-4">{descripcion}</p>

            <div className="text-gray-600 text-sm space-y-2">
                <p>
                    <MapPin className="inline mr-2" /> <span className="font-medium">Lugar:</span> {lugar}
                </p>
                <p>
                    <Calendar className="inline mr-2" /> <span className="font-medium">Inicio:</span> {formatDate(fecha_inicio)}
                </p>
                <p>
                    <Calendar className="inline mr-2" /> <span className="font-medium">Fin:</span> {formatDate(fecha_fin)}
                </p>
                <p>
                    <Users className="inline mr-2" /> <span className="font-medium">Cupos:</span> {cupo_maximo}
                </p>
            </div>

            <button
                onClick={handleSubscribe}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
                Inscribirse
            </button>

            {errorResponse && <div className="mt-2 text-red-500">{errorResponse}</div>}

            {/* Diálogo de Éxito */}
            <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
                <DialogTitle>
                    <CheckCircleIcon style={{ color: "green", marginRight: "10px" }} />
                    ¡Inscripción Exitosa!
                </DialogTitle>
                <DialogContent>
                    <p>Te has inscrito exitosamente a la capacitación.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSuccessDialogOpen(false)} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Diálogo de Ya Inscrito */}
            <Dialog open={alreadySubscribedDialogOpen} onClose={() => setAlreadySubscribedDialogOpen(false)}>
                <DialogTitle>
                    <ErrorIcon style={{ color: "orange", marginRight: "10px" }} />
                    Ya Inscrito
                </DialogTitle>
                <DialogContent>
                    <p>Ya estás inscrito en esta capacitación.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAlreadySubscribedDialogOpen(false)} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default function EducacionContinua() {
    const [capacitaciones, setCapacitaciones] = useState([]);

    const location = useLocation();

    const pathSegments = location.pathname.split("/").filter((segment) => segment);

    const links = pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
        return (
            <Link key={segment} to={path} className="text-white hover:underline">
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </Link>
        );
    });

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/capacitaciones`)
            .then((response) => response.json())
            .then((data) => setCapacitaciones(data))
            .catch((error) => console.error("Error al cargar capacitaciones:", error));
    }, []);

    const image2 = "https://assets.entrepreneur.com/content/3x2/2000/20191031073847-shutterstock-56437339.jpeg";

    return (
        <>
            <Navbar />
            <header className="mt-16">
                <div className="relative bg-cover bg-center h-72" style={{ backgroundImage: `url(${image2})` }}>
                    <div className="absolute inset-0 bg-blue-900 bg-opacity-80 backdrop-blur-md"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
                        <h1 className="text-5xl font-bold">Recursos Académicos</h1>
                        <p className="mt-2 text-lg">
                            <Link to="/Alumni/Inicio" className="hover:underline">
                                Alumni
                            </Link>{" "}
                            / {links.reduce((prev, curr) => [curr])}
                        </p>
                    </div>
                </div>
            </header>

            <main>
                <div className="max-w-6xl mx-auto p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Capacitaciones</h1>
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {capacitaciones.map((capacitacion) => (
                            <CapacitacionCard key={capacitacion.id} {...capacitacion} />
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
