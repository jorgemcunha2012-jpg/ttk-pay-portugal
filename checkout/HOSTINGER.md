# Hospedar na Hostinger

## Estrutura de ficheiros

Na pasta `checkout/` do teu site, coloca:

```
checkout/
├── index.php            ← Página de checkout (estilos inline no ficheiro)
├── checkout.js
├── config.js
├── create-session.php   ← Proxy PHP para a API Cooud
└── ...
```

Estilos partilhados com o quiz principal: `../assets/css/checkout.css` (pasta na raiz do projeto).

## Passos

1. **Faz upload** de toda a pasta `checkout/` para o explorador de ficheiros da Hostinger (File Manager)
2. Garante que o `create-session.php` está **na mesma pasta** que o `index.html`
3. O `config.js` já está configurado para usar `create-session.php`

## Como funciona

- O browser chama `create-session.php` (no teu servidor)
- O PHP chama a API da Cooud e devolve a resposta
- O checkout recebe a URL e redireciona o utilizador

## Alterar token ou preço

Edita o `create-session.php` e altera as linhas:
- `$token = '...'` – token da Cooud
- `"prices":["01KKNAV4H1VSXWKG13QZ8W6D0Q"]` – ID do preço
