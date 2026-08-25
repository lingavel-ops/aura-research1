/**
 * AURQO AI Research Workspace - Main Application Logic
 * Clean professional vector icons, robust state management, and interactive workflows
 */

import { AURQO_INITIAL_DATA } from './data.js';

// Application State
const state = {
  theme: localStorage.getItem('aurqo_theme') || 'light',
  activeFolderId: AURQO_INITIAL_DATA.activeFolderId,
  currentView: 'dashboard', // dashboard, new-research, library, papers, chat, history, saved
  activeResearchId: 'impact-of-ai-on-education',
  activeWorkspaceTab: 'overview',
  folders: JSON.parse(JSON.stringify(AURQO_INITIAL_DATA.folders)),
  researchItems: JSON.parse(JSON.stringify(AURQO_INITIAL_DATA.researchItems)),
  documents: JSON.parse(JSON.stringify(AURQO_INITIAL_DATA.documents)),
  papers: JSON.parse(JSON.stringify(AURQO_INITIAL_DATA.papers)),
  history: JSON.parse(JSON.stringify(AURQO_INITIAL_DATA.history)),
  pendingResearchQuery: null,
  pendingSuggestedDomain: null,
  isResearchRunning: false
};

// Common SVG Icons
const ICONS = {
  folder: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
  file: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`,
  sparkle: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  lightbulb: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-indigo)" stroke-width="2"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"></path></svg>`,
  calendar: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`
};

// DOM Elements Cache
const elements = {};

function init() {
  cacheDomElements();
  applyTheme(state.theme);
  renderFolderUI();
  renderStructureVisualizer();
  renderDocumentLibrary();
  renderPapersList();
  renderHistoryView();
  renderSavedView();
  bindEvents();
  
  // Load default research workspace view
  if (state.researchItems[state.activeResearchId]) {
    renderResearchWorkspace(state.researchItems[state.activeResearchId]);
  }
}

function cacheDomElements() {
  elements.body = document.body;
  elements.themeToggleBtn = document.getElementById('theme-toggle-btn');
  elements.topFolderBtn = document.getElementById('top-folder-btn');
  elements.topFolderName = document.getElementById('top-folder-name');
  elements.folderPopover = document.getElementById('folder-popover');
  elements.folderPopoverList = document.getElementById('folder-popover-list');
  elements.currentFolderBannerName = document.getElementById('current-folder-banner-name');
  elements.topBreadcrumbFolder = document.getElementById('top-breadcrumb-folder');
  
  // Main Search Elements
  elements.mainResearchInput = document.getElementById('main-research-input');
  elements.mainResearchSubmitBtn = document.getElementById('main-research-submit-btn');
  elements.mainResearchClearBtn = document.getElementById('main-research-clear-btn');
  elements.samplePromptPills = document.querySelectorAll('.prompt-pill');
  
  // Action Buttons below Search
  elements.btnImportWord = document.getElementById('btn-action-import-word');
  elements.btnExplore = document.getElementById('btn-action-explore');
  elements.btnSources = document.getElementById('btn-action-sources');
  elements.btnChatAI = document.getElementById('btn-action-chat-ai');
  
  // Loading State
  elements.researchLoadingOverlay = document.getElementById('research-loading-overlay');
  elements.loaderQueryBadge = document.getElementById('loader-query-badge');
  elements.progressBarFill = document.getElementById('progress-bar-fill');
  elements.loadingStagesContainer = document.getElementById('loading-stages-container');
  
  // Results Workspace
  elements.resultsWorkspace = document.getElementById('results-workspace');
  elements.workspaceFolderPath = document.getElementById('workspace-folder-path');
  elements.resultTitle = document.getElementById('result-main-title');
  elements.resultDate = document.getElementById('result-date');
  elements.resultQuery = document.getElementById('result-query-meta');
  elements.btnSaveResearch = document.getElementById('btn-save-research');
  elements.btnCopyResearch = document.getElementById('btn-copy-research');
  elements.btnExportResearch = document.getElementById('btn-export-research');
  elements.btnShareResearch = document.getElementById('btn-share-research');
  elements.btnRegenerateResearch = document.getElementById('btn-regenerate-research');
  elements.btnContinueAI = document.getElementById('btn-continue-ai');
  
  // Workspace Tabs
  elements.workspaceTabBtns = document.querySelectorAll('.workspace-tab-btn');
  elements.tabPanels = document.querySelectorAll('.tab-panel');
  
  // Modals
  elements.createFolderModal = document.getElementById('modal-create-folder');
  elements.importWordModal = document.getElementById('modal-import-word');
  elements.uploadDocModal = document.getElementById('modal-upload-doc');
  elements.domainDetectModal = document.getElementById('modal-domain-detect');
  elements.shareModal = document.getElementById('modal-share');
  elements.exportModal = document.getElementById('modal-export');
  
  // Forms
  elements.createFolderForm = document.getElementById('create-folder-form');
  elements.newResearchForm = document.getElementById('start-new-research-form');
  
  // Sidebar Navigation
  elements.sidebarNavItems = document.querySelectorAll('.nav-item, .nav-sub-item');
  elements.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  elements.sidebar = document.querySelector('.sidebar');
  
  // Toast Container
  elements.toastContainer = document.getElementById('toast-container');
}

function getActiveFolder() {
  return state.folders.find(f => f.id === state.activeFolderId) || state.folders[0];
}

// Theme Toggle
function applyTheme(theme) {
  state.theme = theme;
  if (theme === 'dark') {
    elements.body.setAttribute('data-theme', 'dark');
    elements.themeToggleBtn.innerHTML = `
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
    `;
  } else {
    elements.body.removeAttribute('data-theme');
    elements.themeToggleBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
  }
  localStorage.setItem('aurqo_theme', theme);
}

// Folder Management & UI
function renderFolderUI() {
  const activeFolder = getActiveFolder();
  
  // Update Top bar & Breadcrumbs
  if (elements.topFolderName) {
    elements.topFolderName.textContent = activeFolder.name;
  }
  if (elements.currentFolderBannerName) {
    elements.currentFolderBannerName.innerHTML = `
      ${ICONS.folder}
      <span>${activeFolder.name}</span>
    `;
  }
  if (elements.topBreadcrumbFolder) {
    elements.topBreadcrumbFolder.textContent = activeFolder.name;
  }
  
  // Update Folder Popover list
  if (elements.folderPopoverList) {
    elements.folderPopoverList.innerHTML = state.folders.map(folder => `
      <div class="folder-popover-item ${folder.id === state.activeFolderId ? 'active' : ''}" data-folder-id="${folder.id}">
        <div style="display: flex; align-items: center; gap: 8px;">
          ${ICONS.folder}
          <span>${folder.name}</span>
        </div>
        <span style="font-size: 0.76rem; opacity: 0.7;">${folder.documentCount || 0} docs</span>
      </div>
    `).join('');

    // Attach click events
    elements.folderPopoverList.querySelectorAll('.folder-popover-item').forEach(item => {
      item.addEventListener('click', () => {
        const folderId = item.getAttribute('data-folder-id');
        setActiveFolder(folderId);
        elements.folderPopover.classList.remove('active');
      });
    });
  }

  // Populate folder dropdowns in forms
  const folderSelects = document.querySelectorAll('select.folder-select-dropdown');
  folderSelects.forEach(select => {
    select.innerHTML = state.folders.map(f => `
      <option value="${f.id}" ${f.id === state.activeFolderId ? 'selected' : ''}>${f.name}</option>
    `).join('');
  });
}

function setActiveFolder(folderId) {
  state.activeFolderId = folderId;
  const folder = getActiveFolder();
  renderFolderUI();
  renderStructureVisualizer();
  renderDocumentLibrary();
  renderPapersList();
  renderDedicatedChat();
  showToast(`Switched active folder to: ${folder.name}`, ICONS.folder);
}

function createNewFolder(name, domain, description) {
  const newFolderId = 'folder-' + name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const newFolder = {
    id: newFolderId,
    name: name,
    domain: domain || name,
    icon: 'folder',
    color: '#4f46e5',
    description: description || `Research folder for ${name}`,
    documentCount: 0,
    createdAt: new Date().toISOString().split('T')[0]
  };
  
  state.folders.push(newFolder);
  setActiveFolder(newFolderId);
  renderFolderUI();
  renderDocumentLibrary();
  closeModal(elements.createFolderModal);
  showToast(`Created research folder: "${name}"`, ICONS.check);
}

// Domain Auto-Detection
function detectDomainFromQuery(query) {
  const lower = query.toLowerCase();
  for (const [domain, keywords] of Object.entries(AURQO_INITIAL_DATA.domainKeywords)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        return domain;
      }
    }
  }
  return null;
}

// Domain Tree Visualizer
function renderStructureVisualizer() {
  const activeFolder = getActiveFolder();
  const currentTopicTitle = state.researchItems[state.activeResearchId] ? state.researchItems[state.activeResearchId].title : 'Active Research Topic';
  const container = document.getElementById('domain-tree-flow-container');
  if (!container) return;

  container.innerHTML = `
    <div class="tree-node active-folder">
      ${ICONS.folder}
      <span>${activeFolder.name}</span>
    </div>
    <span class="tree-arrow">❯</span>
    <div class="tree-node">
      ${ICONS.file}
      <span>${currentTopicTitle}</span>
    </div>
    <span class="tree-arrow">❯</span>
    <div class="tree-node" style="font-size: 0.8rem; background: var(--bg-surface-active); color: var(--primary-indigo);">
      Research • Papers • Sources • AI Chat • Notes • Saved
    </div>
  `;
}

// 7-Stage Research Progress Runner
const RESEARCH_STAGES = [
  { title: "Understanding your research question", duration: 600 },
  { title: "Finding relevant sources & academic databases", duration: 700 },
  { title: "Discovering peer-reviewed research papers", duration: 750 },
  { title: "Analyzing and synthesizing information", duration: 800 },
  { title: "Comparing empirical findings & datasets", duration: 650 },
  { title: "Organizing knowledge into research folder", duration: 600 },
  { title: "Generating structured insights & executive summary", duration: 550 }
];

function startResearchFlow(query, targetFolderId) {
  if (!query || query.trim() === '') return;
  
  // Check Domain Auto-Detection
  const detectedDomain = detectDomainFromQuery(query);
  const activeFolder = getActiveFolder();
  
  if (detectedDomain && detectedDomain !== activeFolder.domain && !targetFolderId) {
    // Show Domain Auto-Detection Modal
    state.pendingResearchQuery = query;
    state.pendingSuggestedDomain = detectedDomain;
    
    const suggestedSpan = document.getElementById('detected-domain-suggested');
    const currentSpan = document.getElementById('detected-domain-current');
    if (suggestedSpan) suggestedSpan.textContent = detectedDomain;
    if (currentSpan) currentSpan.textContent = activeFolder.name;
    
    openModal(elements.domainDetectModal);
    return;
  }

  executeResearchPipeline(query, targetFolderId || state.activeFolderId);
}

function executeResearchPipeline(query, folderId) {
  state.isResearchRunning = true;
  const folder = state.folders.find(f => f.id === folderId) || getActiveFolder();
  
  // Hide results workspace and show loading overlay
  elements.resultsWorkspace.classList.remove('active');
  elements.researchLoadingOverlay.classList.add('active');
  elements.loaderQueryBadge.textContent = `Query: "${query}"`;
  elements.progressBarFill.style.width = '0%';
  
  // Scroll smoothly to loading area
  elements.researchLoadingOverlay.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Render loading stages HTML
  elements.loadingStagesContainer.innerHTML = RESEARCH_STAGES.map((stage, idx) => `
    <div class="loading-stage-item ${idx === 0 ? 'in-progress' : 'pending'}" id="stage-item-${idx}">
      <div class="stage-icon-wrap">${idx + 1}</div>
      <div class="stage-text">${stage.title}</div>
      <span class="stage-status-badge">${idx === 0 ? 'Processing...' : 'Waiting'}</span>
    </div>
  `).join('');

  let currentStageIndex = 0;
  const totalStages = RESEARCH_STAGES.length;

  function stepNextStage() {
    if (currentStageIndex >= totalStages) {
      finishResearchPipeline(query, folder);
      return;
    }

    const stageItem = document.getElementById(`stage-item-${currentStageIndex}`);
    if (stageItem) {
      stageItem.className = 'loading-stage-item in-progress';
      stageItem.querySelector('.stage-status-badge').textContent = 'Analyzing...';
      stageItem.querySelector('.stage-icon-wrap').innerHTML = ICONS.sparkle;
    }

    const percent = Math.round(((currentStageIndex + 1) / totalStages) * 100);
    elements.progressBarFill.style.width = `${percent}%`;

    setTimeout(() => {
      if (stageItem) {
        stageItem.className = 'loading-stage-item completed';
        stageItem.querySelector('.stage-status-badge').textContent = 'Completed';
        stageItem.querySelector('.stage-icon-wrap').innerHTML = ICONS.check;
      }
      currentStageIndex++;
      stepNextStage();
    }, RESEARCH_STAGES[currentStageIndex].duration);
  }

  stepNextStage();
}

function finishResearchPipeline(query, folder) {
  state.isResearchRunning = false;
  elements.researchLoadingOverlay.classList.remove('active');
  
  // Generate or match research item
  const researchId = 'research-' + Date.now();
  const cleanTitle = query.length > 55 ? query.substring(0, 55) + '...' : query;
  
  let newResearch;
  if (query.toLowerCase().includes('education') || query.toLowerCase().includes('learn')) {
    newResearch = JSON.parse(JSON.stringify(AURQO_INITIAL_DATA.researchItems['impact-of-ai-on-education']));
    newResearch.id = researchId;
    newResearch.query = query;
    newResearch.folderId = folder.id;
    newResearch.domain = folder.domain;
  } else if (query.toLowerCase().includes('health') || query.toLowerCase().includes('medical')) {
    newResearch = JSON.parse(JSON.stringify(AURQO_INITIAL_DATA.researchItems['applications-of-ai-in-healthcare']));
    newResearch.id = researchId;
    newResearch.query = query;
    newResearch.folderId = folder.id;
    newResearch.domain = folder.domain;
  } else if (query.toLowerCase().includes('crypto') || query.toLowerCase().includes('quantum')) {
    newResearch = JSON.parse(JSON.stringify(AURQO_INITIAL_DATA.researchItems['quantum-computing-cryptography']));
    newResearch.id = researchId;
    newResearch.query = query;
    newResearch.folderId = folder.id;
    newResearch.domain = folder.domain;
  } else {
    // Dynamic Synthesized Research Object
    newResearch = {
      id: researchId,
      folderId: folder.id,
      domain: folder.domain,
      title: cleanTitle,
      query: query,
      date: new Date().toISOString().split('T')[0],
      saved: true,
      overview: {
        summary: `Comprehensive research synthesis on "${query}". The integration of advanced computational models and empirical data analysis reveals significant efficiency gains, structural breakthroughs, and automated knowledge pipelines in the domain of ${folder.domain}.`,
        takeaways: [
          `Core Breakthroughs: Methodological advances demonstrate measurable performance scaling across multi-domain datasets.`,
          `Integration Strategies: Enterprise and academic cohorts report high adoption velocity when leveraging hybrid human-in-the-loop workflows.`,
          `Forward Outlook: Key research frontiers emphasize safety, latency reduction, and domain-adapted foundational fine-tuning.`
        ]
      },
      keyFindings: [
        {
          metric: "44.2%",
          title: "Performance Optimization",
          desc: "Empirical benchmarks indicate marked acceleration in task convergence and synthesis reliability."
        },
        {
          metric: "3.5x",
          title: "Workflow Efficiency",
          desc: "Automated analysis reduces literature review latency from days to structured real-time summaries."
        },
        {
          metric: "98.1%",
          title: "Verification Index",
          desc: "Cross-referenced against verified academic proceedings and peer-reviewed open archives."
        }
      ],
      insights: [
        {
          tag: "Domain Synthesis",
          title: "Multi-Source Knowledge Distillation",
          text: `Analyzing ${folder.name} literature shows an increasing convergence between domain-specific foundation architectures and localized indexing.`
        },
        {
          tag: "Practical Translation",
          title: "Scalable Deployment Protocols",
          text: "Practical application frameworks highlight the necessity of standardized benchmarking metrics and robust validation suites."
        }
      ],
      sources: [
        {
          id: `src-${Date.now()}-1`,
          title: `Empirical Advances in ${folder.domain}: A Systematic Review (2025-2026)`,
          type: "Academic Review",
          author: "Dr. A. Vance, Prof. E. Rostova",
          publisher: "Nature & Science Direct",
          doi: "10.1038/s41586-025-09124-x",
          year: "2025",
          url: "#",
          citation: `Vance, A., & Rostova, E. (2025). Empirical Advances in ${folder.domain}. Nature, 612, 104-118.`
        },
        {
          id: `src-${Date.now()}-2`,
          title: `Algorithmic Scaling and Benchmark Protocols in ${folder.name}`,
          type: "IEEE Conference",
          author: "J. Thorne, D. Miller, et al.",
          publisher: "IEEE Transactions on Emerging Technologies",
          doi: "10.1109/TET.2025.109283",
          year: "2025",
          url: "#",
          citation: `Thorne, J., et al. (2025). Algorithmic Scaling in ${folder.name}. IEEE TET, 12(3), 89-102.`
        }
      ],
      papers: [
        {
          id: `paper-${Date.now()}-1`,
          title: `Foundation Modeling and Practical Applications in ${folder.domain}`,
          authors: "Kaufman, H., Chen, L., et al.",
          journal: "Journal of Applied AI & Engineering",
          year: "2025",
          citations: 74,
          abstract: `We investigate the integration of transformer and diffusion architectures across specialized ${folder.domain} datasets, demonstrating significant empirical gains over baseline heuristic approaches.`,
          downloadUrl: "#",
          domain: folder.domain
        }
      ],
      relatedTopics: [
        `Foundational Architectures in ${folder.name}`,
        `Automated Validation Pipelines for ${folder.domain}`,
        `Scalable Enterprise Deployment in ${folder.domain}`,
        `Ethical and Privacy Standards in ${folder.name}`
      ],
      aiChat: [
        {
          sender: "user",
          text: `Summarize the key conclusions from this research on ${cleanTitle}.`,
          timestamp: "Just now"
        },
        {
          sender: "ai",
          text: `Based on the latest analysis in your **${folder.name}** folder:\n\n1. **Accelerated Synthesis**: Research confirms consistent efficiency and diagnostic improvements.\n2. **Verified Sources**: 2 high-impact academic sources and peer-reviewed papers have been indexed.\n3. **Actionable Next Steps**: You can explore related topics, export this study to Word/PDF, or chat further about specific sections.`,
          timestamp: "Just now"
        }
      ],
      notes: `Initial research notes on ${cleanTitle}. Prepared automatically inside ${folder.name}.`,
      documents: []
    };
  }

  // Save to State
  state.researchItems[researchId] = newResearch;
  state.activeResearchId = researchId;
  
  // Add to folder document count
  folder.documentCount = (folder.documentCount || 0) + 1;
  renderFolderUI();
  
  // Add to History
  if (state.history && state.history[0]) {
    state.history[0].items.unshift({
      id: researchId,
      title: newResearch.title,
      time: "Just now"
    });
    renderHistoryView();
  }

  renderResearchWorkspace(newResearch);
  showToast(`Research organized into "${folder.name}"`, ICONS.folder);
}

// Research Results Workspace Rendering
function renderResearchWorkspace(research) {
  if (!research) return;
  
  const folder = state.folders.find(f => f.id === research.folderId) || getActiveFolder();
  
  // Set Header Info
  elements.workspaceFolderPath.innerHTML = `
    ${ICONS.folder}
    <span>${folder.name}</span>
    <span>❯</span>
    ${ICONS.file}
    <span>${research.title}</span>
  `;
  elements.resultTitle.textContent = research.title;
  elements.resultDate.textContent = `Date: ${research.date || '2026-08-25'}`;
  elements.resultQuery.textContent = `Query: "${research.query || research.title}"`;
  
  // Update Save button status
  if (research.saved) {
    elements.btnSaveResearch.classList.add('saved');
    elements.btnSaveResearch.innerHTML = `
      ${ICONS.check}
      <span>Saved in Folder</span>
    `;
  } else {
    elements.btnSaveResearch.classList.remove('saved');
    elements.btnSaveResearch.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
      <span>Save to Folder</span>
    `;
  }

  // Render Tab 1: Overview
  const overviewContainer = document.getElementById('tab-panel-overview');
  if (overviewContainer && research.overview) {
    overviewContainer.innerHTML = `
      <div class="overview-summary-card">
        <div class="overview-heading">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary-indigo)" stroke-width="2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
          </svg>
          <span>AI Executive Synthesis</span>
        </div>
        <p class="overview-paragraph">${research.overview.summary}</p>
        
        <div style="font-weight: 700; font-size: 0.92rem; color: var(--text-main); margin-bottom: 8px;">Key Takeaways:</div>
        <ul class="overview-takeaways-list">
          ${research.overview.takeaways.map(takeaway => `
            <li class="overview-takeaway-item">
              <div class="takeaway-dot"></div>
              <div>${takeaway}</div>
            </li>
          `).join('')}
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
        ${(research.keyFindings || []).map(finding => `
          <div class="finding-card">
            <div class="finding-metric">${finding.metric}</div>
            <div class="finding-title">${finding.title}</div>
            <div class="finding-desc">${finding.desc}</div>
          </div>
        `).join('')}
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
        ${(research.insights || []).map(insight => `
          <div class="insight-callout-card">
            <div class="insight-icon">${ICONS.lightbulb}</div>
            <div class="insight-content">
              <span class="insight-tag">${insight.tag}</span>
              <div class="insight-title">${insight.title}</div>
              <div class="insight-text">${insight.text}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="related-topics-wrap">
        <div style="font-weight: 700; font-size: 0.94rem; color: var(--text-main);">Related Research Exploration Topics:</div>
        <div class="related-pills-list">
          ${(research.relatedTopics || []).map(topic => `
            <div class="related-topic-pill" data-topic="${topic}">
              ${ICONS.sparkle}
              <span>${topic}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Bind click on related topics
    overviewContainer.querySelectorAll('.related-topic-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const topic = pill.getAttribute('data-topic');
        elements.mainResearchInput.value = topic;
        startResearchFlow(topic, folder.id);
      });
    });
  }

  // Render Tab 2: Papers
  const papersContainer = document.getElementById('tab-panel-papers');
  if (papersContainer) {
    const papers = research.papers || [];
    papersContainer.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <div style="font-size: 1.05rem; font-weight: 700;">Academic & Peer-Reviewed Papers (${papers.length})</div>
        <button class="btn-quick-action" id="btn-find-more-papers" style="padding: 6px 14px; font-size: 0.82rem;">
          <span>Search Global Paper Index</span>
        </button>
      </div>
      <div class="cards-list-grid">
        ${papers.map(paper => `
          <div class="paper-card">
            <div>
              <div class="card-top-meta">
                <span class="badge-domain">${folder.name}</span>
                <span class="badge-year">Year: ${paper.year} • ${paper.citations} citations</span>
              </div>
              <div class="card-title" style="margin-top: 10px;">${paper.title}</div>
              <div class="card-authors" style="margin-top: 4px;">${paper.authors} — <i>${paper.journal}</i></div>
              <div class="card-abstract" style="margin-top: 10px;">${paper.abstract}</div>
            </div>
            <div class="card-footer-actions">
              <button class="btn-card-action btn-open-paper-sim">View Full Text</button>
              <button class="btn-card-action btn-chat-paper-sim">Chat with Paper</button>
              <button class="btn-card-action btn-cite-paper-sim">Cite</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Bind paper actions
    papersContainer.querySelectorAll('.btn-open-paper-sim').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('Opening paper viewer simulation...', ICONS.file);
      });
    });
    papersContainer.querySelectorAll('.btn-chat-paper-sim').forEach(btn => {
      btn.addEventListener('click', () => {
        switchWorkspaceTab('chat');
      });
    });
    papersContainer.querySelectorAll('.btn-cite-paper-sim').forEach(btn => {
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(`Citation: ${research.title} (${folder.name})`);
        showToast('Citation copied in APA format!', ICONS.check);
      });
    });
    const findMoreBtn = document.getElementById('btn-find-more-papers');
    if (findMoreBtn) {
      findMoreBtn.addEventListener('click', () => switchView('papers'));
    }
  }

  // Render Tab 3: Documents
  const docsContainer = document.getElementById('tab-panel-documents');
  if (docsContainer) {
    const docs = research.documents || [];
    docsContainer.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
        <div style="font-size: 1.05rem; font-weight: 700;">Research Documents & Word Files (${docs.length})</div>
        <div style="display: flex; gap: 8px;">
          <button class="btn-quick-action" id="btn-tab-import-word" style="padding: 6px 14px; font-size: 0.82rem;">
            <span>Import from Word (.docx)</span>
          </button>
          <button class="btn-quick-action" id="btn-tab-upload-doc" style="padding: 6px 14px; font-size: 0.82rem;">
            <span>Upload Document</span>
          </button>
        </div>
      </div>
      ${docs.length === 0 ? `
        <div style="text-align: center; padding: 40px 20px; background: var(--bg-surface-subtle); border-radius: var(--radius-lg); border: 1px dashed var(--border-light);">
          <div style="display: flex; justify-content: center; margin-bottom: 10px;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          </div>
          <div style="font-weight: 700; font-size: 1.05rem; margin-bottom: 4px;">No Word documents attached yet</div>
          <div style="font-size: 0.88rem; color: var(--text-muted); max-width: 420px; margin: 0 auto 16px auto;">
            Upload a .doc, .docx or PDF file to connect your external research directly to this <b>${folder.name}</b> project.
          </div>
          <button class="btn-getstarted" id="btn-empty-import-word" style="padding: 8px 18px; font-size: 0.86rem;">
            Import Word Document Now
          </button>
        </div>
      ` : `
        <div class="cards-list-grid">
          ${docs.map(doc => `
            <div class="paper-card">
              <div>
                <div class="card-top-meta">
                  <span class="badge-domain">${doc.type.toUpperCase()}</span>
                  <span class="badge-year">${doc.size} • ${doc.updatedAt}</span>
                </div>
                <div class="card-title" style="margin-top: 10px;">${doc.name}</div>
                <div class="card-abstract" style="margin-top: 8px;">${doc.preview}</div>
              </div>
              <div class="card-footer-actions">
                <button class="btn-card-action btn-preview-doc-sim">View Outline</button>
                <button class="btn-card-action btn-ask-doc-sim">Ask AI</button>
                <button class="btn-card-action btn-dl-doc-sim">Download</button>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    `;

    // Event bindings inside Documents Tab
    const tabImportWord = document.getElementById('btn-tab-import-word');
    const emptyImportWord = document.getElementById('btn-empty-import-word');
    const tabUploadDoc = document.getElementById('btn-tab-upload-doc');
    
    if (tabImportWord) tabImportWord.addEventListener('click', () => openModal(elements.importWordModal));
    if (emptyImportWord) emptyImportWord.addEventListener('click', () => openModal(elements.importWordModal));
    if (tabUploadDoc) tabUploadDoc.addEventListener('click', () => openModal(elements.uploadDocModal));
    
    docsContainer.querySelectorAll('.btn-preview-doc-sim').forEach(btn => {
      btn.addEventListener('click', () => showToast('Opening Word document outline preview...', ICONS.file));
    });
    docsContainer.querySelectorAll('.btn-ask-doc-sim').forEach(btn => {
      btn.addEventListener('click', () => switchWorkspaceTab('chat'));
    });
    docsContainer.querySelectorAll('.btn-dl-doc-sim').forEach(btn => {
      btn.addEventListener('click', () => showToast('Document downloaded successfully!', ICONS.check));
    });
  }

  // Render Tab 4: Sources
  const sourcesContainer = document.getElementById('tab-panel-sources');
  if (sourcesContainer) {
    const sources = research.sources || [];
    sourcesContainer.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <div style="font-size: 1.05rem; font-weight: 700;">Verified & Academic Citations (${sources.length})</div>
        <span style="font-size: 0.82rem; color: var(--text-muted);">Organized inside: <b>${folder.name}</b></span>
      </div>
      <div class="cards-list-grid">
        ${sources.map(src => `
          <div class="source-card">
            <div>
              <div class="card-top-meta">
                <span class="badge-domain">${src.type}</span>
                <span class="badge-year">Year: ${src.year}</span>
              </div>
              <div class="card-title" style="margin-top: 8px;">${src.title}</div>
              <div class="card-authors" style="margin-top: 4px;">${src.author} — <b>${src.publisher}</b></div>
              <div style="font-size: 0.8rem; font-family: monospace; color: var(--primary-indigo); margin-top: 8px; word-break: break-all;">
                DOI: ${src.doi}
              </div>
              <div style="font-size: 0.82rem; background: var(--bg-surface-subtle); padding: 8px 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); margin-top: 10px; color: var(--text-secondary);">
                "${src.citation}"
              </div>
            </div>
            <div class="card-footer-actions">
              <button class="btn-card-action btn-copy-cit" data-cit="${src.citation}">Copy Citation</button>
              <button class="btn-card-action btn-open-src-url">View Source</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    sourcesContainer.querySelectorAll('.btn-copy-cit').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-cit');
        navigator.clipboard.writeText(text);
        showToast('Citation copied to clipboard!', ICONS.check);
      });
    });
    sourcesContainer.querySelectorAll('.btn-open-src-url').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('Opening verified academic publisher repository...', ICONS.sparkle);
      });
    });
  }

  // Render Tab 5: AI Chat (Contextual)
  const chatContainer = document.getElementById('tab-panel-chat');
  if (chatContainer) {
    const messages = research.aiChat || [];
    chatContainer.innerHTML = `
      <div class="ai-chat-interface">
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="chat-avatar-ai">${ICONS.sparkle}</div>
            <div>
              <div class="chat-header-title">AURQO Research Assistant</div>
              <div class="chat-header-sub">Connected to: <b>${folder.name}</b> • Topic: <i>${research.title}</i></div>
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn-result-action" id="btn-clear-tab-chat" style="padding: 4px 10px; font-size: 0.78rem;">Clear</button>
            <button class="btn-result-action" id="btn-save-tab-chat" style="padding: 4px 10px; font-size: 0.78rem;">Save</button>
          </div>
        </div>
        <div class="chat-messages-scroll" id="tab-chat-scroll">
          ${messages.map(m => `
            <div class="chat-message ${m.sender === 'user' ? 'user-message' : 'ai-message'}">
              <div class="chat-message-bubble">
                ${m.text.replace(/\n/g, '<br>')}
                <div style="font-size: 0.7rem; opacity: 0.65; margin-top: 4px; text-align: right;">${m.timestamp || ''}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="chat-input-bar">
          <input type="text" class="chat-text-input" id="tab-chat-input" placeholder="Ask questions about this research, papers, or sources in ${folder.name}...">
          <button class="btn-search-submit" id="btn-tab-chat-send" style="width: 38px; height: 38px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    `;

    // Bind Tab Chat Send
    const chatInput = document.getElementById('tab-chat-input');
    const chatSendBtn = document.getElementById('btn-tab-chat-send');

    function sendChatMessage() {
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = '';

      // Add user message
      research.aiChat.push({
        sender: 'user',
        text: text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      renderResearchWorkspace(research);
      switchWorkspaceTab('chat');

      setTimeout(() => {
        const scroll = document.getElementById('tab-chat-scroll');
        if (scroll) scroll.scrollTop = scroll.scrollHeight;
      }, 50);

      // AI simulated reply
      setTimeout(() => {
        let replyText = `Analyzing your query against the active **${folder.name}** repository:\n\n`;
        if (text.toLowerCase().includes('summary') || text.toLowerCase().includes('summarize')) {
          replyText += `The core synthesis indicates that **${research.title}** produces consistent empirical advantages, accelerating task mastery while maintaining strict data governance.`;
        } else if (text.toLowerCase().includes('paper') || text.toLowerCase().includes('source')) {
          replyText += `Across the ${(research.papers || []).length} indexed papers in this folder, peer-reviewed findings report a 98.1% verification index with sub-second retrieval accuracy.`;
        } else {
          replyText += `Regarding "${text}": The data in your **${folder.name}** folder highlights three key pillars: methodological precision, cross-disciplinary validation, and seamless integration into practical workflows.`;
        }

        research.aiChat.push({
          sender: 'ai',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        renderResearchWorkspace(research);
        switchWorkspaceTab('chat');

        setTimeout(() => {
          const scroll = document.getElementById('tab-chat-scroll');
          if (scroll) scroll.scrollTop = scroll.scrollHeight;
        }, 50);
      }, 600);
    }

    if (chatSendBtn) chatSendBtn.addEventListener('click', sendChatMessage);
    if (chatInput) {
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendChatMessage();
      });
    }

    const clearChatBtn = document.getElementById('btn-clear-tab-chat');
    if (clearChatBtn) {
      clearChatBtn.addEventListener('click', () => {
        research.aiChat = [];
        renderResearchWorkspace(research);
        switchWorkspaceTab('chat');
        showToast('Chat history cleared', ICONS.check);
      });
    }

    const saveChatBtn = document.getElementById('btn-save-tab-chat');
    if (saveChatBtn) {
      saveChatBtn.addEventListener('click', () => {
        showToast(`Conversation saved to folder: ${folder.name}`, ICONS.folder);
      });
    }
  }

  // Render Tab 6: Notes
  const notesContainer = document.getElementById('tab-panel-notes');
  if (notesContainer) {
    notesContainer.innerHTML = `
      <div class="notes-container">
        <div class="notes-toolbar">
          <div style="font-weight: 700; font-size: 1.05rem;">Project Annotations & Synthesis Notes</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);" id="notes-save-indicator">
            Auto-saved to: <b>${folder.name}</b>
          </div>
        </div>
        <textarea class="notes-editor-area" id="research-notes-textarea" placeholder="Add custom observations, literature synthesis, hypothesis statements, or citation notes for this research...">${research.notes || ''}</textarea>
        <div style="display: flex; justify-content: flex-end; margin-top: 14px; gap: 8px;">
          <button class="btn-result-action" id="btn-export-notes">Export Notes</button>
          <button class="btn-getstarted" id="btn-manual-save-notes" style="padding: 6px 16px; font-size: 0.84rem;">Save Notes</button>
        </div>
      </div>
    `;

    const notesTextarea = document.getElementById('research-notes-textarea');
    const saveIndicator = document.getElementById('notes-save-indicator');
    if (notesTextarea) {
      notesTextarea.addEventListener('input', () => {
        research.notes = notesTextarea.value;
        if (saveIndicator) saveIndicator.innerHTML = `<i>Saving changes...</i>`;
        setTimeout(() => {
          if (saveIndicator) saveIndicator.innerHTML = `Auto-saved to: <b>${folder.name}</b>`;
        }, 400);
      });
    }
    const saveNotesBtn = document.getElementById('btn-manual-save-notes');
    if (saveNotesBtn) {
      saveNotesBtn.addEventListener('click', () => {
        showToast('Notes saved to research folder!', ICONS.check);
      });
    }
    const exportNotesBtn = document.getElementById('btn-export-notes');
    if (exportNotesBtn) {
      exportNotesBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(research.notes || '');
        showToast('Notes copied to clipboard as text!', ICONS.check);
      });
    }
  }

  // Show workspace
  elements.resultsWorkspace.classList.add('active');
  switchWorkspaceTab(state.activeWorkspaceTab);
  renderStructureVisualizer();
}

function switchWorkspaceTab(tabName) {
  state.activeWorkspaceTab = tabName;
  
  // Update tab button classes
  elements.workspaceTabBtns.forEach(btn => {
    if (btn.getAttribute('data-tab') === tabName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update tab panels
  elements.tabPanels.forEach(panel => {
    if (panel.id === `tab-panel-${tabName}`) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });
}

// Dedicated View: Document Library
function renderDocumentLibrary() {
  const foldersGrid = document.getElementById('library-folders-grid');
  const docsTableBody = document.getElementById('library-docs-list');
  if (!foldersGrid) return;

  // Render Folder Cards
  foldersGrid.innerHTML = state.folders.map(folder => `
    <div class="folder-card ${folder.id === state.activeFolderId ? 'active-folder-card' : ''}" data-folder-id="${folder.id}">
      <div class="folder-card-top">
        <div class="folder-card-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <span class="badge-domain">${folder.domain}</span>
      </div>
      <div class="folder-card-name">${folder.name}</div>
      <div class="folder-card-desc">${folder.description}</div>
      <div class="folder-card-count">
        ${ICONS.file}
        <span>${folder.documentCount || 0} Documents</span>
        ${folder.id === state.activeFolderId ? '<span style="margin-left: auto; color: var(--primary-indigo); font-weight: 700;">Active</span>' : ''}
      </div>
    </div>
  `).join('');

  foldersGrid.querySelectorAll('.folder-card').forEach(card => {
    card.addEventListener('click', () => {
      const folderId = card.getAttribute('data-folder-id');
      setActiveFolder(folderId);
      renderDocumentLibrary();
    });
  });

  // Render Documents List for active folder
  if (docsTableBody) {
    const activeFolder = getActiveFolder();
    const filteredDocs = state.documents.filter(d => d.folderId === state.activeFolderId);
    
    const countBadge = document.getElementById('library-active-folder-badge');
    if (countBadge) countBadge.textContent = `Active: ${activeFolder.name} (${filteredDocs.length} items)`;

    if (filteredDocs.length === 0) {
      docsTableBody.innerHTML = `
        <div style="text-align: center; padding: 36px 20px; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-light);">
          <div style="display: flex; justify-content: center; margin-bottom: 8px;">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <div style="font-weight: 700; color: var(--text-main);">No documents in ${activeFolder.name}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">Click "Import from Word" or "Upload Document" to populate this folder.</div>
        </div>
      `;
    } else {
      docsTableBody.innerHTML = filteredDocs.map(doc => `
        <div class="paper-card" style="margin-bottom: 12px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 36px; height: 36px; border-radius: var(--radius-md); background: var(--bg-surface-active); color: var(--primary-indigo); display: flex; align-items: center; justify-content: center; font-size: 1.1rem;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              </div>
              <div>
                <div style="font-weight: 700; font-size: 0.98rem; color: var(--text-main);">${doc.title}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">
                  Folder: ${doc.folderName} • Size: ${doc.size} • Date: ${doc.date} • <span class="badge-domain" style="padding: 1px 6px; font-size: 0.7rem;">${doc.tag}</span>
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
            ${doc.preview}
          </div>
        </div>
      `).join('');

      docsTableBody.querySelectorAll('.btn-lib-view').forEach(btn => {
        btn.addEventListener('click', () => showToast('Opening document viewer outline...', ICONS.file));
      });
      docsTableBody.querySelectorAll('.btn-lib-chat').forEach(btn => {
        btn.addEventListener('click', () => switchView('chat'));
      });
      docsTableBody.querySelectorAll('.btn-lib-dl').forEach(btn => {
        btn.addEventListener('click', () => showToast('Downloading document file...', ICONS.check));
      });
    }
  }
}

// Dedicated View: Find My Papers
function renderPapersList() {
  const container = document.getElementById('papers-search-results-grid');
  const searchInput = document.getElementById('papers-search-input');
  const domainFilter = document.getElementById('filter-paper-domain');
  if (!container) return;

  // Populate Domain Filter Dropdown
  if (domainFilter && domainFilter.options.length <= 1) {
    domainFilter.innerHTML = `<option value="all">All Domains & Folders</option>` + 
      state.folders.map(f => `<option value="${f.domain}">${f.name}</option>`).join('');
  }

  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedDomain = domainFilter ? domainFilter.value : 'all';

  const filtered = state.papers.filter(p => {
    const matchesQuery = !query || p.title.toLowerCase().includes(query) || p.authors.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
    const matchesDomain = selectedDomain === 'all' || p.domain === selectedDomain;
    return matchesQuery && matchesDomain;
  });

  const countLabel = document.getElementById('papers-count-label');
  if (countLabel) countLabel.textContent = `Showing ${filtered.length} peer-reviewed papers`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; grid-column: 1 / -1; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-light);">
        <div style="display: flex; justify-content: center; margin-bottom: 8px;">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <div style="font-weight: 700; color: var(--text-main);">No papers found matching your criteria</div>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">Try searching for "AI", "Socratic", "Quantum", or "Radiology".</div>
      </div>
    `;
  } else {
    container.innerHTML = filtered.map(paper => `
      <div class="paper-card">
        <div>
          <div class="card-top-meta">
            <span class="badge-domain">${paper.folderName}</span>
            <span class="badge-year">Year: ${paper.year} • ${paper.citations} citations</span>
          </div>
          <div class="card-title" style="margin-top: 10px;">${paper.title}</div>
          <div class="card-authors" style="margin-top: 4px;">${paper.authors} — <i>${paper.source}</i></div>
          <div class="card-abstract" style="margin-top: 10px;">${paper.description}</div>
        </div>
        <div class="card-footer-actions">
          <button class="btn-card-action btn-open-paper-finder">Open</button>
          <button class="btn-card-action btn-chat-paper-finder">Chat with AI</button>
          <button class="btn-card-action btn-save-paper-finder ${paper.saved ? 'saved' : ''}">
            ${paper.saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.btn-open-paper-finder').forEach(btn => {
      btn.addEventListener('click', () => showToast('Opening paper viewer simulation...', ICONS.file));
    });
    container.querySelectorAll('.btn-chat-paper-finder').forEach(btn => {
      btn.addEventListener('click', () => switchView('chat'));
    });
    container.querySelectorAll('.btn-save-paper-finder').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        filtered[idx].saved = !filtered[idx].saved;
        renderPapersList();
        renderSavedView();
        showToast(filtered[idx].saved ? 'Paper saved to folder!' : 'Paper removed from saved list', ICONS.folder);
      });
    });
  }
}

// Dedicated View: Research AI Chat
function renderDedicatedChat() {
  const activeFolder = getActiveFolder();
  const chatTitleSub = document.getElementById('dedicated-chat-subtitle');
  if (chatTitleSub) {
    chatTitleSub.innerHTML = `Active Context: <b>${activeFolder.name}</b> (${activeFolder.domain})`;
  }
}

function handleDedicatedChatSend() {
  const input = document.getElementById('dedicated-chat-input');
  const scroll = document.getElementById('dedicated-chat-messages');
  if (!input || !scroll) return;

  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  const activeFolder = getActiveFolder();
  const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Append user bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-message user-message';
  userBubble.innerHTML = `
    <div class="chat-message-bubble">
      ${text}
      <div style="font-size: 0.7rem; opacity: 0.65; margin-top: 4px; text-align: right;">${nowTime}</div>
    </div>
  `;
  scroll.appendChild(userBubble);
  scroll.scrollTop = scroll.scrollHeight;

  // AI typing & response
  setTimeout(() => {
    const aiBubble = document.createElement('div');
    aiBubble.className = 'chat-message ai-message';
    
    let aiText = `Here is a summary of the research papers and documents saved in your **${activeFolder.name}** folder:\n\n`;
    if (text.toLowerCase().includes('summarize') || text.toLowerCase().includes('summary')) {
      aiText += `1. **Core Findings**: The indexed papers demonstrate high empirical reliability and structured cognitive gain metrics.\n2. **Active Documents**: There are currently ${activeFolder.documentCount} research artifacts filed under ${activeFolder.domain}.\n3. **Recommendations**: You can export these findings or cross-reference citations with the Document Library.`;
    } else {
      aiText += `Regarding "${text}":\n\n- In the context of **${activeFolder.name}**, empirical literature emphasizes algorithmic robustness and standardized benchmark reproducibility.\n- All references are linked directly to your active workspace folder.`;
    }

    aiBubble.innerHTML = `
      <div class="chat-message-bubble">
        ${aiText.replace(/\n/g, '<br>')}
        <div style="font-size: 0.7rem; opacity: 0.65; margin-top: 4px; text-align: right;">${nowTime}</div>
      </div>
    `;
    scroll.appendChild(aiBubble);
    scroll.scrollTop = scroll.scrollHeight;
  }, 600);
}

// Dedicated View: History & Saved
function renderHistoryView() {
  const container = document.getElementById('history-timeline-container');
  if (!container) return;

  container.innerHTML = state.history.map(group => `
    <div class="history-section-group">
      <div class="history-group-title">${group.group}</div>
      <div class="history-domain-block">
        <div class="history-domain-header">
          ${ICONS.folder}
          <span>${group.domain}</span>
        </div>
        ${group.items.map(item => `
          <div class="history-item-row" data-research-id="${item.id}">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--primary-indigo); font-size: 0.75rem;">●</span>
              <span style="font-weight: 500; font-size: 0.92rem;">${item.title}</span>
            </div>
            <span style="font-size: 0.78rem; color: var(--text-light);">${item.time}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.history-item-row').forEach(row => {
    row.addEventListener('click', () => {
      const researchId = row.getAttribute('data-research-id');
      if (state.researchItems[researchId]) {
        state.activeResearchId = researchId;
        const research = state.researchItems[researchId];
        state.activeFolderId = research.folderId;
        renderFolderUI();
        renderResearchWorkspace(research);
        switchView('dashboard');
        showToast(`Reopened research workspace: ${research.title}`, ICONS.file);
      }
    });
  });
}

function renderSavedView() {
  const container = document.getElementById('saved-items-container');
  if (!container) return;

  const savedProjects = Object.values(state.researchItems).filter(r => r.saved);
  const savedPapers = state.papers.filter(p => p.saved);

  container.innerHTML = `
    <div style="margin-bottom: 24px;">
      <div style="font-size: 1.15rem; font-weight: 700; margin-bottom: 12px;">Saved Research Workspaces (${savedProjects.length})</div>
      <div class="cards-list-grid">
        ${savedProjects.map(proj => {
          const folder = state.folders.find(f => f.id === proj.folderId) || getActiveFolder();
          return `
            <div class="paper-card">
              <div>
                <div class="card-top-meta">
                  <span class="badge-domain">${folder.name}</span>
                  <span class="badge-year">Date: ${proj.date}</span>
                </div>
                <div class="card-title" style="margin-top: 10px;">${proj.title}</div>
                <div class="card-abstract" style="margin-top: 8px;">${proj.overview ? proj.overview.summary : ''}</div>
              </div>
              <div class="card-footer-actions">
                <button class="btn-card-action btn-reopen-saved" data-id="${proj.id}">Open Workspace →</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <div>
      <div style="font-size: 1.15rem; font-weight: 700; margin-bottom: 12px;">Saved Academic Papers (${savedPapers.length})</div>
      <div class="cards-list-grid">
        ${savedPapers.map(paper => `
          <div class="paper-card">
            <div>
              <div class="card-top-meta">
                <span class="badge-domain">${paper.folderName}</span>
                <span class="badge-year">Year: ${paper.year}</span>
              </div>
              <div class="card-title" style="margin-top: 10px;">${paper.title}</div>
              <div class="card-authors" style="margin-top: 4px;">${paper.authors} — <i>${paper.source}</i></div>
            </div>
            <div class="card-footer-actions">
              <button class="btn-card-action btn-unsave-paper" data-id="${paper.id}">Remove from Saved</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('.btn-reopen-saved').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (state.researchItems[id]) {
        state.activeResearchId = id;
        state.activeFolderId = state.researchItems[id].folderId;
        renderFolderUI();
        renderResearchWorkspace(state.researchItems[id]);
        switchView('dashboard');
      }
    });
  });

  container.querySelectorAll('.btn-unsave-paper').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const paper = state.papers.find(p => p.id === id);
      if (paper) {
        paper.saved = false;
        renderSavedView();
        renderPapersList();
        showToast('Paper removed from saved list', ICONS.check);
      }
    });
  });
}

// Navigation & View Switching
function switchView(viewName) {
  state.currentView = viewName;
  
  // Update active nav items
  elements.sidebarNavItems.forEach(item => {
    if (item.getAttribute('data-view') === viewName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Toggle view elements
  document.querySelectorAll('.page-view').forEach(view => {
    if (view.id === `view-${viewName}`) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });

  // Close mobile sidebar if open
  if (elements.sidebar.classList.contains('mobile-open')) {
    elements.sidebar.classList.remove('mobile-open');
  }

  // Scroll main window to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Modals & Popovers
function openModal(modalEl) {
  if (modalEl) modalEl.classList.add('active');
}

function closeModal(modalEl) {
  if (modalEl) modalEl.classList.remove('active');
}

// Toast Notifications
function showToast(message, iconSvg) {
  if (!elements.toastContainer) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="display: flex; align-items: center;">${iconSvg || ICONS.sparkle}</span>
    <span>${message}</span>
  `;
  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Event Listeners
function bindEvents() {
  // Theme toggle
  elements.themeToggleBtn.addEventListener('click', () => {
    applyTheme(state.theme === 'light' ? 'dark' : 'light');
    showToast(`Switched to ${state.theme} mode`, ICONS.sparkle);
  });

  // Folder popover toggle
  elements.topFolderBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    elements.folderPopover.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!elements.folderPopover.contains(e.target) && !elements.topFolderBtn.contains(e.target)) {
      elements.folderPopover.classList.remove('active');
    }
  });

  // Create New Folder modal triggers
  const triggerCreateFolderBtns = document.querySelectorAll('.btn-trigger-create-folder');
  triggerCreateFolderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.folderPopover.classList.remove('active');
      openModal(elements.createFolderModal);
    });
  });

  // Create Folder Form Submit
  if (elements.createFolderForm) {
    elements.createFolderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('new-folder-name');
      const domainSelect = document.getElementById('new-folder-domain');
      const descInput = document.getElementById('new-folder-desc');
      
      if (nameInput && nameInput.value.trim()) {
        createNewFolder(nameInput.value.trim(), domainSelect ? domainSelect.value : '', descInput ? descInput.value.trim() : '');
        nameInput.value = '';
        if (descInput) descInput.value = '';
      }
    });
  }

  // Main Research Search Bar Events
  if (elements.mainResearchInput) {
    elements.mainResearchInput.addEventListener('input', () => {
      if (elements.mainResearchInput.value.trim() !== '') {
        elements.mainResearchClearBtn.classList.add('visible');
      } else {
        elements.mainResearchClearBtn.classList.remove('visible');
      }
    });

    elements.mainResearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        startResearchFlow(elements.mainResearchInput.value.trim());
      }
    });
  }

  if (elements.mainResearchClearBtn) {
    elements.mainResearchClearBtn.addEventListener('click', () => {
      elements.mainResearchInput.value = '';
      elements.mainResearchClearBtn.classList.remove('visible');
      elements.mainResearchInput.focus();
    });
  }

  if (elements.mainResearchSubmitBtn) {
    elements.mainResearchSubmitBtn.addEventListener('click', () => {
      startResearchFlow(elements.mainResearchInput.value.trim());
    });
  }

  // Sample Prompt Pills
  elements.samplePromptPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const text = pill.textContent.replace(/^["“”]/, '').replace(/["“”]$/, '').trim();
      elements.mainResearchInput.value = text;
      elements.mainResearchClearBtn.classList.add('visible');
      startResearchFlow(text);
    });
  });

  // Action Buttons below Search Bar
  if (elements.btnImportWord) {
    elements.btnImportWord.addEventListener('click', () => openModal(elements.importWordModal));
  }
  if (elements.btnExplore) {
    elements.btnExplore.addEventListener('click', () => {
      switchView('dashboard');
      switchWorkspaceTab('overview');
      elements.resultsWorkspace.scrollIntoView({ behavior: 'smooth' });
      showToast('Exploring current research topic and sources', ICONS.sparkle);
    });
  }
  if (elements.btnSources) {
    elements.btnSources.addEventListener('click', () => {
      switchView('dashboard');
      switchWorkspaceTab('sources');
      elements.resultsWorkspace.scrollIntoView({ behavior: 'smooth' });
      showToast('Viewing verified citations for active research', ICONS.file);
    });
  }
  if (elements.btnChatAI) {
    elements.btnChatAI.addEventListener('click', () => {
      switchView('chat');
      showToast('Opening contextual AI Chat workspace', ICONS.sparkle);
    });
  }

  // Document Library Action buttons
  const btnLibImport = document.getElementById('btn-lib-import-word');
  const btnLibUpload = document.getElementById('btn-lib-upload-doc');
  if (btnLibImport) btnLibImport.addEventListener('click', () => openModal(elements.importWordModal));
  if (btnLibUpload) btnLibUpload.addEventListener('click', () => openModal(elements.uploadDocModal));

  // Domain Auto-Detection Modal Actions
  const btnDomainCreate = document.getElementById('btn-domain-detect-create');
  const btnDomainContinue = document.getElementById('btn-domain-detect-continue');
  
  if (btnDomainCreate) {
    btnDomainCreate.addEventListener('click', () => {
      closeModal(elements.domainDetectModal);
      let matchingFolder = state.folders.find(f => f.domain === state.pendingSuggestedDomain);
      if (!matchingFolder) {
        const newId = 'folder-' + state.pendingSuggestedDomain.toLowerCase().replace(/[^a-z0-9]/g, '-');
        matchingFolder = {
          id: newId,
          name: state.pendingSuggestedDomain,
          domain: state.pendingSuggestedDomain,
          icon: 'folder',
          color: '#4f46e5',
          description: `Auto-created research folder for ${state.pendingSuggestedDomain}`,
          documentCount: 0,
          createdAt: new Date().toISOString().split('T')[0]
        };
        state.folders.push(matchingFolder);
      }
      setActiveFolder(matchingFolder.id);
      executeResearchPipeline(state.pendingResearchQuery, matchingFolder.id);
    });
  }

  if (btnDomainContinue) {
    btnDomainContinue.addEventListener('click', () => {
      closeModal(elements.domainDetectModal);
      executeResearchPipeline(state.pendingResearchQuery, state.activeFolderId);
    });
  }

  // Word Document Drag & Drop Simulator
  const wordDropzone = document.getElementById('word-file-dropzone');
  const wordFileInput = document.getElementById('word-file-input');
  
  if (wordDropzone && wordFileInput) {
    wordDropzone.addEventListener('click', () => wordFileInput.click());
    wordDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      wordDropzone.classList.add('dragover');
    });
    wordDropzone.addEventListener('dragleave', () => wordDropzone.classList.remove('dragover'));
    wordDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      wordDropzone.classList.remove('dragover');
      if (e.dataTransfer.files.length > 0) {
        handleWordFileImport(e.dataTransfer.files[0].name);
      }
    });
    wordFileInput.addEventListener('change', () => {
      if (wordFileInput.files.length > 0) {
        handleWordFileImport(wordFileInput.files[0].name);
      }
    });
  }

  function handleWordFileImport(fileName) {
    const activeFolder = getActiveFolder();
    closeModal(elements.importWordModal);
    
    const newDoc = {
      id: 'doc-' + Date.now(),
      title: fileName,
      folderId: activeFolder.id,
      folderName: activeFolder.name,
      type: 'Word Document',
      size: '3.4 MB',
      date: new Date().toISOString().split('T')[0],
      tag: 'Imported Word Doc',
      preview: `Imported from Word: Full manuscript text parsed and indexed directly into "${activeFolder.name}". Outline and references ready for AI synthesis.`
    };
    
    state.documents.unshift(newDoc);
    activeFolder.documentCount = (activeFolder.documentCount || 0) + 1;
    
    // Also attach to active research item if present
    if (state.researchItems[state.activeResearchId]) {
      state.researchItems[state.activeResearchId].documents.unshift({
        id: newDoc.id,
        name: fileName,
        type: 'docx',
        size: '3.4 MB',
        updatedAt: 'Just now',
        preview: newDoc.preview
      });
      renderResearchWorkspace(state.researchItems[state.activeResearchId]);
    }

    renderFolderUI();
    renderDocumentLibrary();
    showToast(`Imported "${fileName}" into ${activeFolder.name}`, ICONS.file);
  }

  // Document Upload Form
  const uploadDocForm = document.getElementById('upload-doc-form');
  if (uploadDocForm) {
    uploadDocForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('upload-doc-title').value;
      const tag = document.getElementById('upload-doc-tag').value;
      const activeFolder = getActiveFolder();
      
      closeModal(elements.uploadDocModal);
      state.documents.unshift({
        id: 'doc-' + Date.now(),
        title: title,
        folderId: activeFolder.id,
        folderName: activeFolder.name,
        type: 'PDF',
        size: '2.4 MB',
        date: new Date().toISOString().split('T')[0],
        tag: tag,
        preview: `Uploaded research artifact indexed in ${activeFolder.name}. Ready for automated citations and chat.`
      });
      activeFolder.documentCount = (activeFolder.documentCount || 0) + 1;
      renderDocumentLibrary();
      renderFolderUI();
      showToast(`Uploaded "${title}" to ${activeFolder.name}`, ICONS.check);
    });
  }

  // Workspace Action Toolbar Buttons
  if (elements.btnSaveResearch) {
    elements.btnSaveResearch.addEventListener('click', () => {
      const research = state.researchItems[state.activeResearchId];
      if (research) {
        research.saved = !research.saved;
        renderResearchWorkspace(research);
        renderSavedView();
        const folder = state.folders.find(f => f.id === research.folderId) || getActiveFolder();
        showToast(research.saved ? `Saved to folder: ${folder.name}` : `Removed from saved items`, ICONS.folder);
      }
    });
  }

  if (elements.btnCopyResearch) {
    elements.btnCopyResearch.addEventListener('click', () => {
      const research = state.researchItems[state.activeResearchId];
      if (research) {
        const text = `# ${research.title}\nFolder: ${research.domain}\n\n## Overview\n${research.overview ? research.overview.summary : ''}\n\n## Key Findings\n${(research.keyFindings || []).map(f => `- ${f.title}: ${f.desc}`).join('\n')}`;
        navigator.clipboard.writeText(text);
        showToast('Research markdown copied to clipboard!', ICONS.check);
      }
    });
  }

  if (elements.btnExportResearch) {
    elements.btnExportResearch.addEventListener('click', () => openModal(elements.exportModal));
  }

  if (elements.btnShareResearch) {
    elements.btnShareResearch.addEventListener('click', () => openModal(elements.shareModal));
  }

  if (elements.btnRegenerateResearch) {
    elements.btnRegenerateResearch.addEventListener('click', () => {
      const research = state.researchItems[state.activeResearchId];
      if (research) {
        executeResearchPipeline(research.query, research.folderId);
      }
    });
  }

  if (elements.btnContinueAI) {
    elements.btnContinueAI.addEventListener('click', () => {
      switchWorkspaceTab('chat');
    });
  }

  // Workspace Tab Navigation
  elements.workspaceTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      switchWorkspaceTab(tab);
    });
  });

  // Sidebar View Navigation
  elements.sidebarNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const view = item.getAttribute('data-view');
      if (view) {
        e.preventDefault();
        switchView(view);
      }
    });
  });

  // Mobile Menu Toggle
  if (elements.mobileMenuToggle) {
    elements.mobileMenuToggle.addEventListener('click', () => {
      elements.sidebar.classList.toggle('mobile-open');
    });
  }

  // Modal Close Buttons
  document.querySelectorAll('.btn-modal-close, .btn-modal-cancel').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-backdrop').forEach(modal => modal.classList.remove('active'));
    });
  });

  // Find My Papers search inputs
  const papersSearchInput = document.getElementById('papers-search-input');
  const domainFilter = document.getElementById('filter-paper-domain');
  if (papersSearchInput) papersSearchInput.addEventListener('input', renderPapersList);
  if (domainFilter) domainFilter.addEventListener('change', renderPapersList);

  // Dedicated Chat Send
  const dedicatedChatSendBtn = document.getElementById('btn-dedicated-chat-send');
  const dedicatedChatInput = document.getElementById('dedicated-chat-input');
  const dedicatedClearChatBtn = document.getElementById('btn-dedicated-clear-chat');
  
  if (dedicatedChatSendBtn) dedicatedChatSendBtn.addEventListener('click', handleDedicatedChatSend);
  if (dedicatedChatInput) {
    dedicatedChatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleDedicatedChatSend();
    });
  }
  if (dedicatedClearChatBtn) {
    dedicatedClearChatBtn.addEventListener('click', () => {
      const messages = document.getElementById('dedicated-chat-messages');
      if (messages) {
        messages.innerHTML = `
          <div class="chat-message ai-message">
            <div class="chat-message-bubble">
              Chat cleared. How can I assist your research next?
            </div>
          </div>
        `;
      }
      showToast('Chat history cleared', ICONS.check);
    });
  }

  // Dedicated Chat Suggestions
  document.querySelectorAll('.chat-preset-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.getAttribute('data-prompt');
      const input = document.getElementById('dedicated-chat-input');
      if (input) {
        input.value = text;
        handleDedicatedChatSend();
      }
    });
  });

  // Start New Research Form
  if (elements.newResearchForm) {
    elements.newResearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const topicInput = document.getElementById('new-research-topic');
      const folderSelect = document.getElementById('new-research-folder-select');
      
      if (topicInput && topicInput.value.trim()) {
        const topic = topicInput.value.trim();
        const targetFolderId = folderSelect ? folderSelect.value : state.activeFolderId;
        setActiveFolder(targetFolderId);
        switchView('dashboard');
        startResearchFlow(topic, targetFolderId);
      }
    });

    // Research Type Pill Selection
    document.querySelectorAll('.research-type-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.research-type-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });
  }

  // Export Modal Actions
  document.querySelectorAll('.btn-export-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const format = btn.getAttribute('data-format');
      closeModal(elements.exportModal);
      showToast(`Exported research as ${format.toUpperCase()} document!`, ICONS.check);
    });
  });

  // Share Modal Copy Link
  const btnCopyShareLink = document.getElementById('btn-copy-share-link');
  if (btnCopyShareLink) {
    btnCopyShareLink.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      closeModal(elements.shareModal);
      showToast('Shareable research link copied to clipboard!', ICONS.check);
    });
  }
}

// Initialize on DOM Ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
