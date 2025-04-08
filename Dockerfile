# Development Stage
FROM node:16 AS development

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Install development dependencies (e.g., TypeScript, PM2 for hot-reloading, etc.)
RUN npm install --only=dev

# Expose the development port
EXPOSE 3000

# Set environment variable for development mode
ENV NODE_ENV=development

# Command to run in development mode (e.g., with hot-reloading)
CMD ["npm", "run", "start:dev"]


# Production Stage
FROM node:16 AS production

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies only for production
COPY package*.json ./
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Build the production assets (e.g., compile TypeScript to JavaScript, minify, etc.)
RUN npm run build

# Expose the production port
EXPOSE 3000

# Set environment variable for production mode
ENV NODE_ENV=production

# Command to run in production mode
CMD ["npm", "run", "start:prod"]
