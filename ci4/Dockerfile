FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    libonig-dev \
    libzip-dev \
    libicu-dev \
    unzip \
    curl \
    && docker-php-ext-install mysqli pdo pdo_mysql mbstring zip intl

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

RUN COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev --optimize-autoloader --ignore-platform-req=ext-intl

EXPOSE 8080

CMD php spark serve --host 0.0.0.0 --port ${PORT:-8080}