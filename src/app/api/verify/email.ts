export function buildPurchaseEmailHTML({
    customerName, // you’re currently greeting with `phone`, pass that here if you want
    orderId,
    productName,
    price, // number or string
    quantity = 1,
    downloadLink,
    brandName = "Your Store",
    accent = "#6b21a8", // purple like your screenshot
}: {
    customerName?: string;
    orderId: string | number;
    productName: string;
    price: number | string;
    quantity?: number;
    downloadLink: string;
    brandName?: string;
    brandUrl?: string;
    logoUrl?: string;
    accent?: string;
}) {
    const displayPrice =
        typeof price === "number"
            ? `₹${price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
            : price;

    return `
  <!doctype html>
  <html>
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Thank you for your order</title>
    <style>
      body{margin:0;background:#f6f8fb;font-family:Arial,Helvetica,sans-serif;color:#111827}
      a{color:${accent};text-decoration:none}
      .wrap{width:100%;padding:24px 12px}
      .card{max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(17,24,39,.08);border: 1px solid #4c1d95;}
      .head{background:${accent};color:#fff;padding:22px 16px;text-align:center;font-size:30px;font-weight:500}
      .brand{display:flex;align-items:center;gap:10px;justify-content:center}
      .logo{height:26px}
      .content{padding:24px}
      .p{margin:10px 0;line-height:1.6;color:#374151}
      .badge{display:inline-block;background:#efe7ff;color:#4c1d95;font-weight:700;border-radius:999px;font-size:12px;padding:2px 10px;margin-bottom:8px}
      table{width:100%;border-collapse:collapse;margin-top:12px}
      th,td{font-size:14px;padding:10px 8px;border-bottom:1px solid #eef2f7;text-align:left}
      th{color:#6b7280;font-weight:600}
      .total td{font-weight:800}
      .btn{display:inline-block;margin:18px 0 6px;padding:12px 18px;border-radius:10px;background:#111827;color:#fff !important;font-weight:700}
      .small{font-size:12px;color:#6b7280}
      .foot{padding:16px 24px;background:#f3f4f6;color:#6b7280;font-size:12px;text-align:center}
      @media (prefers-color-scheme: dark){
        body{background:#0b1220;color:#e5e7eb}
        .card{background:#0f172a;box-shadow:none}
        .p,.small,th,td{color:#cbd5e1}
        .btn{background:${accent}}
        .foot{background:#0b1220;color:#94a3b8}
      }
    </style>
  </head>
  <body>
    <div class="wrap">
    <div class="card">
        <div class="head">
        <div style="margin-top:6px;">Thank you for your purchase!</div>
        </div>
        <div class="content">
            <div class="badge">Order #${orderId}</div>
                <p class="p">Hi ${customerName || "there"},</p>
                <p class="p">Just to let you know — we’ve received your order, and it’s now being processed.</p>

            <h3 style="margin:18px 0 8px;">Order details</h3>
            <table role="presentation" aria-hidden="true">
            <thead><tr><th>Product</th><th>Quantity</th><th>Price</th></tr></thead>
            <tbody>
                <tr><td>${productName}</td><td>${quantity}</td><td>${displayPrice}</td></tr>
                <tr class="total"><td></td><td>Total</td><td>${displayPrice}</td></tr>
            </tbody>
            </table>

            <p class="p" style="margin-top:18px;">Download your product:</p>
            <a class="btn" href="${downloadLink}" target="_blank" rel="noopener">Download now</a>
            <div class="small">If the button doesn’t work, copy and paste this link:<br>${downloadLink}</div>

            <p class="p">Need help? Reply to this email and we’ll assist you.</p>
        </div>
        <div class="foot">© ${new Date().getFullYear()} ${brandName}. All rights reserved.</div>
      </div>
    </div>
  </body>
  </html>
  `;
}

// <div class="brand" >
//     ${ logoUrl ? `<img class="logo" src="${logoUrl}" alt="${brandName}"/>` : `` }
// <a href="${brandUrl}" style = "color:#fff" > ${ brandName } </a>
//     </div>
