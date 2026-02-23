FROM docker.io/alpine:latest AS build
WORKDIR /src
RUN apk add --no-cache git wget
RUN wget -O- https://github.com/gohugoio/hugo/releases/download/v0.153.0/hugo_extended_0.153.0_linux-amd64.tar.gz | tar xz -C /usr/local/bin
COPY . /src
RUN mkdir -p /src/themes/hello-friend-ng && git clone --depth=1 --branch=master https://github.com/rhazdon/hugo-theme-hello-friend-ng.git /src/themes/hello-friend-ng
RUN hugo --minify

FROM docker.io/nginx:alpine
COPY --from=build /src/public /usr/share/nginx/html
COPY --from=build /src/app /usr/share/nginx/html/app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]