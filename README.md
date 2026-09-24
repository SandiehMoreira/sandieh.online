# sandieh.online

Portfólio de **Sandieh Moreira**: técnico de celular especialista em iPhone e Android e desenvolvedor de sites, apps e softwares, em Curitiba/PR.

🌐 **https://sandieh.online**

## Sobre o site

- Tema hacker + game, com intro cinematográfica, efeitos de scroll e HUD de personagem
- Seção de serviços (assistência iOS/Android, sites, apps e softwares)
- Projetos carregados automaticamente dos repositórios do GitHub
- Formulário de orçamento que abre direto no WhatsApp
- Easter eggs: 45 cheats do GTA San Andreas (códigos de PC e combos de PS2, com suporte a controle)

## Tecnologias

HTML, CSS e JavaScript puros, sem dependências e sem build.

## Rodar localmente

```bash
python3 -m http.server 5500
```

Depois abra http://localhost:5500

## Configuração

Contatos (WhatsApp, e-mail, Instagram, GitHub) ficam no objeto `CONFIG`, no começo do `script.js`.

## Deploy (Cloudflare)

O site roda na Cloudflare (Workers com arquivos estáticos), nos domínios `sandieh.online` e `www.sandieh.online`.

```bash
npx wrangler deploy
```

- `wrangler.jsonc`: configuração do projeto e dos domínios
- `.assetsignore`: arquivos que não vão para o site publicado (`.git`, README, configs)
