# Base image
FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

# Create volume for logs
VOLUME [ "/usr/src/app/logs" ]

# Expose port
EXPOSE 5000

# Start the server
CMD [ "npm", "start" ] 