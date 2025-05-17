import React from 'react'
import { Book, Leaf, Users, UserCheck } from 'lucide-react'
import { motion, useAnimation, useInView } from 'framer-motion'

const coordinations = [
  {
    id: 'desarrollo-formativo',
    title: 'Coordinación de Desarrollo Formativo',
    description: 'Fomenta el crecimiento académico y personal de los estudiantes a través de programas de tutoría, talleres de habilidades y actividades extracurriculares.',
    icon: <Book className="w-12 h-12" />
  },
  {
    id: 'desarrollo-sostenible',
    title: 'Coordinación de Desarrollo Sostenible',
    description: 'Promueve prácticas sostenibles en la universidad y la comunidad, implementando proyectos de energía renovable, reciclaje y educación ambiental.',
    icon: <Leaf className="w-12 h-12" />
  },
  {
    id: 'extension-universitaria',
    title: 'Coordinación de Extensión Universitaria',
    description: 'Conecta la universidad con la sociedad a través de programas de servicio comunitario, cursos abiertos al público y eventos culturales.',
    icon: <Users className="w-12 h-12" />
  },
  {
    id: 'seguimiento-egresado',
    title: 'Coordinación del Seguimiento al Egresado',
    description: 'Mantiene vínculos con los graduados, ofreciendo oportunidades de desarrollo profesional, networking y recopilando datos sobre su trayectoria laboral.',
    icon: <UserCheck className="w-12 h-12" />
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
}

export default function Coordinaciones() {
  const controls = useAnimation()
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.5 })

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { 
        if (isInView) {
          controls.start("visible")
        } else {
          controls.start("hidden")
        }
      } else {
        controls.start("visible")
      }
    }

    handleResize() // Llamamos inicialmente para establecer el estado correcto
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [controls, isInView])

  return (
    <div className="bg-gray-100" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {coordinations.map((coord) => (
            <motion.div 
              key={coord.id} 
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-all hover:shadow-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="bg-blue-100 rounded-full p-4 mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {React.cloneElement(coord.icon, { className: "w-12 h-12 text-blue-600" })}
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{coord.title}</h3>
              <p className="text-gray-600">{coord.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
