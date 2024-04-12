# Use Node.js 20.8.0 as base image
FROM node:20.8.0

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application files
COPY . .

# Expose port 3000 (adjust this according to the port your Nest.js application listens on)
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "start"]