# Build layer
FROM node:16-alpine as builder
WORKDIR /build

COPY package.json .
COPY tsconfig.json .
COPY src .

RUN yarn install --frozen-lockfile --production

# Runtime layer
FROM node:16-alpine as runtime

WORKDIR /app
COPY --from=builder /build .

ENV NODE_ENV=production
ENTRYPOINT [ "yarn", "start"]