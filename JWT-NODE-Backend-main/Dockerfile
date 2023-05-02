
# =================
#  DEVELOPMENT 
# =================
# Mulistage Build for CI & CD 
# Stage 0 we call it as "Build-Stage", based on Node js to build and compile tghe front end 
# FROM tiangolo/node-frontend:10 as build-stage
FROM node As devlopment
WORKDIR /node/app
COPY . .

ARG NODE_ENV=devlopment
ENV NODE_ENV=${NODE_ENV}
ARG SERVER_PORT=8000
ENV SERVER_PORT=${SERVER_PORT}

# RUN npm install
RUN npm install 

EXPOSE ${SERVER_PORT}

CMD ["npm","run","start"]

# =================
#  PRODUCTION
# =================
# Mulistage Build for CI & CD 



# RUN npm install && npm run build 
# #simliar to npm install and build 
# FROM nginx:alpine
# # Stage 1 , na\\based on nginx to have only the compiled build ready for production 
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*

# COPY --from=build-stage /app/build/ .
# #COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
# ENTRYPOINT [ "nginx", "-g", "daemon off;" ]