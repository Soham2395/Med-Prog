"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import { Brain, Heart, Dna, Microscope, ChevronRight, Zap, Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { TypeAnimation } from 'react-type-animation'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import heroimg from "../../public/images/1.png"

function AnimatedSphere() {
  const meshRef = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.cos(t / 4) / 2
    meshRef.current.rotation.y = Math.sin(t / 4) / 2
    meshRef.current.rotation.z = Math.sin(t / 1.5) / 2
    meshRef.current.position.x = Math.sin(t / 4) / 2
    meshRef.current.position.y = Math.cos(t / 4) / 2
    meshRef.current.position.z = Math.cos(t / 4) / 2
  })
  return (
    <Sphere visible args={[1, 100, 200]} ref={meshRef} >
      <MeshDistortMaterial
        color="#1E88E5"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0}
        transparent={true} 
        opacity={0.2}
      />
    </Sphere>
  )
}

export default function Component() {
  const [isSticky, setIsSticky] = useState(false)
  const [activeFeature, setActiveFeature] = useState(null)
  const { scrollY } = useScroll()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    return scrollY.onChange(() => setIsSticky(scrollY.get() > 100))
  }, [scrollY])

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const testimonials = [
    { name: "Dr. Emily Chen", role: "Cardiologist", text: "AI-Med has revolutionized how I diagnose and treat heart conditions. The accuracy is remarkable." },
    { name: "James Wilson", role: "Patient", text: "Thanks to AI-Med, I received a quick and accurate diagnosis that saved my life." },
    { name: "Dr. Michael Lee", role: "Oncologist", text: "The AI-powered genetic analysis has been a game-changer in personalizing cancer treatments." }
  ]

  const features = [
    { icon: Brain, title: "AI Diagnosis", color: "bg-blue-100 text-blue-600", description: "Our AI algorithms can diagnose conditions with unprecedented accuracy, helping doctors make informed decisions quickly." },
    { icon: Heart, title: "Personalized Care", color: "bg-green-100 text-green-600", description: "We tailor treatment plans to individual patients, considering their unique genetic makeup and medical history." },
    { icon: Dna, title: "Genetic Analysis", color: "bg-yellow-100 text-yellow-600", description: "Our advanced genetic analysis helps identify potential health risks and optimize preventive care strategies." },
    { icon: Microscope, title: "Advanced Research", color: "bg-purple-100 text-purple-600", description: "We're constantly pushing the boundaries of medical research, using AI to uncover new insights and treatment possibilities." }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 relative">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedSphere />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>

      </div>
      <div className="relative z-10">
        <motion.header 
          className={`py-4 fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md shadow-md z-50`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="container mx-auto px-4 flex justify-between items-center">
            <motion.div 
              className="text-2xl font-bold text-blue-600 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5,  }}
            >
              <Zap className="w-8 h-8 mr-2" />
              Med-Prognosis
            </motion.div>
            <motion.ul 
              className="flex space-x-6"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              {["Home", "About", "Services", "Testimonials", "Contact"].map((item) => (
                <motion.li key={item} variants={fadeIn}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-blue-600 transition-colors">{item}</a>
                </motion.li>
              ))}
            </motion.ul>
          </nav>
        </motion.header>

        <main className="container mx-auto px-4 pt-20">
          <section id="home" className="py-20 flex flex-col md:flex-row items-center justify-between">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold mb-6 text-gray-800">
                AI-Powered <span className="text-blue-600">Healthcare</span> Revolution
              </h1>
              <div className="text-xl mb-10 text-gray-600 h-20">
                <TypeAnimation
                  sequence={[
                    'Transforming patient care with cutting-edge artificial intelligence',
                    1000,
                    'Enhancing diagnosis with AI-powered insights',
                    1000,
                    'Personalizing treatments through machine learning',
                    1000,
                    'Advancing medical research with data-driven analysis',
                    1000,
                  ]}
                  wrapper="p"
                  speed={50}
                  repeat={Infinity}
                />
              </div>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
                onClick={() => setShowModal(true)}
              >
                Discover Med-Prognosis
              </Button>
            </motion.div>
            <motion.div 
              className="md:w-1/2 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full h-96">
                <Image 
                  src= {heroimg}
                  alt="AI in Healthcare" 
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </motion.div>
          </section>

          <motion.section 
            id="services"
            className="py-20"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-3xl font-bold mb-10 text-center">Our AI-Powered Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className={`p-6 rounded-lg text-center ${feature.color} shadow-lg hover:shadow-xl transition-all cursor-pointer`}
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFeature(feature)}
                >
                  <feature.icon className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">Click to learn more</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <section id="about" className="py-20 bg-blue-600 text-white rounded-lg overflow-hidden relative">
            <motion.div 
              className="absolute inset-0 opacity-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{ duration: 1 }}
            >
            </motion.div>
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold mb-6">Experience the Future of Healthcare</h2>
              <p className="text-xl mb-10 max-w-2xl mx-auto">
                Join us in revolutionizing patient care with AI-driven solutions that enhance diagnosis, treatment, and overall healthcare delivery.
              </p>
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full text-lg font-semibold transition-colors">
                Get Started Now <ChevronRight className="ml-2 inline" />
              </Button>
            </div>
          </section>

          <section id="testimonials" className="py-20">
            <h2 className="text-3xl font-bold mb-10 text-center">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-4">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgzs6emdJNNWXDCt1OPZR8SZKn-o_vgnvlCQ&s"
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                    <div>
                      <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{testimonial.text}</p>
                  <div className="mt-4 flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="contact" className="py-20">
            <h2 className="text-3xl font-bold mb-10 text-center">Get in Touch</h2>
            <motion.form 
              className="max-w-lg mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                <textarea id="message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                Send Message
              </Button>
            </motion.form>
          </section>
        </main>

        <footer className="bg-gray-100 py-8 mt-20">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>&copy; 2024 Med-Prognosis. Revolutionizing healthcare with AI.</p>
          </div>
        </footer>

        <AnimatePresence>
          {activeFeature && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setActiveFeature(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`bg-white p-8 rounded-lg shadow-xl max-w-md ${activeFeature.color}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">{activeFeature.title}</h3>
                  <Button variant="ghost" size="icon" onClick={() => setActiveFeature(null)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <p>{activeFeature.description}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white p-8 rounded-lg shadow-xl max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">Welcome to AI-Med</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowModal(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <p className="mb-4">Experience the future of healthcare with AI-Med. Our cutting-edge AI technology is revolutionizing patient care, diagnosis, and treatment.</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors" onClick={() => setShowModal(false)}>
                  Start Your Journey
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}