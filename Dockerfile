FROM node:10.5

LABEL authors="kruupos"

# Install dependencies
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev vim

# -- Install Application into container:
RUN set -ex && mkdir -p /frontend

WORKDIR /frontend

# Copies all the content
COPY . .

# Install all the packages
RUN npm install -g @angular/cli
RUN yarn install

EXPOSE 4200 49153
