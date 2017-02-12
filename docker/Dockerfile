FROM openjdk:8-jre-alpine

ARG JAVA_OPTS=-Xmx512m
ENV JAVA_OPTS ${JAVA_OPTS}

COPY *.jar /app.jar
ADD src/main/webapp /webapp

ENV SPRING_PROFILES_ACTIVE prod
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar"]
EXPOSE 8080