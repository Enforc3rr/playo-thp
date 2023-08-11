FROM node:16-alpine
WORKDIR .
COPY package*.json ./
RUN npm install
COPY . .

ENV PORT=8080
ENV DB=DB_URL_STRING
EXPOSE 8080
CMD [ "node", "index.js" ]