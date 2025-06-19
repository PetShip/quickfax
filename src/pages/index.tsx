import { useState } from "react";

export default function Home() {
  /* --------- React-State --------- */
  const [fileInfo, setFileInfo]   = useState<string>("");   // JSON-Info des Uploads
  const [busy, setBusy]           = useState(false);        // Spinner / UI-Lock

  /* --------- Upload Handler --------- */
  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fileInput = e.currentTarget.elements.namedItem("file") as HTMLInputElement;
    const file = fileInput?.files?.[0];
    if (!file) return;

    setBusy(true);
    const body = new FormData();
    body.append("file", file);

    const res   = await fetch("/api/upload", { method: "POST", body });
    const json  = await res.json();
    setFileInfo(JSON.stringify(json, null, 2));
    setBusy(false);
  }

  /* --------- Stripe-Checkout --------- */
  async function handleCheckout() {
    setBusy(true);
    const res  = await fetch("/api/checkout", { method: "POST" });
    const json = await res.json();
    setBusy(false);

    if (json.url) {
      window.location.href = json.url;           // Redirect zu Stripe
    } else {
      alert("Checkout-Erstellung fehlgeschlagen");
    }
  }

  /* --------- JSX --------- */
  return (
    <main style={{ fontFamily: "sans-serif", padding: 24 }}>
      <h1>QuickFax – MVP stub</h1>

      {/* --- Upload-Form --- */}
      <form onSubmit={handleUpload} style={{ marginBottom: 24 }}>
        <input
          name="file"
          type="file"
          accept=".pdf,image/*"
          required
          disabled={busy}
        />
        <button type="submit" disabled={busy} style={{ marginLeft: 8 }}>
          Upload
        </button>
      </form>

      {/* --- Ergebnis anzeigen --- */}
      {fileInfo && (
        <>
          <h3>Upload-Info</h3>
          <pre
            style={{
              background: "#f5f5f5",
              padding: 12,
              borderRadius: 6,
              maxWidth: 480,
              overflowX: "auto",
            }}
          >
            {fileInfo}
          </pre>

          {/* --- Checkout-Button --- */}
          <button onClick={handleCheckout} disabled={busy}>
            Bezahlen € 0,29
          </button>
        </>
      )}

      {busy && <p>Bitte warten …</p>}
    </main>
  );
}
