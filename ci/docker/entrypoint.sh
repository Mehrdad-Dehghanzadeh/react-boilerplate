#!/bin/sh
set -e

echo "Nginx is ready for serving React Boilerplate... :)"

nginx -g 'daemon off;'

exec "$@"
