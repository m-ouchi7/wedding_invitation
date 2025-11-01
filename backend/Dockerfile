FROM ruby:3.3

# 必要パッケージのインストール
RUN apt-get update -qq && apt-get install -y \
  nodejs \
  npm \
  build-essential \
  default-mysql-client \
  libmariadb-dev \
  libmariadb-dev-compat \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# 作業ディレクトリ設定
WORKDIR /app

# Gemfile をコピー
COPY Gemfile ./

# Bundler 設定をボリューム対応に
RUN bundle config set --local path 'vendor/bundle'
RUN bundle install --jobs 4

# プロジェクトをコピー
COPY . .

# ポート指定
EXPOSE 3000

# entrypoint.shをコンテナ内にコピー
COPY entrypoint.sh /usr/bin/entrypoint.sh

# 実行権限を付与
RUN chmod +x /usr/bin/entrypoint.sh

# CMD で entrypoint を呼び出す
CMD ["entrypoint.sh"]
