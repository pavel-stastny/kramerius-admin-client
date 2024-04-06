FROM httpd:2.4
ARG ADMIN_ADDR	

COPY $ADMIN_ADDR /usr/local/apache2/htdocs/
	
