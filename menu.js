// ==========================================
// 🌙 MOTOR GLOBAL DE MODO ESCURO E SCROLLBAR
// ==========================================
const injetarEstilosGlobais = () => {
    if (!document.getElementById('bjj-global-styles')) {
        const style = document.createElement('style');
        style.id = 'bjj-global-styles';
        style.innerHTML = `
            /* MODO ESCURO GERAL (Pula elementos com a classe .ignorar-dark) */
            html.dark body, html.dark main, html.dark #interface-sistema { background-color: #020617 !important; }
            
            html.dark .bg-[#F4F7F8]:not(.ignorar-dark):not(.ignorar-dark *), 
            html.dark .bg-[#F8FAFC]:not(.ignorar-dark):not(.ignorar-dark *) { background-color: #020617 !important; }
            
            html.dark .bg-white:not(.ignorar-dark):not(.ignorar-dark *), 
            html.dark .card-premium:not(.ignorar-dark):not(.ignorar-dark *) { background-color: #0f172a !important; border-color: #1e293b !important; }
            
            /* Engloba tons de cinza usados em fundos (Slate, Gray, Zinc, etc) */
            html.dark .bg-slate-50:not(.ignorar-dark):not(.ignorar-dark *), 
            html.dark .bg-slate-100:not(.ignorar-dark):not(.ignorar-dark *),
            html.dark .bg-slate-200:not(.ignorar-dark):not(.ignorar-dark *),
            html.dark .bg-slate-300:not(.ignorar-dark):not(.ignorar-dark *),
            html.dark .bg-gray-50:not(.ignorar-dark):not(.ignorar-dark *), 
            html.dark .bg-gray-100:not(.ignorar-dark):not(.ignorar-dark *),
            html.dark .bg-gray-200:not(.ignorar-dark):not(.ignorar-dark *) { 
                background-color: #1e293b !important; 
                border-color: #334155 !important; 
            }
            
            /* Textos padrão (Agora cobre também Gray) */
            html.dark .text-slate-900:not(.ignorar-dark):not(.ignorar-dark *), 
            html.dark .text-slate-800:not(.ignorar-dark):not(.ignorar-dark *), 
            html.dark .text-slate-700:not(.ignorar-dark):not(.ignorar-dark *),
            html.dark .text-gray-900:not(.ignorar-dark):not(.ignorar-dark *), 
            html.dark .text-gray-800:not(.ignorar-dark):not(.ignorar-dark *), 
            html.dark .text-gray-700:not(.ignorar-dark):not(.ignorar-dark *) { color: #f8fafc !important; }
            
            html.dark .text-slate-600:not(.ignorar-dark):not(.ignorar-dark *), 
            html.dark .text-slate-500:not(.ignorar-dark):not(.ignorar-dark *),
            html.dark .text-gray-600:not(.ignorar-dark):not(.ignorar-dark *), 
            html.dark .text-gray-500:not(.ignorar-dark):not(.ignorar-dark *) { color: #94a3b8 !important; }
            
            html.dark .border-slate-200:not(.ignorar-dark):not(.ignorar-dark *), 
            html.dark .border-slate-100:not(.ignorar-dark):not(.ignorar-dark *),
            html.dark .border-gray-200:not(.ignorar-dark):not(.ignorar-dark *), 
            html.dark .border-gray-100:not(.ignorar-dark):not(.ignorar-dark *) { border-color: #1e293b !important; }

            /* 🔥 CORREÇÃO: Força as Labels a ficarem claras no modo escuro */
            html.dark label:not(.ignorar-dark):not(.ignorar-dark *) { color: #cbd5e1 !important; }
            
            /* 🔥 CORREÇÃO: Inputs ficam num tom mais escuro para não se misturarem com os cartões */
            html.dark input:not(.ignorar-dark):not(.ignorar-dark *), 
            html.dark select:not(.ignorar-dark):not(.ignorar-dark *), 
            html.dark textarea:not(.ignorar-dark):not(.ignorar-dark *) { 
                background-color: #0f172a !important; 
                color: #f8fafc !important; 
                border-color: #334155 !important; 
            }
            
            html.dark input::placeholder, html.dark textarea::placeholder { color: #475569 !important; }

            /* FUNDOS COLORIDOS */
            html.dark .bg-emerald-50:not(.ignorar-dark), html.dark .bg-green-50:not(.ignorar-dark) { background-color: rgba(6, 78, 59, 0.2) !important; border-color: rgba(6, 78, 59, 0.4) !important; }
            html.dark .bg-cyan-50:not(.ignorar-dark), html.dark .bg-blue-50:not(.ignorar-dark), html.dark .bg-indigo-50:not(.ignorar-dark) { background-color: rgba(30, 58, 138, 0.2) !important; border-color: rgba(30, 58, 138, 0.4) !important; }
            html.dark .bg-amber-50:not(.ignorar-dark), html.dark .bg-yellow-50:not(.ignorar-dark) { background-color: rgba(120, 53, 15, 0.2) !important; border-color: rgba(120, 53, 15, 0.4) !important; }
            html.dark .bg-rose-50:not(.ignorar-dark), html.dark .bg-red-50:not(.ignorar-dark) { background-color: rgba(136, 19, 55, 0.2) !important; border-color: rgba(136, 19, 55, 0.4) !important; }

            html.dark .text-emerald-800:not(.ignorar-dark), html.dark .text-emerald-900:not(.ignorar-dark) { color: #6ee7b7 !important; }
            html.dark .text-cyan-800:not(.ignorar-dark), html.dark .text-indigo-800:not(.ignorar-dark), html.dark .text-blue-800:not(.ignorar-dark) { color: #7dd3fc !important; }
            html.dark .text-amber-800:not(.ignorar-dark), html.dark .text-amber-900:not(.ignorar-dark) { color: #fcd34d !important; }
            html.dark .text-rose-800:not(.ignorar-dark), html.dark .text-rose-900:not(.ignorar-dark) { color: #fda4af !important; }

            /* CAÇA-FANTASMAS HOVER NAS TABELAS */
            html.dark tr:hover td { background-color: #1e293b !important; }
            html.dark .hover\\:bg-slate-50:hover:not(.ignorar-dark),
            html.dark .hover\\:bg-slate-100:hover:not(.ignorar-dark),
            html.dark .hover\\:bg-slate-200:hover:not(.ignorar-dark),
            html.dark .hover\\:bg-gray-50:hover:not(.ignorar-dark),
            html.dark .hover\\:bg-gray-100:hover:not(.ignorar-dark),
            html.dark .hover\\:bg-white:hover:not(.ignorar-dark) {
                background-color: #1e293b !important;
                color: #f8fafc !important;
            }

            /* SCROLLBAR CUSTOMIZADA */
            .custom-scroll::-webkit-scrollbar { width: 5px; }
            .custom-scroll::-webkit-scrollbar-track { background: transparent; }
            .custom-scroll::-webkit-scrollbar-thumb { background-color: #334155; border-radius: 10px; }
            .custom-scroll::-webkit-scrollbar-thumb:hover { background-color: #475569; }
            .custom-scroll { scrollbar-width: thin; scrollbar-color: #334155 transparent; }
        `;
        document.head.appendChild(style);
    }

    if (localStorage.getItem('bjj-theme') === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

// 🖨️ TRUQUE DA IMPRESSORA (Desliga o Dark Mode na hora de imprimir)
window.addEventListener('beforeprint', () => {
    document.documentElement.classList.remove('dark');
});
window.addEventListener('afterprint', () => {
    if (localStorage.getItem('bjj-theme') === 'dark') {
        document.documentElement.classList.add('dark');
    }
});

injetarEstilosGlobais();
window.toggleDarkMode = function() {
    const htmlTag = document.documentElement;
    if (htmlTag.classList.contains('dark')) {
        htmlTag.classList.remove('dark');
        localStorage.setItem('bjj-theme', 'light');
    } else {
        htmlTag.classList.add('dark');
        localStorage.setItem('bjj-theme', 'dark');
    }
};

// ==========================================
// 🖨️ TRUQUE DA IMPRESSORA (Desliga o Dark Mode na hora de imprimir)
// ==========================================
window.addEventListener('beforeprint', () => {
    document.documentElement.classList.remove('dark');
});
window.addEventListener('afterprint', () => {
    if (localStorage.getItem('bjj-theme') === 'dark') {
        document.documentElement.classList.add('dark');
    }
});

// Lógica de Abrir/Fechar a Gaveta Mobile
window.toggleBjjMenu = function() {
    const sidebar = document.getElementById('bjj-sidebar');
    const overlay = document.getElementById('bjj-menu-overlay');

    if (sidebar.classList.contains('-translate-x-full')) {
        // Abrir
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.remove('opacity-0'), 10);
    } else {
        // Fechar
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('opacity-0');
        setTimeout(() => overlay.classList.add('hidden'), 300);
    }
};

// ==========================================
// 📱 CONSTRUTOR DO MENU (GAVETA + HAMBÚRGUER)
// ==========================================
function carregarMenu() {
    try {
        const paginaAtual = window.location.pathname.split("/").pop() || "dashboard.html";

        // --- RECUPERA O ESTADO GLOBAL DE FORMA SEGURA ---
        if (!window.funcionalidadesEquipe) {
            const cacheFeatures = sessionStorage.getItem('bjj_features');
            if (cacheFeatures && cacheFeatures !== "undefined" && cacheFeatures !== "null") {
                try {
                    window.funcionalidadesEquipe = JSON.parse(cacheFeatures);
                } catch(e) { window.funcionalidadesEquipe = []; }
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

        // --- LÓGICA DE ESTILOS DOS BOTÕES ---
        const classItem = (pagina, isBloqueado = false) => {
            if (isBloqueado) return "w-full text-left flex items-center justify-between px-6 py-3.5 text-[13px] font-semibold text-slate-600 border-l-4 border-transparent cursor-not-allowed opacity-60 bg-slate-900/30";
            return paginaAtual === pagina 
                ? "w-full text-left flex items-center justify-between px-6 py-3.5 text-[13px] font-black text-white bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-500 transition-all group cursor-pointer" 
                : "w-full text-left flex items-center justify-between px-6 py-3.5 text-[13px] font-semibold text-slate-400 border-l-4 border-transparent hover:border-slate-700 hover:text-white hover:bg-slate-800/50 transition-all group cursor-pointer";
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

        const svgSuporte = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75v1.5c0 1.657 1.343 3 3 3h1.5a.75.75 0 00.75-.75v-4.5a.75.75 0 00-.75-.75h-1.5a6 6 0 1112 0h-1.5a.75.75 0 00-.75.75v4.5a.75.75 0 00.75.75h1.5c1.657 0 3-1.343 3-3v-1.5c0-5.385-4.365-9.75-9.75-9.75z" /><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 15v3.375c0 1.243-1.007 2.25-2.25 2.25h-2.25c-1.243 0-2.25-1.007-2.25-2.25v-1.5" /></svg>`;
        const svgTema = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>`;

        // --- HTML DO MENU LATERAL (GAVETA NO MOBILE, FIXO NO DESKTOP) ---
        const menuSidebar = `
            <div id="bjj-menu-overlay" onclick="toggleBjjMenu()" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] hidden md:hidden transition-opacity opacity-0"></div>
            
            <aside id="bjj-sidebar" class="fixed md:static inset-y-0 left-0 w-[280px] md:w-64 bg-slate-900 text-white flex-col h-full shadow-[5px_0_25px_rgba(0,0,0,0.5)] z-[60] border-r border-slate-800 transform -translate-x-full md:translate-x-0 transition-transform duration-300 flex shrink-0">
                
                <button onclick="toggleBjjMenu()" class="md:hidden absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/50 p-2 rounded-xl transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div class="p-6 text-center border-b border-slate-800 flex flex-col items-center justify-center bg-slate-950/30 shrink-0">
                    <div id="container-logo" class="w-16 h-16 mb-3 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center shadow-lg text-slate-300 font-black text-2xl overflow-hidden ring-1 ring-slate-700" style="${cacheLogoBg}">
                        ${cacheLogoHTML}
                    </div>
                    <h1 class="text-xs font-black tracking-wider text-white uppercase truncate w-full px-2" id="nome-equipe">${cacheNome}</h1>
                    <p class="text-[9px] text-cyan-500 font-black uppercase tracking-[0.2em] mt-2 bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/20">BJJ Manager</p>
                </div>
                
                <nav class="flex-1 py-4 space-y-1 overflow-y-auto custom-scroll flex flex-col">
                    <button onclick="${clickAcao('dashboard.html', true)}" class="${classItem('dashboard.html', false)}">
                        <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'dashboard.html' ? 'drop-shadow-md' : 'opacity-70'}">📊</span> Visão Geral</div>
                    </button>
                    <button onclick="${clickAcao('financeiro.html', canFin)}" class="${classItem('financeiro.html', !canFin)}">
                        <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'financeiro.html' ? 'drop-shadow-md' : 'opacity-70'}">💰</span> Financeiro</div>
                        ${!canFin ? blockIcon : ''}
                    </button>
                    <button onclick="${clickAcao('alunos.html', true)}" class="${classItem('alunos.html', false)}">
                        <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'alunos.html' ? 'drop-shadow-md' : 'opacity-70'}">🥋</span> Alunos</div>
                    </button>
                    <button onclick="${clickAcao('turmas.html', canTurmas)}" class="${classItem('turmas.html', !canTurmas)}">
                        <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'turmas.html' ? 'drop-shadow-md' : 'opacity-70'}">🗓️</span> Turmas</div>
                        ${!canTurmas ? blockIcon : ''}
                    </button>
                    <button onclick="${clickAcao('loja.html', canLoja)}" class="${classItem('loja.html', !canLoja)}">
                        <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'loja.html' ? 'drop-shadow-md' : 'opacity-70'}">🛒</span> Vitrine Virtual</div>
                        ${!canLoja ? blockIcon : ''}
                    </button>
                    
                    <div class="px-6 pt-4 pb-2"><p class="text-[9px] font-black text-slate-500/80 uppercase tracking-widest">Acadêmico</p></div>
                    
                    <button onclick="${clickAcao('certificados.html', canCert)}" class="${classItem('certificados.html', !canCert)}">
                        <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'certificados.html' ? 'drop-shadow-md' : 'opacity-70'}">📜</span> Certificados</div>
                        ${!canCert ? blockIcon : ''}
                    </button>
                    <button onclick="${clickAcao('curriculo.html', canExtra)}" class="${classItem('curriculo.html', !canExtra)}">
                        <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'curriculo.html' ? 'drop-shadow-md' : 'opacity-70'}">📄</span> Currículo</div>
                        ${!canExtra ? blockIcon : ''}
                    </button>
                    
                    <div class="px-6 pt-4 pb-2"><p class="text-[9px] font-black text-slate-500/80 uppercase tracking-widest">Gestão Extra</p></div>
                    
                    <button onclick="${clickAcao('competicoes.html', canExtra)}" class="${classItem('competicoes.html', !canExtra)}">
                        <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'competicoes.html' ? 'drop-shadow-md' : 'opacity-70'}">🏆</span> Competições</div>
                        ${!canExtra ? blockIcon : ''}
                    </button>
                    <button onclick="${clickAcao('federacoes.html', canExtra)}" class="${classItem('federacoes.html', !canExtra)}">
                        <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'federacoes.html' ? 'drop-shadow-md' : 'opacity-70'}">🪪</span> Federações</div>
                        ${!canExtra ? blockIcon : ''}
                    </button>
                    <button onclick="${clickAcao('historico.html', canExtra)}" class="${classItem('historico.html', !canExtra)}">
                        <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'historico.html' ? 'drop-shadow-md' : 'opacity-70'}">🎓</span> Graduações</div>
                        ${!canExtra ? blockIcon : ''}
                    </button>
                </nav>
                
                <div class="p-4 border-t border-slate-800 bg-slate-900/80 backdrop-blur-sm z-30 flex flex-col gap-2 shrink-0">
                    <button onclick="${clickAcao('suporte.html', true)}" class="w-full flex items-center justify-center text-slate-500 hover:text-indigo-400 transition-colors text-[10px] font-bold uppercase tracking-widest py-2 group ${paginaAtual === 'suporte.html' ? 'text-indigo-400' : ''}">
                        <span class="mr-2 opacity-70 group-hover:opacity-100 transition-opacity flex items-center justify-center">${svgSuporte}</span> Suporte
                    </button>
                    <button onclick="toggleDarkMode()" class="w-full flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors text-[10px] font-bold uppercase tracking-widest py-2 group" title="Alternar Modo Escuro">
                        <span class="mr-2 opacity-70 group-hover:opacity-100 transition-opacity flex items-center justify-center">${svgTema}</span> Tema
                    </button>
                    <button onclick="sairDoSistema()" class="w-full px-4 py-3 mt-1 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center shadow-sm">
                        <span class="mr-2 text-base leading-none opacity-70">🚪</span> Sair
                    </button>
                </div>
            </aside>
        `;

        // --- BOTÃO FLUTUANTE DE MENU (Apenas Mobile - Canto Superior Esquerdo) ---
        const btnHamburguer = `
            <button id="bjj-hamburger-btn" onclick="toggleBjjMenu()" class="md:hidden fixed top-4 left-4 z-[45] bg-slate-900 text-white p-2.5 rounded-xl shadow-lg border border-slate-800 flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            </button>
        `;

        // --- RENDERIZAÇÃO ---
        const containerPrincipal = document.getElementById('interface-sistema');
        
        // Remove a antiga barra inferior mobile (se existir)
        const oldMobile = document.querySelector('nav.md\\:hidden');
        if (oldMobile) oldMobile.remove();

        // Remove o antigo painel desktop e botão hambúrguer antigo (se existir)
        if (containerPrincipal) {
            const oldMenu = containerPrincipal.querySelector('aside');
            if (oldMenu) oldMenu.remove();
            
            const oldBtn = document.getElementById('bjj-hamburger-btn');
            if (oldBtn) oldBtn.remove();
            
            // Insere o novo Menu Gaveta
            containerPrincipal.insertAdjacentHTML('afterbegin', menuSidebar);
        }

        // Insere o Botão Hambúrguer e o Overlay no corpo da página
        if (document.body) {
            document.body.insertAdjacentHTML('beforeend', btnHamburguer);
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

// Render Inicial
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregarMenu);
} else {
    carregarMenu();
}
