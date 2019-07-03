#!/bin/bash

source "${0%/*}/utils.sh"

IMAGE_REPOSITORY=wp-template-dev
IMAGE_TAG=latest
IMAGE_NAME=${IMAGE_REPOSITORY}:${IMAGE_TAG}
CONTAINER_NAME=${IMAGE_REPOSITORY}
CONTAINER_PUBLISHED_PORT=3000

image_exists=$(docker images | grep ${IMAGE_REPOSITORY})
is_container_already_running=$(docker ps -a | grep ${IMAGE_REPOSITORY})

if [ -z "${image_exists}" ]; then
  echo -e "\033[1;44m"Building ${IMAGE_REPOSITORY} docker image"\033[0m"
  docker build -t ${IMAGE_NAME} -f docker/dev/Dockerfile .
fi

if [ "$1" = "install" ]; then
  docker_install_dependencies
fi

if [ "${is_container_already_running}" ]; then
  echo -e "\033[1;44m"Force the removal of the running container"\033[0m"
  docker rm -f ${CONTAINER_NAME}
fi

echo -e "\033[1;44m"Running development server at http://localhost:${CONTAINER_PUBLISHED_PORT}"\033[0m" && \
docker run -dit --name ${CONTAINER_NAME} \
  -p "${CONTAINER_PUBLISHED_PORT}":3000 \
  -v $(pwd):/usr/src/app:cached \
  ${IMAGE_NAME}

echo -e "\033[1;44m"Follow log output"\033[0m"
docker logs -f ${CONTAINER_NAME}
