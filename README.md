# ETAPA 1
# projeto-faculdade-2-Semestre
Nosso projeto é uma uma plataforma que conecta motoristas e passageiros, oferecendo uma experiência de transporte segura e prática. Com funcionalidades como gestão de corridas, navegação integrada, histórico de ganhos e avaliações, o app facilita o dia a dia dos motoristas, garantindo qualidade e conveniência para todos os usuários.

# Configuração do ambiente. Siga os passos abaixo para configurar o ambiente de desenvolvimento.

1. Inicializar o Projeto
Use o comando abaixo para iniciar um novo projeto Node.js e criar um arquivo package.json:

npm init -y
Descrição: Este comando inicializa um novo projeto Node.js com as configurações padrão, criando um arquivo package.json com informações básicas do projeto.

2. Instalar TypeScript e Dependências
Execute o seguinte comando para instalar o TypeScript, ts-node e os tipos do Node.js como dependências de desenvolvimento:

npm install -D typescript ts-node @types/node
Descrição: Este comando instala TypeScript (uma linguagem que adiciona tipagem estática ao JavaScript), ts-node (uma ferramenta para executar arquivos TypeScript diretamente) e @types/node (tipos do Node.js para suporte a TypeScript).

3. Configurar TypeScript
Inicialize um arquivo de configuração do TypeScript (tsconfig.json) com as configurações padrão:

npx tsc --init
Descrição: Este comando cria um arquivo tsconfig.json com as configurações padrão do TypeScript, que permite personalizar como o TypeScript compila o código.

# Instalar o Express
1. Instale o Express, um framework minimalista e flexível para Node.js, com o seguinte comando:

npm install express
Descrição: Este comando instala o Express, que facilita a criação de servidores e APIs com Node.js.

2. Instalar Tipos do Express
Instale os tipos do Express para TypeScript com o seguinte comando:

npm install -D @types/express
Descrição: Este comando instala as definições de tipos do Express para TypeScript, permitindo uma melhor integração e suporte a tipagem estática.

# Agora, vamos configurar as dependências do Prisma. O Prisma é um ORM (Object Relational Mapping) que simplifica a interação com o banco de dados. Após a instalação, inicializaremos o projeto com o comando init.

npm install -D prisma
npx prisma init

# ETAPA 2



