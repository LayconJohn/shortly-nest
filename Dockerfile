FROM node:latest AS builder

# Create app directory
WORKDIR /app

COPY . .

# Install app dependencies
RUN npm install

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
