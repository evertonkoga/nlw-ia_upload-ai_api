<center>
  <p align="center">
    <img src="https://github.com/evertonkoga/nlw-ia_upload-ai_api/assets/54872138/74fd083b-7ddf-426a-8def-0f5243fd005a" width=110px height="110px" /> &nbsp;
    <img src="https://github.com/evertonkoga/nlw-ia_upload-ai_api/assets/54872138/bfed4c4b-d3b7-44fa-9522-533058961b63" width=110px height="110px" /> &nbsp;
    <img src="https://github.com/evertonkoga/nlw-ia_upload-ai_api/assets/54872138/03d71293-5894-4414-b5da-5de8cac381c0" width=110px height="110px "/>
  </p>  
  <h1 align="center">🎬 Back-end: Gerador de conteúdo com IA através de vídeos</h1>
  <p align="justify">    
    Em resumo, o back-end inicia o processo ao receber um áudio e, em seguida, envia uma solicitação à <a href="https://openai.com/">OpenAI</a> para transcrever o áudio, incluindo uma ou mais palavras-chave.
    Após receber a resposta, os dados do vídeo, juntamente com a transcrição, são armazenados no banco de dados por meio do Prisma.<br/>
    Em um estágio subsequente, o back-end processa outra requisição para a geração de conteúdo dinâmico,enviando uma solicitação à OpenAI
    com base em instruções <b>(prompt)</b> e um valor que define o nível de criatividade desejado para a criação do conteúdo <b>(temperatura)</b>. 
    Quanto maior o valor da temperatura (0~1), maior a probabilidade de obter resultados mais criativos, embora isso também possa resultar em possíveis erros.<br/><br/>
    Para desenvolver o back-end, foi utilizado as tecnologias <b>Node</b> e <b>Typescript</b>, com o auxílio da biblioteca <b><a href="https://fastify.dev/">Fastify</a></b> para a construção de APIs eficientes.
    Além disso, foi aprimorado a entrega dos conteúdos dinâmicos ao incorporar a biblioteca <b>'ai'</b>, que possibilita o envio em tempo real do conteúdo em um fluxo contínuo, disponibilizando gradualmente os coneteúdos ao front-end.
  </p>
</center>
<br />

## Como executar?

1. Clonar o repositório:
```sh
git clone https://github.com/evertonkoga/nlw-ia_upload-ai_api.git
```

2. Baixar as dependências:
```shell
yarn
```
> Caso seja a aprimeira execução após baixar o projeto.
> Execute os passos do item **Variáveis de ambiente**

3. Executar o projeto:
```shell
yarn dev
```

## Variáveis de ambiente

Para o funcionamento do Prisma e as APIs da OpenAI, é necessário criar um arquivo **.env** na raiz do projeto e adicionar os valores baixo:

```shell
DATABASE_URL="file:./dev.db"
OPENAI_KEY="sua key da OpenAI localizada em canto superior direito -> seu perfil -> View API keys"
```

## Banco de dados
### Migrações do banco de dados
Para criar o banco de dados e executar as migration e seeds, execute o comando abaixo:

```shell
npx prisma migrate dev --name init
```
Pronto! Agora o banco de dados está pronto para ser utilizado.

#### Executar seeds

Caso queira popular o banco com informações base necessárias.
Adicione na raiz do **package.json** os dados abaixo:

```json
"prisma": {
  "seed": "tsx prisma/seed.ts"
}
```
Em seguida execute o comando:
```shell
npx prisma db seed
```

#### Problema após alterações diretamente no banco

Caso tenha alterado a estrutura de alguma tabela diretamento no banco, terá problemas com execuções futuras através do Prisma.
Neste caso execute o comando abaixo, para sincronizar a banco com os arquivos do projeto.

```shell
npx prisma migrate DATA_BASE
```

#### Visualizar os dados

Caso deseje visualizar os dados no banco, sem a necessidade de instar um client.
Execute o comando a baixo:

```shell
npx prisma studio
```

#### Para simplicar a utilização do Prisma no VS Code

1. Instale o plugin do Prisma
2. Configure a autoformatação do código no arquivo .prisma, seguindo os passos abaixo:

Precione as teclas **ctrl + shift + p**, em seguida digite json.
Selecione a opção ***Preferences: Open User Settings (JSON)***
e adicione o conteúdo abaixo e salve.

~~~json
"[prisma]": {
    "editor.formatOnSave": true
},
~~~

