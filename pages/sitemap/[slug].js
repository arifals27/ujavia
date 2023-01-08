//pages/sitemap.xml.js
const SITEMAP_API = `${process.env.API_URL}sitemap/`;

function generateSiteMap(posts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${posts.links
        .map(link => {
            return `
       <url>
           <loc>${process.env.NEXT_PUBLIC_SITE.slice(0, -1)}${link.link}</loc>
           <lastmod>${link.date}</lastmod>
       </url>
     `;
        })
        .join('')}
   </urlset>
 `;
}

function generateTaxSiteMap(posts, type = null) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${posts.links
        .map(link => {
            return `
       <url>
           <loc>${process.env.NEXT_PUBLIC_SITE}${type}/${link.slug}/</loc>
       </url>
     `;
        })
        .join('')}
   </urlset>
 `;
}

function generateIndexSitemap(posts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${
        
        [ ...Array(posts.posts).keys() ].map(f => {
            return `
            <sitemap>
                <loc>${process.env.NEXT_PUBLIC_SITE}sitemap/post-${f+1}.xml</loc>
            </sitemap>
            `
        }).join('')
    }
    ${

        [ ...Array(posts.genres).keys() ].map(f => {
            return `
            <sitemap>
                <loc>${process.env.NEXT_PUBLIC_SITE}sitemap/genre-${f+1}.xml</loc>
            </sitemap>
            `
        }).join('')
    }
    ${

        [ ...Array(posts.tags).keys() ].map(f => {
            return `
            <sitemap>
                <loc>${process.env.NEXT_PUBLIC_SITE}sitemap/post_tag-${f+1}.xml</loc>
            </sitemap>
            `
        }).join('')
    }
    ${

        [ ...Array(posts.actress).keys() ].map(f => {
            return `
            <sitemap>
                <loc>${process.env.NEXT_PUBLIC_SITE}sitemap/actress-${f+1}.xml</loc>
            </sitemap>
            `
        }).join('')
    }
    ${

        [ ...Array(posts.labels).keys() ].map(f => {
            return `
            <sitemap>
                <loc>${process.env.NEXT_PUBLIC_SITE}sitemap/label-${f+1}.xml</loc>
            </sitemap>
            `
        }).join('')
    }
   </sitemapindex>
 `;
}

function SiteMap({params}) {
    // getServerSideProps will do the heavy lifting
    console.log(params)

}

export async function getServerSideProps({ res, params }) {
    const getSlug = params.slug.split(".")
    const datax = getSlug[0].split("-")
    const type = datax[0]
    const page = datax[1]

    let api_url;
    if(type === "index"){
        api_url = SITEMAP_API
    } else if(type === "post"){
        api_url = SITEMAP_API + `?type=posts&paged=${page}`
    } else if(type === "genre"){
        api_url = SITEMAP_API + `?type=genres&paged=${page}`
    } else if(type === "post_tag"){
        api_url = SITEMAP_API + `?type=tags&paged=${page}`
    } else if(type === "actress"){
        api_url = SITEMAP_API + `?type=actress&paged=${page}`
    } else if(type === "label"){
        api_url = SITEMAP_API + `?type=labels&paged=${page}`
    } else {
        api_url = SITEMAP_API
    }
    const request = await fetch(api_url);
    const posts = await request.json();

    // We generate the XML sitemap with the posts data
    let sitemap
    const tax = ["genre", "post_tag", "actress", "label"]
    if(tax.includes(type)){
        sitemap = generateTaxSiteMap(posts, type)
    } else if(type === "post"){
        sitemap = generateSiteMap(posts)
    } else {
        sitemap = generateIndexSitemap(posts)
    }
    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {params : params.slug},
    };
}

export default SiteMap;