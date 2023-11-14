FROM node:16
  
WORKDIR /usr/src/app/blog-backend

COPY --chown=node:node ./backend .
RUN npm install 

ENV DEBUG=blog-backend:*
  
USER node
CMD ["npm", "run", "dev"]