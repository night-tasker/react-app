FROM python:3.9 as env-builder

#
ARG IDENTITY_API_PATH
ENV IDENTITY_API_PATH=$IDENTITY_API_PATH
#

WORKDIR /app

COPY .env .
COPY env-builder.py .

RUN python env-builder.py

FROM node:20-alpine as builder

WORKDIR /app

COPY . .

RUN npm ci 

COPY --from=env-builder /app/.env .

RUN npm run build

FROM nginx:1.21.0-alpine as production

COPY --from=builder /app/build /usr/share/nginx/html

COPY --from=env-builder /app/.env .

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]