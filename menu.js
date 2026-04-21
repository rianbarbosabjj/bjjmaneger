// ==========================================
// 🌙 SISTEMA DE TEMA DINÂMICO COM CSS VARIABLES
// ==========================================
const temaManager = {
    init() {
        const savedTheme = localStorage.getItem('bjj-theme') || 'light';
        this.setTheme(savedTheme);
        
        // Observa mudanças no sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('bjj-theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    },
    
    setTheme(theme) {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            root.style.setProperty('--bg-primary', '#020617');
            root.style.setProperty('--bg-card', '#0f172a');
            root.style.setProperty('--bg-hover', '#1e293b');
            root.style.setProperty('--text-primary', '#f8fafc');
            root.style.setProperty('--text-secondary', '#94a3b8');
            root.style.setProperty('--text-muted', '#64748b');
            root.style.setProperty('--border-color', '#1e293b');
            root.style.setProperty('--accent-primary', '#06b6d4');
            root.style.setProperty('--accent-secondary', '#3b82f6');
            root.style.setProperty('--success', '#10b981');
            root.style.setProperty('--warning', '#f59e0b');
            root.style.setProperty('--danger', '#ef4444');
            root.style.setProperty('--shadow-sm', '0 1px 2px 0 rgba(0, 0, 0, 0.3)');
            root.style.setProperty('--shadow-md', '0 4px 6px -1px rgba(0, 0, 0, 0.4)');
            root.style.setProperty('--shadow-lg', '0 10px 15px -3px rgba(0, 0, 0, 0.5)');
        } else {
            root.classList.remove('dark');
            root.style.setProperty('--bg-primary', '#f8fafc');
            root.style.setProperty('--bg-card', '#ffffff');
            root.style.setProperty('--bg-hover', '#f1f5f9');
            root.style.setProperty('--text-primary', '#0f172a');
            root.style.setProperty('--text-secondary', '#475569');
            root.style.setProperty('--text-muted', '#94a3b8');
            root.style.setProperty('--border-color', '#e2e8f0');
            root.style.setProperty('--accent-primary', '#0ea5e9');
            root.style.setProperty('--accent-secondary', '#6366f1');
            root.style.setProperty('--success', '#10b981');
            root.style.setProperty('--warning', '#f59e0b');
            root.style.setProperty('--danger', '#ef4444');
            root.style.setProperty('--shadow-sm', '0 1px 2px 0 rgba(0, 0, 0, 0.05)');
            root.style.setProperty('--shadow-md', '0 4px 6px -1px rgba(0, 0, 0, 0.1)');
            root.style.setProperty('--shadow-lg', '0 10px 15px -3px rgba(0, 0, 0, 0.1)');
        }
        localStorage.setItem('bjj-theme', theme);
        
        // Dispara evento para outros componentes
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    },
    
    toggle() {
        const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
};

// ==========================================
// 🎨 ESTILOS GLOBAIS MODERNOS
// ==========================================
const injectGlobalStyles = () => {
    if (!document.getElementById('bjj-global-styles')) {
        const style = document.createElement('style');
        style.id = 'bjj-global-styles';
        style.innerHTML = `
            /* Reset e Base */
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                background-color: var(--bg-primary);
                color: var(--text-primary);
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
                transition: background-color 0.3s ease, color 0.3s ease;
                overflow-x: hidden;
            }
            
            /* Animações Globais */
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(-100%);
                }
                to {
                    transform: translateX(0);
                }
            }
            
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
            }
            
            @keyframes shimmer {
                0% {
                    background-position: -1000px 0;
                }
                100% {
                    background-position: 1000px 0;
                }
            }
            
            /* Scrollbar Personalizada */
            ::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            
            ::-webkit-scrollbar-track {
                background: var(--bg-primary);
            }
            
            ::-webkit-scrollbar-thumb {
                background: var(--text-muted);
                border-radius: 4px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: var(--text-secondary);
            }
            
            /* Utilitários de Transição */
            .transition-all {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            /* Loading Skeleton */
            .skeleton {
                background: linear-gradient(90deg, var(--bg-card) 25%, var(--bg-hover) 50%, var(--bg-card) 75%);
                background-size: 1000px 100%;
                animation: shimmer 2s infinite;
            }
            
            /* Tooltip Moderno */
            [data-tooltip] {
                position: relative;
            }
            
            [data-tooltip]:before {
                content: attr(data-tooltip);
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%) translateY(-8px);
                padding: 4px 8px;
                background: var(--bg-card);
                color: var(--text-primary);
                font-size: 12px;
                white-space: nowrap;
                border-radius: 4px;
                box-shadow: var(--shadow-md);
                opacity: 0;
                pointer-events: none;
                transition: all 0.2s;
                z-index: 1000;
                border: 1px solid var(--border-color);
            }
            
            [data-tooltip]:hover:before {
                opacity: 1;
                transform: translateX(-50%) translateY(-12px);
            }
        `;
        document.head.appendChild(style);
    }
};

// ==========================================
// 📱 MENU RESPONSIVO MODERNO
// ==========================================
const menuResponsivo = {
    init() {
        this.createToggleButton();
        this.loadMenuState();
        this.setupResizeHandler();
        this.setupKeyboardShortcuts();
    },
    
    createToggleButton() {
        if (document.getElementById('menu-toggle')) return;
        
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'menu-toggle';
        toggleBtn.className = 'menu-toggle-btn';
        toggleBtn.setAttribute('data-tooltip', 'Menu de Navegação');
        toggleBtn.innerHTML = `
            <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .menu-toggle-btn {
                position: fixed;
                top: 1rem;
                left: 1rem;
                z-index: 1000;
                width: 44px;
                height: 44px;
                border-radius: 12px;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                color: var(--text-primary);
                cursor: pointer;
                display: none;
                align-items: center;
                justify-content: center;
                transition: all 0.3s;
                box-shadow: var(--shadow-md);
            }
            
            .menu-toggle-btn:hover {
                transform: scale(1.05);
                background: var(--accent-primary);
                color: white;
            }
            
            .menu-icon {
                width: 20px;
                height: 20px;
            }
            
            @media (max-width: 768px) {
                .menu-toggle-btn {
                    display: flex;
                }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(toggleBtn);
        
        toggleBtn.addEventListener('click', () => this.toggleMobileMenu());
    },
    
    toggleMobileMenu() {
        const sidebar = document.querySelector('.modern-sidebar');
        if (sidebar) {
            sidebar.classList.toggle('mobile-open');
            const overlay = document.querySelector('.menu-overlay');
            if (sidebar.classList.contains('mobile-open')) {
                if (!overlay) this.createOverlay();
                document.querySelector('.menu-overlay').classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                if (overlay) overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    },
    
    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        overlay.onclick = () => this.toggleMobileMenu();
        
        const style = document.createElement('style');
        style.textContent = `
            .menu-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(4px);
                z-index: 90;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s;
            }
            
            .menu-overlay.active {
                opacity: 1;
                pointer-events: auto;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(overlay);
    },
    
    loadMenuState() {
        const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
        if (window.innerWidth >= 768 && isCollapsed) {
            const sidebar = document.querySelector('.modern-sidebar');
            if (sidebar) {
                sidebar.classList.add('collapsed');
                this.collapseMenuItems();
            }
        }
    },
    
    collapseMenuItems() {
        document.querySelectorAll('.modern-sidebar .nav-text, .modern-sidebar .logo-info, .modern-sidebar .footer-text').forEach(el => {
            el.classList.add('hidden');
        });
        document.querySelectorAll('.modern-sidebar .nav-item').forEach(btn => {
            btn.classList.add('justify-center');
        });
    },
    
    setupResizeHandler() {
        let timeout;
        window.addEventListener('resize', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (window.innerWidth >= 768) {
                    const sidebar = document.querySelector('.modern-sidebar');
                    if (sidebar) sidebar.classList.remove('mobile-open');
                    const overlay = document.querySelector('.menu-overlay');
                    if (overlay) overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }, 250);
        });
    },
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + M para toggle do menu
            if (e.altKey && e.key === 'm') {
                if (window.innerWidth <= 768) {
                    this.toggleMobileMenu();
                } else {
                    const sidebar = document.querySelector('.modern-sidebar');
                    sidebar.classList.toggle('collapsed');
                    localStorage.setItem('sidebar-collapsed', sidebar.classList.contains('collapsed'));
                    if (sidebar.classList.contains('collapsed')) {
                        this.collapseMenuItems();
                    } else {
                        document.querySelectorAll('.modern-sidebar .nav-text, .modern-sidebar .logo-info, .modern-sidebar .footer-text').forEach(el => {
                            el.classList.remove('hidden');
                        });
                        document.querySelectorAll('.modern-sidebar .nav-item').forEach(btn => {
                            btn.classList.remove('justify-center');
                        });
                    }
                }
            }
            
            // Alt + T para toggle do tema
            if (e.altKey && e.key === 't') {
                temaManager.toggle();
            }
        });
    }
};

// ==========================================
// 🔔 SISTEMA DE NOTIFICAÇÕES
// ==========================================
class SistemaNotificacoes {
    constructor() {
        this.notificacoes = new Map();
        this.init();
    }
    
    init() {
        this.carregarNotificacoes();
        setInterval(() => this.verificarAtualizacoes(), 30000);
    }
    
    adicionarBadge(itemId, count, type = 'default') {
        const item = document.querySelector(`[data-item="${itemId}"]`);
        if (item) {
            const existingBadge = item.querySelector('.badge');
            if (existingBadge) existingBadge.remove();
            
            const badge = document.createElement('span');
            badge.className = `badge badge-${type}`;
            badge.textContent = count > 99 ? '99+' : count;
            item.appendChild(badge);
            
            // Animação de pulso
            badge.style.animation = 'pulse 0.5s ease-in-out';
            
            const style = document.createElement('style');
            style.textContent = `
                .badge {
                    position: absolute;
                    top: -4px;
                    right: -4px;
                    min-width: 18px;
                    height: 18px;
                    padding: 0 4px;
                    border-radius: 9px;
                    font-size: 10px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--danger);
                    color: white;
                }
                
                .badge-success {
                    background: var(--success);
                }
                
                .badge-warning {
                    background: var(--warning);
                }
                
                .badge-info {
                    background: var(--accent-primary);
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    async verificarAtualizacoes() {
        // Simula verificação de atualizações
        // Em produção, substituir por chamada real à API
        const updates = await this.fetchUpdates();
        updates.forEach(update => {
            this.adicionarBadge(update.itemId, update.count, update.type);
        });
    }
    
    async fetchUpdates() {
        // Simulação - substituir por chamada real
        return [
            // { itemId: 'alunos', count: 3, type: 'info' }
        ];
    }
    
    carregarNotificacoes() {
        // Carrega notificações salvas
        const saved = localStorage.getItem('bjj-notifications');
        if (saved) {
            const data = JSON.parse(saved);
            Object.entries(data).forEach(([key, value]) => {
                this.adicionarBadge(key, value.count, value.type);
            });
        }
    }
}

// ==========================================
// 🎨 CONSTRUTOR DO MENU MODERNO
// ==========================================
function criarMenuModerno(paginaAtual, permissoes) {
    const items = [
        { id: 'dashboard', nome: 'Visão Geral', icone: '📊', url: 'dashboard.html', sempreAtivo: true, categoria: 'principal' },
        { id: 'financeiro', nome: 'Financeiro', icone: '💰', url: 'financeiro.html', permissao: 'Financeiro', categoria: 'principal' },
        { id: 'alunos', nome: 'Alunos', icone: '🥋', url: 'alunos.html', sempreAtivo: true, categoria: 'principal' },
        { id: 'turmas', nome: 'Turmas', icone: '🗓️', url: 'turmas.html', permissao: 'Turmas', categoria: 'principal' },
        { id: 'loja', nome: 'Vitrine Virtual', icone: '🛒', url: 'loja.html', permissao: 'Vitrine', categoria: 'principal' },
        { id: 'certificados', nome: 'Certificados', icone: '📜', url: 'certificados.html', permissao: 'Certificados', categoria: 'academico' },
        { id: 'curriculo', nome: 'Currículo', icone: '📄', url: 'curriculo.html', permissao: 'extra', categoria: 'academico' },
        { id: 'competicoes', nome: 'Competições', icone: '🏆', url: 'competicoes.html', permissao: 'extra', categoria: 'gestao' },
        { id: 'federacoes', nome: 'Federações', icone: '🪪', url: 'federacoes.html', permissao: 'extra', categoria: 'gestao' },
        { id: 'historico', nome: 'Graduações', icone: '🎓', url: 'historico.html', permissao: 'extra', categoria: 'gestao' }
    ];
    
    const categorias = {
        principal: { nome: 'Menu Principal', icone: '🏠' },
        academico: { nome: 'Acadêmico', icone: '📚' },
        gestao: { nome: 'Gestão Avançada', icone: '⚙️' }
    };
    
    const cacheNome = sessionStorage.getItem('bjj_equipe_nome') || 'SUA EQUIPE';
    const cacheLogoUrl = sessionStorage.getItem('bjj_equipe_logo');
    
    let cacheLogoHTML = cacheNome.charAt(0).toUpperCase();
    let cacheLogoBg = "";
    if (cacheLogoUrl && cacheLogoUrl !== "null" && cacheLogoUrl !== "") {
        cacheLogoHTML = `<img src="${cacheLogoUrl}" class="logo-image" alt="Logo">`;
        cacheLogoBg = "background: transparent;";
    }
    
    let menuHTML = `
        <aside class="modern-sidebar">
            <div class="sidebar-header">
                <div class="logo-container">
                    <div class="logo-wrapper" style="${cacheLogoBg}">
                        ${cacheLogoHTML}
                    </div>
                    <div class="logo-info">
                        <h1 class="logo-title" id="nome-equipe">${cacheNome}</h1>
                        <span class="logo-badge">BJJ Manager Pro</span>
                    </div>
                </div>
                <button class="sidebar-collapse-btn" data-tooltip="Recolher Menu">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>
            </div>
            
            <nav class="sidebar-nav">
    `;
    
    // Agrupa itens por categoria
    Object.entries(categorias).forEach(([catKey, catInfo]) => {
        const categoriaItems = items.filter(item => item.categoria === catKey);
        const itemsVisiveis = categoriaItems.filter(item => 
            item.sempreAtivo || (item.permissao && permissoes[item.permissao])
        );
        
        if (itemsVisiveis.length > 0) {
            menuHTML += `
                <div class="nav-group">
                    <div class="nav-group-title">
                        <span class="group-icon">${catInfo.icone}</span>
                        <span class="group-text">${catInfo.nome}</span>
                    </div>
                    <div class="nav-group-items">
            `;
            
            itemsVisiveis.forEach(item => {
                const isActive = paginaAtual === item.url;
                const hasAccess = item.sempreAtivo || (item.permissao && permissoes[item.permissao]);
                
                menuHTML += `
                    <button onclick="${hasAccess ? `window.location.href='${item.url}'` : 'mostrarAvisoUpgrade()'}" 
                            class="nav-item ${isActive ? 'active' : ''} ${!hasAccess ? 'blocked' : ''}"
                            data-item="${item.id}"
                            data-tooltip="${item.nome}">
                        <span class="nav-icon">${item.icone}</span>
                        <span class="nav-text">${item.nome}</span>
                        ${!hasAccess ? '<span class="nav-badge">🔒</span>' : ''}
                        ${isActive ? '<div class="nav-indicator"></div>' : ''}
                    </button>
                `;
            });
            
            menuHTML += `</div></div>`;
        }
    });
    
    menuHTML += `
            </nav>
            
            <div class="sidebar-footer">
                <button onclick="temaManager.toggle()" class="footer-btn theme-toggle" data-tooltip="Alternar Tema">
                    <span class="footer-icon">🌗</span>
                    <span class="footer-text">Alternar Tema</span>
                    <span class="shortcut-hint">Alt+T</span>
                </button>
                
                <button onclick="window.location.href='suporte.html'" class="footer-btn support-btn" data-tooltip="Central de Ajuda">
                    <span class="footer-icon">🎧</span>
                    <span class="footer-text">Suporte 24/7</span>
                </button>
                
                <button onclick="sairDoSistema()" class="footer-btn logout-btn" data-tooltip="Sair do Sistema">
                    <span class="footer-icon">🚪</span>
                    <span class="footer-text">Sair</span>
                </button>
            </div>
        </aside>
        
        <style>
            .modern-sidebar {
                position: fixed;
                left: 0;
                top: 0;
                bottom: 0;
                width: 280px;
                background: var(--bg-card);
                border-right: 1px solid var(--border-color);
                display: flex;
                flex-direction: column;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 100;
                box-shadow: var(--shadow-lg);
            }
            
            .modern-sidebar.collapsed {
                width: 80px;
            }
            
            .modern-sidebar.collapsed .logo-info,
            .modern-sidebar.collapsed .nav-text,
            .modern-sidebar.collapsed .footer-text,
            .modern-sidebar.collapsed .group-text,
            .modern-sidebar.collapsed .shortcut-hint {
                display: none;
            }
            
            .modern-sidebar.collapsed .nav-group-title {
                justify-content: center;
                padding: 0.75rem;
            }
            
            .modern-sidebar.collapsed .nav-item {
                justify-content: center;
                padding: 0.75rem;
            }
            
            .modern-sidebar.collapsed .nav-icon {
                margin-right: 0;
                font-size: 1.5rem;
            }
            
            .modern-sidebar.collapsed .footer-btn {
                justify-content: center;
                padding: 0.625rem;
            }
            
            @media (max-width: 768px) {
                .modern-sidebar {
                    transform: translateX(-100%);
                    width: 85%;
                    max-width: 320px;
                }
                
                .modern-sidebar.mobile-open {
                    transform: translateX(0);
                    animation: slideIn 0.3s ease-out;
                }
            }
            
            .sidebar-header {
                padding: 1.5rem;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .logo-container {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                flex: 1;
            }
            
            .logo-wrapper {
                width: 48px;
                height: 48px;
                border-radius: 12px;
                background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 1.25rem;
                color: white;
                overflow: hidden;
                flex-shrink: 0;
            }
            
            .logo-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .logo-info {
                flex: 1;
                min-width: 0;
            }
            
            .logo-title {
                font-size: 0.875rem;
                font-weight: bold;
                margin: 0;
                color: var(--text-primary);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .logo-badge {
                font-size: 0.625rem;
                opacity: 0.7;
                color: var(--text-secondary);
            }
            
            .sidebar-collapse-btn {
                width: 28px;
                height: 28px;
                border-radius: 6px;
                background: var(--bg-hover);
                border: 1px solid var(--border-color);
                color: var(--text-secondary);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }
            
            .sidebar-collapse-btn:hover {
                background: var(--accent-primary);
                color: white;
                transform: scale(1.05);
            }
            
            .sidebar-nav {
                flex: 1;
                overflow-y: auto;
                padding: 1rem 0;
            }
            
            .nav-group {
                margin-bottom: 1.5rem;
            }
            
            .nav-group-title {
                font-size: 0.7rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                padding: 0.5rem 1.5rem;
                color: var(--text-muted);
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .group-icon {
                font-size: 0.875rem;
            }
            
            .nav-item {
                position: relative;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 0.75rem 1.5rem;
                margin: 0.25rem 0;
                width: 100%;
                background: transparent;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                transition: all 0.2s;
                text-align: left;
                font-size: 0.875rem;
            }
            
            .nav-item:hover {
                background: var(--bg-hover);
                color: var(--text-primary);
                padding-left: 1.75rem;
            }
            
            .nav-item.active {
                background: linear-gradient(90deg, var(--accent-primary) 0%, transparent 100%);
                color: white;
            }
            
            .nav-icon {
                font-size: 1.25rem;
                min-width: 1.5rem;
                transition: transform 0.2s;
            }
            
            .nav-item:hover .nav-icon {
                transform: scale(1.1);
            }
            
            .nav-indicator {
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 3px;
                height: 60%;
                background: var(--accent-primary);
                border-radius: 0 3px 3px 0;
            }
            
            .nav-badge {
                margin-left: auto;
                font-size: 0.75rem;
                opacity: 0.6;
            }
            
            .sidebar-footer {
                margin-top: auto;
                padding: 1rem;
                border-top: 1px solid var(--border-color);
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .footer-btn {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 0.625rem 1rem;
                border-radius: 8px;
                background: transparent;
                border: none;
                font-size: 0.75rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                color: var(--text-secondary);
                position: relative;
            }
            
            .footer-btn:hover {
                background: var(--bg-hover);
                color: var(--text-primary);
                transform: translateX(4px);
            }
            
            .footer-icon {
                font-size: 1.125rem;
            }
            
            .shortcut-hint {
                margin-left: auto;
                font-size: 0.625rem;
                opacity: 0.5;
                font-family: monospace;
            }
            
            .logout-btn:hover {
                background: var(--danger);
                color: white;
            }
            
            .hidden {
                display: none;
            }
            
            .justify-center {
                justify-content: center;
            }
        </style>
    `;
    
    return menuHTML;
}

// ==========================================
// 🚀 FUNÇÃO PRINCIPAL DE CARREGAMENTO
// ==========================================
function carregarMenuModerno() {
    const paginaAtual = window.location.pathname.split("/").pop() || "dashboard.html";
    
    // Recupera permissões
    if (!window.funcionalidadesEquipe) {
        const cacheFeatures = sessionStorage.getItem('bjj_features');
        if (cacheFeatures) {
            window.funcionalidadesEquipe = JSON.parse(cacheFeatures);
        }
    }
    
    // Mapeia permissões
    const hasAccess = (palavraChave) => {
        if (!window.funcionalidadesEquipe) return true;
        return window.funcionalidadesEquipe.some(f => 
            f.includes('✓') && f.toLowerCase().includes(palavraChave.toLowerCase())
        );
    };
    
    const permissoes = {
        Financeiro: true, // 🔓 Desbloqueado
        Vitrine: hasAccess('Vitrine'),
        Certificados: hasAccess('Certificados'),
        Turmas: hasAccess('Turmas'),
        extra: hasAccess('Ilimitados') || hasAccess('Portal')
    };
    
    // Gera menu
    const menuHTML = criarMenuModerno(paginaAtual, permissoes);
    
    // Insere no DOM
    const containerPrincipal = document.getElementById('interface-sistema');
    if (containerPrincipal) {
        const oldMenu = containerPrincipal.querySelector('.modern-sidebar');
        if (oldMenu) oldMenu.remove();
        containerPrincipal.insertAdjacentHTML('afterbegin', menuHTML);
    }
    
    // Adiciona padding ao conteúdo principal
    const mainContent = document.querySelector('main') || document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.marginLeft = '280px';
        mainContent.style.transition = 'margin-left 0.3s';
        
        // Observa mudanças no estado do sidebar
        const observer = new MutationObserver(() => {
            const sidebar = document.querySelector('.modern-sidebar');
            if (sidebar?.classList.contains('collapsed')) {
                mainContent.style.marginLeft = '80px';
            } else {
                mainContent.style.marginLeft = window.innerWidth <= 768 ? '0' : '280px';
            }
        });
        
        const sidebar = document.querySelector('.modern-sidebar');
        if (sidebar) observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
        
        // Responsivo
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                mainContent.style.marginLeft = '0';
            } else {
                const sidebar = document.querySelector('.modern-sidebar');
                if (sidebar?.classList.contains('collapsed')) {
                    mainContent.style.marginLeft = '80px';
                } else {
                    mainContent.style.marginLeft = '280px';
                }
            }
        });
    }
    
    // Configura botão de collapse
    const collapseBtn = document.querySelector('.sidebar-collapse-btn');
    if (collapseBtn) {
        collapseBtn.onclick = () => {
            const sidebar = document.querySelector('.modern-sidebar');
            sidebar.classList.toggle('collapsed');
            localStorage.setItem('sidebar-collapsed', sidebar.classList.contains('collapsed'));
            
            if (sidebar.classList.contains('collapsed')) {
                document.querySelectorAll('.modern-sidebar .nav-text, .modern-sidebar .logo-info, .modern-sidebar .footer-text, .modern-sidebar .group-text, .modern-sidebar .shortcut-hint').forEach(el => {
                    el.classList.add('hidden');
                });
                document.querySelectorAll('.modern-sidebar .nav-item, .modern-sidebar .footer-btn').forEach(btn => {
                    btn.classList.add('justify-center');
                });
            } else {
                document.querySelectorAll('.modern-sidebar .nav-text, .modern-sidebar .logo-info, .modern-sidebar .footer-text, .modern-sidebar .group-text, .modern-sidebar .shortcut-hint').forEach(el => {
                    el.classList.remove('hidden');
                });
                document.querySelectorAll('.modern-sidebar .nav-item, .modern-sidebar .footer-btn').forEach(btn => {
                    btn.classList.remove('justify-center');
                });
            }
        };
    }
}

// ==========================================
// 🔧 INICIALIZAÇÃO GLOBAL
// ==========================================
// Injeta estilos globais
injectGlobalStyles();

// Inicializa tema
temaManager.init();

// Inicializa menu responsivo
menuResponsivo.init();

// Inicializa notificações
const sistemaNotificacoes = new SistemaNotificacoes();

// Função de fallback para upgrade
window.mostrarAvisoUpgrade = function() {
    if (typeof showToast === 'function') {
        showToast("🔒 Recurso Bloqueado! Faça o Upgrade do seu plano para liberar esta funcionalidade.", "info");
    } else {
        alert("🔒 Recurso Bloqueado! Faça o Upgrade do seu plano para liberar esta funcionalidade.");
    }
};

// Função para atualizar menu baseado nas permissões
window.atualizarMenuSeguro = function(funcionalidadesDoPlano) {
    window.funcionalidadesEquipe = funcionalidadesDoPlano;
    sessionStorage.setItem('bjj_features', JSON.stringify(funcionalidadesDoPlano));
    carregarMenuModerno();
};

// Inicializa menu
carregarMenuModerno();

// Exporta tema manager globalmente
window.temaManager = temaManager;
