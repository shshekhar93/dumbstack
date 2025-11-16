FROM node:lts-alpine
RUN apk add git bash curl nginx

EXPOSE 8080
VOLUME [ "/data", "/uploads" ]

WORKDIR /root/dumb-suite

COPY bootstrap.sh /tmp/
RUN chmod +x /tmp/bootstrap.sh
RUN /tmp/bootstrap.sh
RUN rm /tmp/bootstrap.sh

RUN rm /etc/nginx/http.d/default.conf
COPY dumbstack.conf /etc/nginx/http.d/

COPY ecosystem.config.js ./
COPY utils.js ./
COPY start.sh /usr/bin/
RUN chmod +x /usr/bin/start.sh
ENTRYPOINT ["/usr/bin/start.sh"]
