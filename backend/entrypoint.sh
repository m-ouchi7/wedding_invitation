#!/bin/bash
set -e

# サーバPID削除
rm -f tmp/pids/server.pid

# DBが起動するまで待つ（任意）
until mysql -h "$DATABASE_HOST" -u "$DATABASE_USER" -p"$DATABASE_PASSWORD" -e 'SELECT 1;' &> /dev/null
do
  echo "Waiting for database..."
  sleep 2
done

# bundle install
bundle check || bundle install

# DB作成・マイグレーション
bundle exec rails db:create db:migrate

# Railsサーバ起動
exec bundle exec rails s -b 0.0.0.0 -p 3000
