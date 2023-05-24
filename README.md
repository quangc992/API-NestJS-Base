# step-by-step
npm install -g @nestjs/cli 

npm install --save @nestjs/microservices @nestjs/config @nestjs/common @nestjs/passport @nestjs/jwt passport passport-local passport-jwt bcrypt 

npm install @types/passport-local @types/passport-jwt @types/bcrypt

npm install --save prisma

npm install --save @prisma/client

# install

npm install
 
# build & run

docker compose up -d -V --build 

# stop 

docker compose down -v

# docker remove images

docker rmi $(docker images -aq)

# docker remove volumnes caches

docker system prune --volumes