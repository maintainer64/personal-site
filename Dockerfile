FROM docker.io/alpine:latest AS build
WORKDIR /src
ENV HUGO_VERSION=0.147.9
RUN apk add --no-cache git libc6-compat libstdc++ \
    && wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz \
    && tar -xzf hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz -C /usr/local/bin \
    && rm hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz
COPY . /src
RUN mkdir -p /src/themes/hello-friend-ng && git clone --depth=1 --branch=1.0.9 https://github.com/rhazdon/hugo-theme-hello-friend-ng.git /src/themes/hello-friend-ng
RUN hugo --minify

FROM docker.io/nginx:alpine
COPY --from=build /src/public /usr/share/nginx/html
COPY --from=build /src/app /usr/share/nginx/html/app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]