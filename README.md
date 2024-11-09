# Projeto Faculdade - 2º Semestre

Nosso projeto é uma plataforma que conecta motoristas e passageiros, oferecendo uma experiência de transporte segura e prática. Com funcionalidades como gestão de corridas, navegação integrada, histórico de ganhos e avaliações, o app facilita o dia a dia dos motoristas, garantindo qualidade e conveniência para todos os usuários.

## Configuração do Ambiente

### Etapa 1: Inicializar o Projeto

1. **Inicializar o Projeto**
   ```bash
   npm init -y
   ```
   Descrição: Este comando inicializa um novo projeto Node.js com as configurações padrão, criando um arquivo `package.json` com informações básicas do projeto.

2. **Instalar TypeScript e Dependências**
   ```bash
   npm install -D typescript ts-node @types/node
   ```
   Descrição: Este comando instala TypeScript (uma linguagem que adiciona tipagem estática ao JavaScript), `ts-node` (uma ferramenta para executar arquivos TypeScript diretamente) e `@types/node` (tipos do Node.js para suporte a TypeScript).

3. **Configurar TypeScript**
   ```bash
   npx tsc --init
   ```
   Descrição: Este comando cria um arquivo `tsconfig.json` com as configurações padrão do TypeScript, que permite personalizar como o TypeScript compila o código.

### Etapa 2: Instalar o Express

1. **Instalar o Express**
   ```bash
   npm install express
   ```
   Descrição: Este comando instala o Express, que facilita a criação de servidores e APIs com Node.js.

2. **Instalar Tipos do Express**
   ```bash
   npm install -D @types/express
   ```
   Descrição: Este comando instala as definições de tipos do Express para TypeScript, permitindo uma melhor integração e suporte a tipagem estática.

### Etapa 3: Configurar o Prisma

1. **Instalar o Prisma**
   ```bash
   npm install -D prisma
   npx prisma init
   ```
   Descrição: O Prisma é um ORM (Object Relational Mapping) que simplifica a interação com o banco de dados. Após a instalação, inicialize o projeto com o comando `init`.

## Conclusão

Com essas etapas, você terá configurado o ambiente de desenvolvimento para o seu projeto. Siga as instruções e adapte conforme necessário para atender aos requisitos específicos do seu projeto.
