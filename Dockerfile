# from https://github.com/IBM/nodejs-express-app/blob/development/Dockerfile
FROM registry.access.redhat.com/ubi8/ubi

RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -
RUN yum install -y nodejs

WORKDIR /opt/app-root/src

COPY package.json /opt/app-root/src
RUN npm install --only=prod
COPY server /opt/app-root/src/server
COPY public /opt/app-root/src/public
COPY common /opt/app-root/src/common
COPY data.db /opt/app-root/src/

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]
