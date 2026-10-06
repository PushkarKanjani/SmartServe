# Render Deployment Environment Variables Template

> **CRITICAL SECURITY NOTICE**: 
> This document contains **template placeholders only**. 
> NEVER commit actual passwords, tokens, or credentials into source control.
> Fill in these values in the **Render Dashboard > Environment Variables** settings for the SmartServe FastAPI Web Service.

---

## 1. Redpanda Cloud Serverless Kafka Variables

Configure these variables for connection to the Redpanda Cloud Serverless cluster (`smartserve-prod`):

| Variable Name | Recommended Production Value | Description |
| :--- | :--- | :--- |
| `KAFKA_ENABLED` | `true` | Enables active Kafka producer and consumer services. |
| `KAFKA_BOOTSTRAP_SERVERS` | `<redpanda_bootstrap_host>:9092` | Comma-separated list of Redpanda Cloud bootstrap brokers. |
| `KAFKA_CONSUMER_GROUP` | `smartserve-backend-group` | Fixed consumer group name authorized by ACLs in Redpanda. |
| `KAFKA_SECURITY_PROTOCOL` | `SASL_SSL` | Enforces TLS encrypted transport with SASL authentication. |
| `KAFKA_SASL_MECHANISM` | `SCRAM-SHA-256` | SCRAM-SHA-256 SASL authentication mechanism. |
| `KAFKA_SASL_USERNAME` | `smartserve-production` | Kafka principal user authorized for read/write/describe. |
| `KAFKA_SASL_PASSWORD` | `<your_redpanda_cloud_sasl_password>` | Redpanda user password (kept secret). |

---

## 2. Production Core Application & Database Variables

| Variable Name | Recommended Production Value | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://<user>:<password>@<supabase_host>:5432/<dbname>?sslmode=require` | Production Supabase PostgreSQL connection URI. |
| `JWT_SECRET_KEY` | `<your_secure_32_character_minimum_random_secret>` | Secret key for signing HS256 auth tokens. |
| `JWT_ALGORITHM` | `HS256` | Token hashing algorithm. |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `1440` | Session lifetime in minutes (e.g., 24 hours). |
| `OPENROUTER_API_KEY` | `<your_openrouter_api_key>` | OpenRouter API Key for AI support chat routing. |
| `OPENROUTER_MODEL` | `openrouter/free` | Primary model identifier. |
| `MAX_AI_SUPPORT_MESSAGES` | `5` | Maximum auto-responses per support ticket session. |
| `CORS_ORIGINS` | `["https://smartserve.onrender.com","http://localhost:5173","http://localhost:5174","http://localhost:5175","http://localhost:5176"]` | Allowed origins for cross-origin frontend requests. |

---

## 3. Pre-flight Verification Checklist for Operator

1. Ensure the Redpanda Cloud Serverless cluster is healthy and topics exist:
   - `booking.created`
   - `booking.accepted`
   - `booking.rejected`
   - `booking.started`
   - `booking.completed`
   - `provider.location.updated`
   - `support.message`
2. Test connection locally by setting variables in `backend/.env` (gitignored) and running:
   ```bash
   cd backend && python scripts/test_redpanda_connection.py
   ```
3. Once all 7 checks pass, save the variables into Render and redeploy.
