// ==========================================
// 🌙 MOTOR GLOBAL DE MODO ESCURO
// ==========================================
const injetarModoEscuro = () => {
    if (!document.getElementById('bjj-dark-mode-styles')) {
        const style = document.createElement('style');
        style.id = 'bjj-dark-mode-styles';
        style.innerHTML = `
            html.dark body, html.dark main, html.dark #interface-sistema { background-color: #020617 !important; }
            html.dark .bg-[#F4F7F8], html.dark .bg-[#F8FAFC] { background-color: #020617 !important; }
            html.dark .bg-white, html.dark .card-premium { background-color: #0f172a !important; border-color: #1e293b !important; }
            html.dark .bg-slate-50, html.dark .bg-slate-100 { background-color: #1e293b !important; border-color: #334155 !important; }
            html.dark .text-slate-900, html.dark .text-slate-800, html.dark .text-slate-700 { color: #f8fafc !important; }
            html.dark .text-slate-600, html.dark .text-slate-500 { color: #94a3b8 !important; }
            html.dark .border-slate-200, html.dark .border-slate-100 { border-color: #1e293b !important; }
            html.dark input, html.dark select, html.dark textarea { 
                background-color: #1e293b !important; 
                color: #f8fafc !important; 
                border-color: #334155 !important; 
            }
            html.dark input::placeholder, html.dark textarea::placeholder { color: #475569 !important; }
        `;
        document.head.appendChild(style);
    }

    if (localStorage.getItem('bjj-theme') === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

injetarModoEscuro();

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
// 📱 CONSTRUTOR DO MENU (COM ÍCONES SVG)
// ==========================================
function carregarMenu() {
    try {
        const paginaAtual = window.location.pathname.split("/").pop() || "dashboard.html";

        if (!window.funcionalidadesEquipe) {
            const cacheFeatures = sessionStorage.getItem('bjj_features');
            if (cacheFeatures && cacheFeatures !== "undefined" && cacheFeatures !== "null") {
                try { window.funcionalidadesEquipe = JSON.parse(cacheFeatures); } catch(e) { window.funcionalidadesEquipe = []; }
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

        // LÓGICA DE ESTILOS GERAIS
        const classDesktop = (pagina, isBloqueado = false) => {
            if (isBloqueado) return "w-full text-left flex items-center justify-between px-4 py-3 text-[13px] font-semibold text-slate-600 border-l-4 border-transparent cursor-not-allowed opacity-60 bg-slate-900/30";
            return paginaAtual === pagina 
                ? "w-full text-left flex items-center justify-between px-4 py-3 text-[13px] font-black text-cyan-400 bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-500 transition-all group cursor-pointer" 
                : "w-full text-left flex items-center justify-between px-4 py-3 text-[13px] font-semibold text-slate-400 border-l-4 border-transparent hover:border-slate-700 hover:text-white hover:bg-slate-800/50 transition-all group cursor-pointer";
        };

        const classMobile = (pagina, isBloqueado = false) => {
            if (isBloqueado) return "shrink-0 w-[4.5rem] flex flex-col items-center justify-center h-full text-slate-600 relative snap-center cursor-not-allowed opacity-50";
            return paginaAtual === pagina 
                ? "shrink-0 w-[4.5rem] flex flex-col items-center justify-center h-full text-cyan-400 relative snap-center cursor-pointer transition-all" 
                : "shrink-0 w-[4.5rem] flex flex-col items-center justify-center h-full text-slate-500 hover:text-slate-300 transition-colors snap-center cursor-pointer";
        };

        const indicadorMobile = (pagina) => { return paginaAtual === pagina ? `<div class="absolute top-0 w-8 h-1 bg-cyan-500 rounded-b-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>` : ""; };

        const hasAccess = (palavraChave) => {
            if (!window.funcionalidadesEquipe) return true;
            return window.funcionalidadesEquipe.some(f => f.includes('✓') && f.toLowerCase().includes(palavraChave.toLowerCase()));
        };

        // Ícones SVG para Reuso
        const svgBlock = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>`;
        
        // Dicionário de SVGs do Menu
        const svgs = {
            visao: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>`,
            caixa: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
            alunos: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>`,
            turmas: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" /></svg>`,
            loja: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>`,
            cert: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>`,
            curric: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" /></svg>`,
            comp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 27.395 27.395 0 002.043.256v1.458a4.5 4.5 0 00-1.39 8.653l.252 1.96a.75.75 0 00.742.654h4.15a.75.75 0 00.741-.654l.252-1.96a4.5 4.5 0 00-1.39-8.653v-1.458c.68-.053 1.364-.122 2.043-.256a6.753 6.753 0 006.138-5.6.75.75 0 00-.584-.859 47.525 47.525 0 00-3.071-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c1.996-.217 4.032-.33 6.084-.33s4.088.113 6.084.33v2.09c0 .71-.1 1.411-.29 2.083A25.96 25.96 0 0111.25 9.75v-1.5a.75.75 0 00-1.5 0v1.5a25.96 25.96 0 01-5.794-.326 6.745 6.745 0 01-.29-2.083v-2.09zm-2.016 1.637a.75.75 0 01.402.94 4.5 4.5 0 002.047 5.253 28.536 28.536 0 001.378.361A5.25 5.25 0 013.15 6.887zm16.5 0a.75.75 0 00-.402.94 4.5 4.5 0 01-2.047 5.253 28.536 28.536 0 01-1.378.361 5.25 5.25 0 006.177-3.926z" clip-rule="evenodd" /></svg>`,
            fed: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>`,
            grad: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>`,
            ajuda: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>`,
            sair: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>`,
            tema: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>`
        };

        const cssIconDesk = "w-5 h-5 mr-3 transition-transform group-hover:scale-110";
        const cssIconMob = "w-[22px] h-[22px] mb-1 transition-all";

        const canFin = true; 
        const canLoja = hasAccess('Vitrine'); 
        const canCert = hasAccess('Certificados'); 
        const canTurmas = hasAccess('Turmas'); 
        const canExtra = hasAccess('Ilimitados') || hasAccess('Portal'); 

        const clickAcao = (url, hasAcc) => { return hasAcc ? `window.location.href='${url}'` : `mostrarAvisoUpgrade()`; };

        // --- 4. HTML DO MENU DESKTOP ---
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
                        <div class="flex items-center"><div class="${cssIconDesk} ${paginaAtual === 'dashboard.html' ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}">${svgs.visao}</div> Visão Geral</div>
                    </button>
                    <button onclick="${clickAcao('financeiro.html', canFin)}" class="${classDesktop('financeiro.html', !canFin)}">
                        <div class="flex items-center"><div class="${cssIconDesk} ${paginaAtual === 'financeiro.html' ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}">${svgs.caixa}</div> Financeiro</div>
                        ${!canFin ? svgBlock : ''}
                    </button>
                    <button onclick="${clickAcao('alunos.html', true)}" class="${classDesktop('alunos.html', false)}">
                        <div class="flex items-center"><div class="${cssIconDesk} ${paginaAtual === 'alunos.html' ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}">${svgs.alunos}</div> Alunos</div>
                    </button>
                    <button onclick="${clickAcao('turmas.html', canTurmas)}" class="${classDesktop('turmas.html', !canTurmas)}">
                        <div class="flex items-center"><div class="${cssIconDesk} ${paginaAtual === 'turmas.html' ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}">${svgs.turmas}</div> Turmas</div>
                        ${!canTurmas ? svgBlock : ''}
                    </button>
                    <button onclick="${clickAcao('loja.html', canLoja)}" class="${classDesktop('loja.html', !canLoja)}">
                        <div class="flex items-center"><div class="${cssIconDesk} ${paginaAtual === 'loja.html' ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}">${svgs.loja}</div> Vitrine Virtual</div>
                        ${!canLoja ? svgBlock : ''}
                    </button>
                    
                    <div class="px-4 pt-4 pb-1"><p class="text-[8px] font-black text-slate-500/80 uppercase tracking-widest">Acadêmico</p></div>
                    
                    <button onclick="${clickAcao('certificados.html', canCert)}" class="${classDesktop('certificados.html', !canCert)}">
                        <div class="flex items-center"><div class="${cssIconDesk} ${paginaAtual === 'certificados.html' ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}">${svgs.cert}</div> Certificados</div>
                        ${!canCert ? svgBlock : ''}
                    </button>
                    <button onclick="${clickAcao('curriculo.html', canExtra)}" class="${classDesktop('curriculo.html', !canExtra)}">
                        <div class="flex items-center"><div class="${cssIconDesk} ${paginaAtual === 'curriculo.html' ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}">${svgs.curric}</div> Currículo</div>
                        ${!canExtra ? svgBlock : ''}
                    </button>
                    
                    <div class="px-4 pt-4 pb-1"><p class="text-[8px] font-black text-slate-500/80 uppercase tracking-widest">Gestão Extra</p></div>
                    
                    <button onclick="${clickAcao('competicoes.html', canExtra)}" class="${classDesktop('competicoes.html', !canExtra)}">
                        <div class="flex items-center"><div class="${cssIconDesk} ${paginaAtual === 'competicoes.html' ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}">${svgs.comp}</div> Competições</div>
                        ${!canExtra ? svgBlock : ''}
                    </button>
                    <button onclick="${clickAcao('federacoes.html', canExtra)}" class="${classDesktop('federacoes.html', !canExtra)}">
                        <div class="flex items-center"><div class="${cssIconDesk} ${paginaAtual === 'federacoes.html' ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}">${svgs.fed}</div> Federações</div>
                        ${!canExtra ? svgBlock : ''}
                    </button>
                    <button onclick="${clickAcao('historico.html', canExtra)}" class="${classDesktop('historico.html', !canExtra)}">
                        <div class="flex items-center"><div class="${cssIconDesk} ${paginaAtual === 'historico.html' ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}">${svgs.grad}</div> Graduações</div>
                        ${!canExtra ? svgBlock : ''}
                    </button>
                </nav>
                
                <div class="p-4 border-t border-slate-800 bg-slate-900/80 backdrop-blur-sm z-30 flex flex-col gap-2">
                    <button onclick="toggleDarkMode()" class="w-full flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors text-[10px] font-bold uppercase tracking-widest py-1.5 group" title="Alternar Modo Escuro">
                        <div class="w-4 h-4 mr-2 text-slate-500 group-hover:text-slate-300 transition-colors">${svgs.tema}</div> Tema
                    </button>
                    <button onclick="${clickAcao('suporte.html', true)}" class="w-full flex items-center justify-center text-slate-500 hover:text-indigo-400 transition-colors text-[9px] font-bold uppercase tracking-widest py-1.5 group ${paginaAtual === 'suporte.html' ? 'text-indigo-400' : ''}">
                        <div class="w-4 h-4 mr-2 ${paginaAtual === 'suporte.html' ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-400'} transition-colors">${svgs.ajuda}</div> Ajuda
                    </button>
                    <button onclick="sairDoSistema()" class="w-full px-4 py-2 mt-1 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center shadow-sm group">
                        <div class="w-4 h-4 mr-2 text-rose-500 group-hover:text-white transition-colors">${svgs.sair}</div> Sair
                    </button>
                </div>
            </aside>
        `;

        // --- 5. HTML DO MENU MOBILE ---
        const menuMobile = `
            <nav class="md:hidden fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 flex overflow-x-auto hide-scrollbar flex-nowrap items-center h-[76px] z-40 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)] snap-x scroll-smooth">
                <button onclick="${clickAcao('dashboard.html', true)}" class="${classMobile('dashboard.html', false)}">
                    ${indicadorMobile('dashboard.html')}
                    <div class="${cssIconMob} ${paginaAtual === 'dashboard.html' ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'text-slate-500'}">${svgs.visao}</div>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Visão</span>
                </button>
                <button onclick="${clickAcao('financeiro.html', canFin)}" class="${classMobile('financeiro.html', !canFin)} relative">
                    ${indicadorMobile('financeiro.html')}
                    ${!canFin ? `<div class="absolute top-1 right-2 text-[10px]">🔒</div>` : ''}
                    <div class="${cssIconMob} ${paginaAtual === 'financeiro.html' ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'text-slate-500'}">${svgs.caixa}</div>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Caixa</span>
                </button>
                <button onclick="${clickAcao('alunos.html', true)}" class="${classMobile('alunos.html', false)}">
                    ${indicadorMobile('alunos.html')}
                    <div class="${cssIconMob} ${paginaAtual === 'alunos.html' ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'text-slate-500'}">${svgs.alunos}</div>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Alunos</span>
                </button>
                <button onclick="${clickAcao('turmas.html', canTurmas)}" class="${classMobile('turmas.html', !canTurmas)} relative">
                    ${indicadorMobile('turmas.html')}
                    ${!canTurmas ? `<div class="absolute top-1 right-2 text-[10px]">🔒</div>` : ''}
                    <div class="${cssIconMob} ${paginaAtual === 'turmas.html' ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'text-slate-500'}">${svgs.turmas}</div>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Turmas</span>
                </button>
                <button onclick="${clickAcao('loja.html', canLoja)}" class="${classMobile('loja.html', !canLoja)} relative">
                    ${indicadorMobile('loja.html')}
                    ${!canLoja ? `<div class="absolute top-1 right-2 text-[10px]">🔒</div>` : ''}
                    <div class="${cssIconMob} ${paginaAtual === 'loja.html' ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'text-slate-500'}">${svgs.loja}</div>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Loja</span>
                </button>
                <button onclick="${clickAcao('certificados.html', canCert)}" class="${classMobile('certificados.html', !canCert)} relative">
                    ${indicadorMobile('certificados.html')}
                    ${!canCert ? `<div class="absolute top-1 right-2 text-[10px]">🔒</div>` : ''}
                    <div class="${cssIconMob} ${paginaAtual === 'certificados.html' ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'text-slate-500'}">${svgs.cert}</div>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Certif.</span>
                </button>
                <button onclick="${clickAcao('curriculo.html', canExtra)}" class="${classMobile('curriculo.html', !canExtra)} relative">
                    ${indicadorMobile('curriculo.html')}
                    ${!canExtra ? `<div class="absolute top-1 right-2 text-[10px]">🔒</div>` : ''}
                    <div class="${cssIconMob} ${paginaAtual === 'curriculo.html' ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'text-slate-500'}">${svgs.curric}</div>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Currí.</span>
                </button>
                <button onclick="${clickAcao('competicoes.html', canExtra)}" class="${classMobile('competicoes.html', !canExtra)} relative">
                    ${indicadorMobile('competicoes.html')}
                    ${!canExtra ? `<div class="absolute top-1 right-2 text-[10px]">🔒</div>` : ''}
                    <div class="${cssIconMob} ${paginaAtual === 'competicoes.html' ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'text-slate-500'}">${svgs.comp}</div>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Comp.</span>
                </button>
                <button onclick="${clickAcao('federacoes.html', canExtra)}" class="${classMobile('federacoes.html', !canExtra)} relative">
                    ${indicadorMobile('federacoes.html')}
                    ${!canExtra ? `<div class="absolute top-1 right-2 text-[10px]">🔒</div>` : ''}
                    <div class="${cssIconMob} ${paginaAtual === 'federacoes.html' ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'text-slate-500'}">${svgs.fed}</div>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Fed.</span>
                </button>
                <button onclick="${clickAcao('historico.html', canExtra)}" class="${classMobile('historico.html', !canExtra)} relative">
                    ${indicadorMobile('historico.html')}
                    ${!canExtra ? `<div class="absolute top-1 right-2 text-[10px]">🔒</div>` : ''}
                    <div class="${cssIconMob} ${paginaAtual === 'historico.html' ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'text-slate-500'}">${svgs.grad}</div>
                    <span class="text-[8px] font-bold uppercase tracking-wide">Grad.</span>
                </button>

                <button onclick="toggleDarkMode()" class="shrink-0 w-[4rem] flex flex-col items-center justify-center h-full text-slate-500 hover:text-slate-300 transition-colors snap-center cursor-pointer group">
                    <div class="${cssIconMob} text-slate-500 group-hover:text-slate-300">${svgs.tema}</div>
                    <span class="text-[7.5px] font-bold uppercase tracking-wide">Tema</span>
                </button>

                <button onclick="${clickAcao('suporte.html', true)}" class="shrink-0 w-[4rem] flex flex-col items-center justify-center h-full text-slate-500 hover:text-indigo-400 transition-colors snap-center group">
                    ${indicadorMobile('suporte.html')}
                    <div class="${cssIconMob} ${paginaAtual === 'suporte.html' ? 'text-indigo-400 scale-110 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]' : 'text-slate-500 group-hover:text-indigo-400'}">${svgs.ajuda}</div>
                    <span class="text-[7.5px] font-bold uppercase tracking-wide">Ajuda</span>
                </button>
                
                <button onclick="sairDoSistema()" class="shrink-0 w-[4.5rem] flex flex-col items-center justify-center h-full text-rose-500 hover:text-rose-400 transition-colors snap-center group">
                    <div class="${cssIconMob} text-rose-500 group-hover:text-rose-400">${svgs.sair}</div>
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
