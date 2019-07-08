#!/bin/bash

source "${0%/*}/utils.sh"

docker_install_dependencies

echo -e "\033[1;44m"Build"\033[0m"
  docker run -it --rm -v $(pwd):/usr/src/app ${IMAGE_NAME} sh -c 'npm run build'
