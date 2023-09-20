FROM oven/bun:1.0.2
WORKDIR /app
COPY src .
ENTRYPOINT [ "bun", "main.ts" ]