FROM node:16
  
WORKDIR /usr/src/app/blog-frontend

COPY --chown=node:node ./frontend .

RUN npm install


USER node

CMD ["npm", "start"]