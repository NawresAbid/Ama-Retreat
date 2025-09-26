import { NextResponse } from 'next/server';
import { getAllPrograms } from '@/utils/program'
import { getAllRegisters } from '@/utils/réservation';


export async function GET() {
  const programs = await getAllPrograms();
  const registers = await getAllRegisters();

  const pages = [{ url: "https://amaretreat.com/", priority: 1.0 }];

  const programPages = programs.map(p => ({
    url: `https://amaretreat.com/program/${p.id}`,
    priority: 0.9,
  }));

  const registerPages = registers.map(r => ({
    url: `https://amaretreat.com/register/${r.id}`,
    priority: 0.7,
  }));

  const allPages = [...pages, ...programPages, ...registerPages];

  const urls = allPages
    .map(
      page => `
    <url>
      <loc>${page.url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page.priority}</priority>
    </url>`
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
