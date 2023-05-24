FROM node:18-alpine As build
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node prisma ./prisma
COPY --chown=node:node . .
RUN npm install
RUN npm run prisma:generate
RUN npm run build
ENV NODE_ENV production
USER node

FROM node:18-alpine As production
COPY --chown=node:node --from=build /usr/src/app/ ./
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
CMD [  "npm", "run", "start:migrate:prod" ]