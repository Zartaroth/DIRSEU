import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { LuBook, LuEye } from 'react-icons/lu'

const Card = ({ title, content, Icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
      <div className="flex items-center justify-center mb-4">
        <Icon className="text-blue-600 w-12 h-12" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 flex-grow overflow-y-auto">{content}</p>
    </div>
  )
}

const MissionVisionCards = ({ mission, vision }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9, 
      rotate: -5 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      rotate: 0, 
      transition: { 
        duration: 0.8, 
        type: "spring", 
        stiffness: 100,
        damping: 10 
      } 
    }
  }

  return (
    <div ref={ref} className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={cardVariants}
        >
          <Card
            title="Misión"
            content={mission}
            Icon={LuBook}
          />
        </motion.div>
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={cardVariants}
          transition={{ delay: 0.2 }}
        >
          <Card
            title="Visión"
            content={vision}
            Icon={LuEye}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default MissionVisionCards
