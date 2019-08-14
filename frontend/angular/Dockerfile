FROM node:alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build:prod

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist/* /usr/share/nginx/html/