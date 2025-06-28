FROM node:20.17.0-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

FROM base AS build

COPY . .

RUN yarn prisma generate

RUN yarn build

FROM node:20.17.0-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/package.json /app/yarn.lock

RUN yarn install --production --frozen-lockfile

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma/__generated__ ./prisma/__generated__

CMD ["node", "dist/main"]
