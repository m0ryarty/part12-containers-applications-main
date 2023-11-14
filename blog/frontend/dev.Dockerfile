FROM node:16
  
WORKDIR /usr/src/app/blog-frontend

COPY --chown=node:node ./frontend .
RUN npm install 

ENV DEBUG=blog-frontend:*
  
USER node
CMD CHOKIDAR_USEPOLLING=true npm start