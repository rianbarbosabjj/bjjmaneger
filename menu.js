// ==========================================
// 🌙 SISTEMA DE MODO ESCURO NATIVO (TAILWIND)
// ==========================================

// 1. Carrega o tema imediatamente para evitar piscar tela branca
if (localStorage.getItem('bjj-theme') === 'dark') {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

// 2. Função de clique para alternar o tema
window.toggleDarkMode = function() {
    const htmlTag = document.documentElement;
    
    if (htmlTag.classList.contains('dark')) {
        // Desligar Modo Escuro
        htmlTag.classList.remove('dark');
        localStorage.setItem('bjj-theme', 'light');
    } else {
        // Ligar Modo Escuro
        htmlTag.classList.add('dark');
        localStorage.setItem('bjj-theme', 'dark');
    }
};

// ==========================================
// 🎨 ESTILO DA BARRA DE ROLAGEM GLOBALMENTE
// ==========================================
if (!document.getElementById('bjj-menu-styles')) {
    const style = document.createElement('style');
    style.id = 'bjj-menu-styles';
    style.innerHTML = `
        .custom-scroll::-webkit-scrollbar { width: 5px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background-color: #334155; border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background-color: #475569; }
        .custom-scroll { scrollbar-width: thin; scrollbar-color: #334155 transparent; }
    `;
    document.head.appendChild(style);
}

// ==========================================
// 📱 CONSTRUTOR DO MENU (BLINDADO)
// ==========================================
function carregarMenu() {
    try {
        const paginaAtual = window.location.pathname.split("/").pop() || "dashboard.html";

        // --- 1. RECUPERA O ESTADO GLOBAL DE FORMA SEGURA ---
        if (!window.funcionalidadesEquipe) {
            const cacheFeatures = sessionStorage.getItem('bjj_features');
            if (cacheFeatures && cacheFeatures !== "undefined" && cacheFeatures !== "null") {
                try {
                    window.funcionalidadesEquipe = JSON.parse(cacheFeatures);
                } catch(e) {
                    window.funcionalidadesEquipe = [];
                }
            }
        }

        const cacheNome = sessionStorage.getItem('bjj_equipe_nome') || 'SUA EQUIPE';
        const cacheLogoUrl = sessionStorage.getItem('bjj_equipe_logo');
        
        let cacheLogoHTML = cacheNome.charAt(0).toUpperCase();
        let cacheLogoBg = "";
        if (cacheLogoUrl && cacheLogoUrl !== "null" && cacheLogoUrl !== "") {
            cacheLogoHTML = `<img src="${cacheLogoUrl}" class="w-full h-full object-cover" alt="Logo">`;
            cacheLogoBg = "background: transparent;";
        }

        // --- 2. LÓGICA DE ESTILOS ---
        const classDesktop = (pagina, isBloqueado = false) => {
            if (isBloqueado) return "w-full text-left flex items-center justify-between px-4 py-3 text-[13px] font-semibold text-slate-600 border-l-4 border-transparent cursor-not-allowed opacity-60 bg-slate-900/30";
            return paginaAtual === pagina 
                ? "w-full text-left flex items-center justify-between px-4 py-3 text-[13px] font-black text-white bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-500 transition-all group cursor-pointer" 
                : "w-full text-left flex items-center justify-between px-4 py-3 text-[13px] font-semibold text-slate-400 border-l-4 border-transparent hover:border-slate-700 hover:text-white hover:bg-slate-800/50 transition-all group cursor-pointer";
        };

        const classMobile = (pagina, isBloqueado = false) => {
            if (isBloqueado) return "shrink-0 w-[4.5rem] flex flex-col items-center justify-center h-full text-slate-600 relative snap-center cursor-not-allowed opacity-50";
            return paginaAtual === pagina 
                ? "shrink-0 w-[4.5rem] flex flex-col items-center justify-center h-full text-cyan-400 relative snap-center cursor-pointer transition-all scale-110" 
                : "shrink-0 w-[4.5rem] flex flex-col items-center justify-center h-full text-slate-500 hover:text-slate-300 transition-colors snap-center cursor-pointer";
        };

        const indicadorMobile = (pagina) => {
            return paginaAtual === pagina ? `<div class="absolute top-0 w-8 h-1 bg-cyan-500 rounded-b-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>` : "";
        };

        const hasAccess = (palavraChave) => {
            if (!window.funcionalidadesEquipe) return true;
            return window.funcionalidadesEquipe.some(f => f.includes('✓') && f.toLowerCase().includes(palavraChave.toLowerCase()));
        };

        const blockIcon = `<span class="text-[10px]">🔒</span>`;
        const canFin = true; 
        const canLoja = hasAccess('Vitrine'); 
        const canCert = hasAccess('Certificados'); 
        const canTurmas = hasAccess('Turmas'); 
        const canExtra = hasAccess('Ilimitados') || hasAccess('Portal'); 

        const clickAcao = (url, hasAcc) => { return hasAcc ? `window.location.href='${url}'` : `mostrarAvisoUpgrade()`; };

        // Ícones SVG minimalistas para Suporte e Tema
        const svgSuporte = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 sm:w-5 sm:h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75v1.5c0 1.657 1.343 3 3 3h1.5a.75.75 0 00.75-.75v-4.5a.75.75 0 00-.75-.75h-1.5a6 6 0 1112 0h-1.5a.75.75 0 00-.75.75v4.5a.75.75 0 00.75.75h1.5c1.657 0 3-1.343 3-3v-1.5c0-5.385-4.365-9.75-9.75-9.75z" /><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 15v3.375c0 1.243-1.007 2.25-2.25 2.25h-2.25c-1.243 0-2.25-1.007-2.25-2.25v-1.5" /></svg>`;
        const svgTema = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 sm:w-5 sm:h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>`;

        // --- 3. HTML DO MENU DESKTOP ---
        const menuDesktop = `
            <aside class="hidden md:flex w-56 bg-slate-900 text-white flex-col h-full shadow-[5px_0_15px_rgba(0,0,0,0.3)] shrink-0 z-20 border-r border-slate-800">
                <div class="p-5 text-center border-b border-slate-800 flex flex-col items-center justify-center bg-slate-950/30">
                    <div id="container-logo" class="w-14 h-14 mb-3 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center shadow-lg text-slate-300 font-black text-xl overflow-hidden ring-1 ring-slate-700" style="${cacheLogoBg}">
                        ${cacheLogoHTML}
                    </div>
                    <h1 class="text-xs font-black tracking-wider text-white uppercase truncate w-full px-2" id="nome-equipe">${cacheNome}</h1>
                    <p class="text-[8px] text-cyan-500 font-black uppercase tracking-[0.2em] mt-1.5 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">BJJ Manager</p>
                </div>
                
                <nav class="flex-1 py-4 space-y-0.5 overflow-y-auto custom-scroll flex flex-col">
                    <button onclick="${clickAcao('dashboard.html', true)}" class="${classDesktop('dashboard.html', false)}">
                        <div class="flex items-center"><span class="mr-3 text-base group-hover:scale-110 transition-transform ${paginaAtual === 'dashboard.html' ? 'drop-shadow-md' : 'opacity-70'}">📊</span> Visão Geral</div>
                    </button>
                    <button onclick="${clickAcao('financeiro.html', canFin)}" class="${classDesktop('financeiro.html', !canFin)}">
                        <div class="flex items-center"><span class="mr-3 text-base group-hover:scale-110 transition-transform ${paginaAtual === 'financeiro.html' ? 'drop-shadow-md' : 'opacity-70'}">💰</span> Financeiro</div>
                        ${!canFin ? blockIcon : ''}
                    </button>
                    <button onclick="${clickAcao('alunos.html', true)}" class="${classDesktop('alunos.html', false)}">
                        <div class="flex items-center"><span class="mr-3 text-base group-hover:scale-110 transition-transform ${paginaAtual === 'alunos.html' ? 'drop-shadow-md' : 'opacity-70'}">🥋</span> Alunos</div>
                    </button>
                    <button onclick="${clickAcao('turmas.html', canTurmas)}" class="${classDesktop('turmas.html', !canTurmas)}">
                        <div class="flex items-center"><span class="mr-3 text-base group-hover:scale-110 transition-transform ${paginaAtual === 'turmas.html' ? 'drop-shadow-md' : 'opacity-70'}">🗓️</span> Turmas</div>
                        ${!canTurmas ? blockIcon : ''}
                    </button>
                    <button onclick="${clickAcao('loja.html', canLoja)}" class="${classDesktop('loja.html', !canLoja)}">
                        <div class="flex items-center"><span class="mr-3 text-base group-hover:scale-110 transition-transform ${paginaAtual === 'loja.html' ? 'drop-shadow-md' : 'opacity-70'}">🛒</span> Vitrine Virtual</div>
                        ${!canLoja ? blockIcon : ''}
                    </button>
                    
                    <div class="px-4 pt-4 pb-1"><p class="text-[8px] font-black text-slate-500/80 uppercase tracking-widest">Acadêmico</p></div>
                    
                    <button onclick="${clickAcao('certificados.html', canCert)}" class="${classDesktop('certificados.html', !canCert)}">
                        <div class="flex items-center"><span class="mr-3 text-base group-hover:scale-110 transition-transform ${paginaAtual === 'certificados.html' ? 'drop-shadow-md' : 'opacity-70'}">📜</span> Certificados</div>
                        ${!canCert ? blockIcon : ''}
                    </button>
                    <button onclick="${clickAcao('curriculo.html', canExtra)}" class="${classDesktop('curriculo.html', !canExtra)}">
                        <div class="flex items-center"><span class="mr-3 text-base group-hover:scale-110 transition-transform ${paginaAtual === 'curriculo.html' ? 'drop-shadow-md' : 'opacity-70'}">📄</span> Currículo</div>
                        ${!canExtra ? blockIcon : ''}
                    </button>
                    
                    <div class="px-4 pt-4 pb-1"><p class="text-[8px] font-black text-slate-500/80 uppercase tracking-widest">Gestão Extra</p></div>
                    
                    <button onclick="${clickAcao('competicoes.html', canExtra)}" class="${classDesktop('competicoes.html', !canExtra)}">
                        <div class="flex items-center"><span class="mr-3 text-base group-hover:scale-110 transition-transform ${paginaAtual === 'competicoes.html' ? 'drop-shadow-md' : 'opacity-70'}">🏆</span> Competições</div>
                        ${!canExtra ? blockIcon : ''}
                    </button>
                    <button onclick="${clickAcao('federacoes.html', canExtra)}" class="${classDesktop('federacoes.html', !canExtra)}">
                        <div class="flex items-center"><span class="mr-3 text-base group-hover:scale-110 transition-transform ${paginaAtual === 'federacoes.html' ? 'drop-shadow-md' : 'opacity-70'}">🪪</span> Federações</div>
                        ${!canExtra ? blockIcon : ''}
                    </button>
                    <button onclick="${clickAcao('historico.html', canExtra)}" class="${classDesktop('historico.html', !canExtra)}">
                        <div class="flex items-center"><span class="mr-3 text-base group-hover:scale-110 transition-transform ${paginaAtual === 'historico.html' ? 'drop-shadow-md' : 'opacity-70'}">🎓</span> Graduações</div>
                        ${!canExtra ? blockIcon : ''}
                    </button>
                </nav>
                
                <div class="p-4 border-t border-slate-800 bg-slate-900/80 backdrop-blur-sm z-30 flex flex-col gap-2">
                    <button onclick="${clickAcao('suporte.html', true)}" class="w-full flex items-center justify-center text-slate-500 hover:text-indigo-400 transition-colors text-[9px] font-bold uppercase tracking-widest py-1.5 group ${paginaAtual === 'suporte.html' ? 'text-indigo-400' : ''}">
                        <span class="mr-2 opacity-70 group-hover:opacity-100 transition-opacity flex items-center justify-center">${svgSuporte}</span> Suporte
                    </button>
                    <button onclick="toggleDarkMode()" class="w-full flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors text-[10px] font-bold uppercase tracking-widest py-1.5 group" title="Alternar Modo Escuro">
                        <span class="mr-2 opacity-70 group-hover:opacity-100 transition-opacity flex items-center justify-center">${svgTema}</span> Tema
                    </button>
                    <button onclick="sairDoSistema()" class="w-full px-4 py-2 mt-1 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center shadow-sm">
                        <span class="mr-2 text-sm leading-none opacity-70">🚪</span> Sair
                    </button>
                </div>
            </aside>
        `;

        // --- 4. HTML DO MENU MOBILE ---
        const menuMobile = `
            <nav class="md:hidden fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 flex overflow-x-auto hide-scrollbar flex-nowrap items-center h-[76px] z-40 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)] snap-x scroll-smooth">
                <button onclick="${clickAcao('dashboard.html', true)}" class="${classMobile('dashboard.html', false)}">
                    ${indicadorMobile('dashboard.html')}
                    <span class="text-2xl mb-1 ${paginaAtual === 'dashboard.html' ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'opacity-60'}">📊</span>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Visão</span>
                </button>
                <button onclick="${clickAcao('financeiro.html', canFin)}" class="${classMobile('financeiro.html', !canFin)} relative">
                    ${indicadorMobile('financeiro.html')}
                    ${!canFin ? `<div class="absolute top-1 right-2 text-[10px]">🔒</div>` : ''}
                    <span class="text-2xl mb-1 ${paginaAtual === 'financeiro.html' ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'opacity-60'}">💰</span>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Caixa</span>
                </button>
                <button onclick="${clickAcao('alunos.html', true)}" class="${classMobile('alunos.html', false)}">
                    ${indicadorMobile('alunos.html')}
                    <span class="text-2xl mb-1 ${paginaAtual === 'alunos.html' ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'opacity-60'}">🥋</span>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Alunos</span>
                </button>
                <button onclick="${clickAcao('turmas.html', canTurmas)}" class="${classMobile('turmas.html', !canTurmas)} relative">
                    ${indicadorMobile('turmas.html')}
                    ${!canTurmas ? `<div class="absolute top-1 right-2 text-[10px]">🔒</div>` : ''}
                    <span class="text-2xl mb-1 ${paginaAtual === 'turmas.html' ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'opacity-60'}">🗓️</span>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Turmas</span>
                </button>
                <button onclick="${clickAcao('loja.html', canLoja)}" class="${classMobile('loja.html', !canLoja)} relative">
                    ${indicadorMobile('loja.html')}
                    ${!canLoja ? `<div class="absolute top-1 right-2 text-[10px]">🔒</div>` : ''}
                    <span class="text-2xl mb-1 ${paginaAtual === 'loja.html' ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'opacity-60'}">🛒</span>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Loja</span>
                </button>
                <button onclick="${clickAcao('certificados.html', canCert)}" class="${classMobile('certificados.html', !canCert)} relative">
                    ${indicadorMobile('certificados.html')}
                    ${!canCert ? `<div class="absolute top-1 right-2 text-[10px]">🔒</div>` : ''}
                    <span class="text-2xl mb-1 ${paginaAtual === 'certificados.html' ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'opacity-60'}">📜</span>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Certif.</span>
                </button>
                <button onclick="${clickAcao('curriculo.html', canExtra)}" class="${classMobile('curriculo.html', !canExtra)} relative">
                    ${indicadorMobile('curriculo.html')}
                    ${!canExtra ? `<div class="absolute top-1 right-2 text-[10px]">🔒</div>` : ''}
                    <span class="text-2xl mb-1 ${paginaAtual === 'curriculo.html' ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'opacity-60'}">📄</span>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Currí.</span>
                </button>
                <button onclick="${clickAcao('competicoes.html', canExtra)}" class="${classMobile('competicoes.html', !canExtra)} relative">
                    ${indicadorMobile('competicoes.html')}
                    ${!canExtra ? `<div class="absolute top-1 right-2 text-[10px]">🔒</div>` : ''}
                    <span class="text-2xl mb-1 ${paginaAtual === 'competicoes.html' ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'opacity-60'}">🏆</span>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Comp.</span>
                </button>
                <button onclick="${clickAcao('federacoes.html', canExtra)}" class="${classMobile('federacoes.html', !canExtra)} relative">
                    ${indicadorMobile('federacoes.html')}
                    ${!canExtra ? `<div class="absolute top-1 right-2 text-[10px]">🔒</div>` : ''}
                    <span class="text-2xl mb-1 ${paginaAtual === 'federacoes.html' ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'opacity-60'}">🪪</span>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Fed.</span>
                </button>
                <button onclick="${clickAcao('historico.html', canExtra)}" class="${classMobile('historico.html', !canExtra)} relative">
                    ${indicadorMobile('historico.html')}
                    ${!canExtra ? `<div class="absolute top-1 right-2 text-[10px]">🔒</div>` : ''}
                    <span class="text-2xl mb-1 ${paginaAtual === 'historico.html' ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'opacity-60'}">🎓</span>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Grad.</span>
                </button>

                <button onclick="${clickAcao('suporte.html', true)}" class="shrink-0 w-[4rem] flex flex-col items-center justify-center h-full text-slate-500 hover:text-indigo-400 transition-colors snap-center group">
                    ${indicadorMobile('suporte.html')}
                    <span class="mb-1 flex items-center justify-center w-6 h-6 opacity-60 group-hover:opacity-100 ${paginaAtual === 'suporte.html' ? 'drop-shadow-[0_0_8px_rgba(99,102,241,0.8)] text-indigo-400 opacity-100' : ''}">${svgSuporte}</span>
                    <span class="text-[7.5px] font-bold uppercase tracking-wide">Suporte</span>
                </button>

                <button onclick="toggleDarkMode()" class="shrink-0 w-[4rem] flex flex-col items-center justify-center h-full text-slate-500 hover:text-slate-300 transition-colors snap-center cursor-pointer group">
                    <span class="mb-1 opacity-60 transition-all flex items-center justify-center w-6 h-6 group-hover:opacity-100">${svgTema}</span>
                    <span class="text-[7.5px] font-bold uppercase tracking-wide">Tema</span>
                </button>
                
                <button onclick="sairDoSistema()" class="shrink-0 w-[4.5rem] flex flex-col items-center justify-center h-full text-rose-500 hover:text-rose-400 transition-colors snap-center">
                    <span class="text-2xl mb-1 opacity-80">🚪</span>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Sair</span>
                </button>
            </nav>
        `;

        // --- 5. RENDERIZAÇÃO SEGURA ---
        const containerPrincipal = document.getElementById('interface-sistema');
        if (containerPrincipal) {
            const oldMenu = containerPrincipal.querySelector('aside');
            if (oldMenu) oldMenu.remove();
            containerPrincipal.insertAdjacentHTML('afterbegin', menuDesktop);
        }

        const oldMobile = document.querySelector('nav.md\\:hidden');
        if (oldMobile) oldMobile.remove();
        
        if (document.body) {
            document.body.insertAdjacentHTML('beforeend', menuMobile);
        }

    } catch (error) {
        console.error("Erro interno ao renderizar o menu:", error);
    }
}

// Alerta Padrão de Bloqueio
window.mostrarAvisoUpgrade = function() {
    if(typeof showToast === 'function') {
        showToast("O seu plano atual não possui este recurso. Aceda a Visão Geral para Upgrade.", "info");
    } else {
        alert("🔒 Recurso Bloqueado! Faça o Upgrade do seu plano para liberar esta funcionalidade.");
    }
};

window.atualizarMenuSeguro = function(funcionalidadesDoPlano) {
    window.funcionalidadesEquipe = funcionalidadesDoPlano;
    sessionStorage.setItem('bjj_features', JSON.stringify(funcionalidadesDoPlano));
    carregarMenu(); 
};

// Render Inicial Blindado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregarMenu);
} else {
    carregarMenu();
}
