FROM nginx:1.29.0

RUN apt-get update && \
    apt-get install -y micro && \
    apt-get install -y openssl && \
    echo "alias l='ls -CF'" >> /etc/bash.bashrc && \
    rm -rf /var/lib/apt/lists/*

COPY ./conf.d /etc/nginx/conf.d/

WORKDIR /etc/nginx/