FROM node:12.18.4-alpine
RUN apk add dumb-init
ENV NODE_ENV production
ENV PORT 80
EXPOSE 80
USER node
WORKDIR /app
COPY . .
RUN npm ci --only=production
CMD ["dumb-init", "node", "main.js"]