// menu.js

function carregarMenu() {
    // Descobre em qual página estamos agora (ex: "dashboard.html")
    const paginaAtual = window.location.pathname.split("/").pop() || "dashboard.html";

    // Função auxiliar para definir a cor do botão ativo (Desktop)
    const classDesktop = (pagina) => {
        return paginaAtual === pagina 
            ? "flex items-center px-4 py-3 text-sm font-bold text-white bg-slate-800 rounded-xl transition-all shadow-inner group" 
            : "flex items-center px-4 py-3 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-all group";
    };

    // Função auxiliar para definir a cor do botão ativo (Mobile)
    const classMobile = (pagina) => {
        return paginaAtual === pagina 
            ? "shrink-0 w-16 flex flex-col items-center justify-center h-full text-cyan-400 relative" 
            : "shrink-0 w-16 flex flex-col items-center justify-center h-full text-slate-400 hover:text-white transition-colors";
    };

    // Linha azul no topo do botão mobile ativo
    const indicadorMobile = (pagina) => {
        return paginaAtual === pagina ? `<div class="absolute top-0 w-6 h-1 bg-cyan-500 rounded-b-full"></div>` : "";
    };

    // === HTML DO MENU DESKTOP ===
    const menuDesktop = `
        <aside class="hidden md:flex w-64 bg-slate-900 text-white flex-col h-full shadow-2xl shrink-0 z-20">
            <div class="p-6 text-center border-b border-slate-800 flex flex-col items-center justify-center">
                <div id="container-logo" class="w-16 h-16 mb-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg text-white font-black text-2xl overflow-hidden">
                    </div>
                <h1 class="text-sm font-bold tracking-widest text-white uppercase" id="nome-equipe">Carregando...</h1>
                <p class="text-[9px] text-cyan-400 font-bold uppercase tracking-widest mt-1">BJJ Manager</p>
            </div>
            
            <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto hide-scrollbar">
                <a href="dashboard.html" class="${classDesktop('dashboard.html')}"><span class="mr-3 text-lg group-hover:scale-110 transition-transform">📊</span> Visão Geral</a>
                <a href="alunos.html" class="${classDesktop('alunos.html')}"><span class="mr-3 text-lg group-hover:scale-110 transition-transform">🥋</span> Alunos</a>
                <a href="turmas.html" class="${classDesktop('turmas.html')}"><span class="mr-3 text-lg group-hover:scale-110 transition-transform">🗓️</span> Turmas</a>
                <a href="historico.html" class="${classDesktop('historico.html')}"><span class="mr-3 text-lg group-hover:scale-110 transition-transform">🎓</span> Graduações</a>
                <a href="certificados.html" class="${classDesktop('certificados.html')}"><span class="mr-3 text-lg group-hover:scale-110 transition-transform">📜</span> Certificados</a>
                <a href="competicoes.html" class="${classDesktop('competicoes.html')}"><span class="mr-3 text-lg group-hover:scale-110 transition-transform">🏆</span> Competições</a>
                <a href="curriculo.html" class="${classDesktop('curriculo.html')}"><span class="mr-3 text-lg group-hover:scale-110 transition-transform">📄</span> Currículo</a>
                <a href="federacoes.html" class="${classDesktop('federacoes.html')}"><span class="mr-3 text-lg group-hover:scale-110 transition-transform">🪪</span> Federações</a>
                <a href="financeiro.html" class="${classDesktop('financeiro.html')}"><span class="mr-3 text-lg group-hover:scale-110 transition-transform">💰</span> Financeiro</a>
            </nav>
            
            <div class="p-4 border-t border-slate-800">
                <div class="bg-slate-800/50 p-3 rounded-xl flex items-center mb-4 border border-slate-700/50">
                    <div class="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-[10px] text-white shadow-inner">ADM</div>
                    <div class="ml-3 overflow-hidden">
                        <p class="text-[11px] font-bold text-white truncate" id="email-logado">carregando...</p>
                        <p class="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5" id="lbl-cargo">Acessando...</p>
                    </div>
                </div>
                <button onclick="sairDoSistema()" class="w-full px-4 py-3 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 rounded-xl text-xs font-bold transition-all flex items-center justify-center">
                    <span class="mr-2">🚪</span> Sair
                </button>
            </div>
        </aside>
    `;

    // === HTML DO MENU MOBILE ===
    const menuMobile = `
        <nav class="md:hidden fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-800 flex overflow-x-auto hide-scrollbar flex-nowrap items-center h-16 z-40 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
            <a href="dashboard.html" class="${classMobile('dashboard.html')}">${indicadorMobile('dashboard.html')}<span class="text-lg mb-0.5">📊</span><span class="text-[8px] font-bold uppercase">Visão</span></a>
            <a href="alunos.html" class="${classMobile('alunos.html')}">${indicadorMobile('alunos.html')}<span class="text-lg mb-0.5">🥋</span><span class="text-[8px] font-bold uppercase">Alunos</span></a>
            <a href="turmas.html" class="${classMobile('turmas.html')}">${indicadorMobile('turmas.html')}<span class="text-lg mb-0.5">🗓️</span><span class="text-[8px] font-bold uppercase">Turmas</span></a>
            <a href="historico.html" class="${classMobile('historico.html')}">${indicadorMobile('historico.html')}<span class="text-lg mb-0.5">🎓</span><span class="text-[8px] font-bold uppercase">Grad.</span></a>
            <a href="certificados.html" class="${classMobile('certificados.html')}">${indicadorMobile('certificados.html')}<span class="text-lg mb-0.5">📜</span><span class="text-[8px] font-bold uppercase">Certif.</span></a>
            <a href="competicoes.html" class="${classMobile('competicoes.html')}">${indicadorMobile('competicoes.html')}<span class="text-lg mb-0.5">🏆</span><span class="text-[8px] font-bold uppercase">Comp.</span></a>
            <a href="curriculo.html" class="${classMobile('curriculo.html')}">${indicadorMobile('curriculo.html')}<span class="text-lg mb-0.5">📄</span><span class="text-[8px] font-bold uppercase">Currí.</span></a>
            <a href="federacoes.html" class="${classMobile('federacoes.html')}">${indicadorMobile('federacoes.html')}<span class="text-lg mb-0.5">🪪</span><span class="text-[8px] font-bold uppercase">Fed.</span></a>
            <a href="financeiro.html" class="${classMobile('financeiro.html')}">${indicadorMobile('financeiro.html')}<span class="text-lg mb-0.5">💰</span><span class="text-[8px] font-bold uppercase">Caixa</span></a>
        </nav>
    `;

    // Injeta o menu Desktop no início do layout
    const containerPrincipal = document.getElementById('interface-sistema');
    if (containerPrincipal) {
        containerPrincipal.insertAdjacentHTML('afterbegin', menuDesktop);
    }

    // Injeta o menu Mobile no final do body
    document.body.insertAdjacentHTML('beforeend', menuMobile);
}

// Executa a função quando o ficheiro carrega
carregarMenu();