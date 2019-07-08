#!/bin/bash

IMAGE_REPOSITORY=wp-template
IMAGE_TAG=latest
IMAGE_NAME=${IMAGE_REPOSITORY}:${IMAGE_TAG}

docker_install_dependencies() {
  echo -e "\033[1;44m"Installing fresh dependencies..."\033[0m"
  docker run -it --rm -v $(pwd):/usr/src/app ${IMAGE_NAME} sh -c '
    rm -rf node_modules vendor && \
    composer i && \
    npm i'
}
