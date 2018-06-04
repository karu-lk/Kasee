FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app
EXPOSE 3001

#RUN console.log('npm')

#CMD [ “npm”, “start” ]

RUN npm run server