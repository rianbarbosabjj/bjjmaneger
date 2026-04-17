// menu.js

function carregarMenu() {
    const paginaAtual = window.location.pathname.split("/").pop() || "dashboard.html";

    // === ESTILOS ATUALIZADOS E MAIS MODERNOS ===
    const classDesktop = (pagina, isBloqueado = false) => {
        if (isBloqueado) {
            return "w-full text-left flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-600 border-l-4 border-transparent cursor-not-allowed opacity-60";
        }
        return paginaAtual === pagina 
            ? "w-full text-left flex items-center justify-between px-4 py-3 text-sm font-black text-white bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-500 transition-all group cursor-pointer" 
            : "w-full text-left flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-400 border-l-4 border-transparent hover:border-slate-700 hover:text-white hover:bg-slate-800/50 transition-all group cursor-pointer";
    };

    const classMobile = (pagina, isBloqueado = false) => {
        if (isBloqueado) {
            return "shrink-0 w-[4.5rem] flex flex-col items-center justify-center h-full text-slate-600 relative snap-center cursor-not-allowed opacity-50";
        }
        return paginaAtual === pagina 
            ? "shrink-0 w-[4.5rem] flex flex-col items-center justify-center h-full text-cyan-400 relative snap-center cursor-pointer transition-all scale-110" 
            : "shrink-0 w-[4.5rem] flex flex-col items-center justify-center h-full text-slate-500 hover:text-slate-300 transition-colors snap-center cursor-pointer";
    };

    const indicadorMobile = (pagina) => {
        return paginaAtual === pagina ? `<div class="absolute top-0 w-8 h-1 bg-cyan-500 rounded-b-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>` : "";
    };

    // === FUNÇÃO DE VERIFICAÇÃO VISUAL ===
    // Lê uma variável que deixaremos global (via script no dashboard)
    const hasAccess = (funcionalidade) => {
        if (!window.funcionalidadesEquipe) return true; // Libera se a verificação ainda não carregou
        
        // Mapeia o ID do botão para o texto exato salvo no Super Admin
        const mapaFuncionalidades = {
            'financeiro': "Controle Financeiro Blindado", // Ajuste para o texto exato do Super Admin se for diferente
            'loja_virtual': "Vitrine Virtual (Loja Online)",
            'certificados': "Emissão de Certificados Profissionais",
            'turmas': "Gestão de Turmas e Frequência"
        };
        
        const textoBusca = mapaFuncionalidades[funcionalidade];
        if (!textoBusca) return true;

        // Procura se o array de funcionalidades tem essa feature com um "✓"
        return window.funcionalidadesEquipe.some(f => f.includes('✓') && f.includes(textoBusca));
    };

    const blockIcon = `<span class="text-xs">🔒</span>`;
    
    // Verificações instantâneas
    const canFin = hasAccess('financeiro');
    const canLoja = hasAccess('loja_virtual');
    const canCert = hasAccess('certificados');
    const canTurmas = hasAccess('turmas');

    const clickAcao = (url, hasAcc) => {
        return hasAcc ? `window.location.href='${url}'` : `mostrarAvisoUpgrade()`;
    };

    // === HTML DO MENU DESKTOP ===
    const menuDesktop = `
        <aside class="hidden md:flex w-64 bg-slate-900 text-white flex-col h-full shadow-[5px_0_15px_rgba(0,0,0,0.3)] shrink-0 z-20 border-r border-slate-800">
            <div class="p-6 text-center border-b border-slate-800 flex flex-col items-center justify-center bg-slate-950/30">
                <div id="container-logo" class="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center shadow-lg text-slate-300 font-black text-2xl overflow-hidden ring-1 ring-slate-700">
                    </div>
                <h1 class="text-[13px] font-black tracking-wider text-white uppercase truncate w-full px-2" id="nome-equipe">Carregando...</h1>
                <p class="text-[9px] text-cyan-500 font-black uppercase tracking-[0.2em] mt-1.5 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">BJJ Manager</p>
            </div>
            
            <nav class="flex-1 py-4 space-y-1 overflow-y-auto custom-scroll flex flex-col">
                <button onclick="${clickAcao('dashboard.html', true)}" class="${classDesktop('dashboard.html', false)}">
                    <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'dashboard.html' ? 'drop-shadow-md' : 'opacity-70'}">📊</span> Visão Geral</div>
                </button>
                
                <button onclick="${clickAcao('financeiro.html', canFin)}" class="${classDesktop('financeiro.html', !canFin)}">
                    <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'financeiro.html' ? 'drop-shadow-md' : 'opacity-70'}">💰</span> Financeiro</div>
                    ${!canFin ? blockIcon : ''}
                </button>
                
                <button onclick="${clickAcao('alunos.html', true)}" class="${classDesktop('alunos.html', false)}">
                    <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'alunos.html' ? 'drop-shadow-md' : 'opacity-70'}">🥋</span> Alunos</div>
                </button>
                
                <button onclick="${clickAcao('turmas.html', canTurmas)}" class="${classDesktop('turmas.html', !canTurmas)}">
                    <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'turmas.html' ? 'drop-shadow-md' : 'opacity-70'}">🗓️</span> Turmas</div>
                    ${!canTurmas ? blockIcon : ''}
                </button>
                
                <button onclick="${clickAcao('loja.html', canLoja)}" class="${classDesktop('loja.html', !canLoja)}">
                    <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'loja.html' ? 'drop-shadow-md' : 'opacity-70'}">🛒</span> Vitrine Virtual</div>
                    ${!canLoja ? blockIcon : ''}
                </button>
                
                <div class="px-5 pt-5 pb-2">
                    <p class="text-[9px] font-black text-slate-500/80 uppercase tracking-widest">Acadêmico</p>
                </div>
                
                <button onclick="${clickAcao('certificados.html', canCert)}" class="${classDesktop('certificados.html', !canCert)}">
                    <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'certificados.html' ? 'drop-shadow-md' : 'opacity-70'}">📜</span> Certificados</div>
                    ${!canCert ? blockIcon : ''}
                </button>
                
                <button onclick="${clickAcao('curriculo.html', true)}" class="${classDesktop('curriculo.html', false)}">
                    <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'curriculo.html' ? 'drop-shadow-md' : 'opacity-70'}">📄</span> Currículo</div>
                </button>
                
                <div class="px-5 pt-5 pb-2">
                    <p class="text-[9px] font-black text-slate-500/80 uppercase tracking-widest">Gestão Extra</p>
                </div>
                
                <button onclick="${clickAcao('competicoes.html', true)}" class="${classDesktop('competicoes.html', false)}">
                    <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'competicoes.html' ? 'drop-shadow-md' : 'opacity-70'}">🏆</span> Competições</div>
                </button>
                
                <button onclick="${clickAcao('federacoes.html', true)}" class="${classDesktop('federacoes.html', false)}">
                    <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'federacoes.html' ? 'drop-shadow-md' : 'opacity-70'}">🪪</span> Federações</div>
                </button>
                
                <button onclick="${clickAcao('historico.html', true)}" class="${classDesktop('historico.html', false)}">
                    <div class="flex items-center"><span class="mr-3 text-lg group-hover:scale-110 transition-transform ${paginaAtual === 'historico.html' ? 'drop-shadow-md' : 'opacity-70'}">🎓</span> Graduações</div>
                </button>
            </nav>
            
            <div class="p-4 border-t border-slate-800 bg-slate-900/80 backdrop-blur-sm z-30">
                <div class="bg-slate-800/80 p-3 rounded-xl flex items-center mb-3 border border-slate-700 shadow-inner hover:border-slate-600 transition-colors cursor-pointer">
                    <div class="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-[10px] text-white shadow-md border border-slate-600 shrink-0">ADM</div>
                    <div class="ml-3 overflow-hidden flex-1">
                        <p class="text-[11px] font-bold text-white truncate" id="email-logado">Aguarde...</p>
                        <p class="text-[9px] text-cyan-400 uppercase tracking-widest mt-0.5 font-bold" id="lbl-cargo">Conectando</p>
                    </div>
                </div>
                <button onclick="sairDoSistema()" class="w-full px-4 py-3 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center shadow-sm">
                    <span class="mr-2 text-sm leading-none">🚪</span> Sair
                </button>
            </div>
        </aside>
    `;

    // === HTML DO MENU MOBILE ===
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
            
            <button onclick="${clickAcao('curriculo.html', true)}" class="${classMobile('curriculo.html', false)}">
                ${indicadorMobile('curriculo.html')}
                <span class="text-2xl mb-1 ${paginaAtual === 'curriculo.html' ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'opacity-60'}">📄</span>
                <span class="text-[8px] font-bold uppercase tracking-wide">Currí.</span>
            </button>
            
            <button onclick="${clickAcao('competicoes.html', true)}" class="${classMobile('competicoes.html', false)}">
                ${indicadorMobile('competicoes.html')}
                <span class="text-2xl mb-1 ${paginaAtual === 'competicoes.html' ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'opacity-60'}">🏆</span>
                <span class="text-[8px] font-bold uppercase tracking-wide">Comp.</span>
            </button>
            
            <button onclick="${clickAcao('federacoes.html', true)}" class="${classMobile('federacoes.html', false)}">
                ${indicadorMobile('federacoes.html')}
                <span class="text-2xl mb-1 ${paginaAtual === 'federacoes.html' ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'opacity-60'}">🪪</span>
                <span class="text-[8px] font-bold uppercase tracking-wide">Fed.</span>
            </button>
            
            <button onclick="${clickAcao('historico.html', true)}" class="${classMobile('historico.html', false)}">
                ${indicadorMobile('historico.html')}
                <span class="text-2xl mb-1 ${paginaAtual === 'historico.html' ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'opacity-60'}">🎓</span>
                <span class="text-[8px] font-bold uppercase tracking-wide">Grad.</span>
            </button>
            
            <button onclick="sairDoSistema()" class="shrink-0 w-[4.5rem] flex flex-col items-center justify-center h-full text-rose-500 hover:text-rose-400 transition-colors snap-center">
                <span class="text-2xl mb-1 opacity-80">🚪</span>
                <span class="text-[8px] font-bold uppercase tracking-wide">Sair</span>
            </button>
        </nav>
    `;

    // Renderização
    const containerPrincipal = document.getElementById('interface-sistema');
    if (containerPrincipal) {
        // Evita duplicar se já existir
        const oldMenu = document.querySelector('aside');
        if(oldMenu) oldMenu.remove();
        containerPrincipal.insertAdjacentHTML('afterbegin', menuDesktop);
    }

    const oldMobile = document.querySelector('nav.md\\:hidden');
    if(oldMobile) oldMobile.remove();
    document.body.insertAdjacentHTML('beforeend', menuMobile);
}

// === LÓGICA DE UPGRADE ===
window.mostrarAvisoUpgrade = function() {
    if(typeof showToast === 'function') {
        showToast("Seu plano atual não possui este recurso. Acesse Meu Plano para fazer Upgrade.", "info");
    } else {
        alert("🔒 Recurso Bloqueado! Faça o Upgrade do seu plano para liberar esta funcionalidade.");
    }
    // Pode redirecionar para uma página de upgrade se quiser:
    // window.location.href = "meu_plano.html";
};

// Como o menu é injetado, ele só vai exibir os cadeados corretamente APÓS as funcionalidades 
// serem carregadas do banco de dados na tela de dashboard. 
// A função exportada que o dashboard vai chamar:
window.atualizarMenuSeguro = function(funcionalidadesDoPlano) {
    window.funcionalidadesEquipe = funcionalidadesDoPlano;
    carregarMenu(); // Re-renderiza o menu já com as travas certas
};

// Render Inicial
carregarMenu();
