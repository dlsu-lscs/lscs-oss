FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of the application
COPY . .

# Expose application port (change as needed)
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
