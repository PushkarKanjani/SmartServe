FROM nginx:alpine
RUN apk add --no-cache openssl && \
    mkdir -p /etc/nginx/certs && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
      -keyout /etc/nginx/certs/server.key \
      -out /etc/nginx/certs/server.crt \
      -subj "/C=IN/ST=Delhi/L=Delhi/O=SmartServe/CN=172.20.10.2" \
      -addext "subjectAltName=IP:172.20.10.2,IP:127.0.0.1,DNS:localhost"
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html
EXPOSE 5175 5176
CMD ["nginx", "-g", "daemon off;"]
