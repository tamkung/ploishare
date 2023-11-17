FROM nginx:1.21.0-alpine

COPY /release-web /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]