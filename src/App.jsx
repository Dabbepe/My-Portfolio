import React, { useEffect, useRef, useState } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { SpotlightNavbar } from "@/components/ui/spotlight-navbar";
import './index.css';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('none');
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [quoteOpacity, setQuoteOpacity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 1500); // 1.5s cool artificial delay
    };
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const quotes = [
    { text: "Security is a process, not a product.", author: "Bruce Schneier" },
    { text: "There are only two types of companies: those that have been hacked, and those that will be.", author: "Robert Mueller" },
    { text: "Amateurs hack systems, professionals hack people.", author: "Bruce Schneier" },
    { text: "It takes 20 years to build a reputation and few minutes of cyber-incident to ruin it.", author: "Stephane Nappo" },
    { text: "If you think technology can solve your security problems, then you don't understand the problems and you don't understand the technology.", author: "Bruce Schneier" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteOpacity(0);
      setTimeout(() => {
        setQuoteIdx((prev) => (prev + 1) % quotes.length);
        setQuoteOpacity(1);
      }, 1000);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    experience: useRef(null),
    credentials: useRef(null),
    contact: useRef(null),
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openModal = (imgSrc) => {
    setModalImage(imgSrc);
    setModalDisplay('flex');
    setTimeout(() => {
      setIsModalOpen(true);
    }, 10);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setModalDisplay('none');
      setModalImage('');
    }, 300);
  };

  return (
    <>
      {/* LOADER */}
      <div className={`loader-wrapper ${!isLoading ? 'hidden' : ''}`}>
        <div className="cyber-loader"></div>
        <div className="loader-text">Initializing Systems...</div>
      </div>

      <ShaderGradientCanvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
        <ShaderGradient
          animate="on"
          axesHelper="off"
          brightness={1.2}
          cAzimuthAngle={170}
          cDistance={4.4}
          cPolarAngle={70}
          cameraZoom={1}
          color1="#94ffd1"
          color2="#6bf5ff"
          color3="#ffffff"
          destination="onCanvas"
          embedMode="off"
          envPreset="city"
          format="gif"
          fov={45}
          frameRate={10}
          gizmoHelper="hide"
          grain="off"
          lightType="3d"
          pixelDensity={1}
          positionX={0}
          positionY={0.9}
          positionZ={-0.3}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={45}
          rotationY={0}
          rotationZ={0}
          shader="defaults"
          type="waterPlane"
          uAmplitude={0}
          uDensity={1.2}
          uFrequency={0}
          uSpeed={0.4}
          uStrength={3.4}
          uTime={0}
          wireframe={false}
        />
      </ShaderGradientCanvas>
      <div className="bg-overlay"></div>

      <div className="page">
        {/* NAV */}
        <SpotlightNavbar
          items={[
            { label: "About", href: "#about" },
            { label: "Skills", href: "#skills" },
            { label: "Projects", href: "#projects" },
            { label: "Experience", href: "#experience" },
            { label: "Credentials", href: "#credentials" },
            { label: "Contact", href: "#contact" }
          ]}
          onMobileMenuClick={toggleMobileMenu}
        />

        <div className={`mobile-nav-menu ${isMobileMenuOpen ? 'active' : ''}`} id="mobile-nav">
          <a href="#about" onClick={toggleMobileMenu}>About</a>
          <a href="#skills" onClick={toggleMobileMenu}>Skills</a>
          <a href="#projects" onClick={toggleMobileMenu}>Projects</a>
          <a href="#experience" onClick={toggleMobileMenu}>Experience</a>
          <a href="#credentials" onClick={toggleMobileMenu}>Credentials</a>
          <a href="#contact" onClick={toggleMobileMenu}>Contact</a>
        </div>

        {/* HERO */}
        <div className="hero" id="home" ref={sectionRefs.home}>
          <h1 className="hero-name">Shon Patel</h1>
          <p className="hero-title">B.Sc. IT · <strong>SOC Analyst</strong> · Blue Team</p>
          <p className="hero-desc">
            Aspiring SOC Analyst building the tools and skills to defend the digital frontier.
            Based in Mumbai — turning logs into intelligence, one alert at a time.
          </p>
          <div className="hero-ctas">
            <a className="btn-ghost" href="resume.pdf" target="_blank" rel="noreferrer">Resume/CV</a>
            <a className="btn-ghost" href="#contact">Get In Touch</a>
          </div>
          <div className="hero-quote-container" id="hero-quote" style={{ opacity: quoteOpacity }}>
            <div className="hero-quote-text" id="quote-text">"{quotes[quoteIdx].text}"</div>
            <div className="hero-quote-author" id="quote-author">— {quotes[quoteIdx].author}</div>
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" ref={sectionRefs.about}>
          <h2 className="section-title">Defending the <span className="hl">Blue Line</span></h2>
          <div className="about-grid">
            <div className="about-left">
              <p className="about-text">
                I'm a final-year B.Sc. IT student at Mumbai with a specialisation in Blue Team cybersecurity.
                My focus is on detection engineering, log analysis, and building tools that make SOC analysts faster and sharper.
              </p>
              <p className="about-text">
                I believe in honest, practical security — not checkbox compliance. Whether it's triaging SIEM alerts or
                building AI-powered dashboards, I want to work at the intersection of technology and defence.
              </p>
            </div>
            <div className="about-right">
              <a href="https://www.google.com/maps/place/Mumbai,+Maharashtra" target="_blank" rel="noreferrer" className="glass info-card" style={{ textDecoration: 'none' }}>
                <div className="info-icon">📍</div>
                <div>
                  <div className="info-label">Location</div>
                  <div className="info-val">Mumbai, Maharashtra</div>
                </div>
              </a>
              <a href="https://patkarvardecollege.edu.in/department/undergraduate/science/it" target="_blank" rel="noreferrer" className="glass info-card" style={{ textDecoration: 'none' }}>
                <div className="info-icon">🎓</div>
                <div>
                  <div className="info-label">Degree</div>
                  <div className="info-val">B.Sc. Information Technology</div>
                </div>
              </a>
              <a href="https://www.ibm.com/think/topics/blue-team" target="_blank" rel="noreferrer" className="glass info-card" style={{ textDecoration: 'none' }}>
                <div className="info-icon">🔵</div>
                <div>
                  <div className="info-label">Specialisation</div>
                  <div className="info-val">Blue Team · SOC Analyst</div>
                </div>
              </a>
              <a href="https://socai.vercel.app" target="_blank" rel="noreferrer" className="glass info-card" style={{ textDecoration: 'none' }}>
                <div className="info-icon">🌐</div>
                <div>
                  <div className="info-label">SOCAI Live At</div>
                  <div className="info-val">socai.vercel.app</div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" ref={sectionRefs.skills}>
          <h2 className="section-title">Technical <span className="hl">Arsenal</span></h2>
          <p className="section-sub">Tools and technologies I've actively worked with — built through hands-on labs, projects, and real-world experience.</p>
          <div className="skills-grid">
            <div className="glass skill-card">
              <div className="skill-icon">🛡️</div>
              <div className="skill-title">Info Systems Security</div>
              <div className="skill-tags">
                <span className="st-tag">Intrusion Detection</span>
                <span className="st-tag">Vulnerability Assessment</span>
                <span className="st-tag">Risk Audits</span>
                <span className="st-tag">Access Log Monitoring</span>
                <span className="st-tag">Virus Management</span>
                <span className="st-tag">Password Auditing</span>
                <span className="st-tag">System Hardening</span>
                <span className="st-tag">Network Security</span>
                <span className="st-tag">Database Security</span>
              </div>
            </div>
            <div className="glass skill-card">
              <div className="skill-icon">👁️</div>
              <div className="skill-title">Security Operations</div>
              <div className="skill-tags">
                <span className="st-tag">Wazuh</span>
                <span className="st-tag">Splunk</span>
                <span className="st-tag">Alert Triage</span>
                <span className="st-tag">Threat Hunting</span>
                <span className="st-tag">Incident Response</span>
                <span className="st-tag">Log Analysis</span>
                <span className="st-tag">IOC Analysis</span>
                <span className="st-tag">False Positive Analysis</span>
                <span className="st-tag">Correlation Rules</span>
                <span className="st-tag">Digital Forensics</span>
              </div>
            </div>
            <div className="glass skill-card">
              <div className="skill-icon">🕸️</div>
              <div className="skill-title">Vulnerability & Web</div>
              <div className="skill-tags">
                <span className="st-tag">Nmap</span>
                <span className="st-tag">OWASP ZAP</span>
                <span className="st-tag">Burp Suite</span>
                <span className="st-tag">Metasploit</span>
                <span className="st-tag">Web App Scanning</span>
                <span className="st-tag">Network Scanning</span>
                <span className="st-tag">OSINT</span>
                <span className="st-tag">Phishing Analysis</span>
                <span className="st-tag">Header Analysis</span>
              </div>
            </div>
            <div className="glass skill-card">
              <div className="skill-icon">📋</div>
              <div className="skill-title">Frameworks</div>
              <div className="skill-tags">
                <span className="st-tag">MITRE ATT&CK</span>
                <span className="st-tag">SOC Playbooks</span>
                <span className="st-tag">Incident Escalation</span>
                <span className="st-tag">Evidence Preservation</span>
                <span className="st-tag">Risk Assessment</span>
              </div>
            </div>
            <div className="glass skill-card">
              <div className="skill-icon">🔧</div>
              <div className="skill-title">Tools</div>
              <div className="skill-tags">
                <span className="st-tag">Sysmon</span>
                <span className="st-tag">Wireshark</span>
                <span className="st-tag">Scapy</span>
                <span className="st-tag">Tcpdump</span>
                <span className="st-tag">Volatility</span>
                <span className="st-tag">Kali Linux</span>
                <span className="st-tag">Autopsy</span>
              </div>
            </div>
            <div className="glass skill-card">
              <div className="skill-icon">🌐</div>
              <div className="skill-title">Networking</div>
              <div className="skill-tags">
                <span className="st-tag">TCP/IP</span>
                <span className="st-tag">HTTP/HTTPS</span>
                <span className="st-tag">DNS</span>
                <span className="st-tag">ICMP</span>
                <span className="st-tag">ARP</span>
                <span className="st-tag">Packet Analysis</span>
                <span className="st-tag">Traffic Capture</span>
                <span className="st-tag">Firewall Config</span>
              </div>
            </div>
            <div className="glass skill-card">
              <div className="skill-icon">💻</div>
              <div className="skill-title">Programming & Dev</div>
              <div className="skill-tags">
                <span className="st-tag">Python</span>
                <span className="st-tag">FastAPI</span>
                <span className="st-tag">REST APIs</span>
                <span className="st-tag">JWT</span>
                <span className="st-tag">WebSockets</span>
                <span className="st-tag">React.js</span>
                <span className="st-tag">Docker</span>
                <span className="st-tag">SQLite</span>
                <span className="st-tag">Linux Scripting</span>
                <span className="st-tag">Git</span>
              </div>
            </div>
            <div className="glass skill-card">
              <div className="skill-icon">🎮</div>
              <div className="skill-title">Platforms</div>
              <div className="skill-tags">
                <span className="st-tag">TryHackMe</span>
                <span className="st-tag">Hack The Box</span>
                <span className="st-tag">LetsDefend</span>
                <span className="st-tag">BTLO</span>
                <span className="st-tag">PicoCTF</span>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" ref={sectionRefs.projects}>
          <h2 className="section-title">What I've <span className="hl">Built</span></h2>
          <p className="section-sub">Real projects with real deployment — not just walkthroughs.</p>
          <div className="projects-grid">
            {/* FEATURED */}
            <div className="glass project-card featured">
              <div className="project-badge live">⬤ Live</div>
              <div className="featured-layout">
                <div>
                  <div className="project-title">SOCAI — AI-Powered SOC Assistant</div>
                  <p className="project-desc">
                    A fully serverless SOC analyst dashboard powered by Groq's Llama 3.3 70B. Analysts can
                    triage alerts, scan phishing emails, check IP/URL reputation, analyze logs, and generate
                    incident reports — all from one interface. Zero backend, 100% browser-side.
                  </p>
                  <div className="project-stack">
                    <span className="stack-chip">React</span>
                    <span className="stack-chip">Tailwind CSS</span>
                    <span className="stack-chip">Shadcn/UI</span>
                    <span className="stack-chip">Groq API</span>
                    <span className="stack-chip">Llama 3.3 70B</span>
                    <span className="stack-chip">AbuseIPDB</span>
                    <span className="stack-chip">VirusTotal</span>
                    <span className="stack-chip">Vercel</span>
                  </div>
                  <a className="project-link" href="https://socai.vercel.app" target="_blank" rel="noreferrer">socai.vercel.app →</a>
                </div>
                <div>
                  <div className="project-features">
                    <div className="feat-item"><span className="feat-dot"></span>Log Analyzer</div>
                    <div className="feat-item"><span className="feat-dot"></span>Phishing Scanner</div>
                    <div className="feat-item"><span className="feat-dot purple"></span>IP/URL Reputation</div>
                    <div className="feat-item"><span className="feat-dot purple"></span>Alert Triage</div>
                    <div className="feat-item"><span className="feat-dot"></span>Incident Reports</div>
                    <div className="feat-item"><span className="feat-dot purple"></span>Serverless Arch</div>
                  </div>
                </div>
              </div>
            </div>

            {/* SOC Home Lab */}
            <a href="https://www.linkedin.com/posts/shonpatel_cybersecurity-soc-blueteam-ugcPost-7467935124232421377-2WWz/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEKVAZQBXHfCBSwuARvjmsDwNZ-ADwR7xN4" target="_blank" rel="noreferrer" className="glass project-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', transition: 'transform 0.3s ease, border-color 0.3s ease' }}>
              <div className="project-badge">Lab Environment</div>
              <div className="project-title">SOC Home Lab</div>
              <p className="project-desc">
                Virtual Blue Team environment for practising detection and response.
                Splunk for log search, Sysmon for endpoint telemetry.
              </p>
              <div className="project-stack">
                <span className="stack-chip">Splunk</span>
                <span className="stack-chip">Sysmon</span>
                <span className="stack-chip">VirtualBox</span>
              </div>
            </a>

            {/* Awareness Outreach */}
            <a href="https://www.linkedin.com/posts/shonpatel_achievement-cybersecurity-internshipexperience-share-7287007169621729280-48hv/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEKVAZQBXHfCBSwuARvjmsDwNZ-ADwR7xN4" target="_blank" rel="noreferrer" className="glass project-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', transition: 'transform 0.3s ease, border-color 0.3s ease' }}>
              <div className="project-badge">Outreach</div>
              <div className="project-title">Cybersecurity Awareness</div>
              <p className="project-desc">
                Conducted community cybersecurity awareness sessions as part of the Quick Heal Foundation
                internship — covering phishing, social engineering, and safe digital habits.
              </p>
              <div className="project-stack">
                <span className="stack-chip">Quick Heal Foundation</span>
                <span className="stack-chip">Awareness</span>
                <span className="stack-chip">Outreach</span>
              </div>
            </a>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" ref={sectionRefs.experience}>
          <h2 className="section-title">Career <span className="hl">Timeline</span></h2>
          <p className="section-sub">Real-world exposure complemented by continuous self-directed learning.</p>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">2024<br/>Intern</div>
              <div className="timeline-line"><div className="tl-dot"></div><div className="tl-track"></div></div>
              <a href="https://www.quickhealfoundation.org/" target="_blank" rel="noreferrer" className="glass timeline-content" style={{ textDecoration: 'none', color: 'inherit', display: 'block', transition: 'transform 0.3s ease, border-color 0.3s ease' }}>
                <div className="tl-company">Quick Heal Foundation</div>
                <div className="tl-role">Cybersecurity Awareness Intern</div>
                <ul className="tl-points">
                  <li>Delivered cybersecurity awareness sessions to community groups across Mumbai.</li>
                  <li>Covered phishing detection, social engineering tactics, and safe online practices.</li>
                  <li>Contributed to outreach materials and reporting for the foundation's awareness programme.</li>
                </ul>
              </a>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2025–<br/>Present</div>
              <div className="timeline-line"><div className="tl-dot"></div><div className="tl-track"></div></div>
              <a href="https://www.linkedin.com/posts/shonpatel_cybersecurity-soc-blueteam-ugcPost-7467935124232421377-2WWz/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEKVAZQBXHfCBSwuARvjmsDwNZ-ADwR7xN4" target="_blank" rel="noreferrer" className="glass timeline-content" style={{ textDecoration: 'none', color: 'inherit', display: 'block', transition: 'transform 0.3s ease, border-color 0.3s ease' }}>
                <div className="tl-company">Self-directed</div>
                <div className="tl-role">SOC Home Lab</div>
                <ul className="tl-points">
                  <li>Built and maintained a personal SOC lab using Splunk and Sysmon.</li>
                  <li>Practicing labs in TryHackMe Defensive and LetsDefend.</li>
                </ul>
              </a>
            </div>
          </div>
        </section>

        {/* CERTS */}
        <section id="credentials" ref={sectionRefs.credentials}>
          <h2 className="section-title">Credentials & <span className="hl">Recognition</span></h2>
          <div className="certs-grid">
            <div onClick={() => openModal('ceh_certificate.jpg')} className="glass cert-card" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit', display: 'flex', transition: 'transform 0.3s ease, border-color 0.3s ease' }}>
              <div className="cert-header">
                <div className="cert-icon"><img src="cehbadge.png" alt="CEH Badge" style={{ width: '80px', height: '80px', objectFit: 'contain' }} /></div>
                <div>
                  <div className="cert-issuer">Cisco Networking Academy</div>
                  <div className="cert-name">Certified Ethical Hacker (CEH)</div>
                </div>
              </div>
              <div className="cert-desc">
                Demonstrated proficiency in ethical hacking methodologies, network defense, vulnerability assessment, and risk mitigation strategies. Validated hands-on abilities to assess the security posture of target systems and implement effective countermeasures.
              </div>
            </div>
            <div onClick={() => openModal('cs4all_certificate.jpg')} className="glass cert-card" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit', display: 'flex', transition: 'transform 0.3s ease, border-color 0.3s ease' }}>
              <div className="cert-header">
                <div className="cert-icon"><img src="cs4all.png" alt="CS4ALL Badge" style={{ width: '80px', height: '80px', objectFit: 'contain' }} /></div>
                <div>
                  <div className="cert-issuer">ERASMUS+ CS4ALL</div>
                  <div className="cert-name">Real Time Threat Detection & Mitigation</div>
                </div>
              </div>
              <div className="cert-desc">
                Participated in the international cybersecurity collaborative programme, focusing on practical threat analysis, cross-border teamwork, and responding to simulated cybersecurity incidents in real-time alongside European partners.
              </div>
            </div>
            <a href="https://www.linkedin.com/posts/shonpatel_achievement-cybersecurity-cybershiksha-ugcPost-7287010398321414144-A2Y7/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEKVAZQBXHfCBSwuARvjmsDwNZ-ADwR7xN4" target="_blank" rel="noreferrer" className="glass cert-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', transition: 'transform 0.3s ease, border-color 0.3s ease' }}>
              <div className="cert-header">
                <div className="cert-icon"><img src="quickheal.png" alt="Cyber Suraksha Badge" style={{ width: '80px', height: '80px', objectFit: 'contain' }} /></div>
                <div>
                  <div className="cert-issuer">Cyber Shiksha for Cyber Suraksha Awards 2025</div>
                  <div className="cert-name">Best Process Compliance Winner</div>
                </div>
              </div>
              <div className="cert-desc">
                Recognized at a national-level cybersecurity initiative for demonstrating exceptional process compliance and adherence to security best practices.
              </div>
            </a>
            <a href="https://www.linkedin.com/posts/shonpatel_achievement-cybersecurity-internshipexperience-share-7287007169621729280-48hv/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEKVAZQBXHfCBSwuARvjmsDwNZ-ADwR7xN4" target="_blank" rel="noreferrer" className="glass cert-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', transition: 'transform 0.3s ease, border-color 0.3s ease' }}>
              <div className="cert-header">
                <div className="cert-icon"><img src="quickhealappreciation.png" alt="Quick Heal Appreciation Badge" style={{ width: '80px', height: '80px', objectFit: 'contain' }} /></div>
                <div>
                  <div className="cert-issuer">Quick Heal Foundation</div>
                  <div className="cert-name">Appreciation Letter</div>
                </div>
              </div>
              <div className="cert-desc">
                Received formal appreciation for successfully delivering impactful cybersecurity outreach and awareness sessions to over 1,000+ students.
              </div>
            </a>
            <a href="https://www.linkedin.com/posts/shonpatel_gratitude-academicexcellence-consistency-share-7451509307470340096-oc47/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEKVAZQBXHfCBSwuARvjmsDwNZ-ADwR7xN4" target="_blank" rel="noreferrer" className="glass cert-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', transition: 'transform 0.3s ease, border-color 0.3s ease' }}>
              <div className="cert-header">
                <div className="cert-icon"><img src="patkarvarde.jpg" alt="Patkar Varde Badge" style={{ width: '80px', height: '80px', objectFit: 'contain' }} /></div>
                <div>
                  <div className="cert-issuer">Academic Excellence</div>
                  <div className="cert-name">Highest Scorer</div>
                </div>
              </div>
              <div className="cert-desc">
                Achieved the highest academic score across the entire batch in both First Year (FYBSc IT) and Second Year (SYBSc IT) programs.
              </div>
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" ref={sectionRefs.contact}>
          <h2 className="section-title">Let's <span className="hl">Connect</span></h2>
          <div className="contact-wrapper">
            <div className="contact-left">
              <p className="about-text">
                Open to SOC Analyst roles, cybersecurity internships, and collaborations in the Mumbai area.
                If you're looking for someone who ships real tools and values honest work — let's talk.
              </p>
              <div className="contact-links">
                <a href="mailto:shonpatel07@gmail.com" className="glass contact-link" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', transition: 'transform 0.3s ease, border-color 0.3s ease' }}>
                  <div className="cl-icon">@</div>
                  <div>
                    <div className="cl-label">Email</div>
                    <div className="cl-val">shonpatel07@gmail.com</div>
                  </div>
                </a>
                <a href="https://linkedin.com/in/shonpatel" target="_blank" rel="noreferrer" className="glass contact-link" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', transition: 'transform 0.3s ease, border-color 0.3s ease' }}>
                  <div className="cl-icon">in</div>
                  <div>
                    <div className="cl-label">LinkedIn</div>
                    <div className="cl-val">linkedin.com/in/shonpatel</div>
                  </div>
                </a>
                <a href="https://github.com/Dabbepe" target="_blank" rel="noreferrer" className="glass contact-link" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', transition: 'transform 0.3s ease, border-color 0.3s ease' }}>
                  <div className="cl-icon">&lt;/&gt;</div>
                  <div>
                    <div className="cl-label">GitHub</div>
                    <div className="cl-val">github.com/Dabbepe</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="contact-right">
              <div className="glass" style={{ padding: '36px' }}>
                <form action="https://formsubmit.co/shonpatel07@gmail.com" method="POST">
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="New Contact Form Submission - SOC Portfolio" />
                  
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input className="form-input" type="text" name="name" placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" name="email" placeholder="hello@company.com" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea className="form-input" name="message" placeholder="Tell me about the role..." required></textarea>
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', borderRadius: '10px', padding: '14px', fontSize: '16px', letterSpacing: '2px', textTransform: 'uppercase' }}>Send Message →</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* IMAGE MODAL */}
        <div id="cert-modal" className="modal-overlay" style={{ display: modalDisplay, opacity: isModalOpen ? 1 : 0 }} onClick={(e) => { if(e.target === e.currentTarget) closeModal(); }}>
          <div className="modal-content" style={{ transform: isModalOpen ? 'scale(1)' : 'scale(0.95)' }}>
            <span className="modal-close" onClick={closeModal}>&times;</span>
            <img id="modal-img" src={modalImage} alt="Certificate" />
          </div>
        </div>

      </div>

    </>
  );
}

export default App;
