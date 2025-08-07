FROM node:18.20.7-alpine3.21

# Create app directory
WORKDIR /src
# Required files are whitelisted in dockerignore
COPY . ./
RUN npm ci && npm run build 
RUN npm test

EXPOSE 8080
ENTRYPOINT ["npm", "run", "start"]
