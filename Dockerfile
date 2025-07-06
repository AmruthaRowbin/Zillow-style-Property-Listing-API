
# Use official Node image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install


COPY . .

# Expose  port
EXPOSE 5000

# Start 
CMD ["npm", "run", "dev"]
