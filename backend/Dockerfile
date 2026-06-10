FROM node:20-alpine

WORKDIR /app

# Install system dependencies if needed (none needed here, keep it minimal)
RUN apk add --no-cache libc6-compat

# Copy dependency definitions
COPY package.json package-lock.json ./

# Install all dependencies (we need tsx from devDependencies to run start script)
RUN npm ci

# Copy application code
COPY . .

# Generate Prisma client using prisma config
RUN npx prisma generate

# Ensure upload directory exists
RUN mkdir -p uploads

# Expose the API port
EXPOSE 5000

# Start server
CMD ["npm", "run", "start"]
