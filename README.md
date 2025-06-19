# QuickFax – Status Snapshot (2025-06-19)

## Was es schon kann
- Next.js-PWA läuft lokal (`npm run dev`)
- Upload-API nimmt PDF/Bild (≤ 10 MB) entgegen und liefert Datei-Metadaten
- Stripe-Test-Checkout (€ 0,59 Flat) nach Upload integriert
- Success- und Cancel-Seiten für Checkout-Redirect vorhanden
- RFC-0001 „MVP-Flow“ auf **Accepted** gesetzt

## Nächste Todos
1. RFC-0002: Auto-Deletion-Policy (Dateien ≤ 2 h löschen)
2. Telnyx-Fax-Stub: `POST /api/fax` → Test-Credentials, 200 OK
3. UX-Polish: Upload-Progress & Fehlermeldungen
4. Deploy-Preview auf Vercel (Optional)

## Schnellstart (Dev)
```bash
git clone git@github.com:PetShip/quickfax.git
cd quickfax
cp .env.local.example .env.local   # Keys eintragen
npm install
npm run dev      # http://localhost:3000
