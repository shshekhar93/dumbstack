FROM node:lts-alpine
RUN apk add git bash curl nginx

EXPOSE 8080

WORKDIR /root/dumb-suite

COPY bootstrap.sh /tmp/
RUN chmod +x /tmp/bootstrap.sh
RUN /tmp/bootstrap.sh

RUN rm /etc/nginx/http.d/default.conf
COPY dumbstack.conf /etc/nginx/http.d/
RUN sed -i "15i server_name ${DUMBSTACK_DOMAIN}" /etc/nginx/http.d/dumbstack.conf

COPY ecosystem.config.js ./
COPY start.sh /usr/bin/
RUN chmod +x /usr/bin/start.sh
ENTRYPOINT ["/usr/bin/start.sh"]

