# wedding_invitation

## Docker 環境構築手順

### 1. Dockerイメージのビルド
```bash
docker-compose build
```

### 2. Dockerコンテナの起動
```bash
docker-compose up -d
```

### 3. 環境変数ファイルの準備
```bash
cp .env.tmp .env
```
コピー後、MySQLのパスワードを `.env` に記入してください。

### 4. Docker再起動（必要な場合）
```bash
docker-compose down
docker-compose up -d
```
