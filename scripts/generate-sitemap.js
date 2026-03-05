import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const BASE_URL = 'https://www.lumoscale.com'; // Update this to your persistent domain

async function generateSitemap() {
    console.log('Fetching blog posts...');

    const { data: posts, error } = await supabase
        .from('posts')
        .select('slug, created_at')
        .eq('published', true);

    if (error) {
        console.error('Error fetching posts:', error);
        process.exit(1);
    }

    console.log(`Found ${posts ? posts.length : 0} published posts.`);

    const staticRoutes = [
        '',
        '/login',
        '/blog',
        '/privacy-policy',
    ];

    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Add static routes
    staticRoutes.forEach(route => {
        sitemapContent += `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>
`;
    });

    // Add dynamic blog routes
    if (posts) {
        posts.forEach(post => {
            const lastMod = new Date(post.created_at).toISOString().split('T')[0];
            sitemapContent += `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
        });
    }

    sitemapContent += `</urlset>`;

    const publicDir = path.join(__dirname, '..', 'public');
    const sitemapPath = path.join(publicDir, 'sitemap.xml');

    fs.writeFileSync(sitemapPath, sitemapContent);
    console.log(`Sitemap generated successfully at ${sitemapPath}`);
}

generateSitemap();
