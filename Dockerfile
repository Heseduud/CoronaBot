FROM node:latest
WORKDIR usr/src/bot
COPY package.json .
# COPY config.json .
RUN npm install
COPY . .
CMD ["npm", "start"]