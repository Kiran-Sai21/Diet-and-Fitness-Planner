FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app

# Copy Maven config and source, then build the application
COPY pom.xml .
COPY src ./src

RUN mvn -B -DskipTests package

FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the packaged jar from the build stage
COPY --from=build /app/target/*.jar /app/app.jar

# Render sets the port in the $PORT env var. Default to 8080 if not provided.
ENV PORT=8080

# Expose the default Spring Boot port
EXPOSE 8080

# Use a shell form without forcing the server.port so properties or env vars take precedence
ENTRYPOINT ["sh", "-c", "java -Djava.security.egd=file:/dev/./urandom -jar /app/app.jar"]
