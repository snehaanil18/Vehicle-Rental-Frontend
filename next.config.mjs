/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
            protocol: 'http',
            hostname: 'minio', // Use the MinIO service name defined in docker-compose
            port: '9000',
            pathname: '/vehicles/**',
        },
        {
            protocol: 'http',
            hostname: 'minio', // Use the MinIO service name defined in docker-compose
            port: '9000',
            pathname: '/profiles/**',
        },
        {
            protocol: 'http',
            hostname: 'localhost', // Optional: Keep localhost for local development
            port: '9000',
            pathname: '/vehicles/**',
        },
        {
            protocol: 'http',
            hostname: 'localhost', // Optional: Keep localhost for local development
            port: '9000',
            pathname: '/profiles/**',
        },
    ],
      },
};

export default nextConfig;
