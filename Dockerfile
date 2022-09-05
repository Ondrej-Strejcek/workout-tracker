FROM openjdk:latest

COPY ./target/workout-tracker-0.0.1-SNAPSHOT.jar /usr/app/
WORKDIR /usr/app

ENTRYPOINT ["java","-jar","workout-tracker-0.0.1-SNAPSHOT.jar"]
