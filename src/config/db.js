import { Pool } from "pg";
export const db = new Pool({
    connectionString: "postgresql://neondb_owner:npg_wSEXGjd3xZn2@ep-weathered-flower-a1dxw181-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});
