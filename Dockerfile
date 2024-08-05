FROM node:20.11.1-alpine AS optimus-front-build
WORKDIR /app
COPY package*.json ./
RUN npm i --force --loglevel verbose
COPY . .
RUN npm run build --prod
#EXPOSE 4200
CMD ["npm", "start"]




FROM nginx:alpine AS runtime-env
EXPOSE 80
COPY --from=optimus-front-build /app/dist/optimusgo/browser/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
#RUN rm /usr/share/nginx/html/index.html
#RUN mv /usr/share/nginx/html/optimusgo/browser/* /usr/share/nginx/html/
COPY angular-nginx-docker.conf /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]
