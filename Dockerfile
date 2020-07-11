FROM node:12-alpine

RUN mkdir -p /home/node/react-app/node_modules && chown -R node:node /home/node/react-app

WORKDIR /home/node/react-app

COPY package*.json ./

USER node

RUN yarn


COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "start" ]