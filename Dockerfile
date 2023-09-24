FROM oven/bun:1.0.2
WORKDIR /app
ADD . .
ENTRYPOINT [ "bun", "src/main.ts", "/var/rinha/source.rinha.json" ]