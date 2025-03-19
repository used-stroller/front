#!/bin/bash

cd /home/ldh/front_cafe24
# 이전 빌드 파일 삭제
sudo rm -rf .next
sudo npm install
# Production 환경에서 빌드
NODE_ENV=production sudo npm run build:prod
sudo npm run deploy;
echo 'jungmocha project start';
exit;