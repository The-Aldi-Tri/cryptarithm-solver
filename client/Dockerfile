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

# Stage 2: Serve the React app using NGINX
FROM nginx:1.27.0-alpine

# Copy the built app from the previous stage
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf;
COPY nginx.conf /etc/nginx/conf.d/

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
