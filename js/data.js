/**
 * AURQO AI Research Workspace - Sample & Initial Data Store
 * Structured across domains & folders
 */

export const AURQO_INITIAL_DATA = {
  activeFolderId: "folder-ai-ml",
  
  folders: [
    {
      id: "folder-ai-ml",
      name: "AI & Machine Learning",
      domain: "AI & Machine Learning",
      icon: "brain",
      color: "#4f46e5",
      description: "Research related to AI models, LLMs, neural architectures, and intelligent systems.",
      documentCount: 24,
      createdAt: "2026-08-10"
    },
    {
      id: "folder-cs",
      name: "Computer Science",
      domain: "Computer Science",
      icon: "code",
      color: "#2563eb",
      description: "Algorithms, distributed systems, quantum computing, and cryptography.",
      documentCount: 18,
      createdAt: "2026-08-12"
    },
    {
      id: "folder-healthcare",
      name: "Healthcare",
      domain: "Healthcare",
      icon: "activity",
      color: "#059669",
      description: "Medical diagnosis, clinical AI trials, bioinformatics, and pharmacology.",
      documentCount: 12,
      createdAt: "2026-08-15"
    },
    {
      id: "folder-education",
      name: "Education",
      domain: "Education",
      icon: "graduation-cap",
      color: "#7c3aed",
      description: "EdTech, adaptive learning algorithms, pedagogy, and intelligent tutoring systems.",
      documentCount: 9,
      createdAt: "2026-08-18"
    },
    {
      id: "folder-business",
      name: "Business",
      domain: "Business",
      icon: "briefcase",
      color: "#d97706",
      description: "Market analytics, predictive enterprise models, supply chain AI, and fintech.",
      documentCount: 14,
      createdAt: "2026-08-01"
    },
    {
      id: "folder-engineering",
      name: "Engineering",
      domain: "Engineering",
      icon: "cpu",
      color: "#dc2626",
      description: "Robotics, autonomous vehicles, signal processing, and materials science.",
      documentCount: 11,
      createdAt: "2026-08-05"
    },
    {
      id: "folder-science",
      name: "Science",
      domain: "Science",
      icon: "atom",
      color: "#0891b2",
      description: "Astrophysics, genomics, climate modeling, and particle physics.",
      documentCount: 16,
      createdAt: "2026-08-07"
    },
    {
      id: "folder-technology",
      name: "Technology",
      domain: "Technology",
      icon: "layers",
      color: "#475569",
      description: "Emerging tech trends, web architecture, cybersecurity, and IoT frameworks.",
      documentCount: 15,
      createdAt: "2026-08-09"
    },
    {
      id: "folder-personal",
      name: "Personal Research",
      domain: "Personal Research",
      icon: "bookmark",
      color: "#ec4899",
      description: "Independent exploration, reading lists, book summaries, and concept notes.",
      documentCount: 8,
      createdAt: "2026-08-20"
    }
  ],

  // Domain auto-detection mapping keywords
  domainKeywords: {
    "Healthcare": ["health", "medical", "clinical", "hospital", "patient", "disease", "drug", "diagnosis", "doctor", "biology", "pharmacy", "vaccine", "biomedical", "crispr", "genomic"],
    "Education": ["education", "school", "learning", "student", "teacher", "classroom", "pedagogy", "tutoring", "curriculum", "university", "academic", "exam"],
    "Computer Science": ["algorithm", "crypto", "quantum", "distributed", "compiler", "database", "datastructure", "programming", "software", "network", "operating system"],
    "Business": ["market", "finance", "revenue", "enterprise", "supply chain", "stock", "customer", "startup", "economy", "investment", "fintech", "sales"],
    "Engineering": ["robotics", "mechanical", "electrical", "hardware", "aerospace", "materials", "signal", "sensor", "autonomous vehicle", "drone"],
    "Science": ["physics", "astronomy", "climate", "particle", "chemistry", "quantum mechanics", "space", "ecosystem"],
    "AI & Machine Learning": ["ai", "machine learning", "deep learning", "neural", "llm", "transformer", "generative ai", "diffusion", "vision", "nlp", "reinforcement learning", "gpt", "model"]
  },

  // Research Projects Database
  researchItems: {
    "impact-of-ai-on-education": {
      id: "impact-of-ai-on-education",
      folderId: "folder-ai-ml",
      domain: "AI & Machine Learning",
      title: "Impact of AI on Education & Adaptive Learning",
      query: "What are the latest advancements in artificial intelligence and their impact on education?",
      date: "2026-08-24",
      saved: true,
      overview: {
        summary: "The integration of Artificial Intelligence into education represents a paradigm shift from standardized instruction toward deeply personalized, real-time adaptive learning environments. Leveraging large multimodal models and intelligent tutoring systems, modern educational platforms can now diagnose individual cognitive bottlenecks, automate formative feedback, and streamline administrative loads for educators.",
        takeaways: [
          "Personalized Mastery: AI systems dynamically adjust content difficulty, resulting in up to 38% faster concept mastery among K-12 and university cohorts.",
          "Teacher Co-Pilots: Educators utilizing AI co-pilots save an average of 5.8 hours per week on automated grading, lesson planning, and differentiated task generation.",
          "Cognitive Feedback Loops: Real-time natural language explanation engines provide non-punitive, iterative guidance that improves critical thinking over rote memorization.",
          "Equity & Accessibility: Multimodal speech and translation interfaces bridge linguistic and accessibility barriers for neurodivergent and ESL students."
        ]
      },
      keyFindings: [
        {
          metric: "38%",
          title: "Acceleration in Concept Mastery",
          desc: "Empirical studies indicate adaptive spaced repetition algorithms reduce time-to-mastery while retaining high comprehension scores."
        },
        {
          metric: "5.8 hrs/wk",
          title: "Teacher Time Saved",
          desc: "Automated curriculum scaffolding, rubric-based feedback drafts, and administrative task orchestration."
        },
        {
          metric: "4.2x",
          title: "Increase in Student Engagement",
          desc: "Interactive conversational simulations and Socratic AI dialogs demonstrate significantly higher active participation rates."
        }
      ],
      insights: [
        {
          tag: "Pedagogical Evolution",
          title: "Shift from Evaluative to Generative Learning",
          text: "Rather than treating AI as a static assessment tool, leading institutions are embedding conversational agents into exploratory inquiry-based projects where students co-create solutions."
        },
        {
          tag: "Ethics & Integrity",
          title: "AI Literacy Over Outright Detection",
          text: "Research highlights that conventional heuristic AI text detectors produce unacceptable false-positive rates (14–22%), pivoting institutional policy toward transparent citation and process-oriented evaluations."
        },
        {
          tag: "Neural Architecture",
          title: "Specialized Small Language Models (SLMs) in Classrooms",
          text: "Locally deployable 3B-7B parameter fine-tuned models offer privacy-compliant, zero-data-leakage tutoring accessible on standard school tablets without cloud latency."
        }
      ],
      sources: [
        {
          id: "src-1",
          title: "Adaptive Learning Systems: A Systematic Meta-Analysis (2024-2026)",
          type: "Academic Journal",
          author: "Dr. Elena Rostova, Prof. Marcus Chen",
          publisher: "Nature Human Behaviour & Education",
          doi: "10.1038/s41562-025-01824-x",
          year: "2025",
          url: "https://doi.org/10.1038/s41562-025-01824-x",
          citation: "Rostova, E., & Chen, M. (2025). Adaptive Learning Systems: A Systematic Meta-Analysis. Nature Human Behaviour, 9(4), 412–429."
        },
        {
          id: "src-2",
          title: "Multimodal Foundation Models in Personalized Tutoring: Benchmarks and Clinical Trials",
          type: "Conference Proceeding",
          author: "Sarah J. Thorne, David K. Vance, et al.",
          publisher: "IEEE Transactions on Learning Technologies",
          doi: "10.1109/TLT.2025.3298411",
          year: "2025",
          url: "https://ieeexplore.ieee.org/document/3298411",
          citation: "Thorne, S. J., & Vance, D. K. (2025). Multimodal Foundation Models in Personalized Tutoring. IEEE TLT, 18(2), 154-169."
        },
        {
          id: "src-3",
          title: "Evaluating Cognitive Load in Generative AI-Assisted Problem Solving",
          type: "Preprint",
          author: "K. Tanaka, L. Gomez",
          publisher: "arXiv:2503.11984 [cs.CY]",
          doi: "arXiv:2503.11984",
          year: "2026",
          url: "https://arxiv.org/abs/2503.11984",
          citation: "Tanaka, K., & Gomez, L. (2026). Evaluating Cognitive Load in Generative AI-Assisted Problem Solving. arXiv:2503.11984."
        },
        {
          id: "src-4",
          title: "Policy Framework for Ethical AI in Higher Education Institutions",
          type: "Whitepaper",
          author: "Global Higher Ed AI Taskforce",
          publisher: "UNESCO Digital Library",
          doi: "10.5467/unesco-ed-2025-09",
          year: "2025",
          url: "https://unesdoc.unesco.org",
          citation: "UNESCO Taskforce. (2025). Policy Framework for Ethical AI in Higher Education. UNESCO."
        }
      ],
      papers: [
        {
          id: "paper-1",
          title: "SocraticLM: Fostering Critical Inquiry via Dialectical AI Guidance",
          authors: "Chen, M., Rostova, E., & Patel, A.",
          journal: "Journal of Artificial Intelligence in Education (JAIE)",
          year: "2025",
          citations: 184,
          abstract: "We introduce SocraticLM, a constrained decoding paradigm designed to guide learners toward self-discovery rather than direct answer provision. In a randomized controlled trial (N=1,420), students demonstrated a 41% gain in transfer learning problems compared to standard conversational assistants.",
          downloadUrl: "#",
          domain: "AI & Machine Learning"
        },
        {
          id: "paper-2",
          title: "Longitudinal Study on AI-Driven Feedback in STEM Problem Sets",
          authors: "Vance, D. K., Thorne, S. J.",
          journal: "ACM Transactions on Computing Education (TOCE)",
          year: "2025",
          citations: 92,
          abstract: "Over a four-semester deployment across six universities, we analyze student interaction patterns with automated code and math reasoning explainers, documenting significant mitigation of anxiety and improved persistence in foundational engineering courses.",
          downloadUrl: "#",
          domain: "AI & Machine Learning"
        },
        {
          id: "paper-3",
          title: "Privacy-Preserving On-Device Models for Educational K-12 Tablets",
          authors: "Gupta, R., Harrison, T.",
          journal: "IEEE Security & Privacy in Education",
          year: "2026",
          citations: 45,
          abstract: "Examines low-bit quantized transformer architectures optimized for edge neural processing units (NPUs), achieving <20ms token latency while maintaining zero external network egress of student biometric or behavioral logs.",
          downloadUrl: "#",
          domain: "AI & Machine Learning"
        }
      ],
      relatedTopics: [
        "Socratic Prompting Architectures in LLMs",
        "Automated Formative Assessment Algorithms",
        "Cognitive Load Optimization in Digital Learning",
        "Ethical Guidelines for Student Data Privacy",
        "Fine-tuning Small Language Models for EdTech"
      ],
      aiChat: [
        {
          sender: "user",
          text: "What are the primary challenges when integrating AI tutors into high school STEM curriculums?",
          timestamp: "10:14 AM"
        },
        {
          sender: "ai",
          text: "Based on the papers saved in your **AI & Machine Learning** folder:\n\n1. **Over-reliance & Verification**: Students may develop cognitive complacency if the AI simply provides solutions rather than invoking Socratic questioning.\n2. **Curriculum Alignment**: Generic models often diverge from regional syllabus benchmarks or use non-standard notation.\n3. **Privacy Compliance**: Ensuring student inquiries and performance metrics remain strictly localized without cloud training telemetry.",
          timestamp: "10:15 AM"
        }
      ],
      notes: "Key objective for upcoming literature synthesis: Highlight the difference between answer-generating LLMs vs step-by-step Socratic prompting frameworks. Follow up on IEEE paper citations regarding NPU on-device deployment.",
      documents: [
        {
          id: "doc-edu-1",
          name: "AI_in_Education_Synthesis_Draft.docx",
          type: "docx",
          size: "4.2 MB",
          updatedAt: "2026-08-23",
          preview: "Draft review on intelligent tutoring systems, including empirical evidence from 2024–2026 studies across 14 institutional trials."
        },
        {
          id: "doc-edu-2",
          name: "SocraticLM_Benchmark_Results.pdf",
          type: "pdf",
          size: "1.8 MB",
          updatedAt: "2026-08-24",
          preview: "Comprehensive benchmark comparison across math, physics, and computer science problem sets with student cohort performance breakdown."
        }
      ]
    },

    "applications-of-ai-in-healthcare": {
      id: "applications-of-ai-in-healthcare",
      folderId: "folder-healthcare",
      domain: "Healthcare",
      title: "Applications of AI in Clinical Healthcare & Diagnostics",
      query: "What are the latest applications of artificial intelligence in healthcare and clinical diagnosis?",
      date: "2026-08-22",
      saved: true,
      overview: {
        summary: "Artificial Intelligence is radically transforming clinical healthcare through multimodal diagnostic imaging, predictive patient trajectory modeling, automated electronic health record (EHR) summarization, and accelerated targeted drug discovery. High-throughput neural networks now match or exceed specialist consensus in early oncology and cardiology screening.",
        takeaways: [
          "Early Diagnostic Efficacy: Multimodal vision-language models achieve 96.4% AUC in identifying early-stage pulmonary nodules and microvascular retinal lesions.",
          "Clinical Workflow Relief: Ambient clinical intelligence scribes reduce physician documentation burden by 62%, significantly decreasing burnout.",
          "Targeted Therapeutics: Generative molecular diffusion algorithms compress early-stage ligand screening timelines from months to days."
        ]
      },
      keyFindings: [
        {
          metric: "96.4%",
          title: "Diagnostic Sensitivity",
          desc: "Radiological foundation models tested across 120,000 multi-center clinical scan datasets."
        },
        {
          metric: "62%",
          title: "Documentation Reduction",
          desc: "Ambient listening models auto-generating ICD-10 compliant clinical encounter notes."
        },
        {
          metric: "10x",
          title: "Drug Target Candidate Screening",
          desc: "Accelerated de novo protein design and antibody optimization cycles."
        }
      ],
      insights: [
        {
          tag: "Clinical Translation",
          title: "Human-in-the-Loop Diagnostic Triaging",
          text: "Rather than autonomous decision-making, FDA-cleared AI systems act as second-reader triaging layers, highlighting ambiguous scan slices for expedited specialist review."
        },
        {
          tag: "Bioinformatics",
          title: "Cross-Modal EHR Synthesis",
          text: "Combining lab telemetry, genetic sequencing, and longitudinal patient notes into unified patient vector embeddings enables proactive sepsis and renal failure warnings up to 36 hours in advance."
        }
      ],
      sources: [
        {
          id: "src-h-1",
          title: "Foundation Models for Generalist Medical AI",
          type: "Journal Article",
          author: "M. Moor, O. Banerjee, et al.",
          publisher: "Nature Medicine",
          doi: "10.1038/s41591-025-02941-x",
          year: "2025",
          url: "https://nature.com/articles/s41591-025-02941-x",
          citation: "Moor, M., et al. (2025). Foundation Models for Generalist Medical AI. Nature Medicine, 29(6), 1365–1380."
        },
        {
          id: "src-h-2",
          title: "Longitudinal Clinical Validation of Ambient Scribing Systems in Emergency Departments",
          type: "Clinical Study",
          author: "R. Sterling, H. Al-Mansoor",
          publisher: "The Lancet Digital Health",
          doi: "10.1016/S2589-7500(25)00112-4",
          year: "2025",
          url: "https://thelancet.com/journals/landig/article/PIIS2589",
          citation: "Sterling, R., & Al-Mansoor, H. (2025). Clinical Validation of Ambient Scribing. The Lancet Digital Health, 7(3), e180-e191."
        }
      ],
      papers: [
        {
          id: "paper-h-1",
          title: "Med-Multimodal: Zero-Shot Multi-Organ Radiology Interpretation",
          authors: "Rajpurkar, P., Chen, L., et al.",
          journal: "NEJM AI",
          year: "2025",
          citations: 312,
          abstract: "We evaluate an open-weight 14B medical foundation model trained on paired DICOM imaging and pathologist reports, achieving clinician-level diagnostic accuracy across 24 common thoracic and abdominal pathologies.",
          downloadUrl: "#",
          domain: "Healthcare"
        }
      ],
      relatedTopics: [
        "Ambient Clinical Scribing Architectures",
        "De Novo Protein Design with Diffusion Models",
        "Predictive Sepsis Triaging in Critical Care",
        "Federated Learning in Multi-Hospital EHR Systems"
      ],
      aiChat: [
        {
          sender: "user",
          text: "What are the regulatory hurdles for deploying generative ambient scribes in clinical environments?",
          timestamp: "09:20 AM"
        },
        {
          sender: "ai",
          text: "In your **Healthcare** research folder, papers highlight three core regulatory requirements:\n\n1. **HIPAA & BAA Compliance**: Strict encryption of audio streams and zero retention for model training without explicit consent.\n2. **Hallucination Risk Mitigation**: Mandatory physician sign-off before electronic medical record (EMR) commit.\n3. **Auditability & Traceability**: Real-time provenance linking every generated summary bullet to the exact audio timestamp.",
          timestamp: "09:21 AM"
        }
      ],
      notes: "Prepare summary for oncology team meeting focusing on false-negative thresholds in mammography AI screening protocols.",
      documents: [
        {
          id: "doc-med-1",
          name: "Clinical_AI_Diagnostic_Guidelines.docx",
          type: "docx",
          size: "3.6 MB",
          updatedAt: "2026-08-21",
          preview: "Comprehensive institutional protocol for AI-assisted radiology review and patient consent workflows."
        }
      ]
    },

    "quantum-computing-cryptography": {
      id: "quantum-computing-cryptography",
      folderId: "folder-cs",
      domain: "Computer Science",
      title: "Post-Quantum Cryptography & Quantum Computing Algorithms",
      query: "What is the timeline and algorithmic impact of quantum computing on modern cryptography?",
      date: "2026-08-20",
      saved: true,
      overview: {
        summary: "As fault-tolerant quantum hardware scales toward logical qubit thresholds, the cryptographic security underpinning public key infrastructure (RSA, ECC) faces obsolescence via Shor's algorithm. Global standards bodies have converged on Post-Quantum Cryptography (PQC) lattice-based and hash-based standards.",
        takeaways: [
          "Standardization Status: NIST FIPS 203 (ML-KEM) and FIPS 204 (ML-DSA) represent the primary transition requirements for enterprise data in transit.",
          "Harvest Now, Decrypt Later: Active exfiltration attacks emphasize immediate migration for long-lifecycle encrypted archives.",
          "Hardware Acceleration: Dedicated FPGA and ASIC lattice cryptoprocessors mitigate handshake latency overheads."
        ]
      },
      keyFindings: [
        {
          metric: "2030",
          title: "Target Migration Horizon",
          desc: "International consensus deadline for deprecating classical 2048-bit RSA in critical infrastructure."
        },
        {
          metric: "3.8x",
          title: "Key Size Overhead",
          desc: "Average increase in ciphertext and public key payload for module lattice-based schemes."
        }
      ],
      insights: [
        {
          tag: "Cryptographic Agility",
          title: "Hybrid Classical-Post-Quantum Handshakes",
          text: "Deploying dual-key TLS handshakes ensures defense-in-depth during the multi-year standardization validation window."
        }
      ],
      sources: [
        {
          id: "src-cs-1",
          title: "NIST FIPS 203: Module-Lattice-Based Key-Encapsulation Mechanism Standard",
          type: "Standards Document",
          author: "National Institute of Standards and Technology",
          publisher: "NIST Publications",
          doi: "10.6028/NIST.FIPS.203",
          year: "2024",
          url: "https://doi.org/10.6028/NIST.FIPS.203",
          citation: "NIST. (2024). FIPS 203: Module-Lattice-Based Key-Encapsulation. US Dept of Commerce."
        }
      ],
      papers: [
        {
          id: "paper-cs-1",
          title: "Benchmarking Post-Quantum TLS 1.3 in High-Frequency Cloud Infrastructure",
          authors: "Kaufman, H., Schmidt, R.",
          journal: "IEEE Symposium on Security and Privacy",
          year: "2025",
          citations: 88,
          abstract: "We evaluate the throughput and latency penalties of ML-KEM-768 and ML-DSA-65 across global content delivery networks, identifying optimization strategies for sub-millisecond session negotiation.",
          downloadUrl: "#",
          domain: "Computer Science"
        }
      ],
      relatedTopics: [
        "Fault-Tolerant Quantum Error Correction",
        "Lattice-Based Zero Knowledge Proofs",
        "Hardware Security Modules for PQC"
      ],
      aiChat: [
        {
          sender: "user",
          text: "What is the performance overhead of ML-KEM compared to classical ECDH?",
          timestamp: "02:10 PM"
        },
        {
          sender: "ai",
          text: "In your **Computer Science** folder, research shows that while computation time for ML-KEM is comparable or faster than ECDH, the public key and ciphertext size increases from ~64 bytes to ~1,184 bytes, resulting in slight packet fragmentation over restrictive MTU channels.",
          timestamp: "02:11 PM"
        }
      ],
      notes: "Coordinate with systems engineering on TLS 1.3 hybrid key exchange rollout timeline.",
      documents: [
        {
          id: "doc-cs-1",
          name: "Post_Quantum_Migration_Plan.docx",
          type: "docx",
          size: "2.1 MB",
          updatedAt: "2026-08-19",
          preview: "Technical blueprint for updating root certificates and hardware security modules to FIPS 203/204 compliance."
        }
      ]
    }
  },

  // Document Library All Documents
  documents: [
    {
      id: "doc-1",
      title: "Impact of AI on Education & Adaptive Learning.docx",
      folderId: "folder-ai-ml",
      folderName: "AI & Machine Learning",
      type: "Word Document",
      size: "4.2 MB",
      date: "2026-08-24",
      tag: "Research Paper",
      preview: "Full synthesis of multimodal AI in modern education, adaptive tutoring systems, teacher workloads, and equity studies."
    },
    {
      id: "doc-2",
      title: "SocraticLM_Empirical_Evaluation_v2.pdf",
      folderId: "folder-ai-ml",
      folderName: "AI & Machine Learning",
      type: "PDF",
      size: "1.8 MB",
      date: "2026-08-23",
      tag: "Dataset & Study",
      preview: "Statistical evaluation across 1,420 students demonstrating conceptual transfer gains in Socratic inquiry mode."
    },
    {
      id: "doc-3",
      title: "Clinical_AI_Diagnostic_Guidelines.docx",
      folderId: "folder-healthcare",
      folderName: "Healthcare",
      type: "Word Document",
      size: "3.6 MB",
      date: "2026-08-21",
      tag: "Clinical Protocol",
      preview: "Standard operating procedures for integrating computer vision oncology triaging into clinical radiology picture archiving systems."
    },
    {
      id: "doc-4",
      title: "Post_Quantum_Migration_Roadmap.docx",
      folderId: "folder-cs",
      folderName: "Computer Science",
      type: "Word Document",
      size: "2.1 MB",
      date: "2026-08-19",
      tag: "System Architecture",
      preview: "Comprehensive migration roadmap for NIST post-quantum cryptographic primitives (ML-KEM, ML-DSA) in enterprise environments."
    },
    {
      id: "doc-5",
      title: "EdTech_Pedagogy_Curriculum_Reform.docx",
      folderId: "folder-education",
      folderName: "Education",
      type: "Word Document",
      size: "2.9 MB",
      date: "2026-08-18",
      tag: "Curriculum Strategy",
      preview: "Guidelines for teacher professional development and curriculum redesign in an AI-assisted classroom landscape."
    },
    {
      id: "doc-6",
      title: "Predictive_Enterprise_Supply_Chain_Models.docx",
      folderId: "folder-business",
      folderName: "Business",
      type: "Word Document",
      size: "3.1 MB",
      date: "2026-08-15",
      tag: "Market Analysis",
      preview: "Predictive neural forecasting models for global supply chain resilience and inventory optimization."
    },
    {
      id: "doc-7",
      title: "Autonomous_Mobile_Robotics_SLAM_Review.pdf",
      folderId: "folder-engineering",
      folderName: "Engineering",
      type: "PDF",
      size: "5.4 MB",
      date: "2026-08-14",
      tag: "Engineering Review",
      preview: "Simultaneous Localization and Mapping (SLAM) advances with neural radiance fields and edge lidar fusion."
    },
    {
      id: "doc-8",
      title: "CRISPR_Target_Prediction_Neural_Networks.docx",
      folderId: "folder-science",
      folderName: "Science",
      type: "Word Document",
      size: "4.8 MB",
      date: "2026-08-12",
      tag: "Genomics Paper",
      preview: "Deep learning models for predicting off-target cleavage sites in CRISPR-Cas9 and Cas12 genome engineering."
    }
  ],

  // Academic Papers for "Find My Papers"
  papers: [
    {
      id: "p-101",
      title: "SocraticLM: Fostering Critical Inquiry via Dialectical AI Guidance",
      authors: "Chen, M., Rostova, E., & Patel, A.",
      domain: "AI & Machine Learning",
      folderId: "folder-ai-ml",
      folderName: "AI & Machine Learning",
      source: "Nature Human Behaviour",
      year: "2025",
      citations: 184,
      saved: true,
      description: "Constrained decoding paradigm designed to guide learners toward self-discovery rather than direct answer provision."
    },
    {
      id: "p-102",
      title: "Longitudinal Study on AI-Driven Feedback in STEM Problem Sets",
      authors: "Vance, D. K., Thorne, S. J.",
      domain: "AI & Machine Learning",
      folderId: "folder-ai-ml",
      folderName: "AI & Machine Learning",
      source: "IEEE TLT",
      year: "2025",
      citations: 92,
      saved: true,
      description: "Four-semester deployment analyzing student interaction patterns with automated code and math reasoning explainers."
    },
    {
      id: "p-103",
      title: "Med-Multimodal: Zero-Shot Multi-Organ Radiology Interpretation",
      authors: "Rajpurkar, P., Chen, L., et al.",
      domain: "Healthcare",
      folderId: "folder-healthcare",
      folderName: "Healthcare",
      source: "NEJM AI",
      year: "2025",
      citations: 312,
      saved: true,
      description: "Open-weight 14B medical foundation model trained on paired DICOM imaging and pathologist reports across 24 pathologies."
    },
    {
      id: "p-104",
      title: "Benchmarking Post-Quantum TLS 1.3 in High-Frequency Cloud Infrastructure",
      authors: "Kaufman, H., Schmidt, R.",
      domain: "Computer Science",
      folderId: "folder-cs",
      folderName: "Computer Science",
      source: "IEEE S&P",
      year: "2025",
      citations: 88,
      saved: true,
      description: "Throughput and latency evaluation of ML-KEM-768 and ML-DSA-65 across global cloud and edge infrastructure."
    },
    {
      id: "p-105",
      title: "Adaptive Spaced Repetition Algorithms in High School Mathematics",
      authors: "Kovacs, T., Lindqvist, B.",
      domain: "Education",
      folderId: "folder-education",
      folderName: "Education",
      source: "Computers & Education",
      year: "2024",
      citations: 64,
      saved: false,
      description: "Empirical study assessing retention trajectories under dynamic neural spaced repetition vs standard static schedules."
    },
    {
      id: "p-106",
      title: "Transformer-Driven Inventory Optimization under High Volatility",
      authors: "Alvarez, G., Zhao, W.",
      domain: "Business",
      folderId: "folder-business",
      folderName: "Business",
      source: "Harvard Business Review AI",
      year: "2025",
      citations: 118,
      saved: false,
      description: "Predictive attention networks for multi-echelon inventory allocation in disrupted international freight networks."
    },
    {
      id: "p-107",
      title: "Neural Radiance Fields for Zero-Latency Robotic Navigation in Degraded Environments",
      authors: "O'Connor, S., Miller, D.",
      domain: "Engineering",
      folderId: "folder-engineering",
      folderName: "Engineering",
      source: "Robotics and Autonomous Systems",
      year: "2026",
      citations: 41,
      saved: false,
      description: "Real-time 3D Gaussian splatting and NeRF models executing on embedded NPU chips for warehouse AGVs."
    }
  ],

  // History timeline items grouped by time & domain
  history: [
    {
      group: "Today",
      domain: "AI & Machine Learning",
      folderId: "folder-ai-ml",
      items: [
        { id: "impact-of-ai-on-education", title: "Impact of AI on Education & Adaptive Learning", time: "10:14 AM" },
        { id: "generative-ai-trends", title: "Generative AI Trends & Small Language Models", time: "09:30 AM" }
      ]
    },
    {
      group: "Today",
      domain: "Healthcare",
      folderId: "folder-healthcare",
      items: [
        { id: "applications-of-ai-in-healthcare", title: "Applications of AI in Clinical Healthcare & Diagnostics", time: "09:15 AM" }
      ]
    },
    {
      group: "Yesterday",
      domain: "Computer Science",
      folderId: "folder-cs",
      items: [
        { id: "quantum-computing-cryptography", title: "Post-Quantum Cryptography & Quantum Computing Algorithms", time: "02:10 PM" },
        { id: "distributed-consensus-pqc", title: "Distributed Consensus under Post-Quantum Cryptography", time: "11:45 AM" }
      ]
    },
    {
      group: "Previous 7 Days",
      domain: "Education",
      folderId: "folder-education",
      items: [
        { id: "pedagogy-ai-classrooms", title: "AI Literacy & Socratic Methods in Higher Education", time: "Aug 20" }
      ]
    }
  ]
};

if (typeof window !== 'undefined') {
  window.AURQO_INITIAL_DATA = AURQO_INITIAL_DATA;
}
