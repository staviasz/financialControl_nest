FROM node:21-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .
RUN npx prisma generate dev

RUN addgroup -g 1001 user &&\
  adduser -D -u 1001 -G user user

COPY wait-for-db.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/wait-for-db.sh
RUN mkdir -p .data/financialControl
RUN chown -R user:user .data/financialControl
RUN chmod -R 777 .data/financialControl 




EXPOSE 3000

CMD ["sh","/usr/local/bin/wait-for-db.sh","npm", "run", "start:dev"]

