FROM php:8.4-cli

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libicu-dev \
    libzip-dev \
    libonig-dev \
    libsqlite3-dev \
    libmariadb-dev-compat \
    libmariadb-dev \
    procps \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install \
    pdo_mysql \
    pdo_sqlite \
    intl \
    zip \
    bcmath \
    mbstring \
    pcntl

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

RUN git config --global --add safe.directory /var/www/html

WORKDIR /var/www/html

EXPOSE 8000 5173

CMD ["composer", "dev"]
