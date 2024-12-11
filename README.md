
# DecoGenius

**DecoGenius** é uma aplicação que utiliza inteligência artificial para criar e personalizar designs de interiores, oferecendo soluções criativas e adaptadas às preferências dos usuários.

## Estrutura do Projeto

O repositório está dividido em duas pastas principais:

- **`API`**: Contém o código do backend, desenvolvido em Python utilizando Flask, com integração ao banco de dados PostgreSQL.
- **`app`**: Contém o código do frontend, desenvolvido para oferecer uma interface amigável e intuitiva.

## Tecnologias Utilizadas

- **Frontend**: React Native
- **Backend**: Python com Flask
- **Banco de Dados**: PostgreSQL
- **Infraestrutura**: Docker
## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/decogenius.git
   ```

### Configurando o Backend

1. Navegue até a pasta `API`:
   ```bash
   cd decogenius/API
   ```
2. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
3. Configure as variáveis de ambiente no arquivo `.env` com os detalhes do PostgreSQL.
4. Inicie o servidor:
   ```bash
   flask run
   ```

### Configurando o Frontend

1. Navegue até a pasta `app`:
   ```bash
   cd ../app
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

## Uso

- Acesse o frontend pelo endereço exibido ao rodar o servidor.
- O backend estará disponível na porta configurada (padrão: `http://localhost:5000`).

## Diagramas

### Diagrama de Entidade-Relacionamento
![Diagrama de Entidade-Relacionamento](./Diagrama/Diagrama%20de%20Entidade%20e%20Relacionamento%20-%20DER.jpg)

### Diagrama do Formulário de Perguntas
[Link para o diagrama do formulário de perguntas](https://miro.com/app/board/uXjVPE6ILDA=/?share_link_id=20665834125)

## Formulários

Durante o desenvolvimento deste projeto, foram criados dois formulários para coleta de feedback e análise:

1. **Usabilidade do ChatGPT para Automação de Design de Interiores**  
   Este formulário foi utilizado para avaliar como os usuários interagiram com o ChatGPT, focando na usabilidade da automação de design de interiores. Ele inclui perguntas sobre a experiência, o tempo necessário para alcançar os resultados e a satisfação geral.

2. **Avaliação da Aplicação Desenvolvida**  
   Este formulário foi projetado para coletar feedback sobre a experiência dos usuários ao utilizarem a aplicação desenvolvida, com foco em aspectos como interface, funcionalidades e eficiência na geração de designs.

Os formulários com todas as respostas obtidas podem ser encontrados na pasta `Formulários`

## Contribuindo

Contribuições são bem-vindas! Para começar:

1. Faça um fork do projeto.
2. Crie um branch para suas alterações:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Faça suas alterações e envie suas mudanças:
   ```bash
   git commit -m "Descrição da alteração"
   git push origin feature/nova-funcionalidade
   ```
4. Abra um Pull Request.
