import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import path from 'path';

import configs from './config/config.js';
import indexRoutes from './routes/index.routes.js';
import sgnin from './routes/login.routes.js';
import signup from './routes/signup.routes.js';
import signout from './routes/signout.routes.js';
import user from './routes/user.routes.js';
import todos from './routes/todos.routes.js';
import refreshToken from './routes/refreshToken.routes.js';
import { authenticate } from './utils/authenticate.js';

import calendarioRoutes from './routes/calendario.route.js';
import voluntariadosRoutes from './routes/voluntariados.routes.js';
import capacitacionesRoutes from './routes/capacitaciones.routes.js';
import eventosRoutes from './routes/eventos.routes.js';
import ofertasLaboralesRoutes from './routes/ofertasLaborales.routes.js';
import talleresRoutes from './routes/talleres.routes.js';
import ofertasRoutes from './routes/ofertasRoutes.js';
import Tables from './routes/Tables.routes.js';

// rutas para encuestas
import encuestasRoutes from './routes/encuestas.routes.js';
import preguntasRoutes from './routes/preguntas.routes.js';
import opcionesRoutes from './routes/opciones.routes.js';
import publicacionesRoutes from './routes/publicaciones.routes.js';
import respuestasRoutes from './routes/respuestas.routes.js';
import respuestaDetalleRoutes from './routes/respuestaDetalle.routes.js';

// Rutas para asistencias talleres
import asistenciaRoutes from './routes/asistencia.routes.js';
import sesionesRoutes from './routes/sesionTaller.routes.js';

// Rutas para el cv digital
import experienciasLaboralesRoutes from './routes/experienciasLaborales.routes.js';
import formacionAcademicaRoutes from './routes/formacionAcademica.routes.js';
import habilidadesRoutes from './routes/habilidades.routes.js';
import idiomasRoutes from './routes/idiomas.routes.js';
import logrosRoutes from './routes/logros.routes.js';
import postulacionesRoutes from './routes/postulaciones.routes.js';

import bachilleratoRoutes from './routes/bachillerato.routes.js';
import tituloProfesionalRoutes from './routes/tituloProfesional.routes.js';
import trabajoActualRoutes from './routes/trabajoActual.routes.js';

const app = express();

app.use(cors());

app.use(express.json());

// Servir archivos estáticos (como imágenes) desde la carpeta "uploads"
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Rutas
app.use('/api/login', sgnin);
app.use('/api/signup', signup);
app.use('/api/signout', signout);
app.use('/api/user', authenticate, user);
app.use('/api/todos', authenticate, todos);
app.use('/api/refresh-token', refreshToken);

app.use('/api/capacitaciones', capacitacionesRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/empleos', ofertasLaboralesRoutes);
app.use('/api/talleres', talleresRoutes);
app.use('/api/voluntariados', voluntariadosRoutes);
app.use('/api/calendario', calendarioRoutes);

// Rutas Nuevas
app.use('/api/ofertas', ofertasRoutes);

// Rutas Encuestas
app.use('/api/encuestas', encuestasRoutes);
app.use('/api/preguntas', preguntasRoutes);
app.use('/api/opciones_pregunta', opcionesRoutes);
app.use('/api/publicaciones', publicacionesRoutes);
app.use('/api/respuestas', respuestasRoutes);
app.use('/api/respuesta_Detalles', respuestaDetalleRoutes);

//Rutas Asistencias
app.use('/api/sesiones', sesionesRoutes);
app.use('/api/asistencias', asistenciaRoutes);

// Rutas para el cv digital
app.use('/api/experiencias', experienciasLaboralesRoutes);
app.use('/api/formaciones', formacionAcademicaRoutes);
app.use('/api/habilidades', habilidadesRoutes);
app.use('/api/idiomas', idiomasRoutes);
app.use('/api/logros', logrosRoutes);
app.use('/api/postulaciones', postulacionesRoutes);

app.use('/api/bachillerato', bachilleratoRoutes);
app.use('/api/titulos', tituloProfesionalRoutes);
app.use('/api/trabajos', trabajoActualRoutes);

// TABLES END POINTS
app.use('/api/table', Tables);


app.listen(configs.PORT);
console.log(`Server is running on port ${configs.PORT}.`); 

// Servir frontend en producción
app.use('/dirseu/app', express.static(path.join(process.cwd(), 'client/dist')));
