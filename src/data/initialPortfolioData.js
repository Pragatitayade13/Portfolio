export const initialPortfolioData = {
  profile: {
    name: "Pragati Tayade",
    greeting: "Hello, I'm",
    roles: [
      "Java Full-Stack Developer",
      "CSE Graduate",
      "Web Application Creator",
      "Problem Solver & Coder"
    ],
    avatarUrl: "pragati.png",
    availability: "Available for Work",
    stats: [
      { value: 3, label: "Projects Completed" },
      { value: 5, label: "Technologies Mastered" },
      { value: 100, label: "Remote Ready", suffix: "%" },
      { value: 2026, label: "CSE Graduate" }
    ],
    coreStack: ["Java", "Spring Boot", "React.js", "SQL"]
  },
  about: {
    story: "A motivated and detail-oriented Computer Science Engineering graduate with a strong foundation in programming, software development, and problem-solving. Passionate about learning emerging technologies, improving system security, and building efficient digital solutions.",
    whatIBring: [
      "Motivated CSE Graduate (CGPA: 8.51)",
      "Proficient in Java, Python, C, C++ & Web Technologies",
      "Skilled in SQL Database and Cybersecurity basics",
      "Strong analytical, communication, and teamwork skills"
    ],
    strengths: [
      { icon: "💻", title: "Full-Stack Dev", desc: "Creating responsive web applications with HTML, CSS, JavaScript, and React." },
      { icon: "☕", title: "Java Backend", desc: "Robust backend system architecture with Core Java and OOP principles." },
      { icon: "📊", title: "Database Design", desc: "Relational database modeling, query tuning, and tracking with MySQL." },
      { icon: "🔒", title: "Cyber Security", desc: "Solid understanding of security scanning, cryptography basics, and vulnerabilities." }
    ]
  },
  skills: [
    {
      category: "Backend & Systems",
      items: ["Java", "OOPs", "Spring Boot", "REST APIs", "C/C++", "Python"]
    },
    {
      category: "Frontend Technologies",
      items: ["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap"]
    },
    {
      category: "Database & Security",
      items: ["MySQL Database", "SQL Design", "PostgreSQL", "CyberSecurity Basics"]
    },
    {
      category: "Tools & Workflow",
      items: ["Git & GitHub", "Docker", "Postman API", "Maven", "VS Code", "Agile / Scrum"]
    }
  ],
  projects: [
    {
      id: 4,
      title: "Hotel Order Management System",
      category: "Web App",
      year: 2025,
      status: "Completed",
      tech: ["HTML", "CSS", "JS", "MySQL"],
      summary: "A digital hotel ordering and management platform to streamline food ordering.",
      details: "Designed and developed to manage food orders digitally, reducing manual errors and improving service speed. Focused on high-accuracy receipts, real-time items tracking, and responsive user experience.",
      problem: "Traditional paper-based food ordering in hotels is slow, error-prone, and leads to communication gaps between guests and the kitchen.",
      solution: "Developed a browser-based digital order system that handles ordering, receipts, and order tracking in real-time.",
      contribution: "Designed the MySQL schema, built the interactive user interface, and implemented order storage calculations.",
      url: "https://nilwagh1903.github.io/hotelorder/",
      repo: "https://nilwagh1903.github.io/hotelorder/",
      icon: "hotel",
      slug: "hotel-order-management-system"
    },
    {
      id: 1,
      title: "Personal Portfolio Website",
      category: "Web App",
      year: 2025,
      status: "Completed",
      tech: ["React.js", "Vite", "CSS Modules"],
      summary: "A responsive, professional portfolio website highlighting developer skills, credentials, and works.",
      details: "Built entirely with vanilla HTML, CSS, and JavaScript. Features interactive theme modes, bento grid layout, and detail card modals.",
      problem: "Developers need a premium, accessible, and fast way to present credentials and projects to recruiters.",
      solution: "Designed a minimal, dark-themed responsive portfolio with smooth micro-animations.",
      contribution: "Wrote custom CSS variables layout and custom scroll reveal Intersection Observers in vanilla JS.",
      url: "https://pragatitayade13.github.io/Portfolio/",
      repo: "https://github.com/Pragatitayade13/Portfolio",
      icon: "portfolio",
      slug: "personal-portfolio-website"
    },
    {
      id: 5,
      title: "NoteVault",
      category: "Tool",
      year: 2025,
      status: "Completed",
      tech: ["HTML", "CSS", "JS"],
      summary: "A secure, browser-based note-taking app with login, create, edit and delete functionality.",
      details: "NoteVault is a lightweight note management web application with user authentication. Users can securely log in, create, edit, and delete notes — all stored in the browser. Clean UI with intuitive UX for distraction-free note-taking.",
      problem: "Users need a quick, secure tool to write notes without heavy application loads or database latencies.",
      solution: "Developed a lightweight notes manager with user simulation that handles CRUD operations entirely in local storage.",
      contribution: "Integrated local storage user auth sessions and clean distraction-free styling.",
      url: "https://pragatitayade13.github.io/NoteVault/",
      repo: "https://github.com/Pragatitayade13/NoteVault",
      icon: "notvault",
      slug: "note-vault"
    }
  ],
  experiences: [
    {
      id: 1,
      date: "July 2025 – August 2025",
      title: "Web Development Intern",
      company: "ApexPlanet Software Pvt. Ltd.",
      desc: "Developed responsive web pages and components using HTML, CSS, and JavaScript. Tested interface layouts, optimized loading times, and gained practical web development experience.",
      techs: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
    }
  ],
  education: [
    {
      id: 1,
      icon: "🎓",
      date: "2022 - 2026",
      degree: "Bachelor of Engineering (CSE)",
      school: "S.G.B Amravati University",
      details: "Completed Computer Science and Engineering with a CGPA of 8.51. Developed a strong foundation in software engineering, database design, OOPs, and systems security."
    },
    {
      id: 2,
      icon: "🏫",
      date: "2020 - 2022",
      degree: "Higher Secondary Certificate (HSC)",
      school: "Maharashtra State Board, Pune",
      details: "Focused on Science and Mathematics. Secured 70.83% score."
    },
    {
      id: 3,
      icon: "✏️",
      date: "2020",
      degree: "Secondary School Certificate (SSC)",
      school: "Maharashtra State Board, Pune",
      details: "Completed secondary school education with high honors. Secured 90.60% score."
    }
  ],
  certificates: [
    {
      id: 1,
      title: "Python Programming Internship",
      issuer: "VaultofCodes.in · Google Partner",
      date: "July – August 2025",
      icon: "vaultofcodes_python_certificate",
      borderColor: "#8B5CF6"
    },
    {
      id: 2,
      title: "Web Development Internship",
      issuer: "ApexPlanet Software Pvt. Ltd.",
      date: "Jul 2025 – Aug 2025 | ID: APSPL2510660",
      icon: "apexplanet_webdev_certificate",
      borderColor: "#14B8A6"
    },
    {
      id: 3,
      title: "Training on SQL, Core & Advanced Java",
      issuer: "SEED Infotech Ltd. · COET, Akola",
      date: "Aug – Oct 2025 | COET/Java/2025",
      icon: "seed_java_sql_certificate",
      borderColor: "#8B5CF6"
    },
    {
      id: 4,
      title: "Webinar – Career Guidance Session",
      issuer: "Grad Guru Innovation · ISO Certified",
      date: "31 December 2025",
      icon: "grad_guru_certificate",
      borderColor: "#F59E0B"
    },
    {
      id: 5,
      title: "Introduction to CyberSecurity",
      issuer: "CISCO Networking Academy",
      date: "Issued: 2025",
      icon: "cyber",
      borderColor: "#10B981"
    }
  ],
  publications: [
    {
      id: 1,
      title: "Certificate of Publication – Research Paper",
      issuer: "International Journal / Conference Research",
      date: "Published: April 2026",
      desc: "Conducted in-depth academic research on software security, network vulnerability scanning, and cybersecurity defenses, highlighting modern attack vectors and active mitigation architectures.",
      icon: "publication",
      paperFile: "Published paper.pdf"
    }
  ],
  resume: {
    fileName: "Pragati_Tayade_Resume.pdf"
  },
  socialLinks: [
    { id: 1, name: "GitHub", url: "https://github.com/Pragatitayade13", icon: "github" },
    { id: 2, name: "LinkedIn", url: "https://www.linkedin.com/in/pragati-tayade-644636283", icon: "linkedin" },
    { id: 3, name: "Email", url: "mailto:pragatitayade1302@gmail.com", icon: "email" }
  ],
  portfolioSettings: {
    maintenanceMode: false,
    themeDefault: "dark"
  },
  contactSettings: {
    recruiterCta: "I am currently seeking full-time roles or internships in Java Software Development, Full-Stack Engineering, or Backend Development. I am open to remote arrangements or on-site positions. If you are a recruiter, engineering manager, or team leader, I'd love to connect!",
    email: "pragatitayade1302@gmail.com",
    location: "Akola, Maharashtra, India"
  }
};
