# Convite virtual · Encerramento do Ano Letivo · CPOR/SP

Página para celular (abre direto pelo link do WhatsApp), sem build: `index.html`, `style.css`, `script.js` e as imagens soltas na raiz.

**Como funciona**
1. Envelope lacrado com o selo de cera do CPOR/SP: tocar no selo (ou no envelope) abre a aba e o convite sai.
2. Capa com a foto aérea do CPOR/SP, brasão e "Convite".
3. Mensagem do convite num papel com o selo postal da fachada; as palavras se acendem conforme a rolagem.
4. Contagem regressiva até a Diplomação (depois, até a Formatura).
5. Programação: um cartão para cada data; tocar vira o cartão e mostra o traje. Botão "Agenda" baixa o evento (`diplomacao.ics`, `formatura.ics`) com lembrete um dia antes.
6. Local com mapa e botões do Google Maps e do Waze.
7. Confirmação de presença (Google Forms), WhatsApp e e-mail da Comunicação Social.
8. Rodapé com link para o convite em imagem (`convite.jpg`).

**Para mudar conteúdo**: links, datas, horários, trajes e contatos ficam no objeto `CONVITE` no topo do `script.js`. O texto da mensagem fica no `index.html` (`#mensagem-texto`).

A prévia do link no WhatsApp usa `https://convite-aspirantado.vercel.app/og.jpg`; se o domínio da Vercel for outro, troque no `og:image` do `index.html`.
