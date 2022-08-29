FROM node:16-alpine as builder

WORKDIR /build
COPY package.json package.json
RUN yarn install --frozen-lockfile

FROM node:16-alpine as runtime
WORKDIR /app
COPY --from=builder /build/node_modules ./node_modules

COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY package.json package.json

CMD [ "yarn", "start"]