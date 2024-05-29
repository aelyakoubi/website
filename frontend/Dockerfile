FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

# Remove existing node_modules and package-lock.json to ensure clean install
RUN rm -rf node_modules package-lock.json && npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
