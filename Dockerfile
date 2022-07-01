# --------------------------------------------------------------------------------
# Dockerfile for local installer
# --------------------------------------------------------------------------------
FROM twilio/twilio-cli:3.5.0

RUN twilio plugins:install @twilio-labs/plugin-serverless

# build React app, if present
#COPY app /app
#WORKDIR /app
#RUN npm install
#RUN npm run build

# directory to copy/run application
WORKDIR /hls-blueprint

# copy github files needed for running locally
COPY Dockerfile package.json .env .twilioserverlessrc /hls-blueprint/
COPY assets /hls-blueprint/assets
COPY functions /hls-blueprint/functions
#RUN cp -r /app/build/* /hls-blueprint/assets/

# install node dependencies in package.json
RUN npm install

# expose default port for running locally
EXPOSE 3000

# load-local-env flag is needed for reading ACCOUNT_SID & AUTH_TOKEN from environment
CMD ["twilio", "serverless:start", "--load-local-env"]
