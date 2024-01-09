FROM node:20-slim

USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node packgae*.json ./


CMD ["/home/node/app/start-dev.sh"]
