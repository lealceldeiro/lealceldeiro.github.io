FROM nginx:1.25-alpine
LABEL authors="Asiel Leal Celdeiro"
EXPOSE "8181"

# https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-docker/#copying-content-and-configuration-files-from-the-docker-host
RUN rm /etc/nginx/conf.d/default.conf
COPY custom_nginx.conf /etc/nginx/nginx.conf

# https://docs.docker.com/engine/reference/builder/#copy
COPY target /usr/share/nginx/html
