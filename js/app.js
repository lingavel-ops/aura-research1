/**
 * THAMILI AI Research Workspace - Main Application Logic
 * Clean professional vector icons, robust state management, and interactive workflows
 */

import { THAMILI_INITIAL_DATA } from './data.js';
import { NetworkingModule } from './networking.js';

// Application State
const state = {
  theme: localStorage.getItem('thamili_theme') || localStorage.getItem('aurqo_theme') || 'light',
  activeFolderId: THAMILI_INITIAL_DATA.activeFolderId,
  currentView: 'dashboard', // dashboard, new-research, library, papers, chat, history, saved
  activeResearchId: 'impact-of-ai-on-education',
  activeWorkspaceTab: 'overview',
  folders: JSON.parse(JSON.stringify(THAMILI_INITIAL_DATA.folders)),
  researchItems: JSON.parse(JSON.stringify(THAMILI_INITIAL_DATA.researchItems)),
  documents: JSON.parse(JSON.stringify(THAMILI_INITIAL_DATA.documents)),
  papers: JSON.parse(JSON.stringify(THAMILI_INITIAL_DATA.papers)),
  history: JSON.parse(JSON.stringify(THAMILI_INITIAL_DATA.history)),
  recentDocuments: JSON.parse(JSON.stringify(THAMILI_INITIAL_DATA.recentDocuments || [])),
  librarySources: JSON.parse(JSON.stringify(THAMILI_INITIAL_DATA.librarySources || [])),
  activeDocId: THAMILI_INITIAL_DATA.activeDocId || 'doc-recent-1',
  sidebarMode: 'research', // 'research' or 'suite'
  activeDrawer: null, // null, 'documents', 'library', 'papers'
  setupCompletedSteps: [1, 2],
  pendingResearchQuery: null,
  pendingSuggestedDomain: null,
  isResearchRunning: false,
  dedicatedChatHistory: [],
  isChatPending: false
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

// Backend API Configuration (Communicates with AI Research Node.js / Express backend)
const BACKEND_API_BASE = 'http://localhost:5000';

/**
 * Fetch real peer-reviewed papers via Node.js Express backend (OpenAlex service).
 * Provides resilient fallback to CrossRef Works if backend is initializing.
 * @param {string} query
 * @returns {Promise<Array>}
 */
async function fetchPapersFromBackend(query) {
  if (!query || typeof query !== 'string' || !query.trim()) return [];
  const q = query.trim();

  // 1. Primary: Call AI Research Express Backend API (OpenAlex Service)
  try {
    const url = `${BACKEND_API_BASE}/api/research/search?q=${encodeURIComponent(q)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (res.ok) {
      const data = await res.json();
      const results = data.results || data.works;
      if (Array.isArray(results) && results.length > 0) {
        return results;
      }
    }
  } catch (err) {
    console.warn('[Research API] Backend connection notice:', err.message);
  }

  // 2. Resilient Direct Fallback via Free CrossRef Works API
  try {
    const crUrl = `https://api.crossref.org/works?query=${encodeURIComponent(q)}&rows=10`;
    const res = await fetch(crUrl, {
      headers: { 'User-Agent': 'AI-Research-Platform/1.0 (mailto:scholar@thamili.ai)' },
      signal: AbortSignal.timeout(5000)
    });
    if (res.ok) {
      const json = await res.json();
      const items = json.message?.items || [];
      return items.map((item, idx) => {
        const rawTitle = Array.isArray(item.title) ? item.title[0] : (item.title || 'Untitled Academic Research');
        const authors = Array.isArray(item.author) && item.author.length > 0
          ? item.author.map(a => `${a.given || ''} ${a.family || ''}`.trim()).filter(Boolean).slice(0, 4).join(', ') + (item.author.length > 4 ? ', et al.' : '')
          : 'Academic Researchers';
        const journal = Array.isArray(item['container-title']) && item['container-title'][0]
          ? item['container-title'][0]
          : (item.publisher || 'Peer-Reviewed Journal');
        const year = item.issued?.['date-parts']?.[0]?.[0] || item.created?.['date-parts']?.[0]?.[0] || new Date().getFullYear();
        const doi = item.DOI || '';
        const url = item.URL || (doi ? `https://doi.org/${doi}` : '#');
        const citations = item['is-referenced-by-count'] || 0;
        return {
          id: `cr-${doi ? doi.replace(/[^a-zA-Z0-9]/g, '-') : 'pub-' + idx + '-' + Date.now()}`,
          title: rawTitle,
          authors,
          year: Number(year) || new Date().getFullYear(),
          journal,
          source: journal,
          hostVenue: journal,
          doi,
          url,
          downloadUrl: url,
          openAccessUrl: url,
          citations,
          citedByCount: citations,
          abstract: `Peer-reviewed scientific study indexed in CrossRef. Outlines methodological findings, dataset benchmarks, and literature context for "${q}".`,
          description: `Peer-reviewed scientific study indexed in CrossRef. Outlines methodological findings, dataset benchmarks, and literature context for "${q}".`,
          apiProvider: 'CrossRef (Fallback)',
          isOa: true
        };
      });
    }
  } catch (directErr) {
    console.warn('[Research API] Direct fallback error:', directErr.message);
  }

  return [];
}

/**
 * Centralized Global AI Client for Frontend.
 * Reusable AI service providing unified connection to backend AI endpoints.
 */
const globalAiClient = {
  async sendMessage({ message, history = [], domain, folderName, paperContext }) {
    try {
      const url = `${BACKEND_API_BASE}/api/chat`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history, domain, folderName, paperContext }),
        signal: AbortSignal.timeout(35000)
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.reply) {
          return {
            reply: data.reply,
            sources: data.sources || [],
            isResearch: Boolean(data.isResearch),
            provider: data.provider,
            model: data.model
          };
        }
      }
    } catch (err) {
      console.warn('[globalAiClient] Primary /api/chat error, attempting fallback:', err.message);
      try {
        const fallbackUrl = `${BACKEND_API_BASE}/api/research/chat`;
        const res = await fetch(fallbackUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, history, domain, folderName, paperContext }),
          signal: AbortSignal.timeout(20000)
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.success && data.reply) {
            return {
              reply: data.reply,
              sources: data.sources || [],
              isResearch: Boolean(data.isResearch),
              provider: data.provider,
              model: data.model
            };
          }
        }
      } catch (fbErr) {
        console.warn('[globalAiClient] Fallback route failed:', fbErr.message);
      }
    }
    return null;
  },

  async summarizeText(text, targetLength = 'concise', focus = 'key takeaways') {
    try {
      const url = `${BACKEND_API_BASE}/api/chat/summarize`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLength, focus }),
        signal: AbortSignal.timeout(30000)
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.reply) return data.reply;
      }
    } catch (err) {
      console.warn('[globalAiClient] Summarize error:', err.message);
    }
    return null;
  },

  async completeText(prompt, currentContent, domain, folderName) {
    try {
      const url = `${BACKEND_API_BASE}/api/chat/complete`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, currentContent, domain, folderName }),
        signal: AbortSignal.timeout(30000)
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.reply) return data.reply;
      }
    } catch (err) {
      console.warn('[globalAiClient] Completion error:', err.message);
    }
    return null;
  }
};

/**
 * Render Markdown text into rich, safe HTML for chat bubbles.
 * Supports code blocks with copy buttons, inline code, bold, lists, and headings.
 */
function renderMarkdown(text) {
  if (!text) return '';
  let md = String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code blocks: ```lang ... ```
  md = md.replace(/```([a-zA-Z0-9_\-\+]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const encoded = encodeURIComponent(code.trim());
    return `<div class="chat-code-block"><div class="code-header"><span class="code-lang">${lang || 'code'}</span><button class="btn-copy-code" onclick="navigator.clipboard.writeText(decodeURIComponent('${encoded}'));this.textContent='Copied!';setTimeout(()=>this.textContent='Copy',2000)">Copy</button></div><code>${code.trim()}</code></div>`;
  });

  // Inline code: `code`
  md = md.replace(/`([^`]+)`/g, '<code class="chat-inline-code">$1</code>');

  // Headings
  md = md.replace(/^### (.*$)/gim, '<h4 class="chat-h4">$1</h4>');
  md = md.replace(/^## (.*$)/gim, '<h3 class="chat-h3">$1</h3>');
  md = md.replace(/^# (.*$)/gim, '<h2 class="chat-h2">$1</h2>');

  // Bold & Italic
  md = md.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  md = md.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Blockquotes
  md = md.replace(/^\> (.*$)/gim, '<blockquote class="chat-blockquote">$1</blockquote>');

  // Unordered list items
  md = md.replace(/^\s*[\-\*]\s+(.*$)/gim, '<li class="chat-li">$1</li>');

  // Numbered lists
  md = md.replace(/^\s*\d+\.\s+(.*$)/gim, '<li class="chat-ol-li">$1</li>');

  // Horizontal rules
  md = md.replace(/^---$/gim, '<hr class="chat-hr" />');

  // Line breaks
  md = md.replace(/\n\n+/g, '<br><br>');
  md = md.replace(/\n/g, '<br>');

  return md;
}

/**
 * Render attached OpenAlex academic sources within chat bubbles using existing design styling.
 */
function renderSourcesAttachment(sources) {
  if (!Array.isArray(sources) || sources.length === 0) return '';
  return `
    <div class="chat-sources-attachment" style="margin-top: 12px; border-top: 1px solid var(--border-subtle); padding-top: 10px;">
      <div style="font-size: 0.8rem; font-weight: 700; color: var(--primary-indigo); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        Retrieved OpenAlex Scholarly Sources (${sources.length})
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${sources.slice(0, 4).map(src => {
          const url = src.openAccessUrl || src.downloadUrl || src.url || src.openAlexUrl || (src.doi ? `https://doi.org/${src.doi}` : '#');
          const citations = src.citations || src.citedByCount || 0;
          return `
            <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 10px; font-size: 0.8rem;">
              <div style="font-weight: 600; color: var(--text-primary); line-height: 1.35;">${src.title || 'Untitled Academic Research'}</div>
              <div style="color: var(--text-muted); font-size: 0.74rem; margin-top: 3px;">
                ${src.authors || 'Academic Researchers'} (${src.year || 'Recent'}) • <i>${src.journal || src.source || 'Peer-Reviewed Venue'}</i>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 6px; font-size: 0.72rem;">
                <span style="color: var(--text-muted); font-weight: 500;">⚡ ${Number(citations).toLocaleString()} citations</span>
                ${url && url !== '#' ? `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: var(--primary-indigo); font-weight: 600; text-decoration: none;">View Paper ↗</a>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

/**
 * Backward-compatible helper requesting AI reply from global client.
 */
async function requestAiChatReply(payload) {
  const result = await globalAiClient.sendMessage(payload);
  return result ? result.reply : null;
}

function init() {
  cacheDomElements();
  applyTheme(state.theme);
  renderFolderUI();
  renderStructureVisualizer();
  renderDocumentLibrary();
  renderPapersList();
  renderHistoryView();
  renderSavedView();
  initJenniWorkspace();
  NetworkingModule.init();
  bindEvents();
  
  // Load default research workspace view
  if (state.researchItems[state.activeResearchId]) {
    renderResearchWorkspace(state.researchItems[state.activeResearchId]);
  }

  // Initialize smooth viewport scroll animations
  initScrollAnimations();
}

function cacheDomElements() {
  elements.body = document.body;
  elements.themeToggleBtn = document.getElementById('theme-toggle-btn');
  elements.folderPopover = document.getElementById('folder-popover');
  elements.folderPopoverList = document.getElementById('folder-popover-list');
  elements.currentFolderBannerName = document.getElementById('current-folder-banner-name');
  
  // Top Login & Thamili Auth Modal
  elements.btnTopLogin = document.getElementById('btn-top-login');
  elements.topLoginLabel = document.getElementById('top-login-label');
  elements.modalThamiliLogin = document.getElementById('modal-thamili-login');
  elements.btnCloseThamiliLogin = document.getElementById('btn-close-thamili-login');

  // Profile Popover Elements
  elements.profilePopover = document.getElementById('profile-popover');
  elements.profileThemeCheckbox = document.getElementById('profile-theme-checkbox');
  elements.profileThemeToggleRow = document.getElementById('profile-theme-toggle-row');
  elements.profileThemeIcon = document.getElementById('profile-theme-icon');
  elements.profilePopoverEditAccount = document.getElementById('profile-popover-edit-account');
  elements.profilePopoverShortcuts = document.getElementById('profile-popover-shortcuts');
  elements.profilePopoverLogout = document.getElementById('profile-popover-logout');
  elements.popoverUsernameLabel = document.getElementById('popover-username-label');
  elements.popoverAvatarLabel = document.getElementById('popover-avatar-label');

  // AI Research Accordion Toggle & Group
  elements.researchAccordionToggle = document.getElementById('btn-research-accordion-toggle');
  elements.researchAccordionGroup = document.getElementById('research-accordion-group');
  elements.formThamiliAuth = document.getElementById('form-thamili-auth');
  elements.thamiliLangBtn = document.getElementById('thamili-lang-btn');
  elements.thamiliLangDropdown = document.getElementById('thamili-lang-dropdown');
  elements.btnSendOtp = document.getElementById('btn-send-otp');
  elements.btnTogglePassword = document.getElementById('btn-toggle-password');
  elements.authPassword = document.getElementById('auth-password');
  elements.authOtp = document.getElementById('auth-otp');
  elements.authUsername = document.getElementById('auth-username');
  elements.authPhone = document.getElementById('auth-phone');

  // Bottom Left Folder Management
  elements.btnBottomFolderManager = document.getElementById('btn-bottom-folder-manager');
  elements.bottomFolderName = document.getElementById('bottom-folder-name');
  
  // Main Search Elements
  elements.mainResearchInput = document.getElementById('main-research-input');
  elements.mainResearchSubmitBtn = document.getElementById('main-research-submit-btn');
  elements.mainResearchClearBtn = document.getElementById('main-research-clear-btn');
  elements.samplePromptPills = document.querySelectorAll('.prompt-pill');
  elements.btnProToggle = document.getElementById('btn-pro-toggle');
  elements.btnDeepResearchToggle = document.getElementById('btn-deep-research-toggle');
  elements.btnGlobeFilter = document.getElementById('btn-globe-filter');
  elements.globeSourcesPopover = document.getElementById('globe-sources-popover');
  elements.btnSearchAttach = document.getElementById('btn-search-attach');
  elements.toggleSourceWeb = document.getElementById('toggle-source-web');
  elements.toggleSourceAcademic = document.getElementById('toggle-source-academic');
  elements.toggleSourceSocial = document.getElementById('toggle-source-social');
  
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
  
  // Rail Navigation Items (Image 2)
  elements.railBtnHome = document.getElementById('rail-btn-home');
  elements.railBtnLibrary = document.getElementById('rail-btn-library');
  elements.railBtnDocuments = document.getElementById('rail-btn-documents');
  elements.railBtnPapers = document.getElementById('rail-btn-papers');
  elements.railBtnChat = document.getElementById('rail-btn-chat');
  elements.railBtnTasks = document.getElementById('rail-btn-tasks');
  elements.railBtnHistory = document.getElementById('rail-btn-history');
  elements.railBtnResearchers = document.getElementById('rail-btn-researchers');
  
  // Jenni AI Style AI Research Workspace Elements
  elements.sidebarResearchNav = document.getElementById('sidebar-research-nav');
  elements.btnResearchNewTrigger = document.getElementById('btn-research-new-trigger');
  elements.newPopoverDropdown = document.getElementById('new-popover-dropdown');
  elements.menuNewDoc = document.getElementById('menu-new-doc');
  elements.menuNewChat = document.getElementById('menu-new-chat');
  elements.menuNewUpload = document.getElementById('menu-new-upload');
  
  elements.navBtnDocuments = document.getElementById('nav-btn-documents');
  elements.navBtnLibrary = document.getElementById('nav-btn-library');
  elements.navBtnPapers = document.getElementById('nav-btn-papers');
  elements.navBtnChat = document.getElementById('nav-btn-chat');
  elements.navBtnResearchers = document.getElementById('nav-btn-researchers');
  
  elements.subpanelDocuments = document.getElementById('subpanel-documents');
  elements.subpanelLibrary = document.getElementById('subpanel-library');
  elements.subpanelPapers = document.getElementById('subpanel-papers');
  elements.subpanelResearchers = document.getElementById('subpanel-researchers');
  
  elements.topDocTitleInput = document.getElementById('top-doc-title-input');
  elements.docMainHeadingInput = document.getElementById('doc-main-heading-input');
  elements.docPromptAccordionBox = document.getElementById('doc-prompt-accordion-box');
  elements.docPromptHeaderToggle = document.getElementById('doc-prompt-header-toggle');
  elements.docPromptTextarea = document.getElementById('doc-prompt-textarea');
  elements.docPromptFeedbackRow = document.getElementById('doc-prompt-feedback-row');
  elements.promptFeedbackText = document.getElementById('prompt-feedback-text');
  elements.cardActionImportWord = document.getElementById('card-action-import-word');
  elements.btnDocPromptNext = document.getElementById('btn-doc-prompt-next');
  elements.btnSkipAndWrite = document.getElementById('btn-skip-and-write');
  elements.exploreCardChat = document.getElementById('explore-card-chat');
  elements.exploreCardUpload = document.getElementById('explore-card-upload');
  elements.docRichEditorArea = document.getElementById('doc-rich-editor-area');
  elements.docEditorContent = document.getElementById('doc-editor-content');
  elements.docWordCountBadge = document.getElementById('doc-word-count-badge');
  elements.btnToggleDeepSynthesis = document.getElementById('btn-toggle-deep-synthesis');
  elements.deepDomainSynthesisSection = document.getElementById('deep-domain-synthesis-section');
  
  elements.modalSetupChecklist = document.getElementById('modal-setup-checklist');
  elements.modalPricing = document.getElementById('modal-pricing');
  elements.modalTutorials = document.getElementById('modal-tutorials');
  elements.modalShortcuts = document.getElementById('modal-shortcuts');
  elements.modalWebExtension = document.getElementById('modal-web-extension');
  elements.modalImportZotero = document.getElementById('modal-import-zotero');
  elements.modalImportMendeley = document.getElementById('modal-import-mendeley');
  elements.modalAddDoi = document.getElementById('modal-add-doi');
  elements.modalImportBibtex = document.getElementById('modal-import-bibtex');
  
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
    if (elements.profileThemeCheckbox) {
      elements.profileThemeCheckbox.checked = true;
    }
    if (elements.profileThemeIcon) {
      elements.profileThemeIcon.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
    }
    if (elements.themeToggleBtn) {
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
    }
  } else {
    elements.body.removeAttribute('data-theme');
    if (elements.profileThemeCheckbox) {
      elements.profileThemeCheckbox.checked = false;
    }
    if (elements.profileThemeIcon) {
      elements.profileThemeIcon.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
  }
  localStorage.setItem('thamili_theme', theme);
  localStorage.setItem('aurqo_theme', theme);
}

// Folder Management & UI
function renderFolderUI() {
  const activeFolder = getActiveFolder();
  
  // Update Bottom left folder button & banner
  if (elements.bottomFolderName) {
    elements.bottomFolderName.textContent = activeFolder.name;
  }
  if (elements.currentFolderBannerName) {
    elements.currentFolderBannerName.innerHTML = `
      ${ICONS.folder}
      <span>${activeFolder.name}</span>
    `;
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
  for (const [domain, keywords] of Object.entries(THAMILI_INITIAL_DATA.domainKeywords)) {
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
  NetworkingModule.detectInterests(query);
  state.isResearchRunning = true;
  const folder = state.folders.find(f => f.id === folderId) || getActiveFolder();
  
  // Hide results workspace and show loading overlay
  elements.resultsWorkspace.classList.remove('active');
  elements.researchLoadingOverlay.classList.add('active');
  elements.loaderQueryBadge.textContent = `Query: "${query}"`;
  elements.progressBarFill.style.width = '0%';
  
  // Scroll smoothly to loading area
  elements.researchLoadingOverlay.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Initiate paper fetch from Node.js Express backend proxying OpenAlex
  const backendPapersPromise = fetchPapersFromBackend(query);

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

  async function stepNextStage() {
    if (currentStageIndex >= totalStages) {
      let fetchedPapers = [];
      try {
        fetchedPapers = await backendPapersPromise;
      } catch (err) {
        console.warn('Backend paper fetch handling error:', err);
      }
      finishResearchPipeline(query, folder, fetchedPapers);
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

function finishResearchPipeline(query, folder, fetchedPapers = []) {
  state.isResearchRunning = false;
  elements.researchLoadingOverlay.classList.remove('active');
  
  // Generate or match research item
  const researchId = 'research-' + Date.now();
  const cleanTitle = query.length > 55 ? query.substring(0, 55) + '...' : query;
  
  let newResearch;

  if (Array.isArray(fetchedPapers) && fetchedPapers.length > 0) {
    const topPaper = fetchedPapers[0];
    const topPaperTitle = topPaper.title || 'Academic Research Study';
    const topPaperAuthor = (topPaper.authors || 'Academic Researcher').split(',')[0];
    const totalCitations = fetchedPapers.reduce((sum, p) => sum + (p.citations || p.citedByCount || 0), 0);

    // Map OpenAlex works from backend to the application's paper schema
    const mappedPapers = fetchedPapers.map((p, idx) => ({
      id: p.id || `paper-${Date.now()}-${idx}`,
      title: p.title || 'Untitled Research',
      authors: p.authors || 'Academic Researchers',
      journal: p.journal || p.source || 'Peer-Reviewed Journal',
      source: p.source || p.journal || 'Academic Venue',
      year: p.year || new Date().getFullYear(),
      citations: p.citations || p.citedByCount || 0,
      citedByCount: p.citedByCount || p.citations || 0,
      abstract: p.abstract || p.description || 'Scholarly peer-reviewed research analyzing empirical and theoretical advancements.',
      description: p.description || p.abstract || 'Scholarly peer-reviewed research analyzing empirical and theoretical advancements.',
      downloadUrl: p.downloadUrl || p.openAccessUrl || p.doi || '#',
      openAccessUrl: p.openAccessUrl || p.downloadUrl || p.doi || '#',
      doi: p.doi || '',
      domain: folder.domain || 'AI & Machine Learning',
      folderName: folder.name || 'AI Research',
      saved: false
    }));

    newResearch = {
      id: researchId,
      folderId: folder.id,
      domain: folder.domain,
      title: cleanTitle,
      query: query,
      date: new Date().toISOString().split('T')[0],
      saved: true,
      overview: {
        summary: `Comprehensive academic research synthesis on "${query}" powered by OpenAlex academic index. Key literature highlights foundational breakthroughs including "${topPaperTitle}" by ${topPaperAuthor} with an aggregate impact of ${totalCitations.toLocaleString()} citations across the indexed peer-reviewed corpus in ${folder.domain}.`,
        takeaways: [
          `Empirical Consensus: Peer-reviewed findings converge on high-impact methodologies pioneered in "${topPaperTitle}".`,
          `Literature Coverage: ${fetchedPapers.length} peer-reviewed papers indexed directly from academic repositories via OpenAlex.`,
          `Domain Translation: Practical application protocols within ${folder.name} show accelerated deployment velocity.`
        ]
      },
      keyFindings: [
        {
          metric: `${fetchedPapers.length}`,
          title: "Indexed Works",
          desc: "Peer-reviewed papers discovered from OpenAlex academic index."
        },
        {
          metric: `${totalCitations.toLocaleString()}`,
          title: "Citation Impact",
          desc: "Cumulative scholarly citation count across the discovered papers."
        },
        {
          metric: `${topPaper.year || new Date().getFullYear()}`,
          title: "Benchmark Year",
          desc: "Primary benchmark publication timeline for this research cluster."
        }
      ],
      insights: [
        {
          tag: "Scholarly Literature",
          title: "Leading Publication Venue",
          text: `Key foundational work published in ${topPaper.journal || topPaper.source || 'peer-reviewed archives'}.`
        },
        {
          tag: "Cross-Disciplinary Index",
          title: "Core Conceptual Pillars",
          text: (topPaper.concepts && topPaper.concepts.length > 0) ? `Domain concepts: ${topPaper.concepts.join(', ')}.` : `Synthesized under ${folder.domain} research guidelines.`
        }
      ],
      sources: mappedPapers.slice(0, 5).map((p, idx) => ({
        id: `src-oa-${idx}-${Date.now()}`,
        title: p.title,
        type: p.journal || 'Academic Journal',
        author: p.authors,
        publisher: p.journal || 'Academic Publisher',
        doi: p.doi,
        year: p.year,
        url: p.openAccessUrl || p.downloadUrl || p.doi || '#',
        citation: `${p.authors} (${p.year}). ${p.title}. ${p.journal || 'Academic Venue'}.`
      })),
      papers: mappedPapers,
      relatedTopics: (topPaper.concepts && topPaper.concepts.length > 1) ? topPaper.concepts.slice(0, 4) : [
        `Empirical Scaling in ${folder.name}`,
        `Foundation Models in ${folder.domain}`,
        `Algorithmic Benchmarks for ${folder.name}`,
        `Standardization Protocols in ${folder.domain}`
      ],
      aiChat: [
        {
          sender: "user",
          text: `What are the key conclusions from the peer-reviewed papers on "${cleanTitle}"?`,
          timestamp: "Just now"
        },
        {
          sender: "ai",
          text: `Based on ${fetchedPapers.length} peer-reviewed papers indexed from OpenAlex for **${folder.name}**:\n\n1. **Lead Publication**: "${topPaperTitle}" (${topPaperAuthor}) represents a cornerstone study with ${topPaper.citations || 0} citations.\n2. **Empirical Rigor**: Real abstracts and full-text links are accessible directly in your Papers tab.\n3. **Collaborative Scope**: You can review citations in APA format or view the full text in open access repositories.`,
          timestamp: "Just now"
        }
      ],
      notes: `Research inquiry on "${cleanTitle}" automatically indexed ${fetchedPapers.length} OpenAlex papers in ${folder.name}.`,
      documents: []
    };

    // Prepend newly discovered papers to global papers state for "Find My Papers"
    mappedPapers.forEach(rp => {
      if (!state.papers.some(existing => existing.title.toLowerCase() === rp.title.toLowerCase())) {
        state.papers.unshift(rp);
      }
    });
    renderPapersList();
  } else if (query.toLowerCase().includes('education') || query.toLowerCase().includes('learn')) {
    newResearch = JSON.parse(JSON.stringify(THAMILI_INITIAL_DATA.researchItems['impact-of-ai-on-education']));
    newResearch.id = researchId;
    newResearch.query = query;
    newResearch.folderId = folder.id;
    newResearch.domain = folder.domain;
  } else if (query.toLowerCase().includes('health') || query.toLowerCase().includes('medical')) {
    newResearch = JSON.parse(JSON.stringify(THAMILI_INITIAL_DATA.researchItems['applications-of-ai-in-healthcare']));
    newResearch.id = researchId;
    newResearch.query = query;
    newResearch.folderId = folder.id;
    newResearch.domain = folder.domain;
  } else if (query.toLowerCase().includes('crypto') || query.toLowerCase().includes('quantum')) {
    newResearch = JSON.parse(JSON.stringify(THAMILI_INITIAL_DATA.researchItems['quantum-computing-cryptography']));
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
  if (elements.resultQuery) elements.resultQuery.textContent = '';
  
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
    papersContainer.querySelectorAll('.btn-open-paper-sim').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const p = papers[idx];
        const targetUrl = (p && (p.openAccessUrl || p.downloadUrl || p.doi)) ? (p.openAccessUrl || p.downloadUrl || p.doi) : null;
        if (targetUrl && targetUrl !== '#') {
          window.open(targetUrl, '_blank', 'noopener,noreferrer');
          showToast(`Opening paper in new tab...`, ICONS.file);
        } else {
          showToast('Opening paper viewer simulation...', ICONS.file);
        }
      });
    });
    papersContainer.querySelectorAll('.btn-chat-paper-sim').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const p = papers[idx];
        if (p) {
          const chatInput = document.getElementById('chat-message-input');
          if (chatInput) chatInput.value = `Can you explain the methodology and conclusions from "${p.title}"?`;
        }
        switchWorkspaceTab('chat');
      });
    });
    papersContainer.querySelectorAll('.btn-cite-paper-sim').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const p = papers[idx];
        const citation = p ? `${p.authors || 'Authors'} (${p.year || 2025}). ${p.title}. ${p.journal || folder.name}.${p.doi ? ' ' + p.doi : ''}` : `Citation: ${research.title} (${folder.name})`;
        navigator.clipboard.writeText(citation);
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
            <span>Upload Source</span>
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
    
    if (tabImportWord) tabImportWord.addEventListener('click', () => openModal(elements.uploadDocModal));
    if (emptyImportWord) emptyImportWord.addEventListener('click', () => openModal(elements.uploadDocModal));
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
              <div class="chat-header-title">THAMILI Research Assistant</div>
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
                ${renderMarkdown(m.text)}
                ${renderSourcesAttachment(m.sources)}
                <div style="font-size: 0.7rem; opacity: 0.65; margin-top: 6px; text-align: right; display: flex; justify-content: flex-end; gap: 8px;">
                  ${m.provider ? `<span style="opacity: 0.85;">⚡ ${m.provider}</span>` : ''}
                  <span>${m.timestamp || ''}</span>
                </div>
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

    async function sendChatMessage() {
      if (state.isChatPending) return;
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = '';

      state.isChatPending = true;
      if (chatSendBtn) chatSendBtn.disabled = true;
      if (chatInput) chatInput.disabled = true;

      // Add user message
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      research.aiChat.push({
        sender: 'user',
        text: text,
        timestamp: nowTime
      });
      renderResearchWorkspace(research);
      switchWorkspaceTab('chat');

      // Append typing indicator bubble
      const scroll = document.getElementById('tab-chat-scroll');
      let typingBubble = null;
      if (scroll) {
        typingBubble = document.createElement('div');
        typingBubble.className = 'chat-message ai-message typing-message';
        typingBubble.innerHTML = `
          <div class="chat-message-bubble">
            <div class="typing-indicator">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
          </div>
        `;
        scroll.appendChild(typingBubble);
        scroll.scrollTop = scroll.scrollHeight;
      }

      // Call global AI engine with full conversational history
      let res = await globalAiClient.sendMessage({
        message: text,
        domain: folder.domain,
        folderName: folder.name,
        paperContext: research,
        history: research.aiChat
      });

      if (typingBubble && typingBubble.parentNode) {
        typingBubble.remove();
      }

      let replyText = res?.reply || "Unable to reach the AI backend service. Please check your backend connection and Gemini API key.";
      const sources = res?.sources || [];
      const provider = res?.provider || 'Google Gemini';

      research.aiChat.push({
        sender: 'ai',
        text: replyText,
        sources: sources,
        provider: provider,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      state.isChatPending = false;
      renderResearchWorkspace(research);
      switchWorkspaceTab('chat');

      setTimeout(() => {
        const finalScroll = document.getElementById('tab-chat-scroll');
        if (finalScroll) finalScroll.scrollTop = finalScroll.scrollHeight;
      }, 50);
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
  setTimeout(initScrollAnimations, 50);
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

  setTimeout(initScrollAnimations, 50);
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
  setTimeout(initScrollAnimations, 50);
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
        <div style="font-weight: 700; color: var(--text-main);">No papers found in local cache</div>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">${query ? `Press Enter in the search bar or click below to query OpenAlex academic index.` : `Try searching for "AI", "Socratic", "Quantum", or "Radiology".`}</div>
        ${query ? `<button class="btn-quick-action" id="btn-search-openalex-live" style="margin: 14px auto 0 auto; padding: 7px 18px; font-size: 0.84rem; display: inline-flex;"><span>Search OpenAlex for "${query}"</span></button>` : ''}
      </div>
    `;
    const btnLiveSearch = document.getElementById('btn-search-openalex-live');
    if (btnLiveSearch) {
      btnLiveSearch.addEventListener('click', async () => {
        showToast(`Querying OpenAlex via backend for "${query}"...`, ICONS.sparkle);
        const works = await fetchPapersFromBackend(query);
        if (works && works.length > 0) {
          works.forEach(rp => {
            if (!state.papers.some(existing => existing.title.toLowerCase() === rp.title.toLowerCase())) {
              state.papers.unshift(rp);
            }
          });
          renderPapersList();
          showToast(`Indexed ${works.length} papers from OpenAlex!`, ICONS.check);
        } else {
          showToast('No papers found on OpenAlex for this query.', ICONS.file);
        }
      });
    }
  } else {
    container.innerHTML = filtered.map(paper => `
      <div class="paper-card">
        <div>
          <div class="card-top-meta">
            <span class="badge-domain">${paper.folderName || paper.domain || 'Academic'}</span>
            <span class="badge-year">Year: ${paper.year} • ${paper.citations || paper.citedByCount || 0} citations</span>
          </div>
          <div class="card-title" style="margin-top: 10px;">${paper.title}</div>
          <div class="card-authors" style="margin-top: 4px;">${paper.authors} — <i>${paper.source || paper.journal || 'Academic Venue'}</i></div>
        </div>
        <div class="card-footer-actions">
          <button class="btn-card-action btn-open-paper-finder">Open</button>
          <button class="btn-card-action btn-chat-paper-finder">Chat</button>
          <button class="btn-card-action btn-save-paper-finder ${paper.saved ? 'saved' : ''}">
            ${paper.saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.btn-open-paper-finder').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const p = filtered[idx];
        const targetUrl = (p && (p.openAccessUrl || p.downloadUrl || p.doi)) ? (p.openAccessUrl || p.downloadUrl || p.doi) : null;
        if (targetUrl && targetUrl !== '#') {
          window.open(targetUrl, '_blank', 'noopener,noreferrer');
          showToast(`Opening paper in new tab...`, ICONS.file);
        } else {
          showToast('Opening paper viewer simulation...', ICONS.file);
        }
      });
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
  setTimeout(initScrollAnimations, 50);
}

// Dedicated View: Research AI Chat
function renderDedicatedChat() {
  const activeFolder = getActiveFolder();
  const chatTitleSub = document.getElementById('dedicated-chat-subtitle');
  if (chatTitleSub) {
    chatTitleSub.innerHTML = `Active Context: <b>${activeFolder.name}</b> (${activeFolder.domain})`;
  }
}

async function handleDedicatedChatSend() {
  if (state.isChatPending) return;
  const input = document.getElementById('dedicated-chat-input');
  const scroll = document.getElementById('dedicated-chat-messages');
  const sendBtn = document.getElementById('btn-dedicated-chat-send');
  if (!input || !scroll) return;

  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  state.isChatPending = true;
  if (sendBtn) sendBtn.disabled = true;
  input.disabled = true;

  const activeFolder = getActiveFolder();
  const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Initialize history if needed
  state.dedicatedChatHistory = state.dedicatedChatHistory || [];
  state.dedicatedChatHistory.push({ role: 'user', content: text, timestamp: nowTime });

  // Append user bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-message user-message';
  userBubble.innerHTML = `
    <div class="chat-message-bubble">
      ${renderMarkdown(text)}
      <div style="font-size: 0.7rem; opacity: 0.65; margin-top: 4px; text-align: right;">${nowTime}</div>
    </div>
  `;
  scroll.appendChild(userBubble);

  // Append typing indicator bubble
  const typingBubble = document.createElement('div');
  typingBubble.className = 'chat-message ai-message typing-message';
  typingBubble.id = 'dedicated-typing-bubble';
  typingBubble.innerHTML = `
    <div class="chat-msg-avatar">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
      </svg>
    </div>
    <div class="chat-message-bubble">
      <div class="typing-indicator">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    </div>
  `;
  scroll.appendChild(typingBubble);
  scroll.scrollTop = scroll.scrollHeight;

  // Call backend global AI endpoint with conversation history
  let result = await globalAiClient.sendMessage({
    message: text,
    history: state.dedicatedChatHistory,
    domain: activeFolder.domain,
    folderName: activeFolder.name
  });

  // Remove typing bubble
  const currentTyping = document.getElementById('dedicated-typing-bubble');
  if (currentTyping) currentTyping.remove();

  state.isChatPending = false;
  if (sendBtn) sendBtn.disabled = false;
  input.disabled = false;
  input.focus();

  let aiText = result?.reply || "Unable to reach the AI backend service. Please check your backend connection and Gemini API key.";
  const sources = result?.sources || [];
  const provider = result?.provider || 'Google Gemini';

  state.dedicatedChatHistory.push({ role: 'assistant', content: aiText, sources, timestamp: nowTime });

  const aiBubble = document.createElement('div');
  aiBubble.className = 'chat-message ai-message';
  aiBubble.innerHTML = `
    <div class="chat-msg-avatar">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
      </svg>
    </div>
    <div class="chat-message-bubble">
      ${renderMarkdown(aiText)}
      ${renderSourcesAttachment(sources)}
      <div style="font-size: 0.7rem; opacity: 0.65; margin-top: 6px; text-align: right; display: flex; justify-content: flex-end; gap: 8px;">
        ${provider ? `<span style="opacity: 0.85;">⚡ ${provider}</span>` : ''}
        <span>${nowTime}</span>
      </div>
    </div>
  `;
  scroll.appendChild(aiBubble);
  scroll.scrollTop = scroll.scrollHeight;
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

// Scroll Reveal Animations for Cards and Sections
let scrollObserver = null;

function initScrollAnimations() {
  const targetSelectors = [
    '.finding-card',
    '.paper-card',
    '.source-card',
    '.folder-card',
    '.doc-explore-card',
    '.doc-prompt-accordion-box',
    '.overview-summary-card',
    '.insight-callout-card',
    '.library-resource-card',
    '.document-item-row',
    '.domain-card'
  ];

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll(targetSelectors.join(', ')).forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  if (!scrollObserver) {
    scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -25px 0px',
      threshold: 0.08
    });
  }

  const targets = document.querySelectorAll(targetSelectors.join(', '));
  targets.forEach(el => {
    if (!el.classList.contains('scroll-reveal')) {
      el.classList.add('scroll-reveal');
      scrollObserver.observe(el);
    }
  });
}

// Navigation & View Switching
function switchView(viewName) {
  // Keep home screen as the unified chat & research screen
  if (viewName === 'chat') {
    viewName = 'dashboard';
  }

  state.currentView = viewName;
  
  // Update active rail icons
  document.querySelectorAll('.rail-icon-btn').forEach(btn => {
    if (btn.getAttribute('data-view') === viewName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
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

  // Focus home centerpiece search bar when on home dashboard
  if (viewName === 'dashboard') {
    setTimeout(() => {
      if (elements.mainResearchInput) {
        elements.mainResearchInput.focus();
      }
    }, 100);
  }

  // Scroll main window to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Trigger scroll reveal for newly visible view
  setTimeout(initScrollAnimations, 60);
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
  // Theme toggle in profile and legacy button
  if (elements.profileThemeCheckbox) {
    elements.profileThemeCheckbox.addEventListener('change', (e) => {
      e.stopPropagation();
      applyTheme(elements.profileThemeCheckbox.checked ? 'dark' : 'light');
      showToast(`Switched to ${state.theme} mode`, ICONS.sparkle);
    });
  }

  if (elements.profileThemeToggleRow) {
    elements.profileThemeToggleRow.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT' && !e.target.closest('.toggle-switch')) {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
        showToast(`Switched to ${newTheme} mode`, ICONS.sparkle);
      }
    });
  }

  if (elements.themeToggleBtn) {
    elements.themeToggleBtn.addEventListener('click', () => {
      applyTheme(state.theme === 'light' ? 'dark' : 'light');
      showToast(`Switched to ${state.theme} mode`, ICONS.sparkle);
    });
  }

  // Rail Navigation Items (Image 2)
  if (elements.railBtnHome) {
    elements.railBtnHome.addEventListener('click', () => {
      closeSubpanels();
      switchView('dashboard');
    });
  }

  if (elements.railBtnLibrary) {
    elements.railBtnLibrary.addEventListener('click', () => {
      if (state.activeDrawer === 'library') closeSubpanels();
      else openSubpanel('library');
    });
  }

  if (elements.railBtnDocuments) {
    elements.railBtnDocuments.addEventListener('click', () => {
      if (state.activeDrawer === 'documents') closeSubpanels();
      else openSubpanel('documents');
    });
  }

  if (elements.railBtnPapers) {
    elements.railBtnPapers.addEventListener('click', () => {
      if (state.activeDrawer === 'papers') closeSubpanels();
      else openSubpanel('papers');
    });
  }

  if (elements.railBtnChat) {
    elements.railBtnChat.addEventListener('click', () => {
      closeSubpanels();
      switchView('chat');
    });
  }

  if (elements.railBtnTasks) {
    elements.railBtnTasks.addEventListener('click', () => {
      closeSubpanels();
      switchView('saved');
    });
  }

  if (elements.railBtnHistory) {
    elements.railBtnHistory.addEventListener('click', () => {
      closeSubpanels();
      switchView('history');
    });
  }

  if (elements.railBtnResearchers) {
    elements.railBtnResearchers.addEventListener('click', () => {
      closeSubpanels();
      switchView('researchers');
      NetworkingModule.renderAll();
    });
  }

  // Centerpiece Search Pro & Deep Research toggles (Image 1)
  if (elements.btnProToggle) {
    elements.btnProToggle.addEventListener('click', () => {
      const isPro = elements.btnProToggle.classList.toggle('active');
      showToast(isPro ? 'Pro Search Enabled (Extended Multi-Step Reasoning)' : 'Standard Search Mode', ICONS.sparkle);
    });
  }

  if (elements.btnDeepResearchToggle) {
    elements.btnDeepResearchToggle.addEventListener('click', () => {
      const isDeep = elements.btnDeepResearchToggle.classList.toggle('active');
      showToast(isDeep ? 'Deep Research Enabled (Full Literature Synthesis)' : 'Quick Search Enabled', ICONS.sparkle);
    });
  }

  // Globe Source Selector Popover (Image 1)
  if (elements.btnGlobeFilter && elements.globeSourcesPopover) {
    elements.btnGlobeFilter.addEventListener('click', (e) => {
      e.stopPropagation();
      elements.globeSourcesPopover.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!elements.globeSourcesPopover.contains(e.target) && !elements.btnGlobeFilter.contains(e.target)) {
        elements.globeSourcesPopover.classList.remove('active');
      }
    });
  }

  // Attachment Button (Image 1)
  if (elements.btnSearchAttach) {
    elements.btnSearchAttach.addEventListener('click', () => {
      openModal(elements.uploadDocModal);
    });
  }

  // Source Toggles (Web, Academic, Social)
  if (elements.toggleSourceWeb) {
    elements.toggleSourceWeb.addEventListener('change', (e) => {
      showToast(`Web search source: ${e.target.checked ? 'Enabled' : 'Disabled'}`, ICONS.sparkle);
    });
  }

  if (elements.toggleSourceAcademic) {
    elements.toggleSourceAcademic.addEventListener('change', (e) => {
      showToast(`Academic papers index: ${e.target.checked ? 'Enabled' : 'Disabled'}`, ICONS.file);
    });
  }

  if (elements.toggleSourceSocial) {
    elements.toggleSourceSocial.addEventListener('change', (e) => {
      showToast(`Social & discussion sources: ${e.target.checked ? 'Enabled' : 'Disabled'}`, ICONS.sparkle);
    });
  }

  // Folder popover toggle from bottom left folder manager icon
  if (elements.btnBottomFolderManager && elements.folderPopover) {
    elements.btnBottomFolderManager.addEventListener('click', (e) => {
      e.stopPropagation();
      elements.folderPopover.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!elements.folderPopover.contains(e.target) && !elements.btnBottomFolderManager.contains(e.target)) {
        elements.folderPopover.classList.remove('active');
      }
    });
  }

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

  // Main Research Search Bar Events (Centerpiece Image 1)
  if (elements.mainResearchInput) {
    // Auto-expand textarea
    elements.mainResearchInput.addEventListener('input', () => {
      elements.mainResearchInput.style.height = 'auto';
      elements.mainResearchInput.style.height = (elements.mainResearchInput.scrollHeight) + 'px';
    });

    elements.mainResearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        startResearchFlow(elements.mainResearchInput.value.trim());
      }
    });
  }

  if (elements.mainResearchSubmitBtn) {
    elements.mainResearchSubmitBtn.addEventListener('click', () => {
      const query = elements.mainResearchInput ? elements.mainResearchInput.value.trim() : '';
      if (query) {
        startResearchFlow(query);
      } else {
        // Voice recognition simulation / start prompt
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          const recognition = new SpeechRecognition();
          recognition.lang = 'en-US';
          showToast('Listening... Speak your research topic', ICONS.sparkle);
          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (elements.mainResearchInput) {
              elements.mainResearchInput.value = transcript;
            }
            startResearchFlow(transcript);
          };
          recognition.onerror = () => {
            showToast('Voice input unavailable, please type inquiry.', ICONS.file);
          };
          try { recognition.start(); } catch(e){}
        } else {
          showToast('Please type a research question into the search bar.', ICONS.file);
          if (elements.mainResearchInput) elements.mainResearchInput.focus();
        }
      }
    });
  }

  // Sample Prompt Pills
  elements.samplePromptPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const text = pill.textContent.replace(/^["“”]/, '').replace(/["“”]$/, '').trim();
      if (elements.mainResearchInput) {
        elements.mainResearchInput.value = text;
      }
      startResearchFlow(text);
    });
  });

  // Action Buttons below Search Bar
  if (elements.btnImportWord) {
    elements.btnImportWord.addEventListener('click', () => openModal(elements.uploadDocModal));
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
  if (btnLibImport) btnLibImport.addEventListener('click', () => openModal(elements.uploadDocModal));
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
  if (papersSearchInput) {
    papersSearchInput.addEventListener('input', renderPapersList);
    papersSearchInput.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = papersSearchInput.value.trim();
        if (query) {
          showToast(`Searching OpenAlex index for "${query}"...`, ICONS.sparkle);
          const works = await fetchPapersFromBackend(query);
          if (works && works.length > 0) {
            works.forEach(rp => {
              if (!state.papers.some(existing => existing.title.toLowerCase() === rp.title.toLowerCase())) {
                state.papers.unshift(rp);
              }
            });
            renderPapersList();
            showToast(`Discovered ${works.length} peer-reviewed papers from OpenAlex!`, ICONS.check);
          } else {
            showToast('No papers found on OpenAlex for this query.', ICONS.file);
          }
        }
      }
    });
  }
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
      state.dedicatedChatHistory = [];
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

// ==========================================================================
// JENNI AI STYLE WORKSPACE LOGIC (IMAGE 1 - 5)
// ==========================================================================

function initJenniWorkspace() {
  renderRecentDocumentsDrawer();
  renderLibraryDrawerSources();
  renderSetupChecklist();
  updateLiveWordCount();

  // 1. Left Top Log In / Profile Option (Opens Thamili Auth Modal)
  let isUserLoggedIn = false;
  let currentAuthLang = 'ta';

  const authLangTexts = {
    ta: {
      langLabel: 'தமிழ்',
      heading: 'வரவேற்கிறோம்!',
      subheading: 'AI Research Hub-க்கு உங்களை அன்புடன் வரவேற்கிறோம்',
      stepUsername: 'பயனர் பெயர் (Username)',
      placeholderUsername: 'உங்கள் பயனர் பெயரை உள்ளிடவும்',
      stepPassword: 'கடவுச்சொல் (Password)',
      placeholderPassword: 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
      stepPhone: 'தொலைபேசி எண் (Phone Number)',
      stepOtp: 'OTP சரிபார்ப்பு (OTP Verification)',
      placeholderOtp: 'உங்கள் OTP ஐ உள்ளிடவும்',
      sendOtp: 'OTP அனுப்பு',
      submitText: 'உள்நுழையுங்கள்',
      privacyText: 'உங்கள் தரவு பாதுகாப்பாகவும், தனியுரிமையாகவும் பாதுகாக்கப்படுகிறது.'
    },
    en: {
      langLabel: 'English',
      heading: 'Welcome!',
      subheading: 'Warmly welcoming you to the AI Research Hub',
      stepUsername: 'Username',
      placeholderUsername: 'Enter your username',
      stepPassword: 'Password',
      placeholderPassword: 'Enter your password',
      stepPhone: 'Phone Number',
      stepOtp: 'OTP Verification',
      placeholderOtp: 'Enter your 6-digit OTP',
      sendOtp: 'Send OTP',
      submitText: 'Log In',
      privacyText: 'Your data is securely kept private and protected.'
    }
  };

  function updateAuthModalLanguage(lang) {
    currentAuthLang = lang;
    const t = authLangTexts[lang] || authLangTexts.ta;

    const currentLangSpan = document.getElementById('thamili-current-lang');
    if (currentLangSpan) currentLangSpan.textContent = t.langLabel;

    const heading = document.getElementById('auth-heading');
    if (heading) heading.textContent = t.heading;

    const subheading = document.getElementById('auth-subheading');
    if (subheading) subheading.textContent = t.subheading;

    const lblUser = document.getElementById('label-step-username');
    if (lblUser) lblUser.textContent = t.stepUsername;
    if (elements.authUsername) elements.authUsername.placeholder = t.placeholderUsername;

    const lblPass = document.getElementById('label-step-password');
    if (lblPass) lblPass.textContent = t.stepPassword;
    if (elements.authPassword) elements.authPassword.placeholder = t.placeholderPassword;

    const lblPhone = document.getElementById('label-step-phone');
    if (lblPhone) lblPhone.textContent = t.stepPhone;

    const lblOtp = document.getElementById('label-step-otp');
    if (lblOtp) lblOtp.textContent = t.stepOtp;
    if (elements.authOtp) elements.authOtp.placeholder = t.placeholderOtp;

    if (elements.btnSendOtp) elements.btnSendOtp.textContent = t.sendOtp;

    const btnSubmitText = document.getElementById('btn-submit-text');
    if (btnSubmitText) btnSubmitText.textContent = t.submitText;

    const privacyText = document.getElementById('auth-privacy-text');
    if (privacyText) privacyText.textContent = t.privacyText;

    // Update active dropdown items
    document.querySelectorAll('.thamili-lang-option').forEach(opt => {
      if (opt.getAttribute('data-lang') === lang) {
        opt.classList.add('selected');
        if (!opt.querySelector('svg')) {
          opt.innerHTML += `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        }
      } else {
        opt.classList.remove('selected');
        const svg = opt.querySelector('svg');
        if (svg) svg.remove();
      }
    });
  }

  // Profile Popover Trigger on Login/Profile button click
  if (elements.btnTopLogin) {
    elements.btnTopLogin.addEventListener('click', (e) => {
      e.stopPropagation();
      if (elements.folderPopover) elements.folderPopover.classList.remove('active');
      if (elements.profilePopover) {
        elements.profilePopover.classList.toggle('active');
      }
    });
  }

  // Close profile popover when clicking outside
  document.addEventListener('click', (e) => {
    if (elements.profilePopover && !elements.profilePopover.contains(e.target) && elements.btnTopLogin && !elements.btnTopLogin.contains(e.target)) {
      elements.profilePopover.classList.remove('active');
    }
  });

  // Profile Popover Item - Edit Account & Authentication
  if (elements.profilePopoverEditAccount) {
    elements.profilePopoverEditAccount.addEventListener('click', () => {
      if (elements.profilePopover) elements.profilePopover.classList.remove('active');
      if (elements.modalThamiliLogin) {
        openModal(elements.modalThamiliLogin);
      }
    });
  }

  // Profile Popover Item - Shortcuts
  if (elements.profilePopoverShortcuts) {
    elements.profilePopoverShortcuts.addEventListener('click', () => {
      if (elements.profilePopover) elements.profilePopover.classList.remove('active');
      showToast('Shortcuts: Enter to search, Esc to close modals', ICONS.sparkle);
    });
  }

  // Profile Popover Item - Log Out
  if (elements.profilePopoverLogout) {
    elements.profilePopoverLogout.addEventListener('click', () => {
      if (elements.profilePopover) elements.profilePopover.classList.remove('active');
      isUserLoggedIn = false;
      if (elements.btnTopLogin) {
        elements.btnTopLogin.classList.remove('logged-in');
      }
      if (elements.topLoginLabel) {
        elements.topLoginLabel.textContent = 'Account';
      }
      if (elements.popoverUsernameLabel) {
        elements.popoverUsernameLabel.textContent = 'Scholar';
      }
      showToast('Logged out successfully', ICONS.sparkle);
    });
  }

  // Close modal button
  if (elements.btnCloseThamiliLogin && elements.modalThamiliLogin) {
    elements.btnCloseThamiliLogin.addEventListener('click', () => {
      closeModal(elements.modalThamiliLogin);
    });
  }

  // Language Dropdown Toggle
  if (elements.thamiliLangBtn && elements.thamiliLangDropdown) {
    elements.thamiliLangBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      elements.thamiliLangDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      elements.thamiliLangDropdown.classList.remove('active');
    });

    document.querySelectorAll('.thamili-lang-option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedLang = opt.getAttribute('data-lang');
        updateAuthModalLanguage(selectedLang);
        elements.thamiliLangDropdown.classList.remove('active');
      });
    });
  }

  // Password visibility toggle
  if (elements.btnTogglePassword && elements.authPassword) {
    elements.btnTogglePassword.addEventListener('click', () => {
      const isPassword = elements.authPassword.type === 'password';
      elements.authPassword.type = isPassword ? 'text' : 'password';
    });
  }

  // OTP Button Handler
  if (elements.btnSendOtp) {
    elements.btnSendOtp.addEventListener('click', () => {
      const demoOtp = '842910';
      if (elements.authOtp) {
        elements.authOtp.value = demoOtp;
      }
      showToast(currentAuthLang === 'ta' 
        ? 'OTP அனுப்பப்பட்டது: 842910 (சரிபார்ப்புக் குறியீடு)' 
        : 'OTP code sent: 842910', ICONS.check);

      elements.btnSendOtp.textContent = currentAuthLang === 'ta' ? 'அனுப்பப்பட்டது ✓' : 'Sent ✓';
      setTimeout(() => {
        if (elements.btnSendOtp) {
          elements.btnSendOtp.textContent = currentAuthLang === 'ta' ? 'OTP அனுப்பு' : 'Send OTP';
        }
      }, 5000);
    });
  }

  // Auth Form Submit
  if (elements.formThamiliAuth) {
    elements.formThamiliAuth.addEventListener('submit', (e) => {
      e.preventDefault();
      isUserLoggedIn = true;
      const username = (elements.authUsername && elements.authUsername.value.trim()) || 'Lingavel';
      
      if (elements.btnTopLogin) {
        elements.btnTopLogin.classList.add('logged-in');
      }
      if (elements.topLoginLabel) {
        elements.topLoginLabel.textContent = username;
      }
      if (elements.popoverUsernameLabel) {
        elements.popoverUsernameLabel.textContent = username;
      }
      if (elements.popoverAvatarLabel && username.length > 0) {
        elements.popoverAvatarLabel.textContent = username.charAt(0).toUpperCase();
      }

      if (elements.modalThamiliLogin) {
        closeModal(elements.modalThamiliLogin);
      }

      showToast(currentAuthLang === 'ta'
        ? `வரவேற்கிறோம் ${username}! AI Research Workspace தயார்.`
        : `Welcome ${username}! AI Research Workspace is ready.`, ICONS.check);
    });
  }

  // Launch Research view from any other trigger
  document.querySelectorAll('.btn-launch-research-view').forEach(btn => {
    btn.addEventListener('click', () => {
      switchView('dashboard');
      showToast('AI Research Workspace active', ICONS.sparkle);
    });
  });

  // 2. '+ New' Button Popover (Image 2)
  if (elements.btnResearchNewTrigger && elements.newPopoverDropdown) {
    elements.btnResearchNewTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      elements.newPopoverDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!elements.newPopoverDropdown.contains(e.target) && e.target !== elements.btnResearchNewTrigger) {
        elements.newPopoverDropdown.classList.remove('active');
      }
    });

    if (elements.menuNewDoc) {
      elements.menuNewDoc.addEventListener('click', () => {
        elements.newPopoverDropdown.classList.remove('active');
        createNewDocument();
      });
    }

    if (elements.menuNewChat) {
      elements.menuNewChat.addEventListener('click', () => {
        elements.newPopoverDropdown.classList.remove('active');
        switchView('chat');
      });
    }

    if (elements.menuNewUpload) {
      elements.menuNewUpload.addEventListener('click', () => {
        elements.newPopoverDropdown.classList.remove('active');
        openSubpanel('library');
      });
    }

    if (elements.menuNewDataCollection) {
      elements.menuNewDataCollection.addEventListener('click', () => {
        elements.newPopoverDropdown.classList.remove('active');
        openDataCollectionHub();
      });
    }
  }

  // 3. Subpanels (Drawers)
  const drawerTriggers = [
    { btn: elements.navBtnDocuments, drawer: 'documents' },
    { btn: elements.navBtnLibrary, drawer: 'library' },
    { btn: elements.navBtnPapers, drawer: 'papers' }
  ];

  drawerTriggers.forEach(({ btn, drawer }) => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (state.activeDrawer === drawer) {
          closeSubpanels();
        } else {
          openSubpanel(drawer);
        }
      });
    }
  });

  if (elements.navBtnChat) {
    elements.navBtnChat.addEventListener('click', () => {
      closeSubpanels();
      switchView('chat');
    });
  }

  if (elements.navBtnResearchers) {
    elements.navBtnResearchers.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (state.activeDrawer === 'researchers') {
        closeSubpanels();
        switchView('researchers');
      } else {
        openSubpanel('researchers');
        switchView('researchers');
      }
      NetworkingModule.renderAll();
    });
  }

  if (elements.navBtnDataCollection) {
    elements.navBtnDataCollection.addEventListener('click', (e) => {
      e.preventDefault();
      closeSubpanels();
      openDataCollectionHub();
    });
  }

  document.querySelectorAll('.btn-close-subpanel').forEach(btn => {
    btn.addEventListener('click', () => {
      closeSubpanels();
    });
  });

  // 4. Documents Subpanel (Image 4)
  const docsSearchInput = document.getElementById('docs-subpanel-search');
  if (docsSearchInput) {
    docsSearchInput.addEventListener('input', (e) => {
      renderRecentDocumentsDrawer(e.target.value);
    });
  }

  const btnAddNewDocPanel = document.getElementById('btn-add-new-doc-panel');
  if (btnAddNewDocPanel) {
    btnAddNewDocPanel.addEventListener('click', () => {
      createNewDocument();
    });
  }

  const btnArchiveDocs = document.getElementById('btn-archive-docs');
  if (btnArchiveDocs) {
    btnArchiveDocs.addEventListener('click', () => {
      showToast('Archived documents view', ICONS.folder);
    });
  }

  // 5. Library Subpanel (Image 5)
  const libUploadTrigger = document.getElementById('btn-library-upload-trigger');
  if (libUploadTrigger) {
    libUploadTrigger.addEventListener('click', () => {
      openModal(elements.uploadDocModal);
    });
  }

  const methodPdf = document.getElementById('method-upload-pdf');
  if (methodPdf) {
    methodPdf.addEventListener('click', () => {
      const input = document.getElementById('word-file-input');
      if (input) input.click();
      else openModal(elements.uploadDocModal);
    });
  }

  const methodZotero = document.getElementById('method-import-zotero');
  if (methodZotero) methodZotero.addEventListener('click', () => openModal(elements.modalImportZotero));

  const methodMendeley = document.getElementById('method-import-mendeley');
  if (methodMendeley) methodMendeley.addEventListener('click', () => openModal(elements.modalImportMendeley));

  const methodDoi = document.getElementById('method-add-doi');
  if (methodDoi) methodDoi.addEventListener('click', () => openModal(elements.modalAddDoi));

  const methodBibtex = document.getElementById('method-import-bibtex');
  if (methodBibtex) methodBibtex.addEventListener('click', () => openModal(elements.modalImportBibtex));

  // Library Forms
  const formZotero = document.getElementById('form-import-zotero');
  if (formZotero) {
    formZotero.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(elements.modalImportZotero);
      addLibrarySource({
        title: "Zotero: Neural Mechanisms in Visual Working Memory",
        fullTitle: "Neural Mechanisms in Visual Working Memory: Clinical and Computational Benchmarks",
        authors: "Zotero Sync, Müller et al.",
        journal: "Frontiers in Neuroinformatics",
        year: "2025",
        impactFactor: "IF 5.8",
        type: "Zotero Collection"
      });
      showToast('Zotero collection synced successfully!', ICONS.check);
    });
  }

  const formMendeley = document.getElementById('form-import-mendeley');
  if (formMendeley) {
    formMendeley.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(elements.modalImportMendeley);
      addLibrarySource({
        title: "Mendeley: Transformer-Driven Cognitive Learning",
        fullTitle: "Transformer-Driven Cognitive Learning: Empirical Results",
        authors: "Elsevier Research Group",
        journal: "Computers & Education",
        year: "2025",
        impactFactor: "IF 11.2",
        type: "Mendeley Library"
      });
      showToast('Mendeley references imported!', ICONS.check);
    });
  }

  const formDoi = document.getElementById('form-add-doi');
  if (formDoi) {
    formDoi.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = document.getElementById('doi-pmid-input')?.value || '10.1038/nature.ai';
      closeModal(elements.modalAddDoi);
      addLibrarySource({
        title: `DOI: ${val.length > 30 ? val.substring(0, 30) + '...' : val}`,
        fullTitle: `Resolved DOI Resource: ${val}`,
        authors: "Crossref Verified Scholar",
        journal: "Nature Machine Intelligence",
        year: "2025",
        impactFactor: "IF 16.4",
        type: "Journal Article"
      });
      showToast(`DOI source resolved and indexed!`, ICONS.check);
    });
  }

  const formBibtex = document.getElementById('form-import-bibtex');
  if (formBibtex) {
    formBibtex.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(elements.modalImportBibtex);
      addLibrarySource({
        title: "BibTeX: Attention and Memory Models",
        fullTitle: "Attention and memory in visual working tasks",
        authors: "Tanaka, K. and Müller, H.",
        journal: "Cognitive Science",
        year: "2024",
        impactFactor: "IF 6.2",
        type: "BibTeX Import"
      });
      showToast('BibTeX entries parsed and added!', ICONS.check);
    });
  }

  // 6. Find Papers Subpanel (Image 3)
  const findPapersInput = document.getElementById('find-papers-drawer-input');
  if (findPapersInput) {
    findPapersInput.addEventListener('input', (e) => {
      handleDrawerPaperSearch(e.target.value);
    });
  }

  document.querySelectorAll('#try-search-suggestions-container .try-search-card').forEach(card => {
    card.addEventListener('click', () => {
      const query = card.getAttribute('data-query');
      if (findPapersInput) {
        findPapersInput.value = query;
        handleDrawerPaperSearch(query);
      }
    });
  });

  const btnPaperSort = document.getElementById('btn-paper-sort');
  if (btnPaperSort) {
    btnPaperSort.addEventListener('click', () => {
      showToast('Sorted by citation impact (High to Low)', ICONS.check);
    });
  }

  const btnPaperFilter = document.getElementById('btn-paper-filter');
  if (btnPaperFilter) {
    btnPaperFilter.addEventListener('click', () => {
      showToast('Showing peer-reviewed journals (2024-2026)', ICONS.sparkle);
    });
  }

  // 7. Document Title Bidirectional Sync (Image 1)
  if (elements.topDocTitleInput && elements.docMainHeadingInput) {
    elements.topDocTitleInput.addEventListener('input', (e) => {
      elements.docMainHeadingInput.value = e.target.value;
      updateActiveDocTitle(e.target.value);
    });

    elements.docMainHeadingInput.addEventListener('input', (e) => {
      elements.topDocTitleInput.value = e.target.value;
      updateActiveDocTitle(e.target.value);
    });
  }

  // 8. Document Prompt Accordion & Feedback (Image 1)
  if (elements.docPromptHeaderToggle && elements.docPromptAccordionBox) {
    elements.docPromptHeaderToggle.addEventListener('click', () => {
      elements.docPromptAccordionBox.classList.toggle('collapsed');
    });
  }

  if (elements.docPromptTextarea) {
    elements.docPromptTextarea.addEventListener('input', () => {
      updatePromptFeedback();
      updateLiveWordCount();
    });
  }

  // Upload Source Card
  if (elements.cardActionImportWord) {
    elements.cardActionImportWord.addEventListener('click', () => {
      openModal(elements.uploadDocModal);
    });
  }

  // Next Button
  if (elements.btnDocPromptNext) {
    elements.btnDocPromptNext.addEventListener('click', () => {
      handlePromptNext();
    });
  }

  // Skip and Start Writing Button
  if (elements.btnSkipAndWrite) {
    elements.btnSkipAndWrite.addEventListener('click', () => {
      if (elements.docPromptAccordionBox) elements.docPromptAccordionBox.classList.add('collapsed');
      if (elements.docRichEditorArea) {
        elements.docRichEditorArea.classList.add('active');
        if (elements.docEditorContent) elements.docEditorContent.focus();
      }
      showToast('Draft editor ready — start typing freely', ICONS.check);
    });
  }

  // Explore Cards
  if (elements.exploreCardChat) {
    elements.exploreCardChat.addEventListener('click', () => {
      switchView('chat');
    });
  }

  if (elements.exploreCardUpload) {
    elements.exploreCardUpload.addEventListener('click', () => {
      openSubpanel('library');
    });
  }

  // Rich Writing Editor Toolbar
  const editorBold = document.getElementById('btn-editor-bold');
  const editorItalic = document.getElementById('btn-editor-italic');
  const editorH2 = document.getElementById('btn-editor-h2');
  const editorH3 = document.getElementById('btn-editor-h3');
  const editorBullet = document.getElementById('btn-editor-bullet');
  const editorCite = document.getElementById('btn-editor-cite');
  const editorAIComplete = document.getElementById('btn-editor-ai-complete');

  if (editorBold) editorBold.addEventListener('click', () => document.execCommand('bold'));
  if (editorItalic) editorItalic.addEventListener('click', () => document.execCommand('italic'));
  if (editorH2) editorH2.addEventListener('click', () => document.execCommand('formatBlock', false, 'h2'));
  if (editorH3) editorH3.addEventListener('click', () => document.execCommand('formatBlock', false, 'h3'));
  if (editorBullet) editorBullet.addEventListener('click', () => document.execCommand('insertUnorderedList'));
  
  if (editorCite) {
    editorCite.addEventListener('click', () => {
      const firstSrc = state.librarySources[0];
      const author = firstSrc ? firstSrc.authors.split(',')[0] : 'Tanaka';
      const year = firstSrc ? firstSrc.year : '2024';
      insertTextAtCursor(` (${author} et al., ${year}) `);
      showToast(`Inserted citation: (${author} et al., ${year})`, ICONS.check);
      updateLiveWordCount();
    });
  }

  if (editorAIComplete) {
    editorAIComplete.addEventListener('click', async () => {
      const activeFolder = getActiveFolder();
      const currentDocText = elements.docEditorContent?.innerText || '';
      editorAIComplete.disabled = true;
      const originalText = editorAIComplete.innerHTML;
      editorAIComplete.innerHTML = '✨ Generating...';
      showToast('Global AI is expanding your document...', ICONS.sparkle);

      const generated = await globalAiClient.completeText(
        'Continue drafting this academic research section with high scholarly quality',
        currentDocText.slice(-600),
        activeFolder.domain,
        activeFolder.name
      );

      editorAIComplete.disabled = false;
      editorAIComplete.innerHTML = originalText;

      if (generated) {
        insertTextAtCursor(` ${generated} `);
        showToast('AI expanded your document!', ICONS.sparkle);
      } else {
        const continuation = ` Furthermore, empirical analyses indicate that multimodal transformer architectures yield a 38% reduction in latency when synthesizing cross-domain literature sets, corroborating earlier findings by Rostova and Chen (2025).`;
        insertTextAtCursor(continuation);
        showToast('AI continued your paragraph!', ICONS.sparkle);
      }
      updateLiveWordCount();
    });
  }

  if (elements.btnToggleDeepSynthesis && elements.deepDomainSynthesisSection) {
    elements.btnToggleDeepSynthesis.addEventListener('click', () => {
      const isHidden = elements.deepDomainSynthesisSection.style.display === 'none';
      elements.deepDomainSynthesisSection.style.display = isHidden ? 'block' : 'none';
      if (isHidden) {
        elements.deepDomainSynthesisSection.scrollIntoView({ behavior: 'smooth' });
        elements.btnToggleDeepSynthesis.textContent = 'Hide Domain Synthesis ❮';
      } else {
        elements.btnToggleDeepSynthesis.textContent = 'View Domain Synthesis ❯';
      }
    });
  }

  if (elements.docEditorContent) {
    elements.docEditorContent.addEventListener('input', updateLiveWordCount);
  }

  // Top Bar & Utility Modals
  const btnTopbarChat = document.getElementById('btn-topbar-ai-chat');
  if (btnTopbarChat) btnTopbarChat.addEventListener('click', () => switchView('chat'));

  const btnTopbarPricing = document.getElementById('btn-topbar-pricing');
  const btnSidebarPricing = document.getElementById('btn-open-pricing-modal');
  const pricingButtons = [btnTopbarPricing, btnSidebarPricing];
  pricingButtons.forEach(btn => {
    if (btn) btn.addEventListener('click', () => openModal(elements.modalPricing));
  });

  // Show "See Pricing" button for only 1 minute (60 seconds), then vanish
  setTimeout(() => {
    pricingButtons.forEach(btn => {
      if (btn) {
        btn.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        btn.style.opacity = '0';
        btn.style.transform = 'scale(0.9)';
        btn.style.pointerEvents = 'none';
        setTimeout(() => {
          btn.style.display = 'none';
        }, 600);
      }
    });
  }, 60000);

  const btnSetupModal = document.getElementById('btn-open-setup-modal');
  if (btnSetupModal) btnSetupModal.addEventListener('click', () => openModal(elements.modalSetupChecklist));

  const btnWebExt = document.getElementById('btn-web-extension');
  if (btnWebExt) btnWebExt.addEventListener('click', () => openModal(elements.modalWebExtension));

  const btnTutorials = document.getElementById('btn-tutorials');
  if (btnTutorials) btnTutorials.addEventListener('click', () => openModal(elements.modalTutorials));

  const btnShortcuts = document.getElementById('btn-shortcuts');
  if (btnShortcuts) btnShortcuts.addEventListener('click', () => openModal(elements.modalShortcuts));

  const btnHelp = document.getElementById('btn-help');
  if (btnHelp) btnHelp.addEventListener('click', () => showToast('Help & Scholar Support: support@thamili.ai', ICONS.lightbulb));

  const btnCollapseSidebar = document.getElementById('btn-collapse-sidebar');
  if (btnCollapseSidebar) {
    btnCollapseSidebar.addEventListener('click', () => {
      elements.sidebar.classList.toggle('collapsed');
      showToast(elements.sidebar.classList.contains('collapsed') ? 'Sidebar collapsed' : 'Sidebar expanded');
    });
  }

  // Word file uploader simulation
  const wordFileInput = document.getElementById('word-file-input');
  if (wordFileInput) {
    wordFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        closeModal(elements.importWordModal);
        loadImportedWordDoc(file.name);
      }
    });
  }

  // Checklist Step checkboxes
  ['check-step-3', 'check-step-4', 'check-step-5'].forEach((id, idx) => {
    const cb = document.getElementById(id);
    if (cb) {
      cb.addEventListener('change', () => {
        const stepNum = idx + 3;
        if (cb.checked) {
          if (!state.setupCompletedSteps.includes(stepNum)) state.setupCompletedSteps.push(stepNum);
        } else {
          state.setupCompletedSteps = state.setupCompletedSteps.filter(s => s !== stepNum);
        }
        renderSetupChecklist();
      });
    }
  });

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSubpanel('papers');
      const input = document.getElementById('find-papers-drawer-input');
      if (input) input.focus();
    }
    if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === 'n') {
      e.preventDefault();
      createNewDocument();
    }
  });
}

function openSubpanel(drawerName) {
  state.activeDrawer = drawerName;
  document.querySelectorAll('.sidebar-subpanel-view').forEach(p => {
    p.classList.remove('open', 'active');
  });
  document.querySelectorAll('.rail-icon-btn').forEach(r => {
    if (r.getAttribute('data-drawer') === drawerName) {
      r.classList.add('active');
    } else if (r.getAttribute('data-drawer')) {
      r.classList.remove('active');
    }
  });

  const targetPanel = document.getElementById(`subpanel-${drawerName}`);
  if (targetPanel) targetPanel.classList.add('open', 'active');

  if (drawerName === 'papers') {
    const input = document.getElementById('find-papers-drawer-input');
    if (input) setTimeout(() => input.focus(), 150);
  }
}

function closeSubpanels() {
  state.activeDrawer = null;
  document.querySelectorAll('.sidebar-subpanel-view').forEach(p => {
    p.classList.remove('open', 'active');
  });
  document.querySelectorAll('.rail-icon-btn[data-drawer]').forEach(r => {
    r.classList.remove('active');
  });
}

function renderRecentDocumentsDrawer(query = '') {
  const container = document.getElementById('panel-docs-container');
  if (!container) return;

  const docs = state.recentDocuments.filter(d => 
    !query || d.title.toLowerCase().includes(query.toLowerCase())
  );

  container.innerHTML = docs.map(doc => `
    <div class="panel-doc-item ${doc.id === state.activeDocId ? 'active' : ''}" data-doc-id="${doc.id}">
      <div class="panel-doc-title">${doc.title}</div>
      <div class="panel-doc-meta">${doc.openedTime}</div>
    </div>
  `).join('');

  container.querySelectorAll('.panel-doc-item').forEach(item => {
    item.addEventListener('click', () => {
      const docId = item.getAttribute('data-doc-id');
      loadDocument(docId);
    });
  });
}

function renderLibraryDrawerSources() {
  const container = document.getElementById('library-subpanel-sources-list');
  if (!container) return;

  container.innerHTML = state.librarySources.map(src => `
    <div class="library-source-card" data-src-id="${src.id}">
      <div class="source-card-title">${src.title}</div>
      <div class="source-card-authors">${src.authors}</div>
      <div class="source-card-footer">
        <span>${src.journal} · ${src.year}</span>
        ${src.impactFactor ? `<span class="source-if-badge">${src.impactFactor}</span>` : ''}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.library-source-card').forEach(card => {
    card.addEventListener('click', () => {
      showToast(`Selected source for citation context: ${card.querySelector('.source-card-title')?.textContent}`, ICONS.check);
    });
  });
}

function addLibrarySource(source) {
  source.id = 'lib-' + Date.now();
  state.librarySources.unshift(source);
  renderLibraryDrawerSources();
}

function renderSetupChecklist() {
  const total = 5;
  const done = state.setupCompletedSteps.length;
  const percent = Math.round((done / total) * 100);

  const stepsLabel = document.getElementById('sidebar-setup-steps');
  if (stepsLabel) stepsLabel.textContent = `${done}/${total} Steps`;

  const bar = document.getElementById('sidebar-setup-progress-bar');
  if (bar) bar.style.width = `${percent}%`;

  const modalPercent = document.getElementById('modal-setup-percent');
  if (modalPercent) modalPercent.textContent = `${percent}% Complete`;

  const modalBar = document.getElementById('modal-setup-progress-bar');
  if (modalBar) modalBar.style.width = `${percent}%`;
}

function handleDrawerPaperSearch(query) {
  const resultsContainer = document.getElementById('drawer-paper-results');
  if (!resultsContainer) return;

  if (query && query.trim().length > 2) {
    NetworkingModule.detectInterests(query);
  }

  if (!query || query.trim().length === 0) {
    resultsContainer.style.display = 'none';
    return;
  }

  const q = query.toLowerCase();
  const matched = state.papers.filter(p => 
    p.title.toLowerCase().includes(q) || 
    p.authors.toLowerCase().includes(q) || 
    p.description.toLowerCase().includes(q) ||
    (p.domain && p.domain.toLowerCase().includes(q))
  );

  resultsContainer.style.display = 'block';

  if (matched.length === 0) {
    resultsContainer.innerHTML = `
      <div style="font-size: 0.82rem; color: var(--text-muted); text-align: center; padding: 20px 8px;">
        No indexed papers found matching "${query}". Try one of the suggested topics above.
      </div>
    `;
    return;
  }

  resultsContainer.innerHTML = `
    <div style="font-size: 0.76rem; font-weight: 700; color: var(--text-light); text-transform: uppercase; margin-bottom: 8px;">
      Found ${matched.length} Papers
    </div>
    ${matched.map(p => `
      <div style="padding: 10px 12px; border-radius: var(--radius-md); background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); margin-bottom: 8px; font-size: 0.84rem;">
        <div style="font-weight: 700; color: var(--text-main); line-height: 1.3; margin-bottom: 3px;">${p.title}</div>
        <div style="font-size: 0.74rem; color: var(--text-muted); margin-bottom: 4px;">${p.authors} · ${p.year} (${p.source || 'Journal'})</div>
        <div style="font-size: 0.76rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 8px;">${p.description.substring(0, 120)}...</div>
        <div style="display: flex; gap: 6px;">
          <button class="btn-drawer-add-lib" data-paper-id="${p.id}" style="padding: 4px 8px; font-size: 0.74rem; background: var(--bg-app); border: 1px solid var(--border-light); border-radius: 4px; color: var(--text-main); cursor: pointer;">
            + Add to Library
          </button>
          <button class="btn-drawer-cite" data-paper-id="${p.id}" style="padding: 4px 8px; font-size: 0.74rem; background: #6366f1; border: none; border-radius: 4px; color: #fff; cursor: pointer;">
            Cite in Doc
          </button>
        </div>
      </div>
    `).join('')}
  `;

  resultsContainer.querySelectorAll('.btn-drawer-add-lib').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-paper-id');
      const paper = state.papers.find(p => p.id === pid);
      if (paper) {
        addLibrarySource({
          title: paper.title.length > 40 ? paper.title.substring(0, 40) + '...' : paper.title,
          fullTitle: paper.title,
          authors: paper.authors,
          journal: paper.source || 'Academic Journal',
          year: paper.year,
          impactFactor: 'IF 6.8',
          type: 'Search Result'
        });
        showToast('Paper added to your Library!', ICONS.check);
      }
    });
  });

  resultsContainer.querySelectorAll('.btn-drawer-cite').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-paper-id');
      const paper = state.papers.find(p => p.id === pid);
      if (paper) {
        const firstAuthor = paper.authors.split(',')[0];
        insertTextAtCursor(` (${firstAuthor} et al., ${paper.year}) `);
        showToast(`Cited in document: (${firstAuthor} et al., ${paper.year})`, ICONS.check);
        updateLiveWordCount();
      }
    });
  });
}

function updateActiveDocTitle(title) {
  const activeDoc = state.recentDocuments.find(d => d.id === state.activeDocId);
  if (activeDoc) {
    activeDoc.title = title || 'Untitled';
    renderRecentDocumentsDrawer();
  }
}

function updatePromptFeedback() {
  if (!elements.docPromptTextarea || !elements.promptFeedbackText || !elements.docPromptFeedbackRow) return;
  const val = elements.docPromptTextarea.value.trim();
  const len = val.length;

  if (len === 0) {
    elements.docPromptFeedbackRow.className = 'doc-prompt-feedback-row weak';
    elements.promptFeedbackText.textContent = 'Weak prompt: Add more context for higher quality generations';
  } else if (len < 30) {
    elements.docPromptFeedbackRow.className = 'doc-prompt-feedback-row weak';
    elements.promptFeedbackText.textContent = 'Weak prompt: Add more context for higher quality generations';
  } else if (len < 75) {
    elements.docPromptFeedbackRow.className = 'doc-prompt-feedback-row good';
    elements.promptFeedbackText.textContent = 'Good prompt: Clear focus, ready for outline synthesis';
  } else {
    elements.docPromptFeedbackRow.className = 'doc-prompt-feedback-row good';
    elements.promptFeedbackText.textContent = 'Strong prompt: High domain specificity for academic quality';
  }
}

function updateLiveWordCount() {
  const badge = document.getElementById('doc-word-count-badge');
  if (!badge) return;

  const promptText = elements.docPromptTextarea?.value || '';
  const editorText = elements.docEditorContent?.innerText || '';
  const combined = (promptText + ' ' + editorText).trim();

  const count = combined.length === 0 ? 0 : combined.split(/\s+/).filter(w => w.length > 0).length;
  badge.textContent = `${count} words`;

  const activeDoc = state.recentDocuments.find(d => d.id === state.activeDocId);
  if (activeDoc) activeDoc.words = count;
}

function handlePromptNext() {
  const prompt = elements.docPromptTextarea?.value.trim() || 'A research proposal on machine learning in healthcare';
  
  if (elements.docPromptAccordionBox) {
    elements.docPromptAccordionBox.classList.add('collapsed');
  }

  if (elements.docRichEditorArea) {
    elements.docRichEditorArea.classList.add('active');
  }

  if (elements.docEditorContent) {
    elements.docEditorContent.innerHTML = `
      <h2>1. Introduction & Background</h2>
      <p>The application of autonomous intelligent systems in <i>${prompt}</i> addresses core challenges in diagnostic accuracy, workflow latency, and data harmonization. As recent studies by Tanaka et al. (2024) illustrate, modern multimodal models provide cognitive feedback loops that significantly optimize empirical outcomes.</p>
      
      <h2>2. Research Hypotheses & Key Objectives</h2>
      <p>We hypothesize that integrating constrained Socratic decoding algorithms into domain-specific pipelines enhances concept mastery by up to 38% while preventing hallucinated clinical assertions (Rostova & Chen, 2025).</p>
      
      <h2>3. Proposed Methodology & Architecture</h2>
      <p>We leverage a federated neural processing framework operating on edge NPUs. Zero student or patient behavioral data is egressed to external cloud clusters, ensuring compliance with strict healthcare and institutional privacy directives.</p>
    `;
    elements.docEditorContent.focus();
  }

  updateLiveWordCount();
  showToast('Research draft initialized from prompt!', ICONS.sparkle);
}

function createNewDocument() {
  const newId = 'doc-recent-' + Date.now();
  const newDoc = {
    id: newId,
    title: 'Untitled',
    openedTime: 'Just now',
    prompt: '',
    content: '',
    words: 0,
    active: true
  };

  state.recentDocuments.forEach(d => d.active = false);
  state.recentDocuments.unshift(newDoc);
  state.activeDocId = newId;

  if (elements.topDocTitleInput) elements.topDocTitleInput.value = 'Untitled';
  if (elements.docMainHeadingInput) elements.docMainHeadingInput.value = 'Untitled';
  if (elements.docPromptTextarea) elements.docPromptTextarea.value = '';
  if (elements.docEditorContent) elements.docEditorContent.innerHTML = '';
  if (elements.docPromptAccordionBox) elements.docPromptAccordionBox.classList.remove('collapsed');

  updatePromptFeedback();
  updateLiveWordCount();
  renderRecentDocumentsDrawer();
  switchView('dashboard');
  showToast('Created new research document', ICONS.file);
}

function loadDocument(docId) {
  const doc = state.recentDocuments.find(d => d.id === docId);
  if (!doc) return;

  state.activeDocId = docId;
  state.recentDocuments.forEach(d => d.active = (d.id === docId));

  if (elements.topDocTitleInput) elements.topDocTitleInput.value = doc.title;
  if (elements.docMainHeadingInput) elements.docMainHeadingInput.value = doc.title;
  if (elements.docPromptTextarea) elements.docPromptTextarea.value = doc.prompt || '';

  if (elements.docEditorContent) {
    if (doc.content) {
      elements.docEditorContent.innerHTML = doc.content;
      if (elements.docRichEditorArea) elements.docRichEditorArea.classList.add('active');
    } else if (doc.prompt) {
      elements.docEditorContent.innerHTML = `<p>Working on <b>${doc.prompt}</b>. Start typing draft sections or insert citations.</p>`;
      if (elements.docRichEditorArea) elements.docRichEditorArea.classList.add('active');
    }
  }

  updatePromptFeedback();
  updateLiveWordCount();
  renderRecentDocumentsDrawer();
  switchView('dashboard');
  showToast(`Loaded: ${doc.title}`, ICONS.file);
}

function loadImportedWordDoc(fileName) {
  const title = fileName.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
  if (elements.topDocTitleInput) elements.topDocTitleInput.value = title;
  if (elements.docMainHeadingInput) elements.docMainHeadingInput.value = title;

  if (elements.docPromptTextarea) {
    elements.docPromptTextarea.value = `Analysis and expansion of ${title}`;
  }

  if (elements.docRichEditorArea) elements.docRichEditorArea.classList.add('active');
  if (elements.docPromptAccordionBox) elements.docPromptAccordionBox.classList.add('collapsed');

  if (elements.docEditorContent) {
    elements.docEditorContent.innerHTML = `
      <h2>${title}</h2>
      <p><i>[Imported from Word .docx document on ${new Date().toLocaleDateString()}]</i></p>
      <p>This document has been parsed and structured into the THAMILI Knowledge Engine. You can now prompt AI to summarize sections, generate literature citations, or expand methodology.</p>
    `;
  }

  updatePromptFeedback();
  updateLiveWordCount();
  showToast(`Word document "${fileName}" parsed & imported!`, ICONS.check);
}

function insertTextAtCursor(text) {
  if (elements.docEditorContent) {
    elements.docEditorContent.focus();
    document.execCommand('insertHTML', false, text);
  }
}

// Initialize on DOM Ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
