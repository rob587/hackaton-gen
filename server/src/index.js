import express from "express";
import cors from "cors";
import "dotenv/config";
import { db } from "./db.js";

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

app.locals.db = db;

app.get("/api/db-check", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT COUNT(*) AS n FROM themes");
    res.json({ ok: true, themes: rows[0].n });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server su http://localhost:${PORT}`));
