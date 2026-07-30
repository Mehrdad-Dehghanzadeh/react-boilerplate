#!/bin/sh
set -e

echo "Nginx is ready for serving PWA ap-campaign... :)"

exec sed -i "s/\$GRAYLOG_SERVER/$GRAYLOG_SERVER/g" /etc/nginx/sites-enabled/default.conf & \
nginx -g 'daemon off;'

exec "$@"
