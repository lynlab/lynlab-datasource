# lynlab-datasource
## Run
```bash
# Create or pull image
docker build -t lynlab/datasource .
(or)
docker pull lynlab/datasource:latest

# Run
docker run -e "NODE_ENV=development" ... -p 8080:8080 -d --name lynlab-datasource lynlab/datasource
```

## Run on Local Machine
### Setup
```bash
# Install all prerequisites
yarn

# Migrate database
yarn sequelize db:migrate
```

### Test
```bash
# Lint code (generated stuffs will be ignored)
yarn lint .
```

### Run
```bash
# Server runs, listening 8080 port
yarn start
```

## Environment Variables
  - `DB_HOST`
  - `DB_DATABASE`
  - `DB_USERNAME`
  - `DB_PASSWORD`
