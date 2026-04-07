# 1. Node.js ਦਾ ਬੇਸ ਇਮੇਜ
FROM node:22

# 2. ffmpeg, python ਅਤੇ ਹੋਰ ਜ਼ਰੂਰੀ ਪੈਕੇਜ ਇੰਸਟਾਲ ਕਰੋ
RUN apt-get update && apt-get install -y ffmpeg python3 python3-pip

# 3. yt-dlp ਇੰਸਟਾਲ ਕਰੋ
RUN pip3 install --break-system-packages yt-dlp

# 4. ਐਪ ਦੀ ਸੈਟਿੰਗ ਅਤੇ npm install
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# 5. ਐਪ ਚਲਾਉਣ ਦੀ ਕਮਾਂਡ (ਜੇਕਰ ਤੁਹਾਡੀ start ਕਮਾਂਡ ਵੱਖਰੀ ਹੈ ਤਾਂ ਬਦਲ ਲਓ)
CMD ["npm", "start"]
