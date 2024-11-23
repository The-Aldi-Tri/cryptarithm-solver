# Stage 1: Build
FROM node:22.11.0 AS build

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Create and set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Serve the React app using NGINX
FROM nginx:1.26.2-alpine AS production

# Copy the built app from the previous stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
