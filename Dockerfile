FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY edge-ai-industry-map.html /usr/share/nginx/html/edge-ai-industry-map.html

EXPOSE 8080
