# 🚀 Encurta - Encurtador de Links e Gerador de QR Code 📱

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE) ![Status](https://img.shields.io/badge/status-Em%20Desenvolvimento-blue)

> Um encurtador de links fácil de usar e gerador de QR Code! Ideal para compartilhar links de forma prática e com design amigável.

---

## 📌 Funcionalidades

- 🔗 **Encurtamento de Links**: Transforme URLs longas em versões curtas.
- 🖼️ **Geração de QR Code**: Receba um QR Code correspondente ao link encurtado.
- 📱 **Interface Responsiva**: Funciona bem em dispositivos móveis e desktops.
- 💾 **Download de QR Code**: Baixe o QR Code em formatos PNG e SVG para facilitar o uso.

---

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js, Express, Axios
- **Frontend**: HTML5, CSS3, JavaScript
- **APIs Externas**: Utiliza APIs de terceiros para encurtamento de URLs e geração de QR Codes.

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
   API_URL=SUA_API_URL
   API_KEY=SUA_CHAVE_DE_API
   PORT=3000
   ```

5. **Inicie o servidor**:
   ```bash
   npm start
   ```
   
   O projeto estará rodando em [http://localhost:3000](http://localhost:3000).

---

## 📂 Estrutura do Projeto
```
encurta/
├── controllers/
│   └── linkController.js       # Controlador para encurtamento de links
├── images/
│   ├── happy-woman.jpg         # Imagem de fundo
│   └── icon.png                # Ícone da aplicação
├── node_modules/               # Dependências do Node.js
├── .gitignore                  # Arquivos ignorados no Git
├── .gitattributes              # Configurações para contagem de linguagens no GitHub
├── .env                        # Arquivo de variáveis de ambiente (não commitado)
├── favicon.ico                 # Favicon da aplicação
├── index.html                  # Interface principal da aplicação
├── package.json                # Arquivo de configuração do Node.js
├── package-lock.json           # Controle de versão das dependências
└── server.js                   # Servidor Express principal
```

---

## 📝 Exemplo de Uso

1. Acesse a página principal e insira o link que deseja encurtar.
2. Clique em "Encurtar e Gerar QR" para ver o link encurtado e o QR Code gerado.
3. Baixe o QR Code nos formatos PNG ou SVG, se necessário.
4. Copie o link encurtado com um clique para facilitar o compartilhamento.

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