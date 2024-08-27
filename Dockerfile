# Stage 1: Build the TypeScript code
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app-song

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install only production dependencies
RUN npm install --only=production
RUN npm install -g nodemon


# Expose the port on which your app will run
EXPOSE 3000

# Command to run your application using the start script
CMD ["npm", "start"]
