import React from "react";
import { useAuth } from "./context/AuthProvider.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";

import "./styles/global.css";

import Inicio from "./paginas/Inicio/Inicio.jsx";
import DFormativo from "./paginas/DFormativo/DFormativo.jsx";
import DSostenible from "./paginas/DSostenible/DSostenible.jsx";
import ExtensionU from "./paginas/ExtensionU/ExtensionU.jsx";
import SEgresado from "./paginas/SEgresado/SEgresado.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

import Analytics from "./pages/Analytics.jsx";
import Modules from "./pages/Modules.jsx";
import ListModule from "./pages/ListModule.jsx";
import UserForm from "./components/administrator/UserForm.jsx";
import TypeUserTab from "./components/administrator/TypeUserTab.jsx";
import StudentForm from "./components/administrator/StudentForm.jsx";
import TeacherForm from "./components/administrator/TeacherForm.jsx";

import { RegisterProvider } from "./context/Register_context.jsx";
import UserSettings from "./pages/UserSettings.jsx";
import ChangePassword from "./pages/changeContraseña.jsx";
import CV from "./pages/CV.jsx";

import Inscripciones from "./pages/Inscripciones.jsx";
import ListInscripciones from "./pages/ListInscripciones.jsx";
import Tabla from "./pages/Tabla.jsx";
import DetailsModules from "./pages/DetailsModules.jsx";
import EgresadoForm from "./components/administrator/EgresadoForm.jsx";

import ProtectedRoutes from "./context/ProtectedRoutes.jsx";
import NotAuthorized from "./pages/NotAuthorized.jsx";
import VoluntariadoPage from "./coordinadores/Voluntariados/voluntariado.jsx";
import Dashboard from "./paginas/Home/Homes.jsx";
import AdministrarDFormativo from "./pages/AdminDF.jsx";
import AdministrarDSostenible from "./pages/AdminDSostenible.jsx";
import AdministrarEUniversitaria from "./pages/AdminEUniv.jsx";
import AdministrarSEgresado from "./pages/AdminSEgresado.jsx";
import TallerPage from "./coordinadores/talleres/VerTalleres.jsx";
import OfertaLaboralPage from "./coordinadores/bolsaLaboral/VerEmpleos.jsx";
import CapacitacionPage from "./coordinadores/capacitaciones/VerCapacitaciones.jsx";
import EventoPage from "./coordinadores/eventos/VerEventos.jsx";
import VerCalendarioAmbiental from "./coordinadores/calendarioAmbiental/VerEventosCalendario.jsx";

import VerInscritosCapacitaciones from "./coordinadores/capacitaciones/verInscritos.jsx";
import VerInscritosTalleres from "./coordinadores/talleres/verInscritos.jsx";
import VerInscritosVoluntariados from "./coordinadores/Voluntariados/verInscritos.jsx";

// Nuevas rutas de Empleador y Egresado
import DashboardEmpleador from "./empleador/DashboardEmpleador.jsx";
import AdministrarEmpleador from "./empleador/AdminEmpleador.jsx";
import VerPostulantes from "./empleador/verPostulantes.jsx";
import AgregarOfertaLaboral from "./empleador/AgregarOfertaLaboral.jsx";

import CreateUserEmpleador from "./coordinadores/empleadores/agregarEmpleador.jsx";
import UserFormEmpleador from "./coordinadores/empleadores/userform.jsx";
import EmpleosConModal from "./egresado/verEmpleos.jsx";

import HomeCSE from "./paginas/SEgresado/HomeCSE.jsx";
import InicioAlumni from "./paginas/SEgresado/vistas/inicio.jsx";
import Presentation from "./paginas/SEgresado/vistas/presentacion.jsx";
import Procedimientos from "./paginas/SEgresado/vistas/procedimientos.jsx";
import Bolsa from "./paginas/SEgresado/vistas/bolsa.jsx";
import EducacionContinua from "./paginas/SEgresado/vistas/educacionContinua.jsx";
import ConveniosInterfaz from "./paginas/SEgresado/vistas/convenioss.jsx";
import EncuestasPublicadas from "./paginas/SEgresado/vistas/encuestasPublicadas.jsx";

// Rutas para las encuestas
import SurveyList from "./coordinadores/encuestas/listarEncuestas.jsx";
import PreguntasPorEncuesta from "./coordinadores/encuestas/listarPreguntas.jsx";

// Rutas Responder Encuestas
import EncuestaResponder from "./coordinadores/encuestas/visualizacion/responderEncuestas.jsx";
import EncuestasList from "./coordinadores/encuestas/visualizacion/encuestasDisponibles.jsx";
import ReportesEncuesta from "./coordinadores/encuestas/reporteEncuestas.jsx";

// Ruta para instructores
import PanelInstructores from "./instructores/AdmiInstructor.jsx";
// Rutas para el registro de asistencia de los talleres
import TalleresInstructores from "./instructores/talleresInstructores.jsx";
import VerSesiones from "./instructores/sesiones/VerSesiones.jsx";
import ReportesAsistenciaSesion from "./instructores/sesiones/reporteAsistenciaSesion.jsx";
import ReportePortaller from "./instructores/sesiones/ReportePorTaller.jsx";

import SegEg from "./paginas/SEgresado/vistas/actualizacionDatos.jsx";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        {/* Componente Inicio antes de login */}
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/Desarrollo-Formativo" element={<DFormativo />} />
        <Route path="/Desarrollo-Sostenible" element={<DSostenible />} />
        <Route path="/Extension-Universitaria" element={<ExtensionU />} />
        <Route path="/SeguimientoAlEgresado" element={<SEgresado />} />

        <Route path="register" element={<SignUp />}>
          <Route path="" element={<UserForm />} />
          <Route path="type" element={<TypeUserTab />}>
            <Route path="" element={<EgresadoForm />} />
            <Route path="estudiante" element={<StudentForm />} />
            <Route path="docente" element={<TeacherForm />} />
          </Route>
        </Route>

        <Route
          element={<ProtectedRoute validate={isAuthenticated} to="login" />}
        >
          <Route path="no-autorizado" element={<NotAuthorized />} />
          <Route path="/Alumni" element={<HomeCSE />}>
            <Route path="Inicio" element={<InicioAlumni />} />
            <Route path="presentacion" element={<Presentation />} />
            <Route path="procedimietos" element={<Procedimientos />} />
            <Route path="Bolsa-Laboral" element={<Bolsa />} />
            <Route path="Capacitaciones" element={<EducacionContinua />} />
            <Route path="convenios" element={<ConveniosInterfaz />} />
            <Route path="encuestas" element={<EncuestasPublicadas />} />
            <Route path="encuestas/:id" element={<EncuestaResponder />} />
            <Route path="userInfo" element={<UserSettings />} />
            <Route path="cambiar-password" element={<ChangePassword />} />
            <Route path="CV-digital" element={<CV />} />
            <Route path="Actualizacion_datos" element={<SegEg />} />
          </Route>
          <Route path="/Home" element={<Dashboard />}>
            <Route path="modules" element={<Modules />}>
              <Route path="list/:table" element={<ListModule />} />
              <Route path="form/:table/:id" element={<DetailsModules />} />
            </Route>
            {/* Rutas para los Coordinadores */}
            <Route
              path="coordinadores"
              element={
                <ProtectedRoutes allowedRoles={["admin", "coordinador"]}>
                  <Outlet />
                </ProtectedRoutes>
              }
            >
              <Route
                path="DesarrolloFormativo"
                element={<AdministrarDFormativo />}
              >
                <Route path="verTalleres" element={<TallerPage />} />
                <Route path="verInscritos" element={<VerInscritosTalleres />} />
                <Route path="verEventos" element={<EventoPage />} />
              </Route>
              <Route
                path="DesarrolloSostenible"
                element={<AdministrarDSostenible />}
              >
                <Route
                  path="ver-eventos-calendario"
                  element={<VerCalendarioAmbiental />}
                />
                <Route path="verEventos" element={<EventoPage />} />
              </Route>
              <Route
                path="ExtensionUniversitaria"
                element={<AdministrarEUniversitaria />}
              >
                <Route path="verVoluntariados" element={<VoluntariadoPage />} />
                <Route
                  path="verInscritos"
                  element={<VerInscritosVoluntariados />}
                />
                <Route path="verEventos" element={<EventoPage />} />
              </Route>
              <Route
                path="SeguimientoEgresado"
                element={<AdministrarSEgresado />}
              >
                <Route path="verOfertas" element={<OfertaLaboralPage />} />
                <Route
                  path="verCapacitaciones"
                  element={<CapacitacionPage />}
                />
                <Route
                  path="verInscritos"
                  element={<VerInscritosCapacitaciones />}
                />
                <Route path="userEmForm" element={<UserFormEmpleador />} />
                <Route
                  path="agregarEmpleador"
                  element={<CreateUserEmpleador />}
                />
                <Route path="verEventos" element={<EventoPage />} />
                {/* Rutas para Encuestas */}
                <Route path="ver-encuestas" element={<SurveyList />} />
                <Route
                  path="encuesta/:encuestaId"
                  element={<PreguntasPorEncuesta />}
                />
                <Route
                  path="reporte/:encuestaId"
                  element={<ReportesEncuesta />}
                />
              </Route>
            </Route>
            {/* Rutas del Empleador */}
            <Route path="empleador" element={<AdministrarEmpleador />}>
              <Route path="empleos" element={<DashboardEmpleador />} />
              <Route path="postulantes" element={<VerPostulantes />} />
            </Route>
            <Route path="inscripciones" element={<Inscripciones />}>
              <Route path=":table" element={<ListInscripciones />} />
              <Route path="tables/:table/:id" element={<Tabla />} />
            </Route>
            {/* Rutas del Instructor */}
            <Route path="instructor" element={<PanelInstructores />}>
              <Route path="talleres" element={<TalleresInstructores />} />
              <Route path="Ver-Sesiones/:tallerId" element={<VerSesiones />} />
              <Route
                path="reporte/:tallerId/sesion/:sesionId"
                element={<ReportesAsistenciaSesion />}
              />
              <Route
                path="Reporte/taller/:tallerId"
                element={<ReportePortaller />}
              />
            </Route>
            <Route
              path="analytics"
              element={
                <ProtectedRoutes allowedRoles={["admin"]}>
                  <Analytics />
                </ProtectedRoutes>
              }
            />
            <Route path="userInfo" element={<UserSettings />} />
            <Route path="cambiar-password" element={<ChangePassword />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
