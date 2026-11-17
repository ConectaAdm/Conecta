// =============================================================
// Registro do Service Worker (PWA) do C.O.N.E.C.T.A
// Incluído em todas as páginas. Ele "liga" o service worker
// (/sw.js) e oferece o botão de instalar o app quando possível.
// =============================================================
(function () {
  // 1) Registra o service worker (só funciona em HTTPS ou em localhost)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((reg) => console.log('[PWA] Service worker registrado:', reg.scope))
        .catch((err) => console.error('[PWA] Falha ao registrar o service worker:', err));
    });
  }

  // 2) Botão "Instalar app" (Chrome/Edge/Android).
  //    O navegador dispara 'beforeinstallprompt' quando o site pode ser instalado.
  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    showInstallButton();
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    hideInstallButton();
    console.log('[PWA] App instalado com sucesso.');
  });

  function showInstallButton() {
    if (document.getElementById('pwa-install-btn')) return;
    const btn = document.createElement('button');
    btn.id = 'pwa-install-btn';
    btn.type = 'button';
    btn.textContent = '📲 Instalar app';
    btn.setAttribute('aria-label', 'Instalar o CONECTA como aplicativo');
    Object.assign(btn.style, {
      position: 'fixed',
      right: '1rem',
      bottom: '1rem',
      zIndex: '9999',
      background: '#4f46e5',
      color: '#ffffff',
      border: 'none',
      borderRadius: '999px',
      padding: '0.75rem 1.25rem',
      fontSize: '0.95rem',
      fontWeight: '600',
      fontFamily: 'inherit',
      cursor: 'pointer',
      boxShadow: '0 8px 20px rgba(79, 70, 229, 0.35)'
    });
    btn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      hideInstallButton();
    });
    document.body.appendChild(btn);
  }

  function hideInstallButton() {
    const btn = document.getElementById('pwa-install-btn');
    if (btn) btn.remove();
  }
})();
