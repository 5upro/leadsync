FROM node:22-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 👇 key fix
RUN pnpm install --frozen-lockfile --ignore-scripts=false --unsafe-perm

# 👇 auto approve builds (non-interactive)
RUN pnpm rebuild

COPY . .

RUN pnpm build

EXPOSE 5000

CMD ["node", "dist/index.js"]
