## Task - Kids' Activity Tracker API


## Local Installation 
```bash
$ git clone git@github.com:ceodev18/kid-activities-api.git   (SSH)
$ git clone https://github.com/ceodev18/kid-activities-api.git  (HTTPS)
$ cd kid-activities-api
$ cp .env.example .env
$ pnpm install
```
## Docker Installation 
```bash
$ docker build -t kids-activities-app . 
$ docker run -p 3000:3000 kids-activities-app
```

## Running the app

Access to `http://localhost:3000/api`
It will open a Swagger ui


## Test

```bash
# unit tests
$ pnpm run test

# test coverage
$ pnpm run test:cov
```

