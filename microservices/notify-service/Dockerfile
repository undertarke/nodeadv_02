FROM node:20

WORKDIR /root/notidy-service

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn","start:prod"]


# docker build . -t notify-service
# docker run -d --name notify-service --net node-network notify-service