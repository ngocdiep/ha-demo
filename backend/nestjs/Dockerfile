FROM node:alpine as backend
WORKDIR /backend/
COPY ./* ./
RUN npm install && npm run build && npm install --production

FROM node:alpine
WORKDIR /usr/src/app
COPY --from=backend ./backend/node_modules ./node_modules
COPY --from=backend ./backend/dist ./
COPY ./migrations/* ./migrations/
COPY package.json ./
EXPOSE 3000
CMD ["sh", "-c", "npm run migrate && npm run start:prod-k8s"]