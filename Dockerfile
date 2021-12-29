FROM node:16

RUN apt update && apt install -y nginx
COPY ./.devops/nginx.conf /etc/nginx/sites-available/default

WORKDIR /app
COPY ./backend/package*.json ./backend/
COPY ./frontend/package*.json ./frontend/

WORKDIR /app/backend
RUN npm ci

WORKDIR /app/frontend
RUN npm ci

WORKDIR /app
COPY ./backend ./backend/
COPY ./frontend ./frontend/

WORKDIR /app/frontend
ENV VUE_APP_BASE_URL=/api/
ENV VUE_APP_IMAGE_URL=/api/image/src/%id%
RUN npm run build

WORKDIR /app/backend

CMD service nginx start && npm run migrate && npm run start
