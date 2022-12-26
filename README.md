# Instruction: How to setup project

### _DB is Postgresql_

1. Download all dependencies from project

```
  npm install
```

2. Create DB in postgres

```
  CREATE DATABASE "DB_NAME_EXAMPLE"
```

3. Create ".env" file and put there template from ".env.example" and use it with your own data

4. Run migrations:

```
  npm run migrate
```

5. Run seeds for db:

```
  npm run seed
```

6. Run project in development mode:

```
  npm run dev
```
