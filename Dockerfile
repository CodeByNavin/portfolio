FROM node:23 AS base

FROM base AS build
WORKDIR /app
COPY . .
COPY package.json ./
ENV NODE_ENV=production
RUN npm install 

RUN npm run build


FROM base AS dokploy
WORKDIR /app

ENV NODE_ENV=production

# Copy only the necessary files
COPY --from=build /app ./
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD [ "npm", "run", "start" ]