const axios = require("axios");

const API_BASE_URL = "http://localhost:5000/api";

async function createTestBanner() {
  try {
    // First, let's try to get active banners
    console.log("1. Testing GET /api/banners/active...");
    const activeResponse = await axios.get(`${API_BASE_URL}/banners/active`);
    console.log("✅ Active banners response:", activeResponse.data);

    // Now let's try to create a banner (this should fail without auth)
    console.log("\n2. Testing POST /api/banners (should fail without auth)...");
    try {
      const createResponse = await axios.post(`${API_BASE_URL}/banners`, {
        title: "Test Banner",
        description: "This is a test banner",
        link: "https://example.com",
        buttonText: "Shop Now",
        isActive: true,
        order: 0,
      });
      console.log("✅ Banner created:", createResponse.data);
    } catch (error) {
      console.log(
        "❌ Expected error (no auth):",
        error.response?.data?.message || error.message
      );
    }

    // Test with a demo token (should also fail)
    console.log("\n3. Testing with demo token...");
    try {
      const demoResponse = await axios.post(
        `${API_BASE_URL}/banners`,
        {
          title: "Test Banner",
          description: "This is a test banner",
          link: "https://example.com",
          buttonText: "Shop Now",
          isActive: true,
          order: 0,
        },
        {
          headers: {
            Authorization: "Bearer demo-token-123",
          },
        }
      );
      console.log("✅ Banner created with demo token:", demoResponse.data);
    } catch (error) {
      console.log(
        "❌ Expected error (invalid token):",
        error.response?.data?.message || error.message
      );
    }
  } catch (error) {
    console.error("❌ Unexpected error:", error.message);
  }
}

createTestBanner();
