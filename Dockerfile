# Stage 1: Build the frontend
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY HotelWeb/ .
RUN npm install
RUN npm run build 

# Stage 2: Build the backend
FROM maven:3.8.5-openjdk-17 AS backend-build
WORKDIR /app/backend
COPY HotelServer/ .
RUN mvn clean install

# Final stage
FROM openjdk:17-alpine

# Set the timezone to Asia/Kolkata
ENV TZ=Asia/Kolkata
RUN apk add --no-cache tzdata musl-locales musl-locales-lang

# Install necessary packages for running PostgreSQL, Nginx, and curl
RUN apk add --no-cache postgresql postgresql-contrib nginx curl nodejs npm

# Create directories for PostgreSQL data and the application
RUN mkdir -p /var/lib/postgresql/data /app/frontend /run/postgresql && \
    chown -R postgres:postgres /var/lib/postgresql /run/postgresql

# Ensure postgres user and group exist
RUN if ! getent group postgres > /dev/null 2>&1; then \
        addgroup -S postgres; \
    fi && \
    if ! id -u postgres > /dev/null 2>&1; then \
        adduser -S -G postgres postgres; \
    fi

# Set ownership of PostgreSQL data directory
RUN chown -R postgres:postgres /var/lib/postgresql

# Copy built frontend files
COPY --from=frontend-build /app/frontend/ /app/frontend/

# Copy the built backend JAR file
COPY --from=backend-build /app/backend/target/HotelServer-0.0.1-SNAPSHOT.jar /app/HotelServer.jar

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports for Nginx and PostgreSQL
EXPOSE 80

# Initialize PostgreSQL database and start necessary services
CMD ["/bin/sh", "-c", "\
    su - postgres -c 'initdb -D /var/lib/postgresql/data' && \
    su - postgres -c 'pg_ctl -D /var/lib/postgresql/data -l /var/lib/postgresql/logfile start' && \
    sleep 5 && \
    su - postgres -c \"psql -c \\\"ALTER USER postgres WITH PASSWORD 'postgres';\\\"\" && \
    su - postgres -c 'createdb hotel_db' && \
    su - postgres -c \"psql -c \\\"GRANT ALL PRIVILEGES ON DATABASE hotel_db TO postgres;\\\"\" && \
    nginx && \
    java -jar /app/HotelServer.jar & \
    cd /app/frontend && npm install && npm start \
"]
