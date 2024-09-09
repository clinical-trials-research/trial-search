FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm install

ENV NODE_ENV=production

COPY . .
RUN npm run build

FROM nginx:1.27.1-alpine 

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
