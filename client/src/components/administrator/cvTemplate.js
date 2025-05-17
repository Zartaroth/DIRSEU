import jsPDF from 'jspdf';

const generatePDF = ({ egresadoData, experienciaLaboral, habilidades, otros, descripcion, logo }) => {
    const { firstName, lastName, email, codigo, carrera, promocion, telefono, direccion } = egresadoData;

    const doc = new jsPDF();

    // Configuración inicial
    const marginX = 20; // Margen izquierdo
    const pageHeight = doc.internal.pageSize.height; // Altura de la página
    const lineHeight = 7; // Altura de cada línea de texto
    let currentY = 20; // Coordenada Y inicial

    // Colores UAC
    const azulUAC = [28, 67, 120];
    const celesteUAC = [0, 0, 0, 0]; // Cambié este color para hacerlo más vibrante
    const gris = [169, 169, 169]; // Color gris para pie de página

    // Agregar encabezado con logo y título
    if (logo) {
        const logoWidth = 30; // Ancho del logo
        const logoHeight = 15; // Alto del logo
        const centerX = doc.internal.pageSize.width / 2; // Centro horizontal

        // Logo en la esquina superior izquierda
        doc.addImage(logo, 'PNG', marginX, currentY, logoWidth, logoHeight);

        // Título centrado
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        doc.setTextColor(...azulUAC);
        doc.text('Currículum Vitae', centerX, currentY + 20, { align: 'center' });
    }

    currentY += 40; // Espacio después del encabezado

    // Función para comprobar si hay espacio suficiente en la página
    const checkPageHeight = (requiredHeight) => {
        if (currentY + requiredHeight > pageHeight - 20) {
            doc.addPage();
            currentY = 20;
        }
    };

    // Función para dibujar secciones
    const drawSection = (title, content, bgColor = celesteUAC, textColor = [0, 0, 0]) => {
        // Título
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(...azulUAC);
        doc.text(title, marginX, currentY);
        currentY += lineHeight;

        const contentLines = doc.splitTextToSize(content, 170);
        const boxHeight = contentLines.length * lineHeight + 5;

        checkPageHeight(boxHeight + 10);

        // Fondo de la sección
        doc.setFillColor(...bgColor);
        doc.rect(marginX - 2, currentY - 5, 170 + 4, boxHeight, 'F'); // Borde alrededor de la caja

        // Contenido
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(...textColor);
        doc.text(contentLines, marginX + 5, currentY);

        currentY += boxHeight + 10;
    };

    // Información Personal
    drawSection(
        'Información Personal',
        `Nombre: ${firstName} ${lastName}\nEmail: ${email}\nTeléfono: ${telefono}\nDirección: ${direccion}`
    );

    // Datos Académicos
    drawSection(
        'Datos Académicos',
        `Código Alumno: ${codigo}\nCarrera: ${carrera}\nPromoción: ${promocion}`
    );

    // Experiencia Laboral
    drawSection('Experiencia Laboral', experienciaLaboral || 'No disponible');

    // Habilidades
    drawSection('Habilidades', habilidades || 'No disponible');

    // Otros
    drawSection('Otros', otros || 'No disponible');

    // Descripción Adicional
    drawSection('Descripción Adicional', descripcion || 'No disponible');

    // Pie de página
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(...gris);
    doc.text('Generado por el sistema de egresados de la UAC', marginX, pageHeight - 10);

    // Descargar el PDF
    doc.save('curriculum_vitae.pdf');
};

export default generatePDF;
