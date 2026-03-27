# API Cooud - Checkout Sessions

Para usar as checkout sessions — que te permitem criar URLs de checkout para seus clientes com ofertas selecionadas — siga os passos neste guia.

## Primeiro: Criar um token de acesso (Access Token)

1. Entre no dashboard da Cooud
2. Aceda à sua store
3. Vá à aba **"Integrações"**
4. Faça scroll para baixo até à secção **"Tokens de Acesso"**
5. Clique no botão **"Novo token"**
6. Dê um nome descritivo para identificar o token
7. Clique em **"Criar token"**
8. Copie o token gerado e guarde-o com cuidado

## Segundo: Usar a API de Checkout Sessions

Com o token de acesso, use a API para criar checkouts para os seus clientes.

### Endpoint

```
POST https://orbit.cooud.com/checkout_sessions
```

### Headers

| Header | Valor |
|--------|-------|
| Content-Type | application/json |
| Authorization | Bearer {seu_token_de_acesso} |

### Corpo da requisição

```json
{
  "prices": ["id_oferta_1", "id_oferta_2"]
}
```

### Resposta (200 OK)

```json
{
  "id": "string",
  "store_id": "string",
  "user_id": "string",
  "customer_email": "hello@example.com",
  "client_secret": "string",
  "amount": 1,
  "tax_amount": 1,
  "discount_amount": 1,
  "net_amount": 1,
  "total_amount": 1,
  "status": "open",
  "url": "https://checkout.cooud.com/checkout/orbit_cs_onetwothree",
  "success_url": "https://example.com",
  "created_at": "2026-03-14T00:39:00.163Z",
  "modified_at": "2026-03-14T00:39:00.163Z"
}
```

### Fluxo

1. Chame o endpoint com os IDs das ofertas
2. Redirecione o cliente para o campo **`url`** da resposta
3. O cliente paga no checkout hospedado da Cooud
4. Após o pagamento, o cliente é redirecionado para `success_url`

### Métodos de pagamento no checkout Cooud

- **Android:** Cartão de crédito/débito + Google Pay
- **iPhone:** Cartão de crédito/débito + Apple Pay

## Obter o ID do preço

A Cooud não mostra o ID do preço na dashboard. Usa a ferramenta incluída:

1. Abre `checkout/listar-precos.html` no browser
2. O token é preenchido automaticamente (ou cola-o manualmente)
3. Clica em "Listar preços"
4. Copia o ID do preço que queres usar
5. Cola no `config.js` em `prices: ['ID_COPIADO']`

## Troubleshooting: "Disturbance in spacetime detected: internal server error"

Este erro (500) ocorre normalmente por:

1. **ID do preço incorreto** – O ID `01KKNAV4H1VSXWKG13QZ8W6D0Q` contém caracteres inválidos (W, Q, S). A API Cooud exige 26 caracteres usando apenas: 0-9, A-H, J, K, M, N, P, T, U, V, X, Y, Z.
   - **Solução:** Abre `obter-ids.html` no teu site (ou `listar-precos.php` diretamente) para obter o ID correto. Copia e cola no `config.js` em `prices: ['ID_COPIADO']`.

2. **Token inválido ou expirado** – Se `listar-precos.php` devolver 401, gera um novo token na dashboard Cooud (Integrações > Tokens).

3. **API a rejeitar pedidos do browser** – Usa o proxy PHP (`create-session.php`) na Hostinger ou o proxy local:
   ```bash
   node checkout/server-proxy.js
   ```
   Depois em `config.js`: `apiUrl: 'http://localhost:3001/checkout_sessions'`

4. **Problema temporário na Cooud** – Tenta novamente mais tarde

## Exemplo em JavaScript

```javascript
const response = await fetch('https://orbit.cooud.com/checkout_sessions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {seu_token_de_acesso}'
  },
  body: JSON.stringify({
    prices: ['id_da_oferta']
  })
});

const data = await response.json();

if (data.url) {
  window.location.href = data.url; // Redirecionar para o checkout
}
```
