# 🚀 Encurta - Encurtador de Links e Gerador de QR Code 📱

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE) ![Status](https://img.shields.io/badge/status-Finalizado-brightgreen) ![Platform](https://img.shields.io/badge/platform-Vercel-blue) ![API](https://img.shields.io/badge/API-Cuttly-orange)

> Um encurtador de links intuitivo e gerador de QR Code! Compartilhe links de forma prática e eficiente.

---

## 📌 Funcionalidades

- 🔗 **Encurtamento de Links**: Converta URLs longas em versões curtas e práticas.
- 🖼️ **Geração de QR Code**: Obtenha um QR Code para o link encurtado.
- 💾 **Download de QR Code**: Baixe o QR Code em formatos PNG e SVG.
- 📱 **Interface Responsiva**: Totalmente adaptado para dispositivos móveis e desktops.
- 🌐 **Implantação na Vercel**: Acesse o projeto em produção [aqui](https://encurta-mocha.vercel.app/).

---

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js
- **Frontend**: HTML5, CSS3, JavaScript
- **APIs Externas**: Integração com a API da Cuttly para encurtamento de URLs.
- **Hospedagem**: Vercel

---

## 🚀 Como Configurar o Projeto Localmente

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/MagnoEmanoel/encurta.git
   ```

2. **Acesse o diretório do projeto**:
   ```bash
   cd encurta
   ```

3. **Instale as dependências**:
   ```bash
   npm install
   ```

4. **Configure as variáveis de ambiente**:

   Crie um arquivo `.env` na raiz do projeto e adicione as variáveis necessárias:
   ```
   CUTTLY_API_KEY=SUA_CHAVE_DE_API
   PORT=3000
   ```

5. **Inicie o servidor**:
   ```bash
   npm start
   ```

   O projeto estará disponível em [http://localhost:3000](http://localhost:3000).

---

## 📂 Estrutura do Projeto

```
encurta/
├── api/
│   └── shorten.js           # Endpoint para encurtamento de links
├── public/
│   ├── images/              # Arquivos de imagens
│   └── index.html           # Interface principal da aplicação
├── node_modules/            # Dependências do Node.js
├── .gitignore               # Arquivos ignorados no Git
├── .env                     # Arquivo de variáveis de ambiente (não commitado)
├── package.json             # Configuração do Node.js
├── package-lock.json        # Controle de versão das dependências
├── vercel.json              # Configuração de deploy na Vercel
├── server.js                # Servidor principal
└── README.md                # Documentação do projeto
```

---

## 📝 Exemplo de Uso

1. Acesse a página principal em produção [aqui](https://encurta-mocha.vercel.app/) ou localmente.
2. Insira o link que deseja encurtar no campo designado.
3. Clique em **"Encurtar e Gerar QR"** para ver o link encurtado e o QR Code.
4. Baixe o QR Code nos formatos **PNG** ou **SVG**.
5. Copie o link encurtado com um clique para compartilhar.

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Siga os passos abaixo para contribuir:

1. **Faça um fork do projeto**.
2. **Crie uma branch para a nova funcionalidade**:
   ```bash
   git checkout -b minha-nova-funcionalidade
   ```
3. **Adicione suas mudanças e faça o commit**:
   ```bash
   git commit -m "Adiciona minha nova funcionalidade"
   ```
4. **Envie para o branch**:
   ```bash
   git push origin minha-nova-funcionalidade
   ```
5. **Abra um Pull Request**!

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.

---

## 📬 Contato

Desenvolvido por Magno Emanoel - [magno_emanoel@outlook.com](mailto:magno_emanoel@outlook.com)

