FROM node:lts-alpine
RUN apk add git bash nginx

ARG DUMBSTACK_DOMAIN

EXPOSE 8080

COPY dumbstack.conf /etc/nginx/http.d/
COPY bootstrap.sh /tmp/
RUN chmod +x /tmp/bootstrap.sh
RUN /tmp/bootstrap.sh ${DUMBSTACK_DOMAIN}

COPY start.sh /usr/bin/
RUN chmod +x /usr/bin/start.sh
ENTRYPOINT ["/usr/bin/start.sh"]

