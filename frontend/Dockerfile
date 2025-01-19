# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Serve the application using a static server
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose the port for the frontend
EXPOSE 3000
