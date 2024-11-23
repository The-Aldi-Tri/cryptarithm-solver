# Stage 1: Build
FROM node:22.11.0 AS build

# Create and set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Production
FROM node:22.11.0-alpine AS production

# Create and set the working directory
WORKDIR /usr/src/app

# Install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built files from the previous stage
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

# Command to run the application
CMD ["node", "./dist/index.js"]
