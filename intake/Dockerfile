# syntax=docker/dockerfile:1
FROM node:16.14.0
WORKDIR /intake
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
