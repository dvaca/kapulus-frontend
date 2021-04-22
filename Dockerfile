FROM node:10

#RUN mkdir -p /usr/src/app/kapulus-frontend/node_modules && chown -R node:node /usr/src/app/kapulus-frontend
# Create app directory into the container
WORKDIR /usr/src/app/kapulus-frontend
# Install dependencies
COPY package*.json ./
#USER node
# Installing Angular cli and node modules in angular directory
RUN npm install -g @angular/cli @angular-devkit/build-angular nodemon && npm install
# Copy app code
COPY . .
#COPY --chown=node:node . .
# Expose app port
EXPOSE 8095
#Execute the app
CMD [ "npm", "start" ]

