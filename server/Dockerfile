# Stage 1: Build
FROM node:22 AS builder

# Create and set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Production
FROM node:22-alpine

# Create and set the working directory
WORKDIR /usr/src/app

# Install production dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy built files from the previous stage
COPY --from=builder /usr/src/app/dist ./dist

COPY --from=builder /usr/src/app/.env ./dist

# Command to run the application
CMD ["node", "dist/index.js"]
