import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { personUrl, type Person } from "@/cms/types";

import { BTN_PRIMARY, BTN_SOFT } from "./fields";

/** Static QR codes: the image only encodes the page address, so it never
 *  expires and needs no QR service — it works as long as the site is up. */
const OPTIONS = { errorCorrectionLevel: "Q", margin: 2 } as const;

function download(href: string, filename: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function QrPanel({ person }: { person: Person }) {
  const url = personUrl(person.slug);
  const [svg, setSvg] = useState("");

  useEffect(() => {
    let live = true;
    QRCode.toString(url, { ...OPTIONS, type: "svg", color: { dark: "#000000", light: "#ffffff" } })
      .then((s) => live && setSvg(s))
      .catch(() => live && setSvg(""));
    return () => {
      live = false;
    };
  }, [url]);

  const savePng = async () => {
    const data = await QRCode.toDataURL(url, { ...OPTIONS, width: 2048 });
    download(data, `qr-${person.slug}.png`);
  };

  const saveSvg = () => {
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const href = URL.createObjectURL(blob);
    download(href, `qr-${person.slug}.svg`);
    setTimeout(() => URL.revokeObjectURL(href), 1000);
  };

  const printPlacard = () => {
    const w = window.open("", "_blank");
    if (!w) return toast.error("Allow pop-ups to print");
    w.document.write(placardHtml(person, svg, url));
    w.document.close();
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      toast.error(url);
    }
  };

  return (
    <div className="grid items-center gap-6 sm:grid-cols-[13rem_minmax(0,1fr)]">
      <div
        className="mx-auto w-52 rounded-2xl bg-white p-2 ring-1 ring-ink/10 sm:w-full [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
        aria-label={`QR code for ${url}`}
        role="img"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <div className="min-w-0 space-y-4">
        <div>
          <p className="font-sans text-[11px] font-bold tracking-[0.16em] text-ink/60 uppercase">
            Opens
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block break-all font-mono text-[13px] text-forest underline"
          >
            {url}
          </a>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={BTN_PRIMARY} onClick={() => void savePng()}>
            Download PNG
          </button>
          <button type="button" className={BTN_SOFT} onClick={saveSvg}>
            SVG (for print)
          </button>
          <button type="button" className={BTN_SOFT} onClick={printPlacard}>
            Print placard
          </button>
          <button type="button" className={BTN_SOFT} onClick={() => void copy()}>
            Copy link
          </button>
        </div>
        <p className="text-[12.5px] leading-snug text-ink/55">
          Permanent: the code holds only this address — no QR service, no expiry. Print it at
          3&nbsp;cm or larger. If you ever change the link, the old one keeps working.
        </p>
      </div>
    </div>
  );
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function placardHtml(person: Person, svg: string, url: string) {
  const origin = window.location.origin;
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(person.name.en)} — QR placard</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400&family=Manrope:wght@500;700&family=Noto+Serif+Malayalam:wght@500&display=swap" rel="stylesheet">
<style>
@page{size:A5 portrait;margin:0}
*{box-sizing:border-box}
body{margin:0;font-family:Manrope,sans-serif;color:#201510;background:#fff}
.card{width:148mm;height:210mm;padding:16mm 14mm;display:flex;flex-direction:column;align-items:center;text-align:center}
.logo{height:16mm}
.eyebrow{margin-top:9mm;font:italic 13pt Fraunces,serif;color:#b9821f}
.ml{margin-top:3mm;font:500 17pt 'Noto Serif Malayalam',serif}
.en{margin-top:1mm;font:500 30pt/1.05 Fraunces,serif;letter-spacing:-.01em}
.years{margin-top:3mm;font:700 11pt Manrope,sans-serif;letter-spacing:.24em;color:#6e2323}
.qr{margin-top:auto;width:72mm}
.qr svg{display:block;width:100%;height:auto}
.scan{margin-top:4mm;font:700 9pt Manrope,sans-serif;letter-spacing:.24em;text-transform:uppercase}
.scan-ml{margin-top:1mm;font:500 10pt 'Noto Serif Malayalam',serif}
.url{margin-top:3mm;font:500 8pt Manrope,sans-serif;color:#6b5842;word-break:break-all}
.bar{margin:0 0 6mm;display:flex;gap:8px;justify-content:center;font-family:Manrope}
.bar button{font:700 12px Manrope;letter-spacing:.1em;text-transform:uppercase;padding:10px 18px;border-radius:99px;border:0;background:#2e4b38;color:#fff;cursor:pointer}
@media print{.bar{display:none}}
</style></head><body>
<div class="bar"><button onclick="print()">Print</button></div>
<div class="card">
<img class="logo" src="${origin}/logo-en.png" alt="Kaazcha Charitable Trust">
<div class="eyebrow">Kaazcha · Personalities</div>
${person.name.ml ? `<div class="ml">${esc(person.name.ml)}</div>` : ""}
<div class="en">${esc(person.name.en)}</div>
${person.years ? `<div class="years">${esc(person.years)}</div>` : ""}
<div class="qr">${svg}</div>
<div class="scan">Scan to read the story</div>
<div class="scan-ml">കൂടുതൽ അറിയാൻ സ്കാൻ ചെയ്യുക</div>
<div class="url">${esc(url.replace(/^https:\/\//, ""))}</div>
</div>
<script>document.fonts.ready.then(()=>{const i=document.querySelector('.logo');i.complete?print():i.onload=()=>print()})</script>
</body></html>`;
}
