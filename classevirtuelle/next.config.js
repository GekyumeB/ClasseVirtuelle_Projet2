/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI:
      "mongodb+srv://classevirtuel:TheBestVirtualClass@cluster0.0ix32.mongodb.net/classevirtuelle?retryWrites=true&w=majority",

    CLOUDINARY_CLOUD_NAME: "dhouw3lii",
    CLOUDINARY_API_KEY: "415191723535558",
    CLOUDINARY_API_SECRET: "qaVnIrTnr3AXGQIdFF7iIhPCsdE",

    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "aD23dqD3832$@v45hTR#@5245AFE7#$@643fC423G5sd",
  },
};

module.exports = nextConfig;
