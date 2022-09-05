FROM node:14.20-alpine3.15 as build

WORKDIR /code/client

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci --production

COPY . .

RUN npm run build

FROM nginx:1.23-alpine as prod

COPY --from=build /code/client/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
