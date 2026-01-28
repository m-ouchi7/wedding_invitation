# wedding_invitation

## 環境構築手順

### 1. 環境変数ファイルの準備
```bash
cp .env.tmp .env
```
コピー後、MySQLのパスワードを `.env` に記入してください。

### 2. Dockerイメージのビルド
```bash
docker-compose build
```

### 3. Dockerコンテナの起動
```bash
docker-compose up -d
```

### 4. テーブル作成・初期データ投入
```
docker exec -it rails_api bash

bundle exec rails db:migrate
bundle exec rails db:seed
```

### 5. 認証情報の設定
```
docker exec -it rails_api bash

bundle exec rails credentials:edit
```

## その他
### Docker再起動（必要な場合）
```bash
docker-compose down
docker-compose up -d
```