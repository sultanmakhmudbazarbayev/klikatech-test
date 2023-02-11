# Every instruction represents a layer, and docker caches the result of every layer when using [docker build]
# Once image built, it becomes READ ONLY, code cannot be modified

# allows build new image up on another base image
FROM node:19.6.0

# Setting the working directory in the container, where all commands should be executed
WORKDIR /client

# First copy package.json so npm install won't be executed every time image rebiulds itself
COPY . /client


# By default all commands will be executed in the working directory of a container, which is the root folder.
RUN npm install

# Which files from local machine should go into the image:
# first dot - same folder that contains the Dockerfile
# Second dot (currently ./bolmeles - current working directory, 
# which is /bolmeles after changing it in WORKDIR) - path inside of the image where those files should be stored

# Docker container has internal filesystem which is totally detached from local file+system


# Expose port that is inside of the container to a local machine
EXPOSE 3000

# Command should be written in the end of a Dockerfile
# Command will be executed when container is started based on the image
# It is a final container-layer which becomes active once we run an image as a layer
CMD ["npm", "run", "start"]



# Also there is 
# ENTRYPOINT [ "npm" ] - similar to CMD but commands won't be overwritten in the run command if there are any commands after imageName, but appends


# When we have built the image but changed some code, we have to rebuild it


# Commands

# [docker build .] - creates image and container based on the Dockerfile and all the files/folders/subfolders on the level with Dockerfile
# [docker run imageName] - creates new container and runs it / attached(listening to the outputs of the container/can do some console.log's) mode is the default(blocks the terminal)
# [docker start containerName] - restarts the container / detached mode is the default (runs container on the background)
# [docker start -a containerName] - -a means restart the container in the attached mode
# [docker ps] - shows all the running containers
# [docker ps -a] - shows all containers available no matter if they up or down 
# [docker stop containerName] - shuts down the container
# [docker run -p 3000:80 imageName] - -p is for port, first port (3000) is port on a local machine, 80 is exposed port inside of a container, attached mode
# [docker run -p 3000:80 -d imageName] - -d flag means run container on the detached mode
# [docker attach runningContainerName] - attaches terminal to a running container
# [docker logs runningContainerName] - to see all the last logs printed by the container
# [docker logs -f runningContainerName] - -f for attaching terminal to the container to see the future logs

# [docker -it imageName] - -i for --interactive(allows usage of SDIN), -t for --tty(terminal exposed by the container)
# [docker -a -i imageName] - -a for attached mode, -i for interactive mode

# [docker rm containerName1 containerName2] - rm for removing the container by its name. Note: you cannot remove running container, only stopped ones




# [docker images] - list of all images available on the machine
# [docker rmi image_1_ID image_2_ID] - removing images by its ids and all the layers inside of the image. You can't remove images if they have container-childs, even if containers stopped
# [docker image prune] - remove all images that aren't used by any container
# [docker run -p 3000:3000 -d --rm imageID] - --rm means container will be removed automatically when it's stopped
# [docker cp folderName/. containerName:/folderName] - cp for copying folder/files inside or outside of a container, first arg - target, second arg - destination
# [docker run -p 3000:3000 -d --rm --name newContainerName imageID] - where --name sets newContainerName to a fresh running instance of the image


# [docker build -t repo-name:tag .] - -t for --tag that sets the repo name and tag for image
# [docker run -p 4000:3000 -d --rm --name containerName repoName:tag] - to build a container from repoName:tag instead of an imageID
# [docker tag imageOldName imageNewName] - for renaming the image




# [docker login], [docker logout] - for logging in, logging out from dockerHub
# [docker push dockerHubUsername/repoName:tag] - for pushing image to the dockerHub
# [docker pull dockerHubUsername/repoName:tag] - for pulling image from the dockerHub
# 





# /////////////////////////////////////////////////////Volumes////////////////////////////////////////////////////////////////
# Anonymous                                                    Named
# exists as long as docker runs                                defined path in the container mapped to the created volume/mount
#                                                              that is the path on a hosting machine



# [docker volume prune] or [docker volume rm VOL_NAME] - to remove a volume from local machines (prune only for anonymous volumes)

# [docker run -v /app/feedback] - anonymous volume, destroyed when container is stopped or removed
# [docker run -v name:/app/feedback] - named volume, survives the container stopping and removing
# [docker run -v $(pwd):/app/feedback] - bind mount, connecting internal host folder/file to container folder/file to track changes
# [docker run -v $(pwd):/app/feedback:ro] - ro means read-only, container wouldn't be able to write in host's internal memory

# [docker network create networkName] - for creating a network for cross-container communication
# [docker run -d --name contName --network networkName imageName] - for connecting a container to a network, instead of using IPaddresses we can specify ip addresses by the name of a container

# [docker exec -it goals-backend bash]  -  to write commands inside a docker

# DOCKER COMPOSE is just a tool to combine all needed build and run commands for containers in the application

# [docker-compose up -d] - for building images if they don't exist, running containers with the given config
# [docker-compose up -d --build] - --build forces docker-compose to rebuild all the images even if some images exist on the machine
# [docker-compose down] - for stopping/removing all the containers

# [docker exec -it containerName node-js-command] - exec is for writing code inside of a container and should be used with -it