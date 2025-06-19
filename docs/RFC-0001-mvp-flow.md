---
rfc: 0001
title: MVP Fax-Flow
status: Draft
authors: [pete]
created: 2025-06-19
---

## Problem
Gelegenheits-Faxer müssen für einen einzigen Auftrag komplexe Abo-Apps nutzen.
Hoher Preis, keine juristisch brauchbare Zustellbestätigung.

## Proposal
1. PDF-Upload oder Kamera-Scan (<= 10 MB).
2. Stripe Checkout, Flat €0,29.
3. Server ruft Telnyx `outbound_faxes` API.
4. Telnyx Webhook -> signierte PDF-Quittung per E-Mail.
5. Datei-Löschung ≤ 2 h (siehe RFC-0002).

## Open Questions
1. Flat-Preis-Obergrenze? (≥ 10 Seiten?)
2. Format Quittungssignatur (SHA-256 + Timestamp?)
