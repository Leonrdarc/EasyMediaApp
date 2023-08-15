# Use a base image
FROM node:18.10

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend app source code to the working directory
COPY . .

# Expose the port Angular serves on (by default 4200)
EXPOSE 4200

# Start the frontend app in development mode
CMD ["npm", "start"]