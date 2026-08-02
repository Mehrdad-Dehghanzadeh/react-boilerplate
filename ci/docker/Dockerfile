FROM node:22-alpine AS builder
ENV NODE_ENV=production
WORKDIR /home/app

# copy required files installing deps & building project
COPY package.json .
COPY src/ .
COPY ./ci/docker/.env.prod .env

RUN  npm install --prod=false

COPY tsconfig*.json .
COPY vite.config.* .
COPY index.html .
COPY src/ ./src/
COPY public/ ./public/
COPY global.d.ts .
COPY eslint.config.js .
COPY tailwind.config.js .
COPY postcss.config.js .

RUN  npm run build

FROM nginx

COPY ./ci/nginx/config/ /etc/nginx/

RUN rm -f /etc/nginx/conf.d/default.conf \
	&& mkdir -p /etc/nginx/sites-enabled

COPY ./ci/nginx/vhosts/ /etc/nginx/sites-enabled/

COPY --from=builder /home/app/dist /var/www/

COPY ./ci/docker/entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
