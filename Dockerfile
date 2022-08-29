FROM node:16-alpine

WORKDIR /app
ADD src src
ADD package.json package.json
RUN yarn install

CMD [ "yarn", "start"]