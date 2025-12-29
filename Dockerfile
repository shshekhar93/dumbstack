FROM node:lts-alpine
RUN apk add git bash curl nginx

EXPOSE 8080
VOLUME [ "/data", "/uploads" ]

WORKDIR /root/dumb-suite

# Copy DumbShowCase files
RUN mkdir -p DumbShowCase/static
COPY DumbShowCase/package.json ./DumbShowCase
COPY DumbShowCase/package-lock.json ./DumbShowCase
COPY DumbShowCase/serve.json ./DumbShowCase
COPY DumbShowCase/static ./DumbShowCase/static

# Copy and run bootstrap script
COPY bootstrap.sh /tmp/
RUN chmod +x /tmp/bootstrap.sh
RUN /tmp/bootstrap.sh
RUN rm /tmp/bootstrap.sh

# Setup Nginx
RUN rm /etc/nginx/http.d/default.conf
COPY dumbstack.conf /etc/nginx/http.d/

# Copy PM2 config and start script
COPY ecosystem.config.js ./
COPY utils.js ./
COPY start.sh /usr/bin/
RUN chmod +x /usr/bin/start.sh
ENTRYPOINT ["/usr/bin/start.sh"]
