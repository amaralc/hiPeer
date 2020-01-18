CREATE USER 'hipeer_api_client' ENCRYPTED PASSWORD 'hipeer_api_client';
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA HiPeer TO hipeer_api_client;