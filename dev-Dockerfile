FROM node:12-alpine

RUN mkdir -p /home/node/react-app/node_modules && chown -R node:node /home/node/react-app

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

WORKDIR /home/node/react-app

COPY package*.json ./

USER node

RUN yarn

RUN npm install react-scripts@3.4.1 -g --silent

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "start" ]