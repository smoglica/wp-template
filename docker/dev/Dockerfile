## Build image
# docker build -t wp-template-dev -f docker/dev/Dockerfile .

## Install dependencies
# docker run -it --rm -v $(pwd):/usr/src/app wp-template-dev composer i && npm i

## Inside the container
# docker run -it --rm -v $(pwd):/usr/src/app wp-template-dev sh

FROM node:10-alpine

LABEL maintainer="moglica.s@gmail.com"

RUN apk add --update \
  make \
  gcc \
  g++ \
  nasm \
  zlib \
  zlib-dev \
  libjpeg-turbo \
  build-base \
  file \
  autoconf \
  libtool \
  automake \
  # Dependencies for composer
  php7 \
  php7-openssl \
  php7-json \
  php7-iconv \
  php7-phar \
  php7-simplexml \
  php7-tokenizer \
  php7-xmlwriter

# Install composer globally
COPY docker/dev/bin/install-composer.sh .
RUN bash install-composer.sh && mv composer.phar /usr/local/bin/composer

WORKDIR /usr/src/app

## Install node modules
# COPY package*.json ./
# RUN npm i

## Install composer dependencies
# COPY composer*.* ./
# RUN composer i

# VOLUME /usr/src/app/node_modules /usr/src/app/vendor

CMD npm run serve
