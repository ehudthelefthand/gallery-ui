FROM node:latest as builder

WORKDIR /app

COPY package.json /app

COPY yarn.lock /app

RUN yarn install

COPY . ./

RUN yarn build


FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

