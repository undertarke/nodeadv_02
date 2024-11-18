FROM node:20

WORKDIR /root/notidy-service

COPY package.json .

RUN yarn install

COPY ./src/prisma ./src/prisma 

RUN yarn prisma generate --schema src/prisma/schema.prisma 

COPY . .

RUN yarn build

CMD ["yarn","start:prod"]

# docker build . -t product-service
# docker run -d --name product-service --net node-network product-service