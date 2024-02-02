# Use uma imagem base do Node.js
FROM node:16

# Crie e defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de package.json e package-lock.json (ou yarn.lock) para o contêiner
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie todos os arquivos da aplicação para o contêiner
COPY . .

# Exponha a porta 3000 para que possa ser acessada do host
EXPOSE 3000

# Inicie o servidor de desenvolvimento do React
CMD ["npm", "start"]