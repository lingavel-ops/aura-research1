(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const d of s)if(d.type==="childList")for(const g of d.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&r(g)}).observe(document,{childList:!0,subtree:!0});function n(s){const d={};return s.integrity&&(d.integrity=s.integrity),s.referrerPolicy&&(d.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?d.credentials="include":s.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function r(s){if(s.ep)return;s.ep=!0;const d=n(s);fetch(s.href,d)}})();const E={activeFolderId:"folder-ai-ml",folders:[{id:"folder-ai-ml",name:"AI & Machine Learning",domain:"AI & Machine Learning",icon:"brain",color:"#4f46e5",description:"Research related to AI models, LLMs, neural architectures, and intelligent systems.",documentCount:24,createdAt:"2026-08-10"},{id:"folder-cs",name:"Computer Science",domain:"Computer Science",icon:"code",color:"#2563eb",description:"Algorithms, distributed systems, quantum computing, and cryptography.",documentCount:18,createdAt:"2026-08-12"},{id:"folder-healthcare",name:"Healthcare",domain:"Healthcare",icon:"activity",color:"#059669",description:"Medical diagnosis, clinical AI trials, bioinformatics, and pharmacology.",documentCount:12,createdAt:"2026-08-15"},{id:"folder-education",name:"Education",domain:"Education",icon:"graduation-cap",color:"#7c3aed",description:"EdTech, adaptive learning algorithms, pedagogy, and intelligent tutoring systems.",documentCount:9,createdAt:"2026-08-18"},{id:"folder-business",name:"Business",domain:"Business",icon:"briefcase",color:"#d97706",description:"Market analytics, predictive enterprise models, supply chain AI, and fintech.",documentCount:14,createdAt:"2026-08-01"},{id:"folder-engineering",name:"Engineering",domain:"Engineering",icon:"cpu",color:"#dc2626",description:"Robotics, autonomous vehicles, signal processing, and materials science.",documentCount:11,createdAt:"2026-08-05"},{id:"folder-science",name:"Science",domain:"Science",icon:"atom",color:"#0891b2",description:"Astrophysics, genomics, climate modeling, and particle physics.",documentCount:16,createdAt:"2026-08-07"},{id:"folder-technology",name:"Technology",domain:"Technology",icon:"layers",color:"#475569",description:"Emerging tech trends, web architecture, cybersecurity, and IoT frameworks.",documentCount:15,createdAt:"2026-08-09"},{id:"folder-personal",name:"Personal Research",domain:"Personal Research",icon:"bookmark",color:"#ec4899",description:"Independent exploration, reading lists, book summaries, and concept notes.",documentCount:8,createdAt:"2026-08-20"}],domainKeywords:{Healthcare:["health","medical","clinical","hospital","patient","disease","drug","diagnosis","doctor","biology","pharmacy","vaccine","biomedical","crispr","genomic"],Education:["education","school","learning","student","teacher","classroom","pedagogy","tutoring","curriculum","university","academic","exam"],"Computer Science":["algorithm","crypto","quantum","distributed","compiler","database","datastructure","programming","software","network","operating system"],Business:["market","finance","revenue","enterprise","supply chain","stock","customer","startup","economy","investment","fintech","sales"],Engineering:["robotics","mechanical","electrical","hardware","aerospace","materials","signal","sensor","autonomous vehicle","drone"],Science:["physics","astronomy","climate","particle","chemistry","quantum mechanics","space","ecosystem"],"AI & Machine Learning":["ai","machine learning","deep learning","neural","llm","transformer","generative ai","diffusion","vision","nlp","reinforcement learning","gpt","model"]},researchItems:{"impact-of-ai-on-education":{id:"impact-of-ai-on-education",folderId:"folder-ai-ml",domain:"AI & Machine Learning",title:"Impact of AI on Education & Adaptive Learning",query:"What are the latest advancements in artificial intelligence and their impact on education?",date:"2026-08-24",saved:!0,overview:{summary:"The integration of Artificial Intelligence into education represents a paradigm shift from standardized instruction toward deeply personalized, real-time adaptive learning environments. Leveraging large multimodal models and intelligent tutoring systems, modern educational platforms can now diagnose individual cognitive bottlenecks, automate formative feedback, and streamline administrative loads for educators.",takeaways:["Personalized Mastery: AI systems dynamically adjust content difficulty, resulting in up to 38% faster concept mastery among K-12 and university cohorts.","Teacher Co-Pilots: Educators utilizing AI co-pilots save an average of 5.8 hours per week on automated grading, lesson planning, and differentiated task generation.","Cognitive Feedback Loops: Real-time natural language explanation engines provide non-punitive, iterative guidance that improves critical thinking over rote memorization.","Equity & Accessibility: Multimodal speech and translation interfaces bridge linguistic and accessibility barriers for neurodivergent and ESL students."]},keyFindings:[{metric:"38%",title:"Acceleration in Concept Mastery",desc:"Empirical studies indicate adaptive spaced repetition algorithms reduce time-to-mastery while retaining high comprehension scores."},{metric:"5.8 hrs/wk",title:"Teacher Time Saved",desc:"Automated curriculum scaffolding, rubric-based feedback drafts, and administrative task orchestration."},{metric:"4.2x",title:"Increase in Student Engagement",desc:"Interactive conversational simulations and Socratic AI dialogs demonstrate significantly higher active participation rates."}],insights:[{tag:"Pedagogical Evolution",title:"Shift from Evaluative to Generative Learning",text:"Rather than treating AI as a static assessment tool, leading institutions are embedding conversational agents into exploratory inquiry-based projects where students co-create solutions."},{tag:"Ethics & Integrity",title:"AI Literacy Over Outright Detection",text:"Research highlights that conventional heuristic AI text detectors produce unacceptable false-positive rates (14–22%), pivoting institutional policy toward transparent citation and process-oriented evaluations."},{tag:"Neural Architecture",title:"Specialized Small Language Models (SLMs) in Classrooms",text:"Locally deployable 3B-7B parameter fine-tuned models offer privacy-compliant, zero-data-leakage tutoring accessible on standard school tablets without cloud latency."}],sources:[{id:"src-1",title:"Adaptive Learning Systems: A Systematic Meta-Analysis (2024-2026)",type:"Academic Journal",author:"Dr. Elena Rostova, Prof. Marcus Chen",publisher:"Nature Human Behaviour & Education",doi:"10.1038/s41562-025-01824-x",year:"2025",url:"https://doi.org/10.1038/s41562-025-01824-x",citation:"Rostova, E., & Chen, M. (2025). Adaptive Learning Systems: A Systematic Meta-Analysis. Nature Human Behaviour, 9(4), 412–429."},{id:"src-2",title:"Multimodal Foundation Models in Personalized Tutoring: Benchmarks and Clinical Trials",type:"Conference Proceeding",author:"Sarah J. Thorne, David K. Vance, et al.",publisher:"IEEE Transactions on Learning Technologies",doi:"10.1109/TLT.2025.3298411",year:"2025",url:"https://ieeexplore.ieee.org/document/3298411",citation:"Thorne, S. J., & Vance, D. K. (2025). Multimodal Foundation Models in Personalized Tutoring. IEEE TLT, 18(2), 154-169."},{id:"src-3",title:"Evaluating Cognitive Load in Generative AI-Assisted Problem Solving",type:"Preprint",author:"K. Tanaka, L. Gomez",publisher:"arXiv:2503.11984 [cs.CY]",doi:"arXiv:2503.11984",year:"2026",url:"https://arxiv.org/abs/2503.11984",citation:"Tanaka, K., & Gomez, L. (2026). Evaluating Cognitive Load in Generative AI-Assisted Problem Solving. arXiv:2503.11984."},{id:"src-4",title:"Policy Framework for Ethical AI in Higher Education Institutions",type:"Whitepaper",author:"Global Higher Ed AI Taskforce",publisher:"UNESCO Digital Library",doi:"10.5467/unesco-ed-2025-09",year:"2025",url:"https://unesdoc.unesco.org",citation:"UNESCO Taskforce. (2025). Policy Framework for Ethical AI in Higher Education. UNESCO."}],papers:[{id:"paper-1",title:"SocraticLM: Fostering Critical Inquiry via Dialectical AI Guidance",authors:"Chen, M., Rostova, E., & Patel, A.",journal:"Journal of Artificial Intelligence in Education (JAIE)",year:"2025",citations:184,abstract:"We introduce SocraticLM, a constrained decoding paradigm designed to guide learners toward self-discovery rather than direct answer provision. In a randomized controlled trial (N=1,420), students demonstrated a 41% gain in transfer learning problems compared to standard conversational assistants.",downloadUrl:"#",domain:"AI & Machine Learning"},{id:"paper-2",title:"Longitudinal Study on AI-Driven Feedback in STEM Problem Sets",authors:"Vance, D. K., Thorne, S. J.",journal:"ACM Transactions on Computing Education (TOCE)",year:"2025",citations:92,abstract:"Over a four-semester deployment across six universities, we analyze student interaction patterns with automated code and math reasoning explainers, documenting significant mitigation of anxiety and improved persistence in foundational engineering courses.",downloadUrl:"#",domain:"AI & Machine Learning"},{id:"paper-3",title:"Privacy-Preserving On-Device Models for Educational K-12 Tablets",authors:"Gupta, R., Harrison, T.",journal:"IEEE Security & Privacy in Education",year:"2026",citations:45,abstract:"Examines low-bit quantized transformer architectures optimized for edge neural processing units (NPUs), achieving <20ms token latency while maintaining zero external network egress of student biometric or behavioral logs.",downloadUrl:"#",domain:"AI & Machine Learning"}],relatedTopics:["Socratic Prompting Architectures in LLMs","Automated Formative Assessment Algorithms","Cognitive Load Optimization in Digital Learning","Ethical Guidelines for Student Data Privacy","Fine-tuning Small Language Models for EdTech"],aiChat:[{sender:"user",text:"What are the primary challenges when integrating AI tutors into high school STEM curriculums?",timestamp:"10:14 AM"},{sender:"ai",text:`Based on the papers saved in your **AI & Machine Learning** folder:

1. **Over-reliance & Verification**: Students may develop cognitive complacency if the AI simply provides solutions rather than invoking Socratic questioning.
2. **Curriculum Alignment**: Generic models often diverge from regional syllabus benchmarks or use non-standard notation.
3. **Privacy Compliance**: Ensuring student inquiries and performance metrics remain strictly localized without cloud training telemetry.`,timestamp:"10:15 AM"}],notes:"Key objective for upcoming literature synthesis: Highlight the difference between answer-generating LLMs vs step-by-step Socratic prompting frameworks. Follow up on IEEE paper citations regarding NPU on-device deployment.",documents:[{id:"doc-edu-1",name:"AI_in_Education_Synthesis_Draft.docx",type:"docx",size:"4.2 MB",updatedAt:"2026-08-23",preview:"Draft review on intelligent tutoring systems, including empirical evidence from 2024–2026 studies across 14 institutional trials."},{id:"doc-edu-2",name:"SocraticLM_Benchmark_Results.pdf",type:"pdf",size:"1.8 MB",updatedAt:"2026-08-24",preview:"Comprehensive benchmark comparison across math, physics, and computer science problem sets with student cohort performance breakdown."}]},"applications-of-ai-in-healthcare":{id:"applications-of-ai-in-healthcare",folderId:"folder-healthcare",domain:"Healthcare",title:"Applications of AI in Clinical Healthcare & Diagnostics",query:"What are the latest applications of artificial intelligence in healthcare and clinical diagnosis?",date:"2026-08-22",saved:!0,overview:{summary:"Artificial Intelligence is radically transforming clinical healthcare through multimodal diagnostic imaging, predictive patient trajectory modeling, automated electronic health record (EHR) summarization, and accelerated targeted drug discovery. High-throughput neural networks now match or exceed specialist consensus in early oncology and cardiology screening.",takeaways:["Early Diagnostic Efficacy: Multimodal vision-language models achieve 96.4% AUC in identifying early-stage pulmonary nodules and microvascular retinal lesions.","Clinical Workflow Relief: Ambient clinical intelligence scribes reduce physician documentation burden by 62%, significantly decreasing burnout.","Targeted Therapeutics: Generative molecular diffusion algorithms compress early-stage ligand screening timelines from months to days."]},keyFindings:[{metric:"96.4%",title:"Diagnostic Sensitivity",desc:"Radiological foundation models tested across 120,000 multi-center clinical scan datasets."},{metric:"62%",title:"Documentation Reduction",desc:"Ambient listening models auto-generating ICD-10 compliant clinical encounter notes."},{metric:"10x",title:"Drug Target Candidate Screening",desc:"Accelerated de novo protein design and antibody optimization cycles."}],insights:[{tag:"Clinical Translation",title:"Human-in-the-Loop Diagnostic Triaging",text:"Rather than autonomous decision-making, FDA-cleared AI systems act as second-reader triaging layers, highlighting ambiguous scan slices for expedited specialist review."},{tag:"Bioinformatics",title:"Cross-Modal EHR Synthesis",text:"Combining lab telemetry, genetic sequencing, and longitudinal patient notes into unified patient vector embeddings enables proactive sepsis and renal failure warnings up to 36 hours in advance."}],sources:[{id:"src-h-1",title:"Foundation Models for Generalist Medical AI",type:"Journal Article",author:"M. Moor, O. Banerjee, et al.",publisher:"Nature Medicine",doi:"10.1038/s41591-025-02941-x",year:"2025",url:"https://nature.com/articles/s41591-025-02941-x",citation:"Moor, M., et al. (2025). Foundation Models for Generalist Medical AI. Nature Medicine, 29(6), 1365–1380."},{id:"src-h-2",title:"Longitudinal Clinical Validation of Ambient Scribing Systems in Emergency Departments",type:"Clinical Study",author:"R. Sterling, H. Al-Mansoor",publisher:"The Lancet Digital Health",doi:"10.1016/S2589-7500(25)00112-4",year:"2025",url:"https://thelancet.com/journals/landig/article/PIIS2589",citation:"Sterling, R., & Al-Mansoor, H. (2025). Clinical Validation of Ambient Scribing. The Lancet Digital Health, 7(3), e180-e191."}],papers:[{id:"paper-h-1",title:"Med-Multimodal: Zero-Shot Multi-Organ Radiology Interpretation",authors:"Rajpurkar, P., Chen, L., et al.",journal:"NEJM AI",year:"2025",citations:312,abstract:"We evaluate an open-weight 14B medical foundation model trained on paired DICOM imaging and pathologist reports, achieving clinician-level diagnostic accuracy across 24 common thoracic and abdominal pathologies.",downloadUrl:"#",domain:"Healthcare"}],relatedTopics:["Ambient Clinical Scribing Architectures","De Novo Protein Design with Diffusion Models","Predictive Sepsis Triaging in Critical Care","Federated Learning in Multi-Hospital EHR Systems"],aiChat:[{sender:"user",text:"What are the regulatory hurdles for deploying generative ambient scribes in clinical environments?",timestamp:"09:20 AM"},{sender:"ai",text:`In your **Healthcare** research folder, papers highlight three core regulatory requirements:

1. **HIPAA & BAA Compliance**: Strict encryption of audio streams and zero retention for model training without explicit consent.
2. **Hallucination Risk Mitigation**: Mandatory physician sign-off before electronic medical record (EMR) commit.
3. **Auditability & Traceability**: Real-time provenance linking every generated summary bullet to the exact audio timestamp.`,timestamp:"09:21 AM"}],notes:"Prepare summary for oncology team meeting focusing on false-negative thresholds in mammography AI screening protocols.",documents:[{id:"doc-med-1",name:"Clinical_AI_Diagnostic_Guidelines.docx",type:"docx",size:"3.6 MB",updatedAt:"2026-08-21",preview:"Comprehensive institutional protocol for AI-assisted radiology review and patient consent workflows."}]},"quantum-computing-cryptography":{id:"quantum-computing-cryptography",folderId:"folder-cs",domain:"Computer Science",title:"Post-Quantum Cryptography & Quantum Computing Algorithms",query:"What is the timeline and algorithmic impact of quantum computing on modern cryptography?",date:"2026-08-20",saved:!0,overview:{summary:"As fault-tolerant quantum hardware scales toward logical qubit thresholds, the cryptographic security underpinning public key infrastructure (RSA, ECC) faces obsolescence via Shor's algorithm. Global standards bodies have converged on Post-Quantum Cryptography (PQC) lattice-based and hash-based standards.",takeaways:["Standardization Status: NIST FIPS 203 (ML-KEM) and FIPS 204 (ML-DSA) represent the primary transition requirements for enterprise data in transit.","Harvest Now, Decrypt Later: Active exfiltration attacks emphasize immediate migration for long-lifecycle encrypted archives.","Hardware Acceleration: Dedicated FPGA and ASIC lattice cryptoprocessors mitigate handshake latency overheads."]},keyFindings:[{metric:"2030",title:"Target Migration Horizon",desc:"International consensus deadline for deprecating classical 2048-bit RSA in critical infrastructure."},{metric:"3.8x",title:"Key Size Overhead",desc:"Average increase in ciphertext and public key payload for module lattice-based schemes."}],insights:[{tag:"Cryptographic Agility",title:"Hybrid Classical-Post-Quantum Handshakes",text:"Deploying dual-key TLS handshakes ensures defense-in-depth during the multi-year standardization validation window."}],sources:[{id:"src-cs-1",title:"NIST FIPS 203: Module-Lattice-Based Key-Encapsulation Mechanism Standard",type:"Standards Document",author:"National Institute of Standards and Technology",publisher:"NIST Publications",doi:"10.6028/NIST.FIPS.203",year:"2024",url:"https://doi.org/10.6028/NIST.FIPS.203",citation:"NIST. (2024). FIPS 203: Module-Lattice-Based Key-Encapsulation. US Dept of Commerce."}],papers:[{id:"paper-cs-1",title:"Benchmarking Post-Quantum TLS 1.3 in High-Frequency Cloud Infrastructure",authors:"Kaufman, H., Schmidt, R.",journal:"IEEE Symposium on Security and Privacy",year:"2025",citations:88,abstract:"We evaluate the throughput and latency penalties of ML-KEM-768 and ML-DSA-65 across global content delivery networks, identifying optimization strategies for sub-millisecond session negotiation.",downloadUrl:"#",domain:"Computer Science"}],relatedTopics:["Fault-Tolerant Quantum Error Correction","Lattice-Based Zero Knowledge Proofs","Hardware Security Modules for PQC"],aiChat:[{sender:"user",text:"What is the performance overhead of ML-KEM compared to classical ECDH?",timestamp:"02:10 PM"},{sender:"ai",text:"In your **Computer Science** folder, research shows that while computation time for ML-KEM is comparable or faster than ECDH, the public key and ciphertext size increases from ~64 bytes to ~1,184 bytes, resulting in slight packet fragmentation over restrictive MTU channels.",timestamp:"02:11 PM"}],notes:"Coordinate with systems engineering on TLS 1.3 hybrid key exchange rollout timeline.",documents:[{id:"doc-cs-1",name:"Post_Quantum_Migration_Plan.docx",type:"docx",size:"2.1 MB",updatedAt:"2026-08-19",preview:"Technical blueprint for updating root certificates and hardware security modules to FIPS 203/204 compliance."}]}},documents:[{id:"doc-1",title:"Impact of AI on Education & Adaptive Learning.docx",folderId:"folder-ai-ml",folderName:"AI & Machine Learning",type:"Word Document",size:"4.2 MB",date:"2026-08-24",tag:"Research Paper",preview:"Full synthesis of multimodal AI in modern education, adaptive tutoring systems, teacher workloads, and equity studies."},{id:"doc-2",title:"SocraticLM_Empirical_Evaluation_v2.pdf",folderId:"folder-ai-ml",folderName:"AI & Machine Learning",type:"PDF",size:"1.8 MB",date:"2026-08-23",tag:"Dataset & Study",preview:"Statistical evaluation across 1,420 students demonstrating conceptual transfer gains in Socratic inquiry mode."},{id:"doc-3",title:"Clinical_AI_Diagnostic_Guidelines.docx",folderId:"folder-healthcare",folderName:"Healthcare",type:"Word Document",size:"3.6 MB",date:"2026-08-21",tag:"Clinical Protocol",preview:"Standard operating procedures for integrating computer vision oncology triaging into clinical radiology picture archiving systems."},{id:"doc-4",title:"Post_Quantum_Migration_Roadmap.docx",folderId:"folder-cs",folderName:"Computer Science",type:"Word Document",size:"2.1 MB",date:"2026-08-19",tag:"System Architecture",preview:"Comprehensive migration roadmap for NIST post-quantum cryptographic primitives (ML-KEM, ML-DSA) in enterprise environments."},{id:"doc-5",title:"EdTech_Pedagogy_Curriculum_Reform.docx",folderId:"folder-education",folderName:"Education",type:"Word Document",size:"2.9 MB",date:"2026-08-18",tag:"Curriculum Strategy",preview:"Guidelines for teacher professional development and curriculum redesign in an AI-assisted classroom landscape."},{id:"doc-6",title:"Predictive_Enterprise_Supply_Chain_Models.docx",folderId:"folder-business",folderName:"Business",type:"Word Document",size:"3.1 MB",date:"2026-08-15",tag:"Market Analysis",preview:"Predictive neural forecasting models for global supply chain resilience and inventory optimization."},{id:"doc-7",title:"Autonomous_Mobile_Robotics_SLAM_Review.pdf",folderId:"folder-engineering",folderName:"Engineering",type:"PDF",size:"5.4 MB",date:"2026-08-14",tag:"Engineering Review",preview:"Simultaneous Localization and Mapping (SLAM) advances with neural radiance fields and edge lidar fusion."},{id:"doc-8",title:"CRISPR_Target_Prediction_Neural_Networks.docx",folderId:"folder-science",folderName:"Science",type:"Word Document",size:"4.8 MB",date:"2026-08-12",tag:"Genomics Paper",preview:"Deep learning models for predicting off-target cleavage sites in CRISPR-Cas9 and Cas12 genome engineering."}],papers:[{id:"p-101",title:"SocraticLM: Fostering Critical Inquiry via Dialectical AI Guidance",authors:"Chen, M., Rostova, E., & Patel, A.",domain:"AI & Machine Learning",folderId:"folder-ai-ml",folderName:"AI & Machine Learning",source:"Nature Human Behaviour",year:"2025",citations:184,saved:!0,description:"Constrained decoding paradigm designed to guide learners toward self-discovery rather than direct answer provision."},{id:"p-102",title:"Longitudinal Study on AI-Driven Feedback in STEM Problem Sets",authors:"Vance, D. K., Thorne, S. J.",domain:"AI & Machine Learning",folderId:"folder-ai-ml",folderName:"AI & Machine Learning",source:"IEEE TLT",year:"2025",citations:92,saved:!0,description:"Four-semester deployment analyzing student interaction patterns with automated code and math reasoning explainers."},{id:"p-103",title:"Med-Multimodal: Zero-Shot Multi-Organ Radiology Interpretation",authors:"Rajpurkar, P., Chen, L., et al.",domain:"Healthcare",folderId:"folder-healthcare",folderName:"Healthcare",source:"NEJM AI",year:"2025",citations:312,saved:!0,description:"Open-weight 14B medical foundation model trained on paired DICOM imaging and pathologist reports across 24 pathologies."},{id:"p-104",title:"Benchmarking Post-Quantum TLS 1.3 in High-Frequency Cloud Infrastructure",authors:"Kaufman, H., Schmidt, R.",domain:"Computer Science",folderId:"folder-cs",folderName:"Computer Science",source:"IEEE S&P",year:"2025",citations:88,saved:!0,description:"Throughput and latency evaluation of ML-KEM-768 and ML-DSA-65 across global cloud and edge infrastructure."},{id:"p-105",title:"Adaptive Spaced Repetition Algorithms in High School Mathematics",authors:"Kovacs, T., Lindqvist, B.",domain:"Education",folderId:"folder-education",folderName:"Education",source:"Computers & Education",year:"2024",citations:64,saved:!1,description:"Empirical study assessing retention trajectories under dynamic neural spaced repetition vs standard static schedules."},{id:"p-106",title:"Transformer-Driven Inventory Optimization under High Volatility",authors:"Alvarez, G., Zhao, W.",domain:"Business",folderId:"folder-business",folderName:"Business",source:"Harvard Business Review AI",year:"2025",citations:118,saved:!1,description:"Predictive attention networks for multi-echelon inventory allocation in disrupted international freight networks."},{id:"p-107",title:"Neural Radiance Fields for Zero-Latency Robotic Navigation in Degraded Environments",authors:"O'Connor, S., Miller, D.",domain:"Engineering",folderId:"folder-engineering",folderName:"Engineering",source:"Robotics and Autonomous Systems",year:"2026",citations:41,saved:!1,description:"Real-time 3D Gaussian splatting and NeRF models executing on embedded NPU chips for warehouse AGVs."}],history:[{group:"Today",domain:"AI & Machine Learning",folderId:"folder-ai-ml",items:[{id:"impact-of-ai-on-education",title:"Impact of AI on Education & Adaptive Learning",time:"10:14 AM"},{id:"generative-ai-trends",title:"Generative AI Trends & Small Language Models",time:"09:30 AM"}]},{group:"Today",domain:"Healthcare",folderId:"folder-healthcare",items:[{id:"applications-of-ai-in-healthcare",title:"Applications of AI in Clinical Healthcare & Diagnostics",time:"09:15 AM"}]},{group:"Yesterday",domain:"Computer Science",folderId:"folder-cs",items:[{id:"quantum-computing-cryptography",title:"Post-Quantum Cryptography & Quantum Computing Algorithms",time:"02:10 PM"},{id:"distributed-consensus-pqc",title:"Distributed Consensus under Post-Quantum Cryptography",time:"11:45 AM"}]},{group:"Previous 7 Days",domain:"Education",folderId:"folder-education",items:[{id:"pedagogy-ai-classrooms",title:"AI Literacy & Socratic Methods in Higher Education",time:"Aug 20"}]}]};typeof window<"u"&&(window.AURQO_INITIAL_DATA=E);const o={theme:localStorage.getItem("aurqo_theme")||"light",activeFolderId:E.activeFolderId,currentView:"dashboard",activeResearchId:"impact-of-ai-on-education",activeWorkspaceTab:"overview",folders:JSON.parse(JSON.stringify(E.folders)),researchItems:JSON.parse(JSON.stringify(E.researchItems)),documents:JSON.parse(JSON.stringify(E.documents)),papers:JSON.parse(JSON.stringify(E.papers)),history:JSON.parse(JSON.stringify(E.history)),pendingResearchQuery:null,pendingSuggestedDomain:null,isResearchRunning:!1},l={folder:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',file:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>',sparkle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>',check:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>',lightbulb:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-indigo)" stroke-width="2"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"></path></svg>'},e={};function q(){_(),W(o.theme),C(),N(),B(),$(),j(),F(),U(),o.researchItems[o.activeResearchId]&&L(o.researchItems[o.activeResearchId])}function _(){e.body=document.body,e.themeToggleBtn=document.getElementById("theme-toggle-btn"),e.topFolderBtn=document.getElementById("top-folder-btn"),e.topFolderName=document.getElementById("top-folder-name"),e.folderPopover=document.getElementById("folder-popover"),e.folderPopoverList=document.getElementById("folder-popover-list"),e.currentFolderBannerName=document.getElementById("current-folder-banner-name"),e.topBreadcrumbFolder=document.getElementById("top-breadcrumb-folder"),e.mainResearchInput=document.getElementById("main-research-input"),e.mainResearchSubmitBtn=document.getElementById("main-research-submit-btn"),e.mainResearchClearBtn=document.getElementById("main-research-clear-btn"),e.samplePromptPills=document.querySelectorAll(".prompt-pill"),e.btnImportWord=document.getElementById("btn-action-import-word"),e.btnExplore=document.getElementById("btn-action-explore"),e.btnSources=document.getElementById("btn-action-sources"),e.btnChatAI=document.getElementById("btn-action-chat-ai"),e.researchLoadingOverlay=document.getElementById("research-loading-overlay"),e.loaderQueryBadge=document.getElementById("loader-query-badge"),e.progressBarFill=document.getElementById("progress-bar-fill"),e.loadingStagesContainer=document.getElementById("loading-stages-container"),e.resultsWorkspace=document.getElementById("results-workspace"),e.workspaceFolderPath=document.getElementById("workspace-folder-path"),e.resultTitle=document.getElementById("result-main-title"),e.resultDate=document.getElementById("result-date"),e.resultQuery=document.getElementById("result-query-meta"),e.btnSaveResearch=document.getElementById("btn-save-research"),e.btnCopyResearch=document.getElementById("btn-copy-research"),e.btnExportResearch=document.getElementById("btn-export-research"),e.btnShareResearch=document.getElementById("btn-share-research"),e.btnRegenerateResearch=document.getElementById("btn-regenerate-research"),e.btnContinueAI=document.getElementById("btn-continue-ai"),e.workspaceTabBtns=document.querySelectorAll(".workspace-tab-btn"),e.tabPanels=document.querySelectorAll(".tab-panel"),e.createFolderModal=document.getElementById("modal-create-folder"),e.importWordModal=document.getElementById("modal-import-word"),e.uploadDocModal=document.getElementById("modal-upload-doc"),e.domainDetectModal=document.getElementById("modal-domain-detect"),e.shareModal=document.getElementById("modal-share"),e.exportModal=document.getElementById("modal-export"),e.createFolderForm=document.getElementById("create-folder-form"),e.newResearchForm=document.getElementById("start-new-research-form"),e.sidebarNavItems=document.querySelectorAll(".nav-item, .nav-sub-item"),e.mobileMenuToggle=document.getElementById("mobile-menu-toggle"),e.sidebar=document.querySelector(".sidebar"),e.toastContainer=document.getElementById("toast-container")}function I(){return o.folders.find(t=>t.id===o.activeFolderId)||o.folders[0]}function W(t){o.theme=t,t==="dark"?(e.body.setAttribute("data-theme","dark"),e.themeToggleBtn.innerHTML=`
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `):(e.body.removeAttribute("data-theme"),e.themeToggleBtn.innerHTML=`
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `),localStorage.setItem("aurqo_theme",t)}function C(){const t=I();e.topFolderName&&(e.topFolderName.textContent=t.name),e.currentFolderBannerName&&(e.currentFolderBannerName.innerHTML=`
      ${l.folder}
      <span>${t.name}</span>
    `),e.topBreadcrumbFolder&&(e.topBreadcrumbFolder.textContent=t.name),e.folderPopoverList&&(e.folderPopoverList.innerHTML=o.folders.map(n=>`
      <div class="folder-popover-item ${n.id===o.activeFolderId?"active":""}" data-folder-id="${n.id}">
        <div style="display: flex; align-items: center; gap: 8px;">
          ${l.folder}
          <span>${n.name}</span>
        </div>
        <span style="font-size: 0.76rem; opacity: 0.7;">${n.documentCount||0} docs</span>
      </div>
    `).join(""),e.folderPopoverList.querySelectorAll(".folder-popover-item").forEach(n=>{n.addEventListener("click",()=>{const r=n.getAttribute("data-folder-id");D(r),e.folderPopover.classList.remove("active")})})),document.querySelectorAll("select.folder-select-dropdown").forEach(n=>{n.innerHTML=o.folders.map(r=>`
      <option value="${r.id}" ${r.id===o.activeFolderId?"selected":""}>${r.name}</option>
    `).join("")})}function D(t){o.activeFolderId=t;const i=I();C(),N(),B(),$(),Q(),h(`Switched active folder to: ${i.name}`,l.folder)}function V(t,i,n){const r="folder-"+t.toLowerCase().replace(/[^a-z0-9]/g,"-"),s={id:r,name:t,domain:i||t,icon:"folder",color:"#4f46e5",description:n||`Research folder for ${t}`,documentCount:0,createdAt:new Date().toISOString().split("T")[0]};o.folders.push(s),D(r),C(),B(),M(e.createFolderModal),h(`Created research folder: "${t}"`,l.check)}function J(t){const i=t.toLowerCase();for(const[n,r]of Object.entries(E.domainKeywords))for(const s of r)if(i.includes(s))return n;return null}function N(){const t=I(),i=o.researchItems[o.activeResearchId]?o.researchItems[o.activeResearchId].title:"Active Research Topic",n=document.getElementById("domain-tree-flow-container");n&&(n.innerHTML=`
    <div class="tree-node active-folder">
      ${l.folder}
      <span>${t.name}</span>
    </div>
    <span class="tree-arrow">❯</span>
    <div class="tree-node">
      ${l.file}
      <span>${i}</span>
    </div>
    <span class="tree-arrow">❯</span>
    <div class="tree-node" style="font-size: 0.8rem; background: var(--bg-surface-active); color: var(--primary-indigo);">
      Research • Papers • Sources • AI Chat • Notes • Saved
    </div>
  `)}const z=[{title:"Understanding your research question",duration:600},{title:"Finding relevant sources & academic databases",duration:700},{title:"Discovering peer-reviewed research papers",duration:750},{title:"Analyzing and synthesizing information",duration:800},{title:"Comparing empirical findings & datasets",duration:650},{title:"Organizing knowledge into research folder",duration:600},{title:"Generating structured insights & executive summary",duration:550}];function R(t,i){if(!t||t.trim()==="")return;const n=J(t),r=I();if(n&&n!==r.domain&&!i){o.pendingResearchQuery=t,o.pendingSuggestedDomain=n;const s=document.getElementById("detected-domain-suggested"),d=document.getElementById("detected-domain-current");s&&(s.textContent=n),d&&(d.textContent=r.name),S(e.domainDetectModal);return}P(t,i||o.activeFolderId)}function P(t,i){o.isResearchRunning=!0;const n=o.folders.find(g=>g.id===i)||I();e.resultsWorkspace.classList.remove("active"),e.researchLoadingOverlay.classList.add("active"),e.loaderQueryBadge.textContent=`Query: "${t}"`,e.progressBarFill.style.width="0%",e.researchLoadingOverlay.scrollIntoView({behavior:"smooth",block:"center"}),e.loadingStagesContainer.innerHTML=z.map((g,m)=>`
    <div class="loading-stage-item ${m===0?"in-progress":"pending"}" id="stage-item-${m}">
      <div class="stage-icon-wrap">${m+1}</div>
      <div class="stage-text">${g.title}</div>
      <span class="stage-status-badge">${m===0?"Processing...":"Waiting"}</span>
    </div>
  `).join("");let r=0;const s=z.length;function d(){if(r>=s){K(t,n);return}const g=document.getElementById(`stage-item-${r}`);g&&(g.className="loading-stage-item in-progress",g.querySelector(".stage-status-badge").textContent="Analyzing...",g.querySelector(".stage-icon-wrap").innerHTML=l.sparkle);const m=Math.round((r+1)/s*100);e.progressBarFill.style.width=`${m}%`,setTimeout(()=>{g&&(g.className="loading-stage-item completed",g.querySelector(".stage-status-badge").textContent="Completed",g.querySelector(".stage-icon-wrap").innerHTML=l.check),r++,d()},z[r].duration)}d()}function K(t,i){o.isResearchRunning=!1,e.researchLoadingOverlay.classList.remove("active");const n="research-"+Date.now(),r=t.length>55?t.substring(0,55)+"...":t;let s;t.toLowerCase().includes("education")||t.toLowerCase().includes("learn")?(s=JSON.parse(JSON.stringify(E.researchItems["impact-of-ai-on-education"])),s.id=n,s.query=t,s.folderId=i.id,s.domain=i.domain):t.toLowerCase().includes("health")||t.toLowerCase().includes("medical")?(s=JSON.parse(JSON.stringify(E.researchItems["applications-of-ai-in-healthcare"])),s.id=n,s.query=t,s.folderId=i.id,s.domain=i.domain):t.toLowerCase().includes("crypto")||t.toLowerCase().includes("quantum")?(s=JSON.parse(JSON.stringify(E.researchItems["quantum-computing-cryptography"])),s.id=n,s.query=t,s.folderId=i.id,s.domain=i.domain):s={id:n,folderId:i.id,domain:i.domain,title:r,query:t,date:new Date().toISOString().split("T")[0],saved:!0,overview:{summary:`Comprehensive research synthesis on "${t}". The integration of advanced computational models and empirical data analysis reveals significant efficiency gains, structural breakthroughs, and automated knowledge pipelines in the domain of ${i.domain}.`,takeaways:["Core Breakthroughs: Methodological advances demonstrate measurable performance scaling across multi-domain datasets.","Integration Strategies: Enterprise and academic cohorts report high adoption velocity when leveraging hybrid human-in-the-loop workflows.","Forward Outlook: Key research frontiers emphasize safety, latency reduction, and domain-adapted foundational fine-tuning."]},keyFindings:[{metric:"44.2%",title:"Performance Optimization",desc:"Empirical benchmarks indicate marked acceleration in task convergence and synthesis reliability."},{metric:"3.5x",title:"Workflow Efficiency",desc:"Automated analysis reduces literature review latency from days to structured real-time summaries."},{metric:"98.1%",title:"Verification Index",desc:"Cross-referenced against verified academic proceedings and peer-reviewed open archives."}],insights:[{tag:"Domain Synthesis",title:"Multi-Source Knowledge Distillation",text:`Analyzing ${i.name} literature shows an increasing convergence between domain-specific foundation architectures and localized indexing.`},{tag:"Practical Translation",title:"Scalable Deployment Protocols",text:"Practical application frameworks highlight the necessity of standardized benchmarking metrics and robust validation suites."}],sources:[{id:`src-${Date.now()}-1`,title:`Empirical Advances in ${i.domain}: A Systematic Review (2025-2026)`,type:"Academic Review",author:"Dr. A. Vance, Prof. E. Rostova",publisher:"Nature & Science Direct",doi:"10.1038/s41586-025-09124-x",year:"2025",url:"#",citation:`Vance, A., & Rostova, E. (2025). Empirical Advances in ${i.domain}. Nature, 612, 104-118.`},{id:`src-${Date.now()}-2`,title:`Algorithmic Scaling and Benchmark Protocols in ${i.name}`,type:"IEEE Conference",author:"J. Thorne, D. Miller, et al.",publisher:"IEEE Transactions on Emerging Technologies",doi:"10.1109/TET.2025.109283",year:"2025",url:"#",citation:`Thorne, J., et al. (2025). Algorithmic Scaling in ${i.name}. IEEE TET, 12(3), 89-102.`}],papers:[{id:`paper-${Date.now()}-1`,title:`Foundation Modeling and Practical Applications in ${i.domain}`,authors:"Kaufman, H., Chen, L., et al.",journal:"Journal of Applied AI & Engineering",year:"2025",citations:74,abstract:`We investigate the integration of transformer and diffusion architectures across specialized ${i.domain} datasets, demonstrating significant empirical gains over baseline heuristic approaches.`,downloadUrl:"#",domain:i.domain}],relatedTopics:[`Foundational Architectures in ${i.name}`,`Automated Validation Pipelines for ${i.domain}`,`Scalable Enterprise Deployment in ${i.domain}`,`Ethical and Privacy Standards in ${i.name}`],aiChat:[{sender:"user",text:`Summarize the key conclusions from this research on ${r}.`,timestamp:"Just now"},{sender:"ai",text:`Based on the latest analysis in your **${i.name}** folder:

1. **Accelerated Synthesis**: Research confirms consistent efficiency and diagnostic improvements.
2. **Verified Sources**: 2 high-impact academic sources and peer-reviewed papers have been indexed.
3. **Actionable Next Steps**: You can explore related topics, export this study to Word/PDF, or chat further about specific sections.`,timestamp:"Just now"}],notes:`Initial research notes on ${r}. Prepared automatically inside ${i.name}.`,documents:[]},o.researchItems[n]=s,o.activeResearchId=n,i.documentCount=(i.documentCount||0)+1,C(),o.history&&o.history[0]&&(o.history[0].items.unshift({id:n,title:s.title,time:"Just now"}),j()),L(s),h(`Research organized into "${i.name}"`,l.folder)}function L(t){if(!t)return;const i=o.folders.find(u=>u.id===t.folderId)||I();e.workspaceFolderPath.innerHTML=`
    ${l.folder}
    <span>${i.name}</span>
    <span>❯</span>
    ${l.file}
    <span>${t.title}</span>
  `,e.resultTitle.textContent=t.title,e.resultDate.textContent=`Date: ${t.date||"2026-08-25"}`,e.resultQuery.textContent=`Query: "${t.query||t.title}"`,t.saved?(e.btnSaveResearch.classList.add("saved"),e.btnSaveResearch.innerHTML=`
      ${l.check}
      <span>Saved in Folder</span>
    `):(e.btnSaveResearch.classList.remove("saved"),e.btnSaveResearch.innerHTML=`
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
      <span>Save to Folder</span>
    `);const n=document.getElementById("tab-panel-overview");n&&t.overview&&(n.innerHTML=`
      <div class="overview-summary-card">
        <div class="overview-heading">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary-indigo)" stroke-width="2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
          </svg>
          <span>AI Executive Synthesis</span>
        </div>
        <p class="overview-paragraph">${t.overview.summary}</p>
        
        <div style="font-weight: 700; font-size: 0.92rem; color: var(--text-main); margin-bottom: 8px;">Key Takeaways:</div>
        <ul class="overview-takeaways-list">
          ${t.overview.takeaways.map(u=>`
            <li class="overview-takeaway-item">
              <div class="takeaway-dot"></div>
              <div>${u}</div>
            </li>
          `).join("")}
        </ul>
      </div>

      <div class="section-subtitle-bar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
        <span>Key Empirical Findings</span>
      </div>
      <div class="key-findings-grid">
        ${(t.keyFindings||[]).map(u=>`
          <div class="finding-card">
            <div class="finding-metric">${u.metric}</div>
            <div class="finding-title">${u.title}</div>
            <div class="finding-desc">${u.desc}</div>
          </div>
        `).join("")}
      </div>

      <div class="section-subtitle-bar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span>Important Insights & Analysis</span>
      </div>
      <div class="insights-container">
        ${(t.insights||[]).map(u=>`
          <div class="insight-callout-card">
            <div class="insight-icon">${l.lightbulb}</div>
            <div class="insight-content">
              <span class="insight-tag">${u.tag}</span>
              <div class="insight-title">${u.title}</div>
              <div class="insight-text">${u.text}</div>
            </div>
          </div>
        `).join("")}
      </div>

      <div class="related-topics-wrap">
        <div style="font-weight: 700; font-size: 0.94rem; color: var(--text-main);">Related Research Exploration Topics:</div>
        <div class="related-pills-list">
          ${(t.relatedTopics||[]).map(u=>`
            <div class="related-topic-pill" data-topic="${u}">
              ${l.sparkle}
              <span>${u}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,n.querySelectorAll(".related-topic-pill").forEach(u=>{u.addEventListener("click",()=>{const p=u.getAttribute("data-topic");e.mainResearchInput.value=p,R(p,i.id)})}));const r=document.getElementById("tab-panel-papers");if(r){const u=t.papers||[];r.innerHTML=`
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <div style="font-size: 1.05rem; font-weight: 700;">Academic & Peer-Reviewed Papers (${u.length})</div>
        <button class="btn-quick-action" id="btn-find-more-papers" style="padding: 6px 14px; font-size: 0.82rem;">
          <span>Search Global Paper Index</span>
        </button>
      </div>
      <div class="cards-list-grid">
        ${u.map(v=>`
          <div class="paper-card">
            <div>
              <div class="card-top-meta">
                <span class="badge-domain">${i.name}</span>
                <span class="badge-year">Year: ${v.year} • ${v.citations} citations</span>
              </div>
              <div class="card-title" style="margin-top: 10px;">${v.title}</div>
              <div class="card-authors" style="margin-top: 4px;">${v.authors} — <i>${v.journal}</i></div>
              <div class="card-abstract" style="margin-top: 10px;">${v.abstract}</div>
            </div>
            <div class="card-footer-actions">
              <button class="btn-card-action btn-open-paper-sim">View Full Text</button>
              <button class="btn-card-action btn-chat-paper-sim">Chat with Paper</button>
              <button class="btn-card-action btn-cite-paper-sim">Cite</button>
            </div>
          </div>
        `).join("")}
      </div>
    `,r.querySelectorAll(".btn-open-paper-sim").forEach(v=>{v.addEventListener("click",()=>{h("Opening paper viewer simulation...",l.file)})}),r.querySelectorAll(".btn-chat-paper-sim").forEach(v=>{v.addEventListener("click",()=>{x("chat")})}),r.querySelectorAll(".btn-cite-paper-sim").forEach(v=>{v.addEventListener("click",()=>{navigator.clipboard.writeText(`Citation: ${t.title} (${i.name})`),h("Citation copied in APA format!",l.check)})});const p=document.getElementById("btn-find-more-papers");p&&p.addEventListener("click",()=>k("papers"))}const s=document.getElementById("tab-panel-documents");if(s){const u=t.documents||[];s.innerHTML=`
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
        <div style="font-size: 1.05rem; font-weight: 700;">Research Documents & Word Files (${u.length})</div>
        <div style="display: flex; gap: 8px;">
          <button class="btn-quick-action" id="btn-tab-import-word" style="padding: 6px 14px; font-size: 0.82rem;">
            <span>Import from Word (.docx)</span>
          </button>
          <button class="btn-quick-action" id="btn-tab-upload-doc" style="padding: 6px 14px; font-size: 0.82rem;">
            <span>Upload Document</span>
          </button>
        </div>
      </div>
      ${u.length===0?`
        <div style="text-align: center; padding: 40px 20px; background: var(--bg-surface-subtle); border-radius: var(--radius-lg); border: 1px dashed var(--border-light);">
          <div style="display: flex; justify-content: center; margin-bottom: 10px;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          </div>
          <div style="font-weight: 700; font-size: 1.05rem; margin-bottom: 4px;">No Word documents attached yet</div>
          <div style="font-size: 0.88rem; color: var(--text-muted); max-width: 420px; margin: 0 auto 16px auto;">
            Upload a .doc, .docx or PDF file to connect your external research directly to this <b>${i.name}</b> project.
          </div>
          <button class="btn-getstarted" id="btn-empty-import-word" style="padding: 8px 18px; font-size: 0.86rem;">
            Import Word Document Now
          </button>
        </div>
      `:`
        <div class="cards-list-grid">
          ${u.map(y=>`
            <div class="paper-card">
              <div>
                <div class="card-top-meta">
                  <span class="badge-domain">${y.type.toUpperCase()}</span>
                  <span class="badge-year">${y.size} • ${y.updatedAt}</span>
                </div>
                <div class="card-title" style="margin-top: 10px;">${y.name}</div>
                <div class="card-abstract" style="margin-top: 8px;">${y.preview}</div>
              </div>
              <div class="card-footer-actions">
                <button class="btn-card-action btn-preview-doc-sim">View Outline</button>
                <button class="btn-card-action btn-ask-doc-sim">Ask AI</button>
                <button class="btn-card-action btn-dl-doc-sim">Download</button>
              </div>
            </div>
          `).join("")}
        </div>
      `}
    `;const p=document.getElementById("btn-tab-import-word"),v=document.getElementById("btn-empty-import-word"),w=document.getElementById("btn-tab-upload-doc");p&&p.addEventListener("click",()=>S(e.importWordModal)),v&&v.addEventListener("click",()=>S(e.importWordModal)),w&&w.addEventListener("click",()=>S(e.uploadDocModal)),s.querySelectorAll(".btn-preview-doc-sim").forEach(y=>{y.addEventListener("click",()=>h("Opening Word document outline preview...",l.file))}),s.querySelectorAll(".btn-ask-doc-sim").forEach(y=>{y.addEventListener("click",()=>x("chat"))}),s.querySelectorAll(".btn-dl-doc-sim").forEach(y=>{y.addEventListener("click",()=>h("Document downloaded successfully!",l.check))})}const d=document.getElementById("tab-panel-sources");if(d){const u=t.sources||[];d.innerHTML=`
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <div style="font-size: 1.05rem; font-weight: 700;">Verified & Academic Citations (${u.length})</div>
        <span style="font-size: 0.82rem; color: var(--text-muted);">Organized inside: <b>${i.name}</b></span>
      </div>
      <div class="cards-list-grid">
        ${u.map(p=>`
          <div class="source-card">
            <div>
              <div class="card-top-meta">
                <span class="badge-domain">${p.type}</span>
                <span class="badge-year">Year: ${p.year}</span>
              </div>
              <div class="card-title" style="margin-top: 8px;">${p.title}</div>
              <div class="card-authors" style="margin-top: 4px;">${p.author} — <b>${p.publisher}</b></div>
              <div style="font-size: 0.8rem; font-family: monospace; color: var(--primary-indigo); margin-top: 8px; word-break: break-all;">
                DOI: ${p.doi}
              </div>
              <div style="font-size: 0.82rem; background: var(--bg-surface-subtle); padding: 8px 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); margin-top: 10px; color: var(--text-secondary);">
                "${p.citation}"
              </div>
            </div>
            <div class="card-footer-actions">
              <button class="btn-card-action btn-copy-cit" data-cit="${p.citation}">Copy Citation</button>
              <button class="btn-card-action btn-open-src-url">View Source</button>
            </div>
          </div>
        `).join("")}
      </div>
    `,d.querySelectorAll(".btn-copy-cit").forEach(p=>{p.addEventListener("click",()=>{const v=p.getAttribute("data-cit");navigator.clipboard.writeText(v),h("Citation copied to clipboard!",l.check)})}),d.querySelectorAll(".btn-open-src-url").forEach(p=>{p.addEventListener("click",()=>{h("Opening verified academic publisher repository...",l.sparkle)})})}const g=document.getElementById("tab-panel-chat");if(g){let w=function(){const a=p.value.trim();a&&(p.value="",t.aiChat.push({sender:"user",text:a,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}),L(t),x("chat"),setTimeout(()=>{const c=document.getElementById("tab-chat-scroll");c&&(c.scrollTop=c.scrollHeight)},50),setTimeout(()=>{let c=`Analyzing your query against the active **${i.name}** repository:

`;a.toLowerCase().includes("summary")||a.toLowerCase().includes("summarize")?c+=`The core synthesis indicates that **${t.title}** produces consistent empirical advantages, accelerating task mastery while maintaining strict data governance.`:a.toLowerCase().includes("paper")||a.toLowerCase().includes("source")?c+=`Across the ${(t.papers||[]).length} indexed papers in this folder, peer-reviewed findings report a 98.1% verification index with sub-second retrieval accuracy.`:c+=`Regarding "${a}": The data in your **${i.name}** folder highlights three key pillars: methodological precision, cross-disciplinary validation, and seamless integration into practical workflows.`,t.aiChat.push({sender:"ai",text:c,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}),L(t),x("chat"),setTimeout(()=>{const f=document.getElementById("tab-chat-scroll");f&&(f.scrollTop=f.scrollHeight)},50)},600))};var A=w;const u=t.aiChat||[];g.innerHTML=`
      <div class="ai-chat-interface">
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="chat-avatar-ai">${l.sparkle}</div>
            <div>
              <div class="chat-header-title">AURQO Research Assistant</div>
              <div class="chat-header-sub">Connected to: <b>${i.name}</b> • Topic: <i>${t.title}</i></div>
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn-result-action" id="btn-clear-tab-chat" style="padding: 4px 10px; font-size: 0.78rem;">Clear</button>
            <button class="btn-result-action" id="btn-save-tab-chat" style="padding: 4px 10px; font-size: 0.78rem;">Save</button>
          </div>
        </div>
        <div class="chat-messages-scroll" id="tab-chat-scroll">
          ${u.map(a=>`
            <div class="chat-message ${a.sender==="user"?"user-message":"ai-message"}">
              <div class="chat-message-bubble">
                ${a.text.replace(/\n/g,"<br>")}
                <div style="font-size: 0.7rem; opacity: 0.65; margin-top: 4px; text-align: right;">${a.timestamp||""}</div>
              </div>
            </div>
          `).join("")}
        </div>
        <div class="chat-input-bar">
          <input type="text" class="chat-text-input" id="tab-chat-input" placeholder="Ask questions about this research, papers, or sources in ${i.name}...">
          <button class="btn-search-submit" id="btn-tab-chat-send" style="width: 38px; height: 38px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    `;const p=document.getElementById("tab-chat-input"),v=document.getElementById("btn-tab-chat-send");v&&v.addEventListener("click",w),p&&p.addEventListener("keydown",a=>{a.key==="Enter"&&w()});const y=document.getElementById("btn-clear-tab-chat");y&&y.addEventListener("click",()=>{t.aiChat=[],L(t),x("chat"),h("Chat history cleared",l.check)});const T=document.getElementById("btn-save-tab-chat");T&&T.addEventListener("click",()=>{h(`Conversation saved to folder: ${i.name}`,l.folder)})}const m=document.getElementById("tab-panel-notes");if(m){m.innerHTML=`
      <div class="notes-container">
        <div class="notes-toolbar">
          <div style="font-weight: 700; font-size: 1.05rem;">Project Annotations & Synthesis Notes</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);" id="notes-save-indicator">
            Auto-saved to: <b>${i.name}</b>
          </div>
        </div>
        <textarea class="notes-editor-area" id="research-notes-textarea" placeholder="Add custom observations, literature synthesis, hypothesis statements, or citation notes for this research...">${t.notes||""}</textarea>
        <div style="display: flex; justify-content: flex-end; margin-top: 14px; gap: 8px;">
          <button class="btn-result-action" id="btn-export-notes">Export Notes</button>
          <button class="btn-getstarted" id="btn-manual-save-notes" style="padding: 6px 16px; font-size: 0.84rem;">Save Notes</button>
        </div>
      </div>
    `;const u=document.getElementById("research-notes-textarea"),p=document.getElementById("notes-save-indicator");u&&u.addEventListener("input",()=>{t.notes=u.value,p&&(p.innerHTML="<i>Saving changes...</i>"),setTimeout(()=>{p&&(p.innerHTML=`Auto-saved to: <b>${i.name}</b>`)},400)});const v=document.getElementById("btn-manual-save-notes");v&&v.addEventListener("click",()=>{h("Notes saved to research folder!",l.check)});const w=document.getElementById("btn-export-notes");w&&w.addEventListener("click",()=>{navigator.clipboard.writeText(t.notes||""),h("Notes copied to clipboard as text!",l.check)})}e.resultsWorkspace.classList.add("active"),x(o.activeWorkspaceTab),N()}function x(t){o.activeWorkspaceTab=t,e.workspaceTabBtns.forEach(i=>{i.getAttribute("data-tab")===t?i.classList.add("active"):i.classList.remove("active")}),e.tabPanels.forEach(i=>{i.id===`tab-panel-${t}`?i.classList.add("active"):i.classList.remove("active")})}function B(){const t=document.getElementById("library-folders-grid"),i=document.getElementById("library-docs-list");if(t&&(t.innerHTML=o.folders.map(n=>`
    <div class="folder-card ${n.id===o.activeFolderId?"active-folder-card":""}" data-folder-id="${n.id}">
      <div class="folder-card-top">
        <div class="folder-card-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <span class="badge-domain">${n.domain}</span>
      </div>
      <div class="folder-card-name">${n.name}</div>
      <div class="folder-card-desc">${n.description}</div>
      <div class="folder-card-count">
        ${l.file}
        <span>${n.documentCount||0} Documents</span>
        ${n.id===o.activeFolderId?'<span style="margin-left: auto; color: var(--primary-indigo); font-weight: 700;">Active</span>':""}
      </div>
    </div>
  `).join(""),t.querySelectorAll(".folder-card").forEach(n=>{n.addEventListener("click",()=>{const r=n.getAttribute("data-folder-id");D(r),B()})}),i)){const n=I(),r=o.documents.filter(d=>d.folderId===o.activeFolderId),s=document.getElementById("library-active-folder-badge");s&&(s.textContent=`Active: ${n.name} (${r.length} items)`),r.length===0?i.innerHTML=`
        <div style="text-align: center; padding: 36px 20px; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-light);">
          <div style="display: flex; justify-content: center; margin-bottom: 8px;">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <div style="font-weight: 700; color: var(--text-main);">No documents in ${n.name}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">Click "Import from Word" or "Upload Document" to populate this folder.</div>
        </div>
      `:(i.innerHTML=r.map(d=>`
        <div class="paper-card" style="margin-bottom: 12px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 36px; height: 36px; border-radius: var(--radius-md); background: var(--bg-surface-active); color: var(--primary-indigo); display: flex; align-items: center; justify-content: center; font-size: 1.1rem;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              </div>
              <div>
                <div style="font-weight: 700; font-size: 0.98rem; color: var(--text-main);">${d.title}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">
                  Folder: ${d.folderName} • Size: ${d.size} • Date: ${d.date} • <span class="badge-domain" style="padding: 1px 6px; font-size: 0.7rem;">${d.tag}</span>
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="btn-card-action btn-lib-view">View</button>
              <button class="btn-card-action btn-lib-chat">Chat</button>
              <button class="btn-card-action btn-lib-dl">Download</button>
            </div>
          </div>
          <div style="font-size: 0.86rem; color: var(--text-secondary); margin-top: 10px; line-height: 1.45;">
            ${d.preview}
          </div>
        </div>
      `).join(""),i.querySelectorAll(".btn-lib-view").forEach(d=>{d.addEventListener("click",()=>h("Opening document viewer outline...",l.file))}),i.querySelectorAll(".btn-lib-chat").forEach(d=>{d.addEventListener("click",()=>k("chat"))}),i.querySelectorAll(".btn-lib-dl").forEach(d=>{d.addEventListener("click",()=>h("Downloading document file...",l.check))}))}}function $(){const t=document.getElementById("papers-search-results-grid"),i=document.getElementById("papers-search-input"),n=document.getElementById("filter-paper-domain");if(!t)return;n&&n.options.length<=1&&(n.innerHTML='<option value="all">All Domains & Folders</option>'+o.folders.map(m=>`<option value="${m.domain}">${m.name}</option>`).join(""));const r=i?i.value.toLowerCase().trim():"",s=n?n.value:"all",d=o.papers.filter(m=>{const A=!r||m.title.toLowerCase().includes(r)||m.authors.toLowerCase().includes(r)||m.description.toLowerCase().includes(r),u=s==="all"||m.domain===s;return A&&u}),g=document.getElementById("papers-count-label");g&&(g.textContent=`Showing ${d.length} peer-reviewed papers`),d.length===0?t.innerHTML=`
      <div style="text-align: center; padding: 40px; grid-column: 1 / -1; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-light);">
        <div style="display: flex; justify-content: center; margin-bottom: 8px;">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <div style="font-weight: 700; color: var(--text-main);">No papers found matching your criteria</div>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">Try searching for "AI", "Socratic", "Quantum", or "Radiology".</div>
      </div>
    `:(t.innerHTML=d.map(m=>`
      <div class="paper-card">
        <div>
          <div class="card-top-meta">
            <span class="badge-domain">${m.folderName}</span>
            <span class="badge-year">Year: ${m.year} • ${m.citations} citations</span>
          </div>
          <div class="card-title" style="margin-top: 10px;">${m.title}</div>
          <div class="card-authors" style="margin-top: 4px;">${m.authors} — <i>${m.source}</i></div>
          <div class="card-abstract" style="margin-top: 10px;">${m.description}</div>
        </div>
        <div class="card-footer-actions">
          <button class="btn-card-action btn-open-paper-finder">Open</button>
          <button class="btn-card-action btn-chat-paper-finder">Chat with AI</button>
          <button class="btn-card-action btn-save-paper-finder ${m.saved?"saved":""}">
            ${m.saved?"Saved":"Save"}
          </button>
        </div>
      </div>
    `).join(""),t.querySelectorAll(".btn-open-paper-finder").forEach(m=>{m.addEventListener("click",()=>h("Opening paper viewer simulation...",l.file))}),t.querySelectorAll(".btn-chat-paper-finder").forEach(m=>{m.addEventListener("click",()=>k("chat"))}),t.querySelectorAll(".btn-save-paper-finder").forEach((m,A)=>{m.addEventListener("click",()=>{d[A].saved=!d[A].saved,$(),F(),h(d[A].saved?"Paper saved to folder!":"Paper removed from saved list",l.folder)})}))}function Q(){const t=I(),i=document.getElementById("dedicated-chat-subtitle");i&&(i.innerHTML=`Active Context: <b>${t.name}</b> (${t.domain})`)}function H(){const t=document.getElementById("dedicated-chat-input"),i=document.getElementById("dedicated-chat-messages");if(!t||!i)return;const n=t.value.trim();if(!n)return;t.value="";const r=I(),s=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),d=document.createElement("div");d.className="chat-message user-message",d.innerHTML=`
    <div class="chat-message-bubble">
      ${n}
      <div style="font-size: 0.7rem; opacity: 0.65; margin-top: 4px; text-align: right;">${s}</div>
    </div>
  `,i.appendChild(d),i.scrollTop=i.scrollHeight,setTimeout(()=>{const g=document.createElement("div");g.className="chat-message ai-message";let m=`Here is a summary of the research papers and documents saved in your **${r.name}** folder:

`;n.toLowerCase().includes("summarize")||n.toLowerCase().includes("summary")?m+=`1. **Core Findings**: The indexed papers demonstrate high empirical reliability and structured cognitive gain metrics.
2. **Active Documents**: There are currently ${r.documentCount} research artifacts filed under ${r.domain}.
3. **Recommendations**: You can export these findings or cross-reference citations with the Document Library.`:m+=`Regarding "${n}":

- In the context of **${r.name}**, empirical literature emphasizes algorithmic robustness and standardized benchmark reproducibility.
- All references are linked directly to your active workspace folder.`,g.innerHTML=`
      <div class="chat-message-bubble">
        ${m.replace(/\n/g,"<br>")}
        <div style="font-size: 0.7rem; opacity: 0.65; margin-top: 4px; text-align: right;">${s}</div>
      </div>
    `,i.appendChild(g),i.scrollTop=i.scrollHeight},600)}function j(){const t=document.getElementById("history-timeline-container");t&&(t.innerHTML=o.history.map(i=>`
    <div class="history-section-group">
      <div class="history-group-title">${i.group}</div>
      <div class="history-domain-block">
        <div class="history-domain-header">
          ${l.folder}
          <span>${i.domain}</span>
        </div>
        ${i.items.map(n=>`
          <div class="history-item-row" data-research-id="${n.id}">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--primary-indigo); font-size: 0.75rem;">●</span>
              <span style="font-weight: 500; font-size: 0.92rem;">${n.title}</span>
            </div>
            <span style="font-size: 0.78rem; color: var(--text-light);">${n.time}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `).join(""),t.querySelectorAll(".history-item-row").forEach(i=>{i.addEventListener("click",()=>{const n=i.getAttribute("data-research-id");if(o.researchItems[n]){o.activeResearchId=n;const r=o.researchItems[n];o.activeFolderId=r.folderId,C(),L(r),k("dashboard"),h(`Reopened research workspace: ${r.title}`,l.file)}})}))}function F(){const t=document.getElementById("saved-items-container");if(!t)return;const i=Object.values(o.researchItems).filter(r=>r.saved),n=o.papers.filter(r=>r.saved);t.innerHTML=`
    <div style="margin-bottom: 24px;">
      <div style="font-size: 1.15rem; font-weight: 700; margin-bottom: 12px;">Saved Research Workspaces (${i.length})</div>
      <div class="cards-list-grid">
        ${i.map(r=>`
            <div class="paper-card">
              <div>
                <div class="card-top-meta">
                  <span class="badge-domain">${(o.folders.find(d=>d.id===r.folderId)||I()).name}</span>
                  <span class="badge-year">Date: ${r.date}</span>
                </div>
                <div class="card-title" style="margin-top: 10px;">${r.title}</div>
                <div class="card-abstract" style="margin-top: 8px;">${r.overview?r.overview.summary:""}</div>
              </div>
              <div class="card-footer-actions">
                <button class="btn-card-action btn-reopen-saved" data-id="${r.id}">Open Workspace →</button>
              </div>
            </div>
          `).join("")}
      </div>
    </div>

    <div>
      <div style="font-size: 1.15rem; font-weight: 700; margin-bottom: 12px;">Saved Academic Papers (${n.length})</div>
      <div class="cards-list-grid">
        ${n.map(r=>`
          <div class="paper-card">
            <div>
              <div class="card-top-meta">
                <span class="badge-domain">${r.folderName}</span>
                <span class="badge-year">Year: ${r.year}</span>
              </div>
              <div class="card-title" style="margin-top: 10px;">${r.title}</div>
              <div class="card-authors" style="margin-top: 4px;">${r.authors} — <i>${r.source}</i></div>
            </div>
            <div class="card-footer-actions">
              <button class="btn-card-action btn-unsave-paper" data-id="${r.id}">Remove from Saved</button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `,t.querySelectorAll(".btn-reopen-saved").forEach(r=>{r.addEventListener("click",()=>{const s=r.getAttribute("data-id");o.researchItems[s]&&(o.activeResearchId=s,o.activeFolderId=o.researchItems[s].folderId,C(),L(o.researchItems[s]),k("dashboard"))})}),t.querySelectorAll(".btn-unsave-paper").forEach(r=>{r.addEventListener("click",()=>{const s=r.getAttribute("data-id"),d=o.papers.find(g=>g.id===s);d&&(d.saved=!1,F(),$(),h("Paper removed from saved list",l.check))})})}function k(t){o.currentView=t,e.sidebarNavItems.forEach(i=>{i.getAttribute("data-view")===t?i.classList.add("active"):i.classList.remove("active")}),document.querySelectorAll(".page-view").forEach(i=>{i.id===`view-${t}`?i.classList.add("active"):i.classList.remove("active")}),e.sidebar.classList.contains("mobile-open")&&e.sidebar.classList.remove("mobile-open"),window.scrollTo({top:0,behavior:"smooth"})}function S(t){t&&t.classList.add("active")}function M(t){t&&t.classList.remove("active")}function h(t,i){if(!e.toastContainer)return;const n=document.createElement("div");n.className="toast",n.innerHTML=`
    <span style="display: flex; align-items: center;">${i||l.sparkle}</span>
    <span>${t}</span>
  `,e.toastContainer.appendChild(n),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateY(12px)",n.style.transition="all 0.3s ease",setTimeout(()=>n.remove(),300)},3200)}function U(){e.themeToggleBtn.addEventListener("click",()=>{W(o.theme==="light"?"dark":"light"),h(`Switched to ${o.theme} mode`,l.sparkle)}),e.topFolderBtn.addEventListener("click",a=>{a.stopPropagation(),e.folderPopover.classList.toggle("active")}),document.addEventListener("click",a=>{!e.folderPopover.contains(a.target)&&!e.topFolderBtn.contains(a.target)&&e.folderPopover.classList.remove("active")}),document.querySelectorAll(".btn-trigger-create-folder").forEach(a=>{a.addEventListener("click",()=>{e.folderPopover.classList.remove("active"),S(e.createFolderModal)})}),e.createFolderForm&&e.createFolderForm.addEventListener("submit",a=>{a.preventDefault();const c=document.getElementById("new-folder-name"),f=document.getElementById("new-folder-domain"),b=document.getElementById("new-folder-desc");c&&c.value.trim()&&(V(c.value.trim(),f?f.value:"",b?b.value.trim():""),c.value="",b&&(b.value=""))}),e.mainResearchInput&&(e.mainResearchInput.addEventListener("input",()=>{e.mainResearchInput.value.trim()!==""?e.mainResearchClearBtn.classList.add("visible"):e.mainResearchClearBtn.classList.remove("visible")}),e.mainResearchInput.addEventListener("keydown",a=>{a.key==="Enter"&&R(e.mainResearchInput.value.trim())})),e.mainResearchClearBtn&&e.mainResearchClearBtn.addEventListener("click",()=>{e.mainResearchInput.value="",e.mainResearchClearBtn.classList.remove("visible"),e.mainResearchInput.focus()}),e.mainResearchSubmitBtn&&e.mainResearchSubmitBtn.addEventListener("click",()=>{R(e.mainResearchInput.value.trim())}),e.samplePromptPills.forEach(a=>{a.addEventListener("click",()=>{const c=a.textContent.replace(/^["“”]/,"").replace(/["“”]$/,"").trim();e.mainResearchInput.value=c,e.mainResearchClearBtn.classList.add("visible"),R(c)})}),e.btnImportWord&&e.btnImportWord.addEventListener("click",()=>S(e.importWordModal)),e.btnExplore&&e.btnExplore.addEventListener("click",()=>{k("dashboard"),x("overview"),e.resultsWorkspace.scrollIntoView({behavior:"smooth"}),h("Exploring current research topic and sources",l.sparkle)}),e.btnSources&&e.btnSources.addEventListener("click",()=>{k("dashboard"),x("sources"),e.resultsWorkspace.scrollIntoView({behavior:"smooth"}),h("Viewing verified citations for active research",l.file)}),e.btnChatAI&&e.btnChatAI.addEventListener("click",()=>{k("chat"),h("Opening contextual AI Chat workspace",l.sparkle)});const i=document.getElementById("btn-lib-import-word"),n=document.getElementById("btn-lib-upload-doc");i&&i.addEventListener("click",()=>S(e.importWordModal)),n&&n.addEventListener("click",()=>S(e.uploadDocModal));const r=document.getElementById("btn-domain-detect-create"),s=document.getElementById("btn-domain-detect-continue");r&&r.addEventListener("click",()=>{M(e.domainDetectModal);let a=o.folders.find(c=>c.domain===o.pendingSuggestedDomain);a||(a={id:"folder-"+o.pendingSuggestedDomain.toLowerCase().replace(/[^a-z0-9]/g,"-"),name:o.pendingSuggestedDomain,domain:o.pendingSuggestedDomain,icon:"folder",color:"#4f46e5",description:`Auto-created research folder for ${o.pendingSuggestedDomain}`,documentCount:0,createdAt:new Date().toISOString().split("T")[0]},o.folders.push(a)),D(a.id),P(o.pendingResearchQuery,a.id)}),s&&s.addEventListener("click",()=>{M(e.domainDetectModal),P(o.pendingResearchQuery,o.activeFolderId)});const d=document.getElementById("word-file-dropzone"),g=document.getElementById("word-file-input");d&&g&&(d.addEventListener("click",()=>g.click()),d.addEventListener("dragover",a=>{a.preventDefault(),d.classList.add("dragover")}),d.addEventListener("dragleave",()=>d.classList.remove("dragover")),d.addEventListener("drop",a=>{a.preventDefault(),d.classList.remove("dragover"),a.dataTransfer.files.length>0&&m(a.dataTransfer.files[0].name)}),g.addEventListener("change",()=>{g.files.length>0&&m(g.files[0].name)}));function m(a){const c=I();M(e.importWordModal);const f={id:"doc-"+Date.now(),title:a,folderId:c.id,folderName:c.name,type:"Word Document",size:"3.4 MB",date:new Date().toISOString().split("T")[0],tag:"Imported Word Doc",preview:`Imported from Word: Full manuscript text parsed and indexed directly into "${c.name}". Outline and references ready for AI synthesis.`};o.documents.unshift(f),c.documentCount=(c.documentCount||0)+1,o.researchItems[o.activeResearchId]&&(o.researchItems[o.activeResearchId].documents.unshift({id:f.id,name:a,type:"docx",size:"3.4 MB",updatedAt:"Just now",preview:f.preview}),L(o.researchItems[o.activeResearchId])),C(),B(),h(`Imported "${a}" into ${c.name}`,l.file)}const A=document.getElementById("upload-doc-form");A&&A.addEventListener("submit",a=>{a.preventDefault();const c=document.getElementById("upload-doc-title").value,f=document.getElementById("upload-doc-tag").value,b=I();M(e.uploadDocModal),o.documents.unshift({id:"doc-"+Date.now(),title:c,folderId:b.id,folderName:b.name,type:"PDF",size:"2.4 MB",date:new Date().toISOString().split("T")[0],tag:f,preview:`Uploaded research artifact indexed in ${b.name}. Ready for automated citations and chat.`}),b.documentCount=(b.documentCount||0)+1,B(),C(),h(`Uploaded "${c}" to ${b.name}`,l.check)}),e.btnSaveResearch&&e.btnSaveResearch.addEventListener("click",()=>{const a=o.researchItems[o.activeResearchId];if(a){a.saved=!a.saved,L(a),F();const c=o.folders.find(f=>f.id===a.folderId)||I();h(a.saved?`Saved to folder: ${c.name}`:"Removed from saved items",l.folder)}}),e.btnCopyResearch&&e.btnCopyResearch.addEventListener("click",()=>{const a=o.researchItems[o.activeResearchId];if(a){const c=`# ${a.title}
Folder: ${a.domain}

## Overview
${a.overview?a.overview.summary:""}

## Key Findings
${(a.keyFindings||[]).map(f=>`- ${f.title}: ${f.desc}`).join(`
`)}`;navigator.clipboard.writeText(c),h("Research markdown copied to clipboard!",l.check)}}),e.btnExportResearch&&e.btnExportResearch.addEventListener("click",()=>S(e.exportModal)),e.btnShareResearch&&e.btnShareResearch.addEventListener("click",()=>S(e.shareModal)),e.btnRegenerateResearch&&e.btnRegenerateResearch.addEventListener("click",()=>{const a=o.researchItems[o.activeResearchId];a&&P(a.query,a.folderId)}),e.btnContinueAI&&e.btnContinueAI.addEventListener("click",()=>{x("chat")}),e.workspaceTabBtns.forEach(a=>{a.addEventListener("click",()=>{const c=a.getAttribute("data-tab");x(c)})}),e.sidebarNavItems.forEach(a=>{a.addEventListener("click",c=>{const f=a.getAttribute("data-view");f&&(c.preventDefault(),k(f))})}),e.mobileMenuToggle&&e.mobileMenuToggle.addEventListener("click",()=>{e.sidebar.classList.toggle("mobile-open")}),document.querySelectorAll(".btn-modal-close, .btn-modal-cancel").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".modal-backdrop").forEach(c=>c.classList.remove("active"))})});const u=document.getElementById("papers-search-input"),p=document.getElementById("filter-paper-domain");u&&u.addEventListener("input",$),p&&p.addEventListener("change",$);const v=document.getElementById("btn-dedicated-chat-send"),w=document.getElementById("dedicated-chat-input"),y=document.getElementById("btn-dedicated-clear-chat");v&&v.addEventListener("click",H),w&&w.addEventListener("keydown",a=>{a.key==="Enter"&&H()}),y&&y.addEventListener("click",()=>{const a=document.getElementById("dedicated-chat-messages");a&&(a.innerHTML=`
          <div class="chat-message ai-message">
            <div class="chat-message-bubble">
              Chat cleared. How can I assist your research next?
            </div>
          </div>
        `),h("Chat history cleared",l.check)}),document.querySelectorAll(".chat-preset-chip").forEach(a=>{a.addEventListener("click",()=>{const c=a.getAttribute("data-prompt"),f=document.getElementById("dedicated-chat-input");f&&(f.value=c,H())})}),e.newResearchForm&&(e.newResearchForm.addEventListener("submit",a=>{a.preventDefault();const c=document.getElementById("new-research-topic"),f=document.getElementById("new-research-folder-select");if(c&&c.value.trim()){const b=c.value.trim(),O=f?f.value:o.activeFolderId;D(O),k("dashboard"),R(b,O)}}),document.querySelectorAll(".research-type-card").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".research-type-card").forEach(c=>c.classList.remove("selected")),a.classList.add("selected")})})),document.querySelectorAll(".btn-export-option").forEach(a=>{a.addEventListener("click",()=>{const c=a.getAttribute("data-format");M(e.exportModal),h(`Exported research as ${c.toUpperCase()} document!`,l.check)})});const T=document.getElementById("btn-copy-share-link");T&&T.addEventListener("click",()=>{navigator.clipboard.writeText(window.location.href),M(e.shareModal),h("Shareable research link copied to clipboard!",l.check)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",q):q();
