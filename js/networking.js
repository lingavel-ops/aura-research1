/**
 * THAMILI / AI Research - Researcher Networking & Private Chat Module
 * Frontend State, Recommendation Engine, Profile Setup, Connection Management, & 100-Word Private Chat
 */

// Default Seed Researchers
const INITIAL_RESEARCHERS = [
  {
    id: 'res-arun-kumar',
    name: 'Arun Kumar',
    professionalRole: 'AI Research Scientist',
    country: 'India',
    state: 'Tamil Nadu',
    district: 'Chennai',
    institution: 'IIT Madras · Center for AI & NLP',
    userId: '@arunkumar_ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    avatarBg: '#4f46e5',
    linkedin: 'https://www.linkedin.com/in/arunkumar-ai',
    instagram: 'https://www.instagram.com/arunkumar_ai',
    bio: 'Working on Multimodal Transformers, healthcare AI diagnostics, and low-resource Indic language reasoning.',
    researchInterests: ['Artificial Intelligence', 'Machine Learning', 'NLP', 'Healthcare AI'],
    recentResearchTopics: ['Clinical Diagnostic Foundation Models', 'Indic Language LLM Tokenizers', 'Chest X-ray Multi-label Classification'],
    isOnline: true
  },
  {
    id: 'res-priya-sundaram',
    name: 'Dr. Priya Sundaram',
    professionalRole: 'Bioinformatics & Clinical AI Lead',
    country: 'India',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    institution: 'PSG Institute of Medical Sciences & Research',
    userId: '@priya_bioai',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    avatarBg: '#059669',
    linkedin: 'https://www.linkedin.com/in/priya-sundaram-bioai',
    instagram: 'https://www.instagram.com/priya_bioai',
    bio: 'Pioneering predictive deep learning for oncology triaging and CRISPR off-target cleavage sequence verification.',
    researchInterests: ['Healthcare AI', 'Bioinformatics', 'Machine Learning', 'Medical Technology'],
    recentResearchTopics: ['Radiology AI Workflow Integration', 'CRISPR Target Prediction Neural Nets', 'Electronic Health Record Summarization'],
    isOnline: true
  },
  {
    id: 'res-rajesh-raman',
    name: 'Rajesh Raman',
    professionalRole: 'Quantum Cryptography Researcher',
    country: 'India',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    institution: 'IISc Bangalore · Quantum Computing Lab',
    userId: '@rajesh_pqc',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    avatarBg: '#2563eb',
    linkedin: 'https://www.linkedin.com/in/rajesh-raman-pqc',
    instagram: 'https://www.instagram.com/rajesh_pqc',
    bio: 'Investigating post-quantum lattice-based key encapsulation protocols (ML-KEM, ML-DSA) for secure communications.',
    researchInterests: ['Computer Science', 'Quantum Computing', 'Cryptography', 'Algorithms'],
    recentResearchTopics: ['NIST FIPS 203 Hybrid Handshakes', 'Lattice Cryptoprocessors for TLS 1.3', 'Fault-Tolerant Quantum Error Correction'],
    isOnline: false
  },
  {
    id: 'res-ananya-sharma',
    name: 'Ananya Sharma',
    professionalRole: 'EdTech Cognitive Scientist',
    country: 'India',
    state: 'Tamil Nadu',
    district: 'Madurai',
    institution: 'Madurai Kamaraj University',
    userId: '@ananya_edtech',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    avatarBg: '#7c3aed',
    linkedin: 'https://www.linkedin.com/in/ananya-edtech',
    instagram: 'https://www.instagram.com/ananya_edtech',
    bio: 'Focusing on Socratic AI dialogue agents, cognitive load optimization, and adaptive spaced-repetition algorithms in classrooms.',
    researchInterests: ['Education', 'EdTech', 'Adaptive Learning', 'Artificial Intelligence'],
    recentResearchTopics: ['SocraticLM Dialectical Tutoring Evaluation', 'Student Anxiety Reduction via AI Feedback', 'AI Literacy in Higher Ed'],
    isOnline: true
  },
  {
    id: 'res-karthik-selvam',
    name: 'Karthik Selvam',
    professionalRole: 'Robotics & Autonomous Systems Fellow',
    country: 'India',
    state: 'Tamil Nadu',
    district: 'Tiruchirappalli',
    institution: 'National Institute of Technology (NIT) Trichy',
    userId: '@karthik_robotics',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    avatarBg: '#dc2626',
    linkedin: 'https://www.linkedin.com/in/karthik-selvam-robotics',
    instagram: 'https://www.instagram.com/karthik_robotics',
    bio: 'Specializing in Real-time 3D Gaussian Splatting and NeRF models for zero-latency robotic navigation in degraded environments.',
    researchInterests: ['Engineering', 'Robotics', 'Computer Vision', 'Autonomous Vehicles'],
    recentResearchTopics: ['Edge LiDAR Fusion on Embedded NPUs', 'SLAM with Neural Radiance Fields', 'Autonomous Warehouse AGVs'],
    isOnline: false
  },
  {
    id: 'res-meenakshi-iyer',
    name: 'Dr. Meenakshi Iyer',
    professionalRole: 'Genomics & Computational Biology Chair',
    country: 'India',
    state: 'Tamil Nadu',
    district: 'Salem',
    institution: 'Biomedical Research Center',
    userId: '@meenakshi_genomics',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    avatarBg: '#0891b2',
    linkedin: 'https://www.linkedin.com/in/meenakshi-iyer-genomics',
    instagram: 'https://www.instagram.com/meenakshi_genomics',
    bio: 'Applying deep attention networks to genomic sequence alignment and structural protein folding prediction.',
    researchInterests: ['Science', 'Genomics', 'Bioinformatics', 'Machine Learning'],
    recentResearchTopics: ['Attention Mechanisms in Metagenomics', 'Predicting Off-Target Cas12 Cleavage', 'Protein Ligand Interaction Models'],
    isOnline: true
  }
];

export const NetworkingModule = (function () {
  // Local in-memory / localStorage state
  let profile = null;
  let researchers = [];
  let connections = []; // { id, userId1, userId2, status: 'pending'|'connected', requestedBy, createdAt }
  let messages = []; // { id, senderId, receiverId, text, timestamp, read }
  let blockedUsers = [];
  let notifications = [];
  let activeChatUserId = null;
  let activeViewTab = 'suggested'; // 'suggested', 'requests', 'connections', 'messages'
  let activeDrawerTab = 'suggested';
  let backendAvailable = false;

  // Word counter utility (split by whitespace)
  function countWords(str) {
    if (!str) return 0;
    return str.trim().split(/\s+/).filter(Boolean).length;
  }

  // HTML sanitization to prevent XSS
  function sanitize(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  const BACKEND_API_BASE = 'http://localhost:5000';

  // Check if Express backend is running on :5000
  async function testBackend() {
    try {
      const res = await fetch(`${BACKEND_API_BASE}/api/research/profile`, { signal: AbortSignal.timeout(1200) });
      if (res.ok || res.status === 404) {
        backendAvailable = true;
        console.log('Connected to AI Research Backend Server (:5000)');
      }
    } catch (e) {
      backendAvailable = false;
      console.log('Running in Standalone Client State Mode (localStorage fallback active)');
    }
  }

  // Initialize data from localStorage or defaults
  function loadState() {
    try {
      const savedProfile = localStorage.getItem('thamili_researcher_profile');
      if (savedProfile) {
        profile = JSON.parse(savedProfile);
      }

      const savedConnections = localStorage.getItem('thamili_research_connections');
      if (savedConnections) {
        connections = JSON.parse(savedConnections);
      } else {
        // Pre-populate realistic LinkedIn-style state
        connections = [
          {
            id: 'conn-init-1',
            userId1: 'current_user',
            userId2: 'res-arun-kumar',
            status: 'pending',
            requestedBy: 'res-arun-kumar',
            createdAt: new Date(Date.now() - 3600000).toISOString()
          },
          {
            id: 'conn-init-2',
            userId1: 'current_user',
            userId2: 'res-priya-sundaram',
            status: 'connected',
            requestedBy: 'res-priya-sundaram',
            createdAt: new Date(Date.now() - 86400000).toISOString()
          }
        ];
      }

      const savedMessages = localStorage.getItem('thamili_research_messages');
      if (savedMessages) {
        messages = JSON.parse(savedMessages);
      } else {
        messages = [
          {
            id: 'msg-init-1',
            senderId: 'res-priya-sundaram',
            receiverId: 'current_user',
            text: 'Vanakkam Lingavel! I noticed your clinical AI workflow draft. We have similar benchmark datasets if you would like to collaborate.',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            read: true
          },
          {
            id: 'msg-init-2',
            senderId: 'current_user',
            receiverId: 'res-priya-sundaram',
            text: 'Vanakkam Dr. Priya! Thank you for reaching out. Yes, cross-validating with your PSG oncology triaging models would be highly valuable.',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            read: true
          }
        ];
      }

      const savedBlocked = localStorage.getItem('thamili_research_blocked');
      if (savedBlocked) blockedUsers = JSON.parse(savedBlocked);

      researchers = JSON.parse(JSON.stringify(INITIAL_RESEARCHERS));
      buildNotifications();
    } catch (e) {
      console.error('Failed to load networking state', e);
    }
  }

  function saveState() {
    try {
      if (profile) localStorage.setItem('thamili_researcher_profile', JSON.stringify(profile));
      localStorage.setItem('thamili_research_connections', JSON.stringify(connections));
      localStorage.setItem('thamili_research_messages', JSON.stringify(messages));
      localStorage.setItem('thamili_research_blocked', JSON.stringify(blockedUsers));
    } catch (e) {
      console.error('Failed to persist networking state', e);
    }
  }

  // Build notifications from pending requests and unread messages
  function buildNotifications() {
    notifications = [];
    
    // Incoming connection requests
    connections.filter(c => c.status === 'pending' && c.requestedBy !== 'current_user').forEach(c => {
      const other = researchers.find(r => r.id === (c.userId1 === 'current_user' ? c.userId2 : c.userId1));
      if (other) {
        notifications.push({
          type: 'request',
          userId: other.id,
          title: 'Connection Request',
          text: `${other.name} sent you a connection request.`,
          timestamp: c.createdAt
        });
      }
    });

    // Unread messages
    messages.filter(m => m.receiverId === 'current_user' && !m.read).forEach(m => {
      const other = researchers.find(r => r.id === m.senderId);
      if (other) {
        notifications.push({
          type: 'message',
          userId: other.id,
          title: 'New Message',
          text: `You have a new message from ${other.name}.`,
          timestamp: m.timestamp
        });
      }
    });

    updateNotificationBadge();
  }

  function updateNotificationBadge() {
    const badgeEl = document.getElementById('researchers-notification-badge');
    const drawerBadgeEl = document.getElementById('drawer-requests-badge');
    const viewBadgeEl = document.getElementById('view-requests-badge');
    
    const count = notifications.length;
    if (badgeEl) {
      badgeEl.textContent = count > 0 ? count : '';
      badgeEl.style.display = count > 0 ? 'inline-flex' : 'none';
    }

    const pendingReqCount = connections.filter(c => c.status === 'pending' && c.requestedBy !== 'current_user').length;
    if (drawerBadgeEl) {
      drawerBadgeEl.textContent = pendingReqCount > 0 ? pendingReqCount : '';
      drawerBadgeEl.style.display = pendingReqCount > 0 ? 'inline-flex' : 'none';
    }
    if (viewBadgeEl) {
      viewBadgeEl.textContent = pendingReqCount > 0 ? pendingReqCount : '';
      viewBadgeEl.style.display = pendingReqCount > 0 ? 'inline-flex' : 'none';
    }
  }

  // Check connection status between current user and target user
  function getConnectionStatus(targetUserId) {
    if (blockedUsers.includes(targetUserId)) return 'blocked';
    const conn = connections.find(c =>
      (c.userId1 === 'current_user' && c.userId2 === targetUserId) ||
      (c.userId2 === 'current_user' && c.userId1 === targetUserId)
    );
    if (!conn) return 'none';
    if (conn.status === 'connected') return 'connected';
    if (conn.status === 'pending') {
      return conn.requestedBy === 'current_user' ? 'request_sent' : 'request_received';
    }
    return 'none';
  }

  // Research Interest Detection Engine
  function detectAndRegisterResearchInterests(searchQuery) {
    if (!searchQuery || typeof searchQuery !== 'string') return;
    const q = searchQuery.toLowerCase().trim();
    if (q.length < 3) return;

    if (!profile) {
      profile = {
        fullName: 'Research Scholar',
        professionalRole: 'AI Researcher',
        country: 'India',
        state: 'Tamil Nadu',
        district: 'Chennai',
        email: 'scholar@thamili.ai',
        userId: '@scholar_ai',
        researchInterests: [],
        profileVisibility: 'Researchers Only',
        recentResearchTopics: []
      };
    }

    const detected = [];
    // Topic mapping table
    const TOPIC_RULES = [
      { trigger: ['ai', 'artificial intelligence', 'llm', 'gpt', 'neural'], topic: 'Artificial Intelligence' },
      { trigger: ['machine learning', 'deep learning', 'supervised', 'unsupervised'], topic: 'Machine Learning' },
      { trigger: ['health', 'medical', 'clinical', 'hospital', 'oncology', 'radiology'], topic: 'Healthcare AI' },
      { trigger: ['nlp', 'language model', 'text', 'translation', 'dialogue', 'speech'], topic: 'NLP' },
      { trigger: ['vision', 'image', 'radiograph', 'segmentation', 'object detection'], topic: 'Computer Vision' },
      { trigger: ['quantum', 'qubit', 'pqc', 'cryptography', 'rsa', 'lattice'], topic: 'Quantum Computing' },
      { trigger: ['crypto', 'encryption', 'security', 'fips'], topic: 'Cryptography' },
      { trigger: ['education', 'learning', 'tutoring', 'student', 'pedagogy', 'socratic'], topic: 'Education' },
      { trigger: ['robot', 'autonomous', 'slam', 'lidar', 'drone'], topic: 'Robotics' },
      { trigger: ['crispr', 'gene', 'genomic', 'dna', 'protein', 'bioinformatics'], topic: 'Bioinformatics' },
      { trigger: ['adaptive', 'spaced repetition'], topic: 'Adaptive Learning' },
      { trigger: ['algorithm', 'datastructure', 'distributed', 'compiler'], topic: 'Computer Science' }
    ];

    TOPIC_RULES.forEach(rule => {
      if (rule.trigger.some(t => q.includes(t))) {
        detected.push(rule.topic);
      }
    });

    if (detected.length === 0) {
      // Capitalize search phrase as custom research topic
      const titleCase = q.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      detected.push(titleCase);
    }

    // Add unique topics to profile
    if (!profile.researchInterests) profile.researchInterests = [];
    if (!profile.recentResearchTopics) profile.recentResearchTopics = [];

    detected.forEach(top => {
      if (!profile.researchInterests.includes(top)) {
        profile.researchInterests.push(top);
      }
    });

    // Record recent search topic
    const cleanTopic = searchQuery.length > 50 ? searchQuery.substring(0, 50) + '...' : searchQuery;
    if (!profile.recentResearchTopics.includes(cleanTopic)) {
      profile.recentResearchTopics.unshift(cleanTopic);
      if (profile.recentResearchTopics.length > 6) profile.recentResearchTopics.pop();
    }

    saveState();
    renderAllViews();
  }

  // Multi-factor research similarity recommendation algorithm
  function getSuggestedResearchers() {
    const curInterests = (profile?.researchInterests || ['Artificial Intelligence', 'Machine Learning']).map(s => s.toLowerCase().trim());
    const curRole = (profile?.professionalRole || '').toLowerCase();
    const curCountry = (profile?.country || '').toLowerCase();
    const curDistrict = (profile?.district || '').toLowerCase();

    const candidates = researchers.filter(r => !blockedUsers.includes(r.id));

    const scored = candidates.map(c => {
      let score = 0;
      const cInterests = (c.researchInterests || []).map(s => s.toLowerCase().trim());

      // 1. Exact research interest match (+40 points each)
      cInterests.forEach(ci => {
        if (curInterests.includes(ci)) {
          score += 40;
        } else {
          // 2. Partial / related topic overlap (+20 points each)
          const isRelated = curInterests.some(cur =>
            cur.includes(ci) || ci.includes(cur) ||
            (cur.includes('ai') && ci.includes('machine learning')) ||
            (cur.includes('machine learning') && ci.includes('ai')) ||
            (cur.includes('health') && ci.includes('medical')) ||
            (cur.includes('medical') && ci.includes('health'))
          );
          if (isRelated) score += 20;
        }
      });

      // 3. Similar professional role keywords (+15 points)
      if (c.professionalRole) {
        const cr = c.professionalRole.toLowerCase();
        if (curRole.includes('ai') && cr.includes('ai')) score += 15;
        else if (curRole.includes('research') && cr.includes('research')) score += 10;
      }

      // 4. Same country/district match (+10 points total)
      if (c.country && curCountry && c.country.toLowerCase() === curCountry) {
        score += 5;
        if (c.district && curDistrict && c.district.toLowerCase() === curDistrict) {
          score += 5;
        }
      }

      return {
        ...c,
        matchScore: score,
        connectionStatus: getConnectionStatus(c.id)
      };
    });

    // Sort strictly by research similarity match score descending
    scored.sort((a, b) => b.matchScore - a.matchScore);
    return scored;
  }

  // ========================================================
  // LOCATION HIERARCHY & PREDEFINED DATASETS
  // ========================================================
  const ROLES_LIST = [
    'Student',
    'Research Student',
    'Researcher',
    'Professor',
    'Lecturer',
    'Scientist',
    'Developer',
    'Software Engineer',
    'AI/ML Engineer',
    'Data Scientist',
    'Doctor / Medical Professional',
    'Industry Professional',
    'Entrepreneur',
    'Independent Researcher',
    'Other'
  ];

  const COUNTRIES = [
    'India',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'Singapore',
    'United Arab Emirates',
    'France',
    'Japan',
    'China',
    'Netherlands',
    'Switzerland',
    'Sweden',
    'South Korea',
    'Brazil',
    'South Africa'
  ];

  const STATES_BY_COUNTRY = {
    'India': [
      'Tamil Nadu',
      'Karnataka',
      'Kerala',
      'Maharashtra',
      'Andhra Pradesh',
      'Telangana',
      'Delhi',
      'Gujarat',
      'Uttar Pradesh',
      'West Bengal',
      'Rajasthan',
      'Punjab',
      'Haryana',
      'Bihar',
      'Madhya Pradesh',
      'Odisha',
      'Assam',
      'Goa',
      'Jammu & Kashmir',
      'Chandigarh',
      'Puducherry'
    ],
    'United States': [
      'California',
      'New York',
      'Massachusetts',
      'Texas',
      'Washington',
      'Illinois',
      'Florida',
      'Pennsylvania',
      'Georgia',
      'North Carolina'
    ],
    'United Kingdom': [
      'England',
      'Scotland',
      'Wales',
      'Northern Ireland'
    ],
    'Canada': [
      'Ontario',
      'Quebec',
      'British Columbia',
      'Alberta'
    ],
    'Australia': [
      'New South Wales',
      'Victoria',
      'Queensland',
      'Western Australia'
    ],
    'Germany': [
      'Bavaria',
      'Berlin',
      'Baden-Württemberg',
      'North Rhine-Westphalia'
    ],
    'Singapore': [
      'Central Region',
      'East Region',
      'North Region',
      'West Region'
    ],
    'United Arab Emirates': [
      'Dubai',
      'Abu Dhabi',
      'Sharjah',
      'Ajman'
    ]
  };

  // Complete 38 districts of Tamil Nadu
  const TAMIL_NADU_DISTRICTS = [
    'Ariyalur',
    'Chengalpattu',
    'Chennai',
    'Coimbatore',
    'Cuddalore',
    'Dharmapuri',
    'Dindigul',
    'Erode',
    'Kallakurichi',
    'Kanchipuram',
    'Kanyakumari',
    'Karur',
    'Krishnagiri',
    'Madurai',
    'Mayiladuthurai',
    'Nagapattinam',
    'Namakkal',
    'Nilgiris',
    'Perambalur',
    'Pudukkottai',
    'Ramanathapuram',
    'Ranipet',
    'Salem',
    'Sivaganga',
    'Tenkasi',
    'Thanjavur',
    'Theni',
    'Thoothukudi',
    'Tiruchirappalli',
    'Tirunelveli',
    'Tirupathur',
    'Tiruppur',
    'Tiruvallur',
    'Tiruvannamalai',
    'Tiruvarur',
    'Vellore',
    'Viluppuram',
    'Virudhunagar'
  ];

  const DISTRICTS_BY_STATE = {
    'Tamil Nadu': TAMIL_NADU_DISTRICTS,
    'Karnataka': [
      'Bengaluru Urban',
      'Bengaluru Rural',
      'Mysuru',
      'Mangaluru (Dakshina Kannada)',
      'Hubballi-Dharwad',
      'Belagavi',
      'Shivamogga',
      'Tumakuru',
      'Udupi',
      'Ballari'
    ],
    'Kerala': [
      'Thiruvananthapuram',
      'Ernakulam (Kochi)',
      'Kozhikode',
      'Thrissur',
      'Kollam',
      'Palakkad',
      'Kannur',
      'Kottayam',
      'Alappuzha',
      'Malappuram'
    ],
    'Maharashtra': [
      'Mumbai City',
      'Mumbai Suburban',
      'Pune',
      'Nagpur',
      'Thane',
      'Nashik',
      'Aurangabad (Chhatrapati Sambhaji Nagar)',
      'Kolhapur'
    ],
    'Andhra Pradesh': [
      'Visakhapatnam',
      'Vijayawada (NTR)',
      'Guntur',
      'Tirupati',
      'Kurnool'
    ],
    'Telangana': [
      'Hyderabad',
      'Ranga Reddy',
      'Medchal-Malkajgiri',
      'Warangal'
    ],
    'Delhi': [
      'New Delhi',
      'Central Delhi',
      'South Delhi',
      'North Delhi'
    ],
    'California': [
      'San Francisco',
      'Los Angeles',
      'San Diego',
      'San Jose / Silicon Valley',
      'Palo Alto',
      'Berkeley',
      'Oakland',
      'Sacramento'
    ],
    'New York': [
      'New York City (Manhattan)',
      'Brooklyn',
      'Queens',
      'Buffalo',
      'Rochester',
      'Ithaca',
      'Albany'
    ],
    'Massachusetts': [
      'Boston',
      'Cambridge',
      'Worcester',
      'Springfield'
    ],
    'England': [
      'London',
      'Oxford',
      'Cambridge',
      'Manchester',
      'Birmingham',
      'Bristol',
      'Leeds'
    ],
    'Scotland': [
      'Edinburgh',
      'Glasgow',
      'Aberdeen',
      'Dundee'
    ],
    'Ontario': [
      'Toronto',
      'Ottawa',
      'Waterloo',
      'Hamilton',
      'London'
    ]
  };

  const SUGGESTED_INTERESTS = [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Data Science',
    'Bioinformatics',
    'Quantum Computing',
    'Robotics',
    'Cyber Security',
    'Cloud Computing',
    'Internet of Things (IoT)',
    'Blockchain',
    'Renewable Energy',
    'Nanotechnology',
    'Neuroscience'
  ];

  // Wizard state
  let wizardCurrentStep = 1;
  let wizardInterests = ['Artificial Intelligence', 'Machine Learning'];
  let wizardProfilePhoto = '';
  let roleDropdown = null;
  let countryDropdown = null;
  let stateDropdown = null;
  let districtDropdown = null;
  let visibilityDropdown = null;
  let wizardInitialized = false;

  // Searchable Dropdown Component Builder
  function setupSearchableDropdown({
    containerId,
    triggerId,
    textId,
    inputId,
    menuId,
    searchId,
    optionsId,
    items = [],
    placeholder = 'Select option',
    onSelect = null
  }) {
    const container = document.getElementById(containerId);
    const trigger = document.getElementById(triggerId);
    const textSpan = document.getElementById(textId);
    const input = document.getElementById(inputId);
    const menu = document.getElementById(menuId);
    const searchInput = searchId ? document.getElementById(searchId) : null;
    const optionsList = document.getElementById(optionsId);

    if (!container || !trigger || !optionsList) return null;

    let currentItems = [...items];

    function renderOptions(filterQuery = '') {
      const q = filterQuery.toLowerCase().trim();
      const filtered = currentItems.filter(item => {
        const val = typeof item === 'object' ? item.label : item;
        return val.toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        optionsList.innerHTML = `<li class="dropdown-empty">No matches found</li>`;
        return;
      }

      const curVal = input ? input.value : '';
      optionsList.innerHTML = filtered.map(item => {
        const val = typeof item === 'object' ? item.value : item;
        const label = typeof item === 'object' ? item.label : item;
        const isSelected = val === curVal;
        return `<li class="dropdown-option ${isSelected ? 'selected' : ''}" data-value="${sanitize(val)}">${sanitize(label)}</li>`;
      }).join('');
    }

    function openDropdown() {
      if (container.classList.contains('disabled') || trigger.disabled) return;
      document.querySelectorAll('.searchable-dropdown.open').forEach(d => {
        if (d !== container) d.classList.remove('open');
      });
      container.classList.add('open');
      if (searchInput) {
        searchInput.value = '';
        renderOptions('');
        setTimeout(() => searchInput.focus(), 50);
      } else {
        renderOptions('');
      }
    }

    function closeDropdown() {
      container.classList.remove('open');
    }

    function selectOption(val, label) {
      if (input) input.value = val;
      if (textSpan) textSpan.textContent = label || val;
      closeDropdown();
      if (onSelect) onSelect(val, label);
      updateLivePreview();
    }

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (container.classList.contains('open')) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    if (searchInput) {
      searchInput.addEventListener('click', (e) => e.stopPropagation());
      searchInput.addEventListener('input', (e) => {
        renderOptions(e.target.value);
      });
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDropdown();
        if (e.key === 'Enter') {
          e.preventDefault();
          const firstOpt = optionsList.querySelector('.dropdown-option');
          if (firstOpt) {
            selectOption(firstOpt.getAttribute('data-value'), firstOpt.textContent);
          }
        }
      });
    }

    optionsList.addEventListener('click', (e) => {
      const opt = e.target.closest('.dropdown-option');
      if (!opt) return;
      const val = opt.getAttribute('data-value');
      const label = opt.textContent;
      selectOption(val, label);
    });

    renderOptions('');

    return {
      setItems: function(newItems, resetSelection = true) {
        currentItems = [...newItems];
        if (resetSelection) {
          if (input) input.value = '';
          if (textSpan) textSpan.textContent = placeholder;
        }
        renderOptions('');
      },
      setValue: function(val, label) {
        if (input) input.value = val;
        if (textSpan) textSpan.textContent = label || val || placeholder;
        renderOptions('');
      },
      getValue: function() {
        return input ? input.value : '';
      },
      setDisabled: function(isDisabled) {
        if (isDisabled) {
          container.classList.add('disabled');
          trigger.disabled = true;
          closeDropdown();
        } else {
          container.classList.remove('disabled');
          trigger.disabled = false;
        }
      }
    };
  }

  // Render selected interest tags chips with remove '×'
  function renderInterestChips() {
    const listEl = document.getElementById('setup-interest-chips-list');
    if (!listEl) return;

    if (wizardInterests.length === 0) {
      listEl.innerHTML = `<span style="font-size: 0.78rem; color: var(--text-muted);">No interests added yet. Type below or pick suggestions.</span>`;
      return;
    }

    listEl.innerHTML = wizardInterests.map(interest => `
      <span class="interest-chip">
        <span>${sanitize(interest)}</span>
        <button type="button" class="interest-chip-remove" data-interest="${sanitize(interest)}" title="Remove">✕</button>
      </span>
    `).join('');

    // Bind remove buttons
    listEl.querySelectorAll('.interest-chip-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const itemToRemove = btn.getAttribute('data-interest');
        removeInterestTag(itemToRemove);
      });
    });
  }

  function addInterestTag(rawTag) {
    if (!rawTag) return;
    const tag = rawTag.trim();
    if (tag.length < 2) return;
    const exists = wizardInterests.some(i => i.toLowerCase() === tag.toLowerCase());
    if (!exists) {
      wizardInterests.push(tag);
      renderInterestChips();
      updateLivePreview();
    }
  }

  function removeInterestTag(tag) {
    wizardInterests = wizardInterests.filter(i => i.toLowerCase() !== tag.toLowerCase());
    renderInterestChips();
    updateLivePreview();
  }

  function renderSuggestedTagsCloud() {
    const cloudEl = document.getElementById('setup-suggested-tags');
    if (!cloudEl) return;

    cloudEl.innerHTML = SUGGESTED_INTERESTS.map(tag => `
      <button type="button" class="suggested-tag-btn" data-tag="${sanitize(tag)}">+ ${sanitize(tag)}</button>
    `).join('');

    cloudEl.querySelectorAll('.suggested-tag-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tag = btn.getAttribute('data-tag');
        addInterestTag(tag);
      });
    });
  }

  // Get Initials from name
  function getInitials(name) {
    if (!name || typeof name !== 'string') return 'RS';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  // Update Live Profile Preview Card
  function updateLivePreview() {
    const fullName = document.getElementById('setup-fullname')?.value.trim() || 'Your Full Name';
    const rawUserId = document.getElementById('setup-userid')?.value.trim() || 'userid';
    const cleanUserId = rawUserId.startsWith('@') ? rawUserId : '@' + rawUserId;
    
    let role = roleDropdown?.getValue() || '';
    if (role === 'Other') {
      const custom = document.getElementById('setup-custom-role')?.value.trim();
      role = custom || 'Other';
    }
    if (!role) role = 'Professional Role';

    const country = countryDropdown?.getValue() || '';
    const state = stateDropdown?.getValue() || '';
    const district = districtDropdown?.getValue() || '';
    
    const locParts = [district, state, country].filter(Boolean);
    const locText = locParts.length > 0 ? locParts.join(', ') : 'District, State, Country';

    const bio = document.getElementById('setup-bio')?.value.trim() || 'Your research bio will display here...';
    const visibility = visibilityDropdown?.getValue() || 'Researchers Only';

    // Preview elements
    const nameEl = document.getElementById('preview-card-name');
    if (nameEl) nameEl.textContent = fullName;

    const userEl = document.getElementById('preview-card-userid');
    if (userEl) userEl.textContent = cleanUserId;

    const roleEl = document.getElementById('preview-card-role');
    if (roleEl) roleEl.textContent = role;

    const locEl = document.getElementById('preview-card-location-text');
    if (locEl) locEl.textContent = locText;

    const bioEl = document.getElementById('preview-card-bio');
    if (bioEl) bioEl.textContent = bio;

    const visEl = document.getElementById('preview-card-visibility-text');
    if (visEl) visEl.textContent = visibility;

    // Avatar preview
    const initials = getInitials(fullName);
    const setupInitials = document.getElementById('setup-avatar-initials');
    if (setupInitials) setupInitials.textContent = initials;

    const setupPreview = document.getElementById('setup-avatar-preview');
    const previewAvatar = document.getElementById('preview-card-avatar');

    if (wizardProfilePhoto) {
      if (setupPreview) setupPreview.innerHTML = `<img src="${wizardProfilePhoto}" alt="Avatar">`;
      if (previewAvatar) previewAvatar.innerHTML = `<img src="${wizardProfilePhoto}" alt="Avatar">`;
    } else {
      if (setupPreview) setupPreview.innerHTML = `<span class="avatar-initials-fallback">${initials}</span>`;
      if (previewAvatar) previewAvatar.innerHTML = `<span id="preview-avatar-initials">${initials}</span>`;
    }

    // Interests chips in preview
    const previewInterests = document.getElementById('preview-card-interests');
    if (previewInterests) {
      const showList = wizardInterests.slice(0, 3);
      if (showList.length === 0) {
        previewInterests.innerHTML = `<span class="research-interest-pill">Artificial Intelligence</span>`;
      } else {
        previewInterests.innerHTML = showList.map(i => `<span class="research-interest-pill">${sanitize(i)}</span>`).join('');
      }
    }
  }

  // Navigate between wizard steps with validation
  function goToStep(targetStep) {
    const errBox = document.getElementById('setup-form-error');
    if (errBox) errBox.style.display = 'none';

    // Validate current step before advancing
    if (targetStep > wizardCurrentStep) {
      if (wizardCurrentStep === 1) {
        const fullName = document.getElementById('setup-fullname')?.value.trim();
        const rawUserId = document.getElementById('setup-userid')?.value.trim();
        const email = document.getElementById('setup-email')?.value.trim();
        const role = roleDropdown?.getValue() || '';

        if (!fullName) {
          showFormError('Please enter your full name.');
          document.getElementById('setup-fullname')?.focus();
          return false;
        }

        if (!rawUserId) {
          showFormError('Please choose a unique User ID handle.');
          document.getElementById('setup-userid')?.focus();
          return false;
        }

        const cleanUserId = rawUserId.startsWith('@') ? rawUserId : '@' + rawUserId;
        if (cleanUserId.length < 3) {
          showFormError('User ID must be at least 3 characters long.');
          document.getElementById('setup-userid')?.focus();
          return false;
        }

        // Uniqueness check
        const isDuplicate = researchers.some(r => r.userId && r.userId.toLowerCase() === cleanUserId.toLowerCase());
        if (isDuplicate) {
          showFormError('This User ID is already taken. Please pick another unique handle.');
          document.getElementById('setup-userid')?.focus();
          return false;
        }

        if (!email) {
          showFormError('Please enter your email address.');
          document.getElementById('setup-email')?.focus();
          return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showFormError('Please enter a valid email address.');
          document.getElementById('setup-email')?.focus();
          return false;
        }

        if (!role) {
          showFormError('Please select your professional role.');
          return false;
        }

        if (role === 'Other') {
          const customRole = document.getElementById('setup-custom-role')?.value.trim();
          if (!customRole) {
            showFormError('Please enter your professional role in the custom field.');
            document.getElementById('setup-custom-role')?.focus();
            return false;
          }
        }
      } else if (wizardCurrentStep === 2) {
        const country = countryDropdown?.getValue() || '';
        const state = stateDropdown?.getValue() || '';
        const district = districtDropdown?.getValue() || '';

        if (!country) {
          showFormError('Please select your country.');
          return false;
        }

        if (!state) {
          showFormError('Please select your state / province.');
          return false;
        }

        if (!district) {
          showFormError('Please select your district / city.');
          return false;
        }
      }
    }

    // Step change
    wizardCurrentStep = targetStep;

    // Panes
    document.querySelectorAll('.wizard-step-pane').forEach((p, idx) => {
      if (idx + 1 === wizardCurrentStep) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    // Stepper nodes & lines
    for (let i = 1; i <= 3; i++) {
      const node = document.getElementById(`wizard-node-${i}`);
      if (!node) continue;
      if (i < wizardCurrentStep) {
        node.className = 'wizard-step-node completed';
      } else if (i === wizardCurrentStep) {
        node.className = 'wizard-step-node active';
      } else {
        node.className = 'wizard-step-node';
      }
    }

    const line1 = document.getElementById('wizard-line-1');
    if (line1) {
      if (wizardCurrentStep >= 2) line1.classList.add('completed');
      else line1.classList.remove('completed');
    }

    const line2 = document.getElementById('wizard-line-2');
    if (line2) {
      if (wizardCurrentStep >= 3) line2.classList.add('completed');
      else line2.classList.remove('completed');
    }

    // Footer buttons
    const btnPrev = document.getElementById('btn-step-prev');
    const btnNext = document.getElementById('btn-step-next');
    const btnSubmit = document.getElementById('btn-step-submit');

    if (btnPrev) btnPrev.style.display = wizardCurrentStep > 1 ? 'inline-flex' : 'none';
    if (btnNext) btnNext.style.display = wizardCurrentStep < 3 ? 'inline-flex' : 'none';
    if (btnSubmit) btnSubmit.style.display = wizardCurrentStep === 3 ? 'inline-flex' : 'none';

    updateLivePreview();
    return true;
  }

  // Initialize the 3-step wizard and custom dropdowns
  function initProfileWizard() {
    if (wizardInitialized) return;
    wizardInitialized = true;

    // 1. Role Dropdown
    roleDropdown = setupSearchableDropdown({
      containerId: 'dropdown-professional-role',
      triggerId: 'trigger-professional-role',
      textId: 'text-professional-role',
      inputId: 'setup-role',
      menuId: 'menu-professional-role',
      searchId: 'search-professional-role',
      optionsId: 'options-professional-role',
      items: ROLES_LIST,
      placeholder: 'Select Professional Role',
      onSelect: (val) => {
        const customContainer = document.getElementById('setup-custom-role-container');
        if (customContainer) {
          if (val === 'Other') {
            customContainer.style.display = 'block';
            setTimeout(() => document.getElementById('setup-custom-role')?.focus(), 50);
          } else {
            customContainer.style.display = 'none';
          }
        }
      }
    });

    // 2. Country Dropdown
    countryDropdown = setupSearchableDropdown({
      containerId: 'dropdown-country',
      triggerId: 'trigger-country',
      textId: 'text-country',
      inputId: 'setup-country',
      menuId: 'menu-country',
      searchId: 'search-country',
      optionsId: 'options-country',
      items: COUNTRIES,
      placeholder: 'Select Country',
      onSelect: (country) => {
        // Cascade to State
        const availableStates = STATES_BY_COUNTRY[country] || [
          'Central Region', 'Northern Province', 'Southern Province', 'Eastern Province', 'Western Province'
        ];
        stateDropdown?.setItems(availableStates, true);
        districtDropdown?.setDisabled(true);
        districtDropdown?.setItems([], true);
        const districtText = document.getElementById('text-district');
        if (districtText) districtText.textContent = 'Select State First';
      }
    });

    // 3. State Dropdown
    stateDropdown = setupSearchableDropdown({
      containerId: 'dropdown-state',
      triggerId: 'trigger-state',
      textId: 'text-state',
      inputId: 'setup-state',
      menuId: 'menu-state',
      searchId: 'search-state',
      optionsId: 'options-state',
      items: STATES_BY_COUNTRY['India'],
      placeholder: 'Select State',
      onSelect: (state) => {
        // Cascade to District
        districtDropdown?.setDisabled(false);
        let districts = DISTRICTS_BY_STATE[state];
        if (!districts) {
          if (state === 'Tamil Nadu') districts = TAMIL_NADU_DISTRICTS;
          else districts = [`${state} Central`, `${state} North`, `${state} South`, `${state} East`, `${state} West`];
        }
        districtDropdown?.setItems(districts, true);
      }
    });

    // 4. District Dropdown (Starts disabled)
    districtDropdown = setupSearchableDropdown({
      containerId: 'dropdown-district',
      triggerId: 'trigger-district',
      textId: 'text-district',
      inputId: 'setup-district',
      menuId: 'menu-district',
      searchId: 'search-district',
      optionsId: 'options-district',
      items: [],
      placeholder: 'Select District / City'
    });
    districtDropdown?.setDisabled(true);

    // 5. Visibility Dropdown
    visibilityDropdown = setupSearchableDropdown({
      containerId: 'dropdown-visibility',
      triggerId: 'trigger-visibility',
      textId: 'text-visibility',
      inputId: 'setup-visibility',
      menuId: 'menu-visibility',
      searchId: null,
      optionsId: 'options-visibility',
      items: [
        'Researchers Only (Recommended)',
        'Everyone',
        'Connections Only',
        'Private'
      ],
      placeholder: 'Researchers Only (Recommended)'
    });

    // Setup interest chips & suggestions
    renderInterestChips();
    renderSuggestedTagsCloud();

    // Add interest tag input & button
    const tagInput = document.getElementById('setup-interest-tag-input');
    const btnAddTag = document.getElementById('btn-add-interest-tag');

    if (btnAddTag && tagInput) {
      btnAddTag.addEventListener('click', () => {
        addInterestTag(tagInput.value);
        tagInput.value = '';
      });
      tagInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          addInterestTag(tagInput.value);
          tagInput.value = '';
        }
      });
    }

    // Photo Upload
    const photoInput = document.getElementById('setup-photo-file');
    const btnBrowse = document.getElementById('btn-browse-photo');
    const btnRemove = document.getElementById('btn-remove-photo');

    if (btnBrowse && photoInput) {
      btnBrowse.addEventListener('click', () => photoInput.click());
      photoInput.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
          showFormError('Please select a PNG or JPG image.');
          return;
        }

        if (file.size > 3 * 1024 * 1024) {
          showFormError('Image size must be less than 3MB.');
          return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
          wizardProfilePhoto = event.target.result;
          if (btnRemove) btnRemove.style.display = 'inline-block';
          updateLivePreview();
        };
        reader.readAsDataURL(file);
      });
    }

    if (btnRemove) {
      btnRemove.addEventListener('click', () => {
        wizardProfilePhoto = '';
        if (photoInput) photoInput.value = '';
        btnRemove.style.display = 'none';
        updateLivePreview();
      });
    }

    // Live Character Counter on Bio (250 char limit)
    const bioTextarea = document.getElementById('setup-bio');
    const bioCounter = document.getElementById('setup-bio-counter');
    if (bioTextarea && bioCounter) {
      bioTextarea.addEventListener('input', () => {
        const len = bioTextarea.value.length;
        bioCounter.textContent = `${len} / 250`;
        if (len >= 250) {
          bioCounter.className = 'char-counter at-limit';
        } else if (len > 220) {
          bioCounter.className = 'char-counter near-limit';
        } else {
          bioCounter.className = 'char-counter';
        }
        updateLivePreview();
      });
    }

    // Live preview event listeners on text inputs
    ['setup-fullname', 'setup-userid', 'setup-custom-role'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', updateLivePreview);
    });

    // Wizard Navigation Buttons
    const btnPrev = document.getElementById('btn-step-prev');
    const btnNext = document.getElementById('btn-step-next');

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (wizardCurrentStep > 1) goToStep(wizardCurrentStep - 1);
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (wizardCurrentStep < 3) goToStep(wizardCurrentStep + 1);
      });
    }

    // Global click listener to close open searchable dropdowns
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.searchable-dropdown')) {
        document.querySelectorAll('.searchable-dropdown.open').forEach(d => d.classList.remove('open'));
      }
    });

    // Form submit listener
    const formEl = document.getElementById('form-research-profile-setup');
    if (formEl) {
      formEl.addEventListener('submit', handleProfileSetupSubmit);
    }
  }

  // First-visit check & profile setup modal trigger
  function checkFirstTimeVisit() {
    const profileCreated = localStorage.getItem('thamili_research_profile_created');
    if (!profileCreated) {
      setTimeout(() => {
        openProfileSetupModal();
      }, 350);
    }
  }

  function openProfileSetupModal() {
    initProfileWizard();
    const modal = document.getElementById('modal-research-profile-setup');
    if (!modal) return;

    // Reset to step 1
    goToStep(1);

    // Prefill if existing profile data
    if (profile) {
      const nameInput = document.getElementById('setup-fullname');
      if (nameInput) nameInput.value = profile.fullName || '';

      const userInput = document.getElementById('setup-userid');
      if (userInput) userInput.value = profile.userId ? profile.userId.replace('@', '') : '';

      const emailInput = document.getElementById('setup-email');
      if (emailInput) emailInput.value = profile.email || '';

      const instInput = document.getElementById('setup-institution');
      if (instInput) instInput.value = profile.institution || '';

      const bioInput = document.getElementById('setup-bio');
      if (bioInput) {
        bioInput.value = profile.shortBio || '';
        const len = bioInput.value.length;
        const bioCounter = document.getElementById('setup-bio-counter');
        if (bioCounter) bioCounter.textContent = `${len} / 250`;
      }

      // Role prefill
      if (profile.professionalRole) {
        if (ROLES_LIST.includes(profile.professionalRole)) {
          roleDropdown?.setValue(profile.professionalRole, profile.professionalRole);
        } else {
          roleDropdown?.setValue('Other', 'Other');
          const customContainer = document.getElementById('setup-custom-role-container');
          const customInput = document.getElementById('setup-custom-role');
          if (customContainer && customInput) {
            customContainer.style.display = 'block';
            customInput.value = profile.professionalRole;
          }
        }
      }

      // Location prefill
      if (profile.country) {
        countryDropdown?.setValue(profile.country, profile.country);
        const availableStates = STATES_BY_COUNTRY[profile.country] || [profile.state || 'Default State'];
        stateDropdown?.setItems(availableStates, false);
        if (profile.state) {
          stateDropdown?.setValue(profile.state, profile.state);
          districtDropdown?.setDisabled(false);
          let districts = DISTRICTS_BY_STATE[profile.state] || [profile.district || 'City'];
          districtDropdown?.setItems(districts, false);
          if (profile.district) {
            districtDropdown?.setValue(profile.district, profile.district);
          }
        }
      }

      // Visibility prefill
      if (profile.profileVisibility) {
        visibilityDropdown?.setValue(profile.profileVisibility, profile.profileVisibility);
      }

      // Photo prefill
      if (profile.profileImage) {
        wizardProfilePhoto = profile.profileImage;
        const btnRemove = document.getElementById('btn-remove-photo');
        if (btnRemove) btnRemove.style.display = 'inline-block';
      }

      // Interests prefill
      if (profile.researchInterests && profile.researchInterests.length > 0) {
        wizardInterests = [...profile.researchInterests];
        renderInterestChips();
      }
    } else {
      // Defaults for fresh setup
      countryDropdown?.setValue('India', 'India');
      stateDropdown?.setItems(STATES_BY_COUNTRY['India'], false);
      stateDropdown?.setValue('Tamil Nadu', 'Tamil Nadu');
      districtDropdown?.setDisabled(false);
      districtDropdown?.setItems(TAMIL_NADU_DISTRICTS, false);
      districtDropdown?.setValue('Chennai', 'Chennai');
      roleDropdown?.setValue('Researcher', 'Researcher');
      wizardInterests = ['Artificial Intelligence', 'Machine Learning'];
      renderInterestChips();
    }

    updateLivePreview();
    modal.classList.add('active');
  }

  // Handle Profile Setup submission
  function handleProfileSetupSubmit(e) {
    e.preventDefault();

    const fullName = document.getElementById('setup-fullname')?.value.trim();
    const rawUserId = document.getElementById('setup-userid')?.value.trim();
    const email = document.getElementById('setup-email')?.value.trim();
    let professionalRole = roleDropdown?.getValue() || '';
    if (professionalRole === 'Other') {
      professionalRole = document.getElementById('setup-custom-role')?.value.trim();
    }

    const country = countryDropdown?.getValue() || '';
    const state = stateDropdown?.getValue() || '';
    const district = districtDropdown?.getValue() || '';
    const institution = document.getElementById('setup-institution')?.value.trim();
    const bio = document.getElementById('setup-bio')?.value.trim();
    const profileVisibility = visibilityDropdown?.getValue() || 'Researchers Only';

    const errBox = document.getElementById('setup-form-error');
    if (errBox) errBox.style.display = 'none';

    // Validate required fields
    if (!fullName || !professionalRole || !country || !state || !district || !email || !rawUserId) {
      showFormError('Please fill in all required fields (Name, User ID, Email, Professional Role, Country, State, District).');
      return;
    }

    // Proper Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormError('Please enter a valid email address.');
      return;
    }

    // User ID format & uniqueness check
    const userId = rawUserId.startsWith('@') ? rawUserId : '@' + rawUserId;
    if (userId.length < 3) {
      showFormError('User ID must be at least 3 characters long.');
      return;
    }

    const taken = researchers.some(r => r.userId?.toLowerCase() === userId.toLowerCase());
    if (taken) {
      showFormError('This User ID is already taken. Please choose another one.');
      return;
    }

    if (wizardInterests.length === 0) {
      showFormError('Please add at least one research interest.');
      return;
    }

    profile = {
      fullName,
      professionalRole,
      country,
      state,
      district,
      email, // Kept private, never exposed on public cards
      userId, // Displayed on public cards as handle
      institution: institution || 'Independent Researcher',
      shortBio: bio || 'Active researcher collaborating across emerging technology fields.',
      researchInterests: [...wizardInterests],
      profileImage: wizardProfilePhoto || '',
      profileVisibility,
      recentResearchTopics: profile?.recentResearchTopics || ['Artificial Intelligence Exploration'],
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('thamili_research_profile_created', 'true');
    saveState();

    // Call backend API in parallel if active
    if (backendAvailable) {
      fetch(`${BACKEND_API_BASE}/api/research/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      }).catch(e => console.log('Backend sync notice:', e.message));
    }

    const modal = document.getElementById('modal-research-profile-setup');
    if (modal) modal.classList.remove('active');

    showToast('Research Profile completed! Discovering similar researchers...', 'sparkle');
    renderAllViews();
  }

  function showFormError(msg) {
    const errBox = document.getElementById('setup-form-error');
    if (errBox) {
      errBox.textContent = msg;
      errBox.style.display = 'block';
      errBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      alert(msg);
    }
  }

  // Connection management actions
  function sendConnectionRequest(targetUserId) {
    const target = researchers.find(r => r.id === targetUserId);
    if (!target) return;

    // Check existing
    const existing = connections.find(c =>
      (c.userId1 === 'current_user' && c.userId2 === targetUserId) ||
      (c.userId2 === 'current_user' && c.userId1 === targetUserId)
    );

    if (existing) {
      if (existing.status === 'connected') {
        showToast(`Already connected with ${target.name}`, 'check');
        return;
      }
      if (existing.status === 'pending') {
        showToast('Connection request is already pending', 'sparkle');
        return;
      }
    }

    const newConn = {
      id: 'conn-' + Date.now(),
      userId1: 'current_user',
      userId2: targetUserId,
      status: 'pending',
      requestedBy: 'current_user',
      createdAt: new Date().toISOString()
    };

    connections.push(newConn);
    saveState();

    if (backendAvailable) {
      fetch(`${BACKEND_API_BASE}/api/research/connections/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUserId })
      }).catch(() => {});
    }

    showToast(`Connection request sent to ${target.name}`, 'sparkle');
    renderAllViews();
  }

  function acceptConnectionRequest(targetUserId) {
    const target = researchers.find(r => r.id === targetUserId);
    const conn = connections.find(c =>
      c.status === 'pending' &&
      ((c.userId1 === targetUserId && c.userId2 === 'current_user') ||
       (c.userId2 === targetUserId && c.userId1 === 'current_user'))
    );

    if (conn) {
      conn.status = 'connected';
      conn.connectedAt = new Date().toISOString();
      saveState();

      if (backendAvailable) {
        fetch(`${BACKEND_API_BASE}/api/research/connections/accept`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ targetUserId })
        }).catch(() => {});
      }

      showToast(`Connected with ${target ? target.name : 'researcher'}! You can now private message.`, 'check');
      buildNotifications();
      renderAllViews();
    }
  }

  function declineConnectionRequest(targetUserId) {
    const idx = connections.findIndex(c =>
      c.status === 'pending' &&
      ((c.userId1 === targetUserId && c.userId2 === 'current_user') ||
       (c.userId2 === targetUserId && c.userId1 === 'current_user'))
    );

    if (idx !== -1) {
      connections.splice(idx, 1);
      saveState();

      if (backendAvailable) {
        fetch(`${BACKEND_API_BASE}/api/research/connections/decline`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ targetUserId })
        }).catch(() => {});
      }

      showToast('Connection request declined.', 'check');
      buildNotifications();
      renderAllViews();
    }
  }

  function blockUser(targetUserId) {
    if (!blockedUsers.includes(targetUserId)) {
      blockedUsers.push(targetUserId);
    }
    // Remove connection
    connections = connections.filter(c =>
      !((c.userId1 === 'current_user' && c.userId2 === targetUserId) ||
        (c.userId2 === 'current_user' && c.userId1 === targetUserId))
    );
    saveState();

    if (backendAvailable) {
      fetch(`${BACKEND_API_BASE}/api/research/users/${targetUserId}/block`, {
        method: 'POST'
      }).catch(() => {});
    }

    closeModals();
    showToast('User blocked.', 'check');
    renderAllViews();
  }

  function reportUser(targetUserId, reason = 'Inappropriate content') {
    if (backendAvailable) {
      fetch(`${BACKEND_API_BASE}/api/research/users/${targetUserId}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
      }).catch(() => {});
    }
    showToast('Report submitted for safety review.', 'check');
  }

  // View Researcher Profile Modal
  function openViewProfileModal(userId) {
    const target = researchers.find(r => r.id === userId);
    if (!target) return;

    const status = getConnectionStatus(userId);
    const modal = document.getElementById('modal-researcher-profile-view');
    if (!modal) return;

    document.getElementById('view-modal-avatar').src = target.avatar;
    document.getElementById('view-modal-name').textContent = target.name;
    const viewUserEl = document.getElementById('view-modal-userid');
    if (viewUserEl) viewUserEl.textContent = target.userId || '';
    const viewRoleEl = document.getElementById('view-modal-role');
    if (viewRoleEl) viewRoleEl.textContent = target.professionalRole || '';
    document.getElementById('view-modal-location').textContent = `${target.country} • ${target.district}`;
    document.getElementById('view-modal-institution').textContent = target.institution || 'Research Institute';
    document.getElementById('view-modal-bio').textContent = target.bio || '';
    
    // Online badge
    const statusDot = document.getElementById('view-modal-online-status');
    if (statusDot) {
      statusDot.className = target.isOnline ? 'online-dot active' : 'online-dot';
      statusDot.title = target.isOnline ? 'Active Now' : 'Offline';
    }

    // Render interest chips
    const interestsContainer = document.getElementById('view-modal-interests');
    interestsContainer.innerHTML = (target.researchInterests || []).map(i => `
      <span class="research-interest-pill">${sanitize(i)}</span>
    `).join('');

    // Render recent topics
    const topicsContainer = document.getElementById('view-modal-topics');
    topicsContainer.innerHTML = (target.recentResearchTopics || []).map(t => `
      <div class="view-modal-topic-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        <span>${sanitize(t)}</span>
      </div>
    `).join('');

    // Render connection action button based on current status
    const actionContainer = document.getElementById('view-modal-action-buttons');
    if (status === 'connected') {
      actionContainer.innerHTML = `
        <button class="btn-connect-action connected" disabled>✓ Connected</button>
        <button class="btn-connect-action message" id="btn-modal-open-chat" data-user-id="${target.id}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span>Message</span>
        </button>
      `;
    } else if (status === 'request_sent') {
      actionContainer.innerHTML = `
        <button class="btn-connect-action pending" disabled>Request Sent</button>
      `;
    } else if (status === 'request_received') {
      actionContainer.innerHTML = `
        <button class="btn-connect-action accept" id="btn-modal-accept-req" data-user-id="${target.id}">Accept Request</button>
        <button class="btn-connect-action decline" id="btn-modal-decline-req" data-user-id="${target.id}">Decline</button>
      `;
    } else {
      actionContainer.innerHTML = `
        <button class="btn-connect-action connect" id="btn-modal-connect" data-user-id="${target.id}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          <span>Connect</span>
        </button>
      `;
    }

    // Attach listeners
    const btnConnect = document.getElementById('btn-modal-connect');
    if (btnConnect) btnConnect.addEventListener('click', () => {
      sendConnectionRequest(target.id);
      openViewProfileModal(target.id);
    });

    const btnAccept = document.getElementById('btn-modal-accept-req');
    if (btnAccept) btnAccept.addEventListener('click', () => {
      acceptConnectionRequest(target.id);
      openViewProfileModal(target.id);
    });

    const btnDecline = document.getElementById('btn-modal-decline-req');
    if (btnDecline) btnDecline.addEventListener('click', () => {
      declineConnectionRequest(target.id);
      modal.classList.remove('active');
    });

    const btnChat = document.getElementById('btn-modal-open-chat');
    if (btnChat) btnChat.addEventListener('click', () => {
      modal.classList.remove('active');
      openPrivateChat(target.id);
    });

    // Block & Report in modal
    const btnBlock = document.getElementById('btn-modal-block-user');
    if (btnBlock) {
      btnBlock.onclick = () => {
        if (confirm(`Are you sure you want to block ${target.name}?`)) {
          blockUser(target.id);
        }
      };
    }

    const btnReport = document.getElementById('btn-modal-report-user');
    if (btnReport) {
      btnReport.onclick = () => {
        const reason = prompt('Please specify reason for reporting:');
        if (reason) reportUser(target.id, reason);
      };
    }

    modal.classList.add('active');
  }

  // Private Chat Interface (Instagram/LinkedIn Style with 100-word limit)
  function openPrivateChat(targetUserId) {
    const target = researchers.find(r => r.id === targetUserId);
    if (!target) return;

    activeChatUserId = targetUserId;
    const modal = document.getElementById('modal-private-chat');
    if (!modal) return;

    const status = getConnectionStatus(targetUserId);

    // Populate header
    document.getElementById('chat-header-avatar').src = target.avatar;
    document.getElementById('chat-header-name').textContent = target.name;
    const chatRoleEl = document.getElementById('chat-header-role');
    if (chatRoleEl) chatRoleEl.textContent = target.professionalRole || '';
    document.getElementById('chat-header-status-text').textContent = target.isOnline ? 'Active Now' : 'Offline';
    document.getElementById('chat-header-status-dot').className = target.isOnline ? 'online-dot active' : 'online-dot';

    const gateBanner = document.getElementById('chat-permission-gate');
    const inputContainer = document.getElementById('chat-input-row');

    if (status !== 'connected') {
      // RULE: Do NOT show active chat box before connection. Show restriction notice.
      if (gateBanner) {
        gateBanner.style.display = 'flex';
        gateBanner.innerHTML = `
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <span>Connect with this researcher to start a conversation.</span>
          <button class="btn-connect-action connect" id="btn-gate-connect" style="margin-left: auto; padding: 5px 12px; font-size: 0.78rem;">Connect</button>
        `;
        const gateBtn = document.getElementById('btn-gate-connect');
        if (gateBtn) gateBtn.onclick = () => {
          sendConnectionRequest(target.id);
          gateBanner.innerHTML = `<span>Connection request sent. Messaging will be enabled once accepted.</span>`;
        };
      }
      if (inputContainer) inputContainer.style.display = 'none';
    } else {
      if (gateBanner) gateBanner.style.display = 'none';
      if (inputContainer) inputContainer.style.display = 'flex';
    }

    renderChatMessages();

    // Reset input and counter
    const chatInput = document.getElementById('chat-message-textarea');
    if (chatInput) {
      chatInput.value = '';
      updateWordCounter('');
    }

    // Mark messages as read
    messages.forEach(m => {
      if (m.senderId === targetUserId && m.receiverId === 'current_user') m.read = true;
    });
    saveState();
    buildNotifications();

    modal.classList.add('active');
  }

  function renderChatMessages() {
    const listEl = document.getElementById('chat-messages-scroll-area');
    if (!listEl) return;

    const thread = messages.filter(m =>
      (m.senderId === 'current_user' && m.receiverId === activeChatUserId) ||
      (m.senderId === activeChatUserId && m.receiverId === 'current_user')
    );

    if (thread.length === 0) {
      listEl.innerHTML = `
        <div class="chat-empty-thread">
          <div class="chat-empty-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <div style="font-weight: 600; margin-bottom: 4px;">Start a conversation</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); max-width: 260px;">Share research insights, discuss recent papers, or propose joint publications.</div>
        </div>
      `;
      return;
    }

    listEl.innerHTML = thread.map(m => {
      const isSent = m.senderId === 'current_user';
      const timeStr = new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return `
        <div class="chat-bubble-wrap ${isSent ? 'sent' : 'received'}">
          <div class="chat-bubble-text">${sanitize(m.text)}</div>
          <div class="chat-bubble-meta">${timeStr}</div>
        </div>
      `;
    }).join('');

    // Scroll to bottom
    setTimeout(() => {
      listEl.scrollTop = listEl.scrollHeight;
    }, 40);
  }

  // Update Live Word Counter & Validation (Strict 100-word limit)
  function updateWordCounter(text) {
    const counterEl = document.getElementById('chat-word-counter');
    const warningEl = document.getElementById('chat-word-limit-warning');
    const sendBtn = document.getElementById('btn-chat-send');

    const words = countWords(text);
    if (counterEl) counterEl.textContent = `${words} / 100 words`;

    const exceeds = words > 100;
    if (warningEl) warningEl.style.display = exceeds ? 'block' : 'none';
    if (counterEl) counterEl.classList.toggle('exceeded', exceeds);

    // Disable send button if exceeds or empty
    if (sendBtn) {
      sendBtn.disabled = exceeds || words === 0;
    }
  }

  // Send message
  function sendChatMessage() {
    const input = document.getElementById('chat-message-textarea');
    if (!input || !activeChatUserId) return;

    const text = input.value.trim();
    const words = countWords(text);

    // Strict validation
    if (words === 0 || words > 100) return;

    // Check connection permission
    if (getConnectionStatus(activeChatUserId) !== 'connected') {
      showToast('You must be connected to message this researcher.', 'lightbulb');
      return;
    }

    const newMsg = {
      id: 'msg-' + Date.now(),
      senderId: 'current_user',
      receiverId: activeChatUserId,
      text: text,
      timestamp: new Date().toISOString(),
      read: true
    };

    messages.push(newMsg);
    saveState();

    if (backendAvailable) {
      fetch(`${BACKEND_API_BASE}/api/research/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId: activeChatUserId, text })
      }).catch(() => {});
    }

    input.value = '';
    updateWordCounter('');
    renderChatMessages();

    // Simulated responsive reply if it is Priya Sundaram or Arun Kumar
    if (activeChatUserId === 'res-priya-sundaram' || activeChatUserId === 'res-arun-kumar') {
      setTimeout(() => {
        const replies = [
          "Thank you for sharing your thoughts! I will review this paper's methodology and get back to you shortly.",
          "Fascinating perspective on this model. Let's schedule a brief research exchange meeting next week!",
          "Agreed. In our clinical testing we observed very similar results on the validation cohort."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        messages.push({
          id: 'msg-reply-' + Date.now(),
          senderId: activeChatUserId,
          receiverId: 'current_user',
          text: randomReply,
          timestamp: new Date().toISOString(),
          read: document.getElementById('modal-private-chat')?.classList.contains('active')
        });
        saveState();
        buildNotifications();
        renderChatMessages();
      }, 1200);
    }
  }

  // Clear Chat UI option
  function clearActiveChat() {
    if (!activeChatUserId) return;
    if (confirm('Clear message history with this researcher?')) {
      messages = messages.filter(m =>
        !((m.senderId === 'current_user' && m.receiverId === activeChatUserId) ||
          (m.senderId === activeChatUserId && m.receiverId === 'current_user'))
      );
      saveState();
      renderChatMessages();
      showToast('Chat history cleared.', 'check');
    }
  }

  // Render Functions for Subpanel Drawer & Full Canvas View
  function renderAllViews() {
    renderDrawerResearchers();
    renderMainViewResearchers();
    updateNotificationBadge();
  }

  // Render Slide-Out Subpanel 4: Researchers
  function renderDrawerResearchers() {
    const container = document.getElementById('subpanel-researchers-content');
    if (!container) return;

    const suggestions = getSuggestedResearchers();
    const myConns = suggestions.filter(r => r.connectionStatus === 'connected');
    const reqs = suggestions.filter(r => r.connectionStatus === 'request_received');

    if (activeDrawerTab === 'suggested') {
      container.innerHTML = `
        <div class="drawer-researcher-list">
          ${suggestions.slice(0, 6).map(r => renderResearcherDrawerCard(r)).join('')}
        </div>
      `;
    } else if (activeDrawerTab === 'requests') {
      if (reqs.length === 0) {
        container.innerHTML = `<div class="networking-empty-msg">No pending connection requests.</div>`;
      } else {
        container.innerHTML = `
          <div class="drawer-researcher-list">
            ${reqs.map(r => renderRequestDrawerCard(r)).join('')}
          </div>
        `;
      }
    } else if (activeDrawerTab === 'connections') {
      if (myConns.length === 0) {
        container.innerHTML = `<div class="networking-empty-msg">No connections yet. Connect with suggested researchers above!</div>`;
      } else {
        container.innerHTML = `
          <div class="drawer-researcher-list">
            ${myConns.map(r => renderConnectedDrawerCard(r)).join('')}
          </div>
        `;
      }
    } else if (activeDrawerTab === 'messages') {
      const chatPartners = myConns;
      if (chatPartners.length === 0) {
        container.innerHTML = `<div class="networking-empty-msg">Connect with researchers to exchange private messages.</div>`;
      } else {
        container.innerHTML = `
          <div class="drawer-researcher-list">
            ${chatPartners.map(r => renderChatPartnerDrawerItem(r)).join('')}
          </div>
        `;
      }
    }

    bindDrawerCardEvents(container);
  }

  function renderResearcherDrawerCard(r) {
    const isConn = r.connectionStatus === 'connected';
    const isSent = r.connectionStatus === 'request_sent';
    const isReceived = r.connectionStatus === 'request_received';

    let actionBtnHtml = '';
    if (isConn) {
      actionBtnHtml = `<button class="btn-drawer-card-action message" data-action="message" data-id="${r.id}">Message</button>`;
    } else if (isSent) {
      actionBtnHtml = `<button class="btn-drawer-card-action pending" disabled>Request Sent</button>`;
    } else if (isReceived) {
      actionBtnHtml = `<button class="btn-drawer-card-action accept" data-action="accept" data-id="${r.id}">Accept</button>`;
    } else {
      actionBtnHtml = `<button class="btn-drawer-card-action connect" data-action="connect" data-id="${r.id}">Connect</button>`;
    }

    return `
      <div class="researcher-drawer-card" data-id="${r.id}">
        <div class="drawer-card-top">
          <img src="${r.avatar}" alt="${r.name}" class="drawer-card-avatar">
          <div class="drawer-card-info">
            <div class="drawer-card-name" data-action="view" data-id="${r.id}">${sanitize(r.name)}</div>
            ${r.userId ? `<div class="drawer-card-userid">${sanitize(r.userId)}</div>` : ''}
            <div class="drawer-card-role">${sanitize(r.professionalRole || '')}</div>
            <div class="drawer-card-loc">${sanitize(r.country)} • ${sanitize(r.district)}</div>
          </div>
        </div>
        <div class="drawer-card-interests">
          ${(r.researchInterests || []).slice(0, 3).map(i => `<span class="interest-tag">${sanitize(i)}</span>`).join('')}
        </div>
        <div class="drawer-card-actions">
          <button class="btn-drawer-card-view" data-action="view" data-id="${r.id}">View Profile</button>
          ${actionBtnHtml}
        </div>
      </div>
    `;
  }

  function renderRequestDrawerCard(r) {
    return `
      <div class="researcher-drawer-card" data-id="${r.id}">
        <div class="drawer-card-top">
          <img src="${r.avatar}" alt="${r.name}" class="drawer-card-avatar">
          <div class="drawer-card-info">
            <div class="drawer-card-name" data-action="view" data-id="${r.id}">${sanitize(r.name)}</div>
            ${r.userId ? `<div class="drawer-card-userid">${sanitize(r.userId)}</div>` : ''}
            <div class="drawer-card-role">${sanitize(r.professionalRole || '')}</div>
            <div class="drawer-card-interests" style="margin: 4px 0 0 0;">
              ${(r.researchInterests || []).slice(0, 2).map(i => `<span class="interest-tag">${sanitize(i)}</span>`).join('')}
            </div>
          </div>
        </div>
        <div class="drawer-card-actions" style="margin-top: 8px;">
          <button class="btn-drawer-card-action accept" data-action="accept" data-id="${r.id}">Accept</button>
          <button class="btn-drawer-card-action decline" data-action="decline" data-id="${r.id}">Decline</button>
        </div>
      </div>
    `;
  }

  function renderConnectedDrawerCard(r) {
    return `
      <div class="researcher-drawer-card" data-id="${r.id}">
        <div class="drawer-card-top">
          <img src="${r.avatar}" alt="${r.name}" class="drawer-card-avatar">
          <div class="drawer-card-info">
            <div class="drawer-card-name" data-action="view" data-id="${r.id}">${sanitize(r.name)}</div>
            ${r.userId ? `<div class="drawer-card-userid">${sanitize(r.userId)}</div>` : ''}
            <div class="drawer-card-role">${sanitize(r.professionalRole || '')}</div>
          </div>
        </div>
        <div class="drawer-card-actions" style="margin-top: 8px;">
          <button class="btn-drawer-card-view" data-action="view" data-id="${r.id}">Profile</button>
          <button class="btn-drawer-card-action message" data-action="message" data-id="${r.id}">Message</button>
        </div>
      </div>
    `;
  }

  function renderChatPartnerDrawerItem(r) {
    const thread = messages.filter(m =>
      (m.senderId === 'current_user' && m.receiverId === r.id) ||
      (m.senderId === r.id && m.receiverId === 'current_user')
    );
    const lastMsg = thread[thread.length - 1];
    const preview = lastMsg ? (lastMsg.text.length > 45 ? lastMsg.text.substring(0, 45) + '...' : lastMsg.text) : 'Start conversation...';

    return `
      <div class="drawer-chat-item" data-action="message" data-id="${r.id}">
        <img src="${r.avatar}" alt="${r.name}" class="drawer-card-avatar">
        <div class="drawer-chat-info">
          <div class="drawer-chat-title">${sanitize(r.name)}</div>
          <div class="drawer-chat-prev">${sanitize(preview)}</div>
        </div>
        ${r.isOnline ? '<span class="online-dot active" style="margin-left:auto;"></span>' : ''}
      </div>
    `;
  }

  function bindDrawerCardEvents(container) {
    container.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const act = btn.getAttribute('data-action');
        const id = btn.getAttribute('data-id');
        if (act === 'view') openViewProfileModal(id);
        else if (act === 'connect') sendConnectionRequest(id);
        else if (act === 'accept') acceptConnectionRequest(id);
        else if (act === 'decline') declineConnectionRequest(id);
        else if (act === 'message') openPrivateChat(id);
      });
    });
  }

  // Render Full Page View 6: view-researchers (Full Canvas Networking)
  function renderMainViewResearchers() {
    const grid = document.getElementById('view-researchers-grid');
    if (!grid) return;

    const filterQuery = (document.getElementById('researchers-search-filter')?.value || '').toLowerCase();
    const suggestions = getSuggestedResearchers().filter(r =>
      !filterQuery ||
      r.name.toLowerCase().includes(filterQuery) ||
      (r.userId && r.userId.toLowerCase().includes(filterQuery)) ||
      (r.professionalRole && r.professionalRole.toLowerCase().includes(filterQuery)) ||
      (r.researchInterests || []).some(i => i.toLowerCase().includes(filterQuery)) ||
      (r.district && r.district.toLowerCase().includes(filterQuery)) ||
      (r.country && r.country.toLowerCase().includes(filterQuery))
    );

    const myConns = suggestions.filter(r => r.connectionStatus === 'connected');
    const reqs = suggestions.filter(r => r.connectionStatus === 'request_received');

    let displayList = suggestions;
    if (activeViewTab === 'requests') displayList = reqs;
    else if (activeViewTab === 'connections') displayList = myConns;
    else if (activeViewTab === 'messages') displayList = myConns;

    if (displayList.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 16px; color: var(--text-muted);">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 8px; opacity: 0.6;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          <div style="font-weight: 600; font-size: 1rem; color: var(--text-main); margin-bottom: 4px;">No researchers found in this tab</div>
          <div style="font-size: 0.84rem;">Try searching for different keywords or check the Suggested tab.</div>
        </div>
      `;
      return;
    }

    grid.innerHTML = displayList.map(r => renderMainProfileCard(r)).join('');

    // Bind card buttons
    grid.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const act = btn.getAttribute('data-action');
        const id = btn.getAttribute('data-id');
        if (act === 'view') openViewProfileModal(id);
        else if (act === 'connect') sendConnectionRequest(id);
        else if (act === 'accept') acceptConnectionRequest(id);
        else if (act === 'decline') declineConnectionRequest(id);
        else if (act === 'message') openPrivateChat(id);
      });
    });
  }

  // Full Profile Card (Strictly satisfies #4 and privacy rules)
  function renderMainProfileCard(r) {
    const isConn = r.connectionStatus === 'connected';
    const isSent = r.connectionStatus === 'request_sent';
    const isReceived = r.connectionStatus === 'request_received';

    let actionBtn = '';
    if (isConn) {
      actionBtn = `<button class="btn-card-connect message" data-action="message" data-id="${r.id}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        <span>Message</span>
      </button>`;
    } else if (isSent) {
      actionBtn = `<button class="btn-card-connect pending" disabled>Request Sent</button>`;
    } else if (isReceived) {
      actionBtn = `
        <button class="btn-card-connect accept" data-action="accept" data-id="${r.id}">Accept</button>
        <button class="btn-card-connect decline" data-action="decline" data-id="${r.id}">Decline</button>
      `;
    } else {
      actionBtn = `<button class="btn-card-connect connect" data-action="connect" data-id="${r.id}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        <span>Connect</span>
      </button>`;
    }

    const linkedinUrl = r.linkedin || `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(r.name)}`;
    const instagramUrl = r.instagram || `https://www.instagram.com/${(r.userId || r.name).replace(/[@\s]/g, '').toLowerCase()}`;

    return `
      <div class="researcher-full-card" data-id="${r.id}">
        <div class="card-avatar-wrap">
          <img src="${r.avatar}" alt="${r.name}" class="card-avatar-img">
          ${r.isOnline ? '<span class="online-dot active card-online-dot" title="Active Now"></span>' : ''}
        </div>
        
        <div class="card-primary-info">
          <div class="card-name" data-action="view" data-id="${r.id}">${sanitize(r.name)}</div>
          ${r.userId ? `<div class="card-userid">${sanitize(r.userId)}</div>` : ''}
          <div class="card-role">${sanitize(r.professionalRole || '')}</div>
          <div class="card-location">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>${sanitize(r.district ? r.district + ', ' : '')}${sanitize(r.state ? r.state + ', ' : '')}${sanitize(r.country)}</span>
          </div>
        </div>

        <div class="card-interests-wrap">
          <div class="card-interests-chips">
            ${(r.researchInterests || []).map(i => `<span class="research-interest-pill">${sanitize(i)}</span>`).join('')}
          </div>
        </div>

        <!-- Social Connect Row (LinkedIn & Instagram) -->
        <div class="card-social-connect-row">
          <a href="${linkedinUrl}" target="_blank" rel="noopener noreferrer" class="btn-social-connect linkedin" title="Connect with ${sanitize(r.name)} on LinkedIn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <span>LinkedIn</span>
          </a>
          <a href="${instagramUrl}" target="_blank" rel="noopener noreferrer" class="btn-social-connect instagram" title="Connect with ${sanitize(r.name)} on Instagram">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Instagram</span>
          </a>
        </div>

        <div class="card-footer-actions">
          <button class="btn-card-view" data-action="view" data-id="${r.id}">View Profile</button>
          ${actionBtn}
        </div>
      </div>
    `;
  }

  // Toast Helper
  function showToast(msg, iconName = 'check') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast-bubble active';
    toast.innerHTML = `
      <div class="toast-icon">✓</div>
      <div class="toast-message">${sanitize(msg)}</div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  function closeModals() {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
  }

  // Bind All Networking UI Listeners
  function bindEvents() {
    // 1. Profile Setup Form
    const setupForm = document.getElementById('form-research-profile-setup');
    if (setupForm) {
      setupForm.addEventListener('submit', handleProfileSetupSubmit);
    }

    const btnCloseSetup = document.getElementById('btn-close-profile-setup');
    if (btnCloseSetup) {
      btnCloseSetup.addEventListener('click', () => {
        document.getElementById('modal-research-profile-setup')?.classList.remove('active');
      });
    }

    // 2. View Profile Modal Close
    const btnCloseView = document.getElementById('btn-close-researcher-profile');
    if (btnCloseView) {
      btnCloseView.addEventListener('click', () => {
        document.getElementById('modal-researcher-profile-view')?.classList.remove('active');
      });
    }

    // 3. Private Chat Modal Close & Chat Actions
    const btnCloseChat = document.getElementById('btn-close-private-chat');
    if (btnCloseChat) {
      btnCloseChat.addEventListener('click', () => {
        document.getElementById('modal-private-chat')?.classList.remove('active');
        activeChatUserId = null;
      });
    }

    const chatTextarea = document.getElementById('chat-message-textarea');
    if (chatTextarea) {
      chatTextarea.addEventListener('input', (e) => {
        updateWordCounter(e.target.value);
      });
      chatTextarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendChatMessage();
        }
      });
    }

    const btnSend = document.getElementById('btn-chat-send');
    if (btnSend) {
      btnSend.addEventListener('click', sendChatMessage);
    }

    const btnClearChat = document.getElementById('btn-chat-clear');
    if (btnClearChat) {
      btnClearChat.addEventListener('click', clearActiveChat);
    }

    const btnChatBlock = document.getElementById('btn-chat-block');
    if (btnChatBlock) {
      btnChatBlock.addEventListener('click', () => {
        if (activeChatUserId && confirm('Block this researcher?')) {
          blockUser(activeChatUserId);
          document.getElementById('modal-private-chat')?.classList.remove('active');
        }
      });
    }

    const btnChatReport = document.getElementById('btn-chat-report');
    if (btnChatReport) {
      btnChatReport.addEventListener('click', () => {
        if (activeChatUserId) {
          const reason = prompt('Specify reason for report:');
          if (reason) reportUser(activeChatUserId, reason);
        }
      });
    }

    // 4. Slide-Out Subpanel Drawer Tabs (Suggested, Requests, Connections, Messages)
    document.querySelectorAll('.researcher-drawer-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.researcher-drawer-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeDrawerTab = btn.getAttribute('data-tab');
        renderDrawerResearchers();
      });
    });

    // 5. Full Canvas View Tabs
    document.querySelectorAll('.networking-view-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.networking-view-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeViewTab = btn.getAttribute('data-tab');
        renderMainViewResearchers();
      });
    });

    // 6. Search filter in main networking view
    const filterInput = document.getElementById('researchers-search-filter');
    if (filterInput) {
      filterInput.addEventListener('input', renderMainViewResearchers);
    }

    // 7. Profile Edit Button in networking header
    const btnEditProfile = document.getElementById('btn-open-my-profile-edit');
    if (btnEditProfile) {
      btnEditProfile.addEventListener('click', openProfileSetupModal);
    }
  }

  // Public API
  return {
    init: async function () {
      loadState();
      await testBackend();
      bindEvents();
      renderAllViews();
      checkFirstTimeVisit();
    },
    detectInterests: detectAndRegisterResearchInterests,
    openChat: openPrivateChat,
    openProfileModal: openProfileSetupModal,
    openViewModal: openViewProfileModal,
    renderAll: renderAllViews,
    getProfile: () => profile
  };
})();
