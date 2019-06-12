FROM node:10
EXPOSE 3000
WORKDIR /home/app

COPY . /home/app/

RUN npm install
RUN npm install pm2 -g

ENV NODE_ENV=production
ENV PORT=3000
CMD [ "pm2-runtime", "npm", "--", "start" ]