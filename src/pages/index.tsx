import { useState } from "react";

export default function Home() {
  const [info, setInfo] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const file = (e.currentTarget.elements.namedItem("file") as HTMLInputElement)
      .files?.[0];
    if (!file) return;

    const body = new FormData();
    body.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body });
    const json = await res.json();
    setInfo(JSON.stringify(json, null, 2));
  }

  return (
    <>
      <h1>QuickFax – MVP stub</h1>
      <form onSubmit={handleSubmit}>
        <input name="file" type="file" accept=".pdf,image/*" required />
        <button type="submit">Upload</button>
      </form>
      <pre>{info}</pre>
    </>
  );
}
