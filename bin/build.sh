#!/bin/bash

source "${0%/*}/utils.sh"

if [ "$1" = "install" ]; then
  docker_install_dependencies
fi

echo -e "\033[1;44m"Build"\033[0m"
  docker run -it --rm -v $(pwd):/usr/src/app ${IMAGE_NAME} sh -c 'npm run build'
