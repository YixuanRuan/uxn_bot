FROM node:latest
COPY ./src /app
COPY ./package.json /app
WORKDIR /app
RUN npm install
RUN apt-get update
RUN apt-get -y install libsdl2-dev
RUN chmod +x /app/uxn/build.sh
WORKDIR /app/uxn
RUN ./build.sh
RUN ./bin/uxnasm ./uxnlin.tal ./bin/uxnlin.rom
WORKDIR /app
EXPOSE 4000
CMD node /app/app.js