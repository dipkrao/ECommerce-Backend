const http = require("http");
const fs = require("fs");
const path = require("path");

const API_BASE_URL = "http://localhost:5000/api";

// Simple HTTP request function
function makeRequest(url, method = "GET", data = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data) {
      const postData = JSON.stringify(data);
      options.headers["Content-Length"] = Buffer.byteLength(postData);
    }

    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Test banner API endpoints
async function testBannerAPI() {
  try {
    console.log("🧪 Testing Banner API...\n");

    // Test 1: Get active banners (should be empty initially)
    console.log("1. Testing GET /api/banners/active...");
    try {
      const response = await makeRequest(`${API_BASE_URL}/banners/active`);
      console.log(`✅ Status: ${response.status}`);
      if (response.data.data) {
        console.log(`✅ Active banners: ${response.data.data.length}`);
      } else {
        console.log("✅ Response received (no banners yet)");
      }
    } catch (error) {
      console.log("❌ Error fetching active banners:", error.message);
    }

    // Test 2: Get all banners (requires auth)
    console.log("\n2. Testing GET /api/banners (requires auth)...");
    try {
      const response = await makeRequest(`${API_BASE_URL}/banners`);
      console.log(`✅ Status: ${response.status}`);
      if (response.data.data) {
        console.log(`✅ All banners: ${response.data.data.length}`);
      }
    } catch (error) {
      console.log(
        "❌ Error fetching all banners (expected if not authenticated):",
        error.message
      );
    }

    console.log("\n🎉 Banner API tests completed!");
    console.log("\n📝 Next steps:");
    console.log("1. Start the backend server: npm run dev");
    console.log("2. Start the admin panel and create banners");
    console.log("3. Start the website to see the dynamic banners");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

// Create a sample banner (requires authentication)
function createSampleBanner() {
  console.log("\n📝 To create a sample banner:");
  console.log("1. Login to the admin panel");
  console.log("2. Navigate to Banners section");
  console.log('3. Click "Add Banner"');
  console.log("4. Fill in the form with sample data:");
  console.log('   - Title: "Summer Sale - Up to 50% Off!"');
  console.log(
    '   - Description: "Get the best deals on premium supplements this summer"'
  );
  console.log('   - Button Text: "Shop Now"');
  console.log('   - Link: "/products"');
  console.log("   - Upload an image");
  console.log("   - Set as Active");
}

if (require.main === module) {
  testBannerAPI().then(() => {
    createSampleBanner();
  });
}

module.exports = { testBannerAPI, createSampleBanner };
