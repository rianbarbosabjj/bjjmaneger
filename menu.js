// menu.js

function carregarMenu() {
    const paginaAtual = window.location.pathname.split("/").pop() || "dashboard.html";

    const classDesktop = (pagina) => {
        return paginaAtual === pagina 
            ? "w-full text-left flex items-center px-4 py-3 text-sm font-black text-white bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-500 transition-all group cursor-pointer" 
            : "w-full text-left flex items-center px-4 py-3 text-sm font-semibold text-slate-400 border-l-4 border-transparent hover:border-slate-700 hover:text-white hover:bg-slate-800/50 transition-all group cursor-pointer";
    };

    const classMobile = (pagina) => {
        return paginaAtual === pagina 
            ? "shrink-0 w-16 flex flex-col items-center justify-center h-full text-cyan-400 relative snap-center cursor-pointer" 
            : "shrink-0 w-16 flex flex-col items-center justify-center h-full text-slate-500 hover:text-slate-300 transition-colors snap-center cursor-pointer";
    };

    const indicadorMobile = (pagina) => {
        return paginaAtual === pagina ? `<div class="absolute top-0 w-8 h-1 bg-cyan-500 rounded-b-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>` : "";
    };

    // === HTML DO MENU DESKTOP ===
    const menuDesktop = `
        <aside class="hidden md:flex w-64 bg-slate-900 text-white flex-col h-full shadow-2xl shrink-0 z-20 border-r border-slate-800">
            <div class="p-6 text-center border-b border-slate-800 flex flex-col items-center justify-center">
                <div id="container-logo" class="w-16 h-16 mb-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg text-white font-black text-2xl overflow-hidden ring-2 ring-slate-800">
                </div>
                <h1 class="text-sm font-black tracking-widest text-white uppercase" id="nome-equipe">Carregando...</h1>
                <p class="text-[9px] text-cyan-500 font-black uppercase tracking-[0.2em] mt-1">BJJ Manager</p>
            </div>
            
            <nav class="flex-1 py-6 space-y-1.5 overflow-y-auto hide-scrollbar flex flex-col">
                <button onclick="window.location.href='dashboard.html'" class="${classDesktop('dashboard.html')}"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'dashboard.html' ? 'drop-shadow-md' : 'opacity-70'}">📊</span> Visão Geral</button>
                <button onclick="window.location.href='financeiro.html'" class="${classDesktop('financeiro.html')}"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'financeiro.html' ? 'drop-shadow-md' : 'opacity-70'}">💰</span> Financeiro</button>
                <button onclick="window.location.href='alunos.html'" class="${classDesktop('alunos.html')}"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'alunos.html' ? 'drop-shadow-md' : 'opacity-70'}">🥋</span> Alunos</button>
                <button onclick="window.location.href='turmas.html'" class="${classDesktop('turmas.html')}"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'turmas.html' ? 'drop-shadow-md' : 'opacity-70'}">🗓️</span> Turmas</button>
                
                <button onclick="if(window.verificarAcesso('loja_virtual')) window.location.href='loja.html'" class="${classDesktop('loja.html')}">
                    <span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'loja.html' ? 'drop-shadow-md' : 'opacity-70'}">🛒</span> Vitrine Virtual
                </button>
                
                <div class="px-5 pt-4 pb-2">
                    <p class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Acadêmico</p>
                </div>
                
                <button onclick="if(window.verificarAcesso('certificados')) window.location.href='certificados.html'" class="${classDesktop('certificados.html')}">
                    <span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'certificados.html' ? 'drop-shadow-md' : 'opacity-70'}">📜</span> Certificados
                </button>
                
                <button onclick="window.location.href='curriculo.html'" class="${classDesktop('curriculo.html')}"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'curriculo.html' ? 'drop-shadow-md' : 'opacity-70'}">📄</span> Currículo</button>
                
                <div class="px-5 pt-4 pb-2">
                    <p class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Gestão Extra</p>
                </div>
                <button onclick="window.location.href='competicoes.html'" class="${classDesktop('competicoes.html')}"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'competicoes.html' ? 'drop-shadow-md' : 'opacity-70'}">🏆</span> Competições</button>
                <button onclick="window.location.href='federacoes.html'" class="${classDesktop('federacoes.html')}"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'federacoes.html' ? 'drop-shadow-md' : 'opacity-70'}">🪪</span> Federações</button>
                <button onclick="window.location.href='historico.html'" class="${classDesktop('historico.html')}"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'historico.html' ? 'drop-shadow-md' : 'opacity-70'}">🎓</span> Graduações</button>
            </nav>
            
            <div class="p-4 border-t border-slate-800 bg-slate-900/50">
                <div class="bg-slate-800 p-3 rounded-xl flex items-center mb-3 border border-slate-700/50 shadow-inner">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center font-black text-[10px] text-white shadow-md">ADM</div>
                    <div class="ml-3 overflow-hidden">
                        <p class="text-[11px] font-bold text-white truncate" id="email-logado">carregando...</p>
                        <p class="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5" id="lbl-cargo">Acessando...</p>
                    </div>
                </div>
                <button onclick="sairDoSistema()" class="w-full px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center">
                    <span class="mr-2 text-base">🚪</span> Sair
                </button>
            </div>
        </aside>
    `;

    // === HTML DO MENU MOBILE (Com Efeito de Vidro Fosco e Botão Sair) ===
    const menuMobile = `
        <nav class="md:hidden fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex overflow-x-auto hide-scrollbar flex-nowrap items-center h-[72px] z-40 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)] snap-x scroll-smooth">
            <button onclick="window.location.href='dashboard.html'" class="${classMobile('dashboard.html')}">${indicadorMobile('dashboard.html')}<span class="text-xl mb-1 ${paginaAtual === 'dashboard.html' ? '' : 'opacity-60'}">📊</span><span class="text-[8px] font-bold uppercase tracking-wide">Visão</span></button>
            <button onclick="window.location.href='financeiro.html'" class="${classMobile('financeiro.html')}">${indicadorMobile('financeiro.html')}<span class="text-xl mb-1 ${paginaAtual === 'financeiro.html' ? '' : 'opacity-60'}">💰</span><span class="text-[8px] font-bold uppercase tracking-wide">Caixa</span></button>
            <button onclick="window.location.href='alunos.html'" class="${classMobile('alunos.html')}">${indicadorMobile('alunos.html')}<span class="text-xl mb-1 ${paginaAtual === 'alunos.html' ? '' : 'opacity-60'}">🥋</span><span class="text-[8px] font-bold uppercase tracking-wide">Alunos</span></button>
            <button onclick="window.location.href='turmas.html'" class="${classMobile('turmas.html')}">${indicadorMobile('turmas.html')}<span class="text-xl mb-1 ${paginaAtual === 'turmas.html' ? '' : 'opacity-60'}">🗓️</span><span class="text-[8px] font-bold uppercase tracking-wide">Turmas</span></button>
            
            <button onclick="if(window.verificarAcesso('loja_virtual')) window.location.href='loja.html'" class="${classMobile('loja.html')}">
                ${indicadorMobile('loja.html')}<span class="text-xl mb-1 ${paginaAtual === 'loja.html' ? '' : 'opacity-60'}">🛒</span><span class="text-[8px] font-bold uppercase tracking-wide">Loja</span>
            </button>
            
            <button onclick="if(window.verificarAcesso('certificados')) window.location.href='certificados.html'" class="${classMobile('certificados.html')}">
                ${indicadorMobile('certificados.html')}<span class="text-xl mb-1 ${paginaAtual === 'certificados.html' ? '' : 'opacity-60'}">📜</span><span class="text-[8px] font-bold uppercase tracking-wide">Certif.</span>
            </button>
            
            <button onclick="window.location.href='curriculo.html'" class="${classMobile('curriculo.html')}">${indicadorMobile('curriculo.html')}<span class="text-xl mb-1 ${paginaAtual === 'curriculo.html' ? '' : 'opacity-60'}">📄</span><span class="text-[8px] font-bold uppercase tracking-wide">Currí.</span></button>
            <button onclick="window.location.href='competicoes.html'" class="${classMobile('competicoes.html')}">${indicadorMobile('competicoes.html')}<span class="text-xl mb-1 ${paginaAtual === 'competicoes.html' ? '' : 'opacity-60'}">🏆</span><span class="text-[8px] font-bold uppercase tracking-wide">Comp.</span></button>
            <button onclick="window.location.href='federacoes.html'" class="${classMobile('federacoes.html')}">${indicadorMobile('federacoes.html')}<span class="text-xl mb-1 ${paginaAtual === 'federacoes.html' ? '' : 'opacity-60'}">🪪</span><span class="text-[8px] font-bold uppercase tracking-wide">Fed.</span></button>
            <button onclick="window.location.href='historico.html'" class="${classMobile('historico.html')}">${indicadorMobile('historico.html')}<span class="text-xl mb-1 ${paginaAtual === 'historico.html' ? '' : 'opacity-60'}">🎓</span><span class="text-[8px] font-bold uppercase tracking-wide">Grad.</span></button>
            
            <button onclick="sairDoSistema()" class="shrink-0 w-16 flex flex-col items-center justify-center h-full text-rose-500 hover:text-rose-400 transition-colors snap-center">
                <span class="text-xl mb-1">🚪</span>
                <span class="text-[8px] font-bold uppercase tracking-wide">Sair</span>
            </button>
        </nav>
    `;

    const containerPrincipal = document.getElementById('interface-sistema');
    if (containerPrincipal) {
        containerPrincipal.insertAdjacentHTML('afterbegin', menuDesktop);
    }

    document.body.insertAdjacentHTML('beforeend', menuMobile);
}

carregarMenu();
