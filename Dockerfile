FROM node

COPY app /app
WORKDIR /app
RUN npm install

CMD node main.js