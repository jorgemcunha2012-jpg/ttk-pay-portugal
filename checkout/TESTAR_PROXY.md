# Testar com Proxy (resolver erro 500)

Se o erro "Disturbance in spacetime detected" continuar, a API Cooud pode estar a rejeitar pedidos diretos do browser. Usa o proxy local:

## Passos

1. **Abre o terminal** na pasta do projeto

2. **Entra na pasta checkout:**
   ```bash
   cd checkout
   ```

3. **Inicia o proxy:**
   ```bash
   node server-proxy.js
   ```
   Deve aparecer: `Proxy Cooud em http://localhost:3001`

4. **Altera o config.js** – abre `checkout/config.js` e muda a linha `apiUrl`:
   ```javascript
   apiUrl: 'http://localhost:3001/checkout_sessions',
   ```
   (comenta ou remove a linha com orbit.cooud.com)

5. **Recarrega a página** do checkout e clica em "Pagar" novamente

6. **Mantém o terminal aberto** enquanto testas – o proxy precisa estar a correr
