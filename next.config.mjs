/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['encrypted-tbn2.gstatic.com','encrypted-tbn0.gstatic.com','encrypted-tbn3.gstatic.com'],
    },
    async headers() {
        return [
          {
            source: '/:path*',
            headers: [
             {
               key: 'Content-Security-Policy',
               value: "upgrade-insecure-requests"
             }
            ],
          },
        ]
      },
    
};

export default nextConfig;
