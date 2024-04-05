FROM httpd:2.4
ARG ADMIN_ADDR	
	
COPY ./dist/kramerius-admin/ /usr/local/apache2/htdocs/