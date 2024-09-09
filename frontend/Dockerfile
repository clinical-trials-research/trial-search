FROM node:22-alpine AS builder

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

USER node

COPY --chown=node:node package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27.1-alpine 

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
