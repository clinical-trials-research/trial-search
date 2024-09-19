FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

# RUN npm run build

# FROM nginx:1.27.1-alpine 

# COPY --from=builder /app/dist /usr/share/nginx/html

# COPY ./ssl/trialsearch.xyz.crt /etc/ssl
# COPY ./ssl/trialsearch.xyz.key /etc/ssl

# COPY nginx.conf /etc/nginx

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
