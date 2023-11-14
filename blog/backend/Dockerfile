FROM node:16
  
WORKDIR /usr/src/app/blog-backend

COPY --chown=node:node ./aackend .
RUN npm ci 

ENV DEBUG=blog-backend:*
  
USER node
CMD ["npm", "start"]