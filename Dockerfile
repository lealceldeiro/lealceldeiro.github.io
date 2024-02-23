FROM nginx:1.25-alpine
LABEL authors="Asiel Leal Celdeiro"
EXPOSE "8181"

# https://docs.docker.com/engine/reference/builder/#copy
COPY target /usr/share/nginx/html
