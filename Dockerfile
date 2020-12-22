FROM node:14.15.3

RUN mkdir -p /opt/notes-app
WORKDIR /opt/notes-app

COPY package.json package-lock.json ./

RUN npm install

CMD ["npm", "run", "start"]
