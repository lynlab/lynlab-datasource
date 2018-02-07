FROM node:carbon

# Non-root user `app`
RUN useradd --create-home -s /bin/bash app
WORKDIR /home/app

COPY package.json .
RUN yarn --production

COPY . .

# Change to user `app`
RUN chown -R app:app /home/app
USER app

EXPOSE 8080

ENTRYPOINT [ "./docker-entrypoint.sh" ]
CMD [ "yarn", "start" ]
