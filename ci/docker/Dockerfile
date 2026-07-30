FROM node:22-alpine AS builder
ENV NODE_ENV production
WORKDIR /home/app

# copy required files installing deps & building project
COPY package.json .
COPY src/ .
COPY .env .

RUN  npm install --prod=false && npm build

FROM nginx:alpine

WORKDIR /var/www

COPY ./ci/nginx/config/ /etc/nginx/

RUN rm /etc/nginx/conf.d/default.conf && \
	mkdir /etc/nginx/sites-enabled/

COPY ./ci/nginx/vhosts/ /etc/nginx/sites-enabled/

COPY --from=builder /home/app .

COPY ./ci/docker/entrypoint.sh /usr/local/bin/entrypoint.sh

RUN  chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
