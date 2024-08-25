# Step 1: Build Stage
FROM node:18.16.1 as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Step 2: Production Stage (Using Distroless)
FROM gcr.io/distroless/nodejs18-debian11

# Set the working directory in the production image
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app .

# Expose the port the app runs on
EXPOSE 3000

# Set the command to run the application
CMD ["index.js"]
