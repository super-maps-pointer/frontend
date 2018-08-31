# FRONTEND of SUPER MAPS POINTER

Super maps pointer is yet another game intended to upgrade your geography skills :earth_africa: while having fun! :smile:

### With what technologies?

* Flask version 1.0.2 (in backend repository)
* Angular version version 6.1.2 

### Requierments

* Docker
* Docker-compose

## Setup

#### 0. Setup backend repository.

**Warning** In order to use this repo properly, you first have to initialize and run the [backend repository](https://github.com/super-maps-pointer/backend)

#### 1. Clone this repository. 

```bash
# Go to your root folder if needed (must be the same as the backend)
mkdir super-maps-pointer && cd super-maps-pointer
# clone the frontend repository
git clone https://github.com/super-maps-pointer/frontend.git
```

#### 2. Install Docker (if needed)

This app is running with `Docker`. This [link](https://docs.docker.com/docker-for-windows/) for how to install it.

### 3. Run the app

```bash
docker-compose up
```

If all containers are up without problems:
  - `backend_web`
  - `postgres:10`
  - `frontend_angular-app`

and on the same networks `backend` (list with `docker network ls`)

Then you can now starting using the app! See the welcome page in [localhost:4200](http://127.0.0.1:4200)

### Reload the app

1. Shut down the container with `docker-compose down`
2. Reload the containers with `docker-compose up`

**Note**: If you are using `docker-compose up -d` do not forget to kill the containers with `docker-compose down` to avoid stupid conflicts of having two apps running in parallel on the same ports.

**Note for windows users**: sometimes Docker for windows have trouble copying the files into the containers, most of the time you just have to restart Docker to make it work.

## About this stack

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.2.

## Developper Setup

You will need [Node.js](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) installed on your machine.

You can install both tools simultaneously from the [Node.js download page](https://nodejs.org/en/download/).

You can now install new packages using `npm` command line.

### Debugger

A debugger called: `Launch Chrome against localhost` is set up with **VS Code**, to use it:

1. launch the app with `docker-compose up`.
2. set any breakpoints you need.
3. launch the debugger.

## Unit Tests

Done using `karma`

```zsh
docker-compose -f ./docker-compose.test.yml run --rm karma
```
