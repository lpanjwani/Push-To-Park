FROM nginx:latest

# File Author / Maintainer
MAINTAINER Lavesh Panjwani

WORKDIR /etc/nginx/

# Copy custom configuration file from the current directory
RUN rm -v /etc/nginx/nginx.conf
ADD nginx.conf /etc/nginx/

# Expose ports
EXPOSE 80

# Define default command
CMD ["/usr/sbin/nginx"]