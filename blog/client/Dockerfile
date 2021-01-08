FROM node:alpine
# Add the following line 
ENV CI=true
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "start"]