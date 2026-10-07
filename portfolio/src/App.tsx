import { Canvas, useFrame } from '@react-three/fiber'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ArrowUpRight, Menu, Send, X } from 'lucide-react'
import type { Group } from 'three'
import './App.css'

const contactSchema = z.object({
  name: z.string().min(2, 'NAME REQUIRES TWO CHARACTERS'),
  email: z.string().email('EMAIL FORMAT NOT RECOGNIZED'),
  message: z.string().min(12, 'MESSAGE REQUIRES MORE DETAIL'),
})
type ContactValues = z.infer<typeof contactSchema>

function Compass() {
  const compass = useRef<Group>(null)
  useFrame((_, delta) => { if (compass.current) compass.current.rotation.y += delta * 0.16 })
  return <group ref={compass} rotation={[0.25, 0, -0.2]}>
    <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[2.1, 2.1, 0.18, 12]} /><meshStandardMaterial color="#6c4524" metalness={0.75} roughness={0.3} /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.12, 0]}><cylinderGeometry args={[1.76, 1.76, 0.08, 12]} /><meshStandardMaterial color="#c08a3e" metalness={0.7} roughness={0.26} /></mesh>
    <mesh position={[0, 0.22, 0]} rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[0.12, 3, 0.08]} /><meshStandardMaterial color="#8b1a1a" roughness={0.45} /></mesh>
    <mesh position={[0, 0.23, 0]} rotation={[0, 0, -Math.PI / 4]}><boxGeometry args={[0.12, 3, 0.08]} /><meshStandardMaterial color="#f4eedc" roughness={0.65} /></mesh>
    <mesh position={[0, 0.34, 0]}><coneGeometry args={[0.16, 0.34, 6]} /><meshStandardMaterial color="#3d2b1f" metalness={0.8} roughness={0.25} /></mesh>
  </group>
}

function Hero() {
  return <section className="hero" id="home">
    <div className="hero-canvas"><Canvas camera={{ position: [0, 0, 6.3], fov: 38 }} dpr={[1, 2]}><ambientLight intensity={1.7} /><directionalLight position={[3, 4, 5]} intensity={3} color="#f4d49b" /><Compass /></Canvas></div>
    <div className="hero-copy"><p className="stamp">FIELD NOTE 001 / SOFTWARE FRONTIER</p><h1>Niswarth <span>M.</span></h1><p className="hero-tagline">Architecting Generative AI &amp; Software Systems for the Modern Frontier.</p><p className="hero-body">A computer science builder translating ambitious ideas into useful, durable systems.</p><a className="button button-dark" href="#projects">Open the field notes <ArrowUpRight size={16} /></a></div>
    <p className="hero-coordinate">12°58' N / 77°35' E<br />BENGALURU, INDIA</p>
  </section>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) })
  const submitContact = (_values: ContactValues) => { setSent(true); reset() }

  return <div className="site-shell">
    <header className="navbar"><a className="brand" href="#home">NM<span>/</span>89</a><nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">{['Projects', 'Ledger', 'Contact'].map((item, index) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{item}</a>)}</nav><a className="nav-cta" href="#contact">Send a telegram <ArrowUpRight size={16} /></a><button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></header>
    <main>
      <Hero />
      <section className="connect section"><div><p className="section-label">01 / Signal routes</p><h2>Find me in the <span>field.</span></h2></div><div className="social-grid"><a href="https://github.com/" target="_blank" rel="noreferrer"><b>GH</b> GitHub <ArrowUpRight size={15} /></a><a href="https://linkedin.com/" target="_blank" rel="noreferrer"><b>in</b> LinkedIn <ArrowUpRight size={15} /></a><a href="https://x.com/" target="_blank" rel="noreferrer"><b>𝕏</b> X / Twitter <ArrowUpRight size={15} /></a></div></section>
      <section className="projects section" id="projects"><div className="section-heading"><p className="section-label">02 / Featured engineering</p><h2>Systems built for <span>rough country.</span></h2></div><div className="project-grid"><article className="project-card featured"><p className="project-index">CASE 01 / AI SYSTEMS</p><h3>LLM-RAG-PROJECT-2</h3><p>Retrieval-augmented generation architecture for grounded answers, document ingestion, and traceable context.</p><div className="project-tags"><span>Python</span><span>LangChain</span><span>Vector Search</span></div><code>QUERY -&gt; RETRIEVE -&gt; AUGMENT -&gt; GENERATE</code></article><article className="project-card"><p className="project-index">CASE 02 / COMMUNITY BUILD</p><h3>Build with AI Bootcamp</h3><p>Hands-on implementations turning generative AI concepts into practical tools for builders.</p><div className="project-tags"><span>Generative AI</span><span>React</span><span>APIs</span></div><code>IDEA + MODEL + SHIP</code></article></div></section>
      <section className="ledger section" id="ledger"><div className="section-heading"><p className="section-label">03 / The ledger</p><h2>Progress, recorded in <span>ink.</span></h2></div><div className="ledger-list"><article><span>2025 — PRESENT</span><div><h3>B.Tech Computer Science</h3><p>REVA University. Building fundamentals across software engineering, systems, and applied AI.</p></div></article><article><span>2025 — PRESENT</span><div><h3>GDG on Campus</h3><p>Technical community involvement, peer learning, and shipping experiments in public.</p></div></article></div></section>
      <section className="contact section" id="contact"><div className="contact-copy"><p className="section-label">04 / Telegraph office</p><h2>Send a <span>message.</span></h2><p>For collaborations, curious questions, or a good problem worth taking apart.</p></div><form className="contact-form" onSubmit={handleSubmit(submitContact)} noValidate><label>NAME<input {...register('name')} placeholder="YOUR NAME" />{errors.name && <small>{errors.name.message}</small>}</label><label>EMAIL<input {...register('email')} placeholder="YOU@EXAMPLE.COM" />{errors.email && <small>{errors.email.message}</small>}</label><label>MESSAGE<textarea {...register('message')} placeholder="YOUR TRANSMISSION..." rows={5} />{errors.message && <small>{errors.message.message}</small>}</label><button className="button button-dark" type="submit"><Send size={15} /> {sent ? 'TRANSMISSION LOGGED' : 'SEND TRANSMISSION'}</button></form></section>
    </main>
    <footer className="footer"><a className="brand" href="#home">NM<span>/</span>89</a><p>LEARNING IN PUBLIC / BUILDING WITH PURPOSE</p><span>© 2025 NISWARTH M.</span></footer>
  </div>
}

export default App
