FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

# Install all dependencies, including devDependencies
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
