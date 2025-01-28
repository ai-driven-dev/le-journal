# 🐳 Docker Setup

I need you to help me with the docker setup so I can deploy my app in production more easily.

- Every steps MUST be completed and validated before moving to the next one

## Steps

1. Create the dockerfile for backend
2. Modify the already existing dockerfile for frontend
   1. Do not change it a lot, it shall already work
   2. Use PNPM for dependencies
   3. Change only if necessary
3. Create the docker compose at root
4. Run verifications

### Rules

- Use PNPM for every containers
- Use smaller images if possible
- Each container must have its own dependencies
- No modifications should be necessary in the package.json files because they are working already
  
### Docker Compose

 1. Create file at root
    1. Ignore node_modules in all services
 2. Configure services
 3. Define volumes
 4. Map ports

## Verification

 1. Images build without errors `docker-compose up --build`
 2. Containers start
 3. No errors in logs
 4. Port 8080 and 3000 are exposed
