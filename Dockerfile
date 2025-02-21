FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of the application
COPY . .

# Declare an environment variable for image storage path
ENV IMAGE_STORE_PATH=./oss-images/

# Create the directory for image storage
RUN mkdir -p "$IMAGE_STORE_PATH"

# Declare a volume for persistent storage
VOLUME ["/data"]

# Expose application port (change as needed)
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
