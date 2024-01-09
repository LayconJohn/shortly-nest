FROM node:20-slim

RUN apt update && apt install -y openssl

USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./


CMD ["/home/node/app/.docker/start-dev.sh"]
