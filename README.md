# TikTok Pay Portugal — base do projeto

Funil estático na raiz (`index.html`, `presell*.html`), checkout MB WAY em `checkout/*.html` com APIs Node em `api/` (compatível com Vercel). Ficheiros `checkout/*.php` mantêm-se para hosting com PHP.

## Entrada principal

- **`index.html`** — Quiz (Vercel / estático). Apache: `.htaccess` usa `DirectoryIndex index.html`.
- **`presell1.html`** → **`presell2.html`** → **`index.html`** (query string preservada no JS em `assets/js/landings/`).

## Requisitos

- **Só funil:** qualquer hosting estático.
- **Checkout WayMB na Vercel:** define as variáveis em *Settings → Environment Variables* (ver `.env.example`). Endpoints: `POST /api/mbway-create`, `POST /api/mbway-transaction-status`, `POST /api/webhook-waymb` (URL de callback na WayMB).
- **Checkout PHP (legado):** `checkout/*.php` em servidor com PHP.

### WayMB (MB WAY no `gateway.php`)

Na **raiz** do projecto, ficheiro `.env` (usa `.env.example` como modelo): `WAYMB_CLIENT_ID`, `WAYMB_CLIENT_SECRET`, `WAYMB_ACCOUNT_EMAIL` (email da conta WayMB). Sem `WAYMB_ACCOUNT_EMAIL`, o fluxo MB WAY redirecciona com erro. O `gateway.php` também lê estas variáveis se as definires no painel do hosting.

## Estrutura

| Ficheiro / pasta | Função |
|------------------|--------|
| `index.html`, `presell1.html`, `presell2.html` | Landings servidas directamente |
| `assets/css`, `assets/js` | Estilos e scripts |
| `includes/sections/` | Fragmentos HTML reutilizáveis (podes voltar a gerar páginas a partir daqui) |
| `checkout/` | `index.html`, `pagar.html` (Vercel/JS); `*.php` (hosting PHP) |
| `api/` | Funções serverless: MB WAY + webhook WayMB |
| `lib/` | Lógica partilhada Node (`waymb-server.js`) |
| `ups/` | Upsells |

## Deploy em subpasta

Ajusta os `href`/`src` relativos ou usa um prefixo comum nas landings se o site não estiver na raiz do domínio.

## Vercel: erro 403 Forbidden

1. **Deployment Protection** — No projeto: *Settings → Deployment Protection*. Se estiver *Standard* / *Vercel Authentication* também em **Production**, visitantes sem login veem 403. Para o domínio público: desactiva para Production ou limita a *Preview* apenas.
2. **Root Directory** — *Settings → General → Root Directory* deve estar **vazio** (raiz do repo), a menos que o código esteja noutra pasta.
3. **Build** — *Framework Preset*: **Other**; *Build Command* e *Output Directory* vazios (site estático com `index.html` na raiz).
4. **Domínio** — Confirma em *Settings → Domains* que o domínio aponta para este projeto e que o deploy de *Production* está *Ready*.
5. **Firewall / bloqueios** — Em *Security* verifica regras que possam bloquear o teu país ou IP.

## Variáveis de ambiente (checkout / includes PHP)

Ficheiro `.env` na raiz é lido por `includes/site-config.php` quando usas includes PHP. Para tracking nas landings estáticas, os IDs estão inline no HTML (ou edita os ficheiros).
