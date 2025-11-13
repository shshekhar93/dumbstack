#!/bin/bash
echo "Starting dumb suite"

cd ~/dumb-suite/
pm2 start ecosystem.config.js

# Nginx stuff
if [ -f /etc/nginx/http.d/default.conf ]; then
    rm /etc/nginx/http.d/default.conf # Remove default config file
fi

if [ -z "$DUMBSTACK_DOMAIN" ]; then
  echo "DUMBSTACK_DOMAIN is not set. Using localhost as default."
else
  sed -i "s/server_name _;/server_name $DUMBSTACK_DOMAIN;/g" /etc/nginx/http.d/dumbstack.conf
fi

nginx
/bin/bash
