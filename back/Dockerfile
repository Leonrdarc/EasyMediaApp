# Use a base image
FROM node:18.10

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code to the working directory
COPY . .

# Expose the port on which the backend will run
EXPOSE 3000

# Start the backend app
CMD ["npm", "run", "dev"]