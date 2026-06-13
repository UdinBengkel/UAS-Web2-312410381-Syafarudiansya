FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    libonig-dev \
    libzip-dev \
    libicu-dev \
    unzip \
    curl \
    && docker-php-ext-install mysqli pdo pdo_mysql mbstring zip intl \
    && a2enmod rewrite

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

RUN COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev --optimize-autoloader --ignore-platform-req=ext-intl

RUN echo '<VirtualHost *:80>\n\
    DocumentRoot /var/www/html/public\n\
    <Directory /var/www/html/public>\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>\n\
</VirtualHost>' > /etc/apache2/sites-available/000-default.conf

EXPOSE 80

CMD apache2-foreground