FROM node:10.5

LABEL authors="kruupos"

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'

# Install dependencies
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev google-chrome-stable vim

# Install Application into container:
RUN set -ex && mkdir -p /frontend

WORKDIR /frontend

ENV PATH /frontend/node_modules/.bin:$PATH
ENV CHROME_BIN=/usr/bin/google-chrome

# install and cache app dependencies
COPY package.json package.json
RUN npm install -g @angular/cli@6.1.5
RUN yarn install

COPY . .
