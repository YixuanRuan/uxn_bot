FROM node:latest
COPY ./src /app
COPY ./package.json /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD node /app/app.js