FROM nginx:alpine
LABEL authors="Asiel Leal Celdeiro"
EXPOSE "8181"

# https://docs.docker.com/engine/reference/builder/#copy
COPY target /usr/share/nginx/html
