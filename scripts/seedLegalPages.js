const mongoose = require('mongoose');
const LegalPage = require('../models/LegalPage');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-admin')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const legalPagesData = [
  {
    pageType: 'privacy-policy',
    title: 'Privacy Policy',
    content: {
      sections: [
        {
          id: 'introduction',
          title: '1. Introduction',
          content: 'PowerFuel ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile application, or make purchases from us.',
          subsections: []
        },
        {
          id: 'information-collection',
          title: '2. Information We Collect',
          content: 'We collect personal information such as names, email addresses, phone numbers, and payment information. We also automatically collect device information, usage data, and cookies.',
          subsections: [
            {
              id: 'personal-info',
              title: '2.1 Personal Information',
              content: 'Name, contact information, account credentials, payment information, order history, and preferences.'
            },
            {
              id: 'automatic-info',
              title: '2.2 Automatically Collected Information',
              content: 'Device information, usage data, cookies, and location information (with consent).'
            }
          ]
        },
        {
          id: 'information-use',
          title: '3. How We Use Your Information',
          content: 'We use collected information to process orders, provide customer support, send updates, improve services, personalize experiences, and ensure security.',
          subsections: []
        },
        {
          id: 'information-sharing',
          title: '4. Information Sharing and Disclosure',
          content: 'We do not sell personal information. We may share with service providers, payment processors, legal requirements, and business transfers.',
          subsections: []
        },
        {
          id: 'data-security',
          title: '5. Data Security',
          content: 'We implement encryption, secure storage, security assessments, access controls, and employee training.',
          subsections: []
        },
        {
          id: 'your-rights',
          title: '6. Your Rights and Choices',
          content: 'You have rights to access, correct, delete, port, and opt-out of your personal information.',
          subsections: []
        },
        {
          id: 'cookies',
          title: '7. Cookies and Tracking Technologies',
          content: 'We use essential, analytics, marketing, and preference cookies to enhance your experience.',
          subsections: []
        },
        {
          id: 'third-party',
          title: '8. Third-Party Services',
          content: 'Our website may contain links to third-party services. We are not responsible for their privacy practices.',
          subsections: []
        },
        {
          id: 'children',
          title: '9. Children\'s Privacy',
          content: 'Our services are not intended for children under 13. We do not knowingly collect their information.',
          subsections: []
        },
        {
          id: 'international',
          title: '10. International Data Transfers',
          content: 'Information may be transferred internationally with appropriate safeguards and compliance.',
          subsections: []
        },
        {
          id: 'changes',
          title: '11. Changes to This Privacy Policy',
          content: 'We may update this policy. Changes are effective immediately upon posting.',
          subsections: []
        },
        {
          id: 'contact',
          title: '12. Contact Us',
          content: 'For questions about this policy, contact us at privacy@powerfuel.com or +1 (555) 123-4567.',
          subsections: []
        }
      ]
    },
    meta: {
      description: 'PowerFuel Privacy Policy - Learn how we collect, use, and protect your personal information.',
      keywords: 'privacy policy, data protection, personal information, cookies, PowerFuel'
    }
  },
  {
    pageType: 'terms-of-service',
    title: 'Terms of Service',
    content: {
      sections: [
        {
          id: 'acceptance',
          title: '1. Acceptance of Terms',
          content: 'By accessing and using PowerFuel\'s website, mobile application, and services, you accept and agree to be bound by the terms and provision of this agreement.',
          subsections: []
        },
        {
          id: 'description',
          title: '2. Description of Service',
          content: 'PowerFuel provides an online platform for purchasing fitness supplements, health products, and related merchandise.',
          subsections: []
        },
        {
          id: 'user-accounts',
          title: '3. User Accounts',
          content: 'You must create an account to access certain features. You agree to provide accurate information and maintain security.',
          subsections: [
            {
              id: 'account-creation',
              title: '3.1 Account Creation',
              content: 'Provide accurate information, maintain updates, keep credentials secure, and accept responsibility.'
            },
            {
              id: 'account-security',
              title: '3.2 Account Security',
              content: 'Maintain confidentiality and notify us of unauthorized use.'
            }
          ]
        },
        {
          id: 'product-information',
          title: '4. Product Information and Pricing',
          content: 'We strive for accurate descriptions but do not warrant completeness. Prices are subject to change.',
          subsections: [
            {
              id: 'descriptions',
              title: '4.1 Product Descriptions',
              content: 'We provide descriptions, images, and pricing but do not guarantee accuracy.'
            },
            {
              id: 'pricing',
              title: '4.2 Pricing',
              content: 'Prices subject to change, exclude taxes and shipping, and may be modified.'
            },
            {
              id: 'availability',
              title: '4.3 Availability',
              content: 'Product availability subject to change with quantity limits possible.'
            }
          ]
        },
        {
          id: 'orders-payment',
          title: '5. Orders and Payment',
          content: 'Orders subject to acceptance and availability. We accept various payment methods.',
          subsections: [
            {
              id: 'order-acceptance',
              title: '5.1 Order Acceptance',
              content: 'Orders subject to acceptance. We may refuse orders for various reasons.'
            },
            {
              id: 'payment-methods',
              title: '5.2 Payment Methods',
              content: 'We accept credit cards, debit cards, and digital wallets in specified currency.'
            },
            {
              id: 'payment-processing',
              title: '5.3 Payment Processing',
              content: 'Handled by secure third-party processors. We do not store complete payment information.'
            }
          ]
        },
        {
          id: 'shipping-delivery',
          title: '6. Shipping and Delivery',
          content: 'We offer various shipping options with different delivery times and costs.',
          subsections: [
            {
              id: 'shipping-methods',
              title: '6.1 Shipping Methods',
              content: 'Various options with different delivery times and costs provided during checkout.'
            },
            {
              id: 'delivery',
              title: '6.2 Delivery',
              content: 'Delivery to address provided. Risk passes upon delivery to carrier.'
            },
            {
              id: 'international',
              title: '6.3 International Shipping',
              content: 'May be subject to customs duties, taxes, and other charges.'
            }
          ]
        },
        {
          id: 'returns-refunds',
          title: '7. Returns and Refunds',
          content: 'We accept returns within 30 days for most products in original condition.',
          subsections: [
            {
              id: 'return-policy',
              title: '7.1 Return Policy',
              content: 'Returns within 30 days, original condition, original packaging, proof of purchase required.'
            },
            {
              id: 'refund-process',
              title: '7.2 Refund Process',
              content: 'Refunds processed within 5-10 business days. Shipping costs non-refundable.'
            },
            {
              id: 'exclusions',
              title: '7.3 Exclusions',
              content: 'Certain products not eligible due to health regulations or manufacturer restrictions.'
            }
          ]
        },
        {
          id: 'prohibited-uses',
          title: '8. Prohibited Uses',
          content: 'You agree not to use our service for unlawful purposes or solicit unlawful acts.',
          subsections: []
        },
        {
          id: 'intellectual-property',
          title: '9. Intellectual Property',
          content: 'Website content is our property and protected by copyright and intellectual property laws.',
          subsections: []
        },
        {
          id: 'limitation-liability',
          title: '10. Limitation of Liability',
          content: 'We shall not be liable for indirect, incidental, special, consequential, or punitive damages.',
          subsections: []
        },
        {
          id: 'indemnification',
          title: '11. Indemnification',
          content: 'You agree to indemnify and hold us harmless from claims arising from service use.',
          subsections: []
        },
        {
          id: 'governing-law',
          title: '12. Governing Law',
          content: 'These Terms governed by New York State law without regard to conflict provisions.',
          subsections: []
        },
        {
          id: 'changes-terms',
          title: '13. Changes to Terms',
          content: 'We may modify Terms at any time. Changes effective immediately upon posting.',
          subsections: []
        },
        {
          id: 'contact-info',
          title: '14. Contact Information',
          content: 'For questions about Terms, contact us at legal@powerfuel.com or +1 (555) 123-4567.',
          subsections: []
        }
      ]
    },
    meta: {
      description: 'PowerFuel Terms of Service - Read our terms and conditions for using our fitness supplement platform.',
      keywords: 'terms of service, user agreement, PowerFuel, fitness supplements, online shopping'
    }
  },
  {
    pageType: 'cookie-policy',
    title: 'Cookie Policy',
    content: {
      sections: [
        {
          id: 'what-are-cookies',
          title: '1. What Are Cookies',
          content: 'Cookies are small text files placed on your device when visiting our website. They make websites work efficiently and provide information to owners.',
          subsections: []
        },
        {
          id: 'how-we-use-cookies',
          title: '2. How We Use Cookies',
          content: 'PowerFuel uses cookies for essential functionality, performance analysis, user preferences, targeted advertising, and analytics insights.',
          subsections: []
        },
        {
          id: 'types-of-cookies',
          title: '3. Types of Cookies We Use',
          content: 'We use essential, performance, functional, and targeting cookies for different purposes.',
          subsections: [
            {
              id: 'essential-cookies',
              title: '3.1 Essential Cookies',
              content: 'Necessary for website functionality including authentication, shopping cart, and security.'
            },
            {
              id: 'performance-cookies',
              title: '3.2 Performance and Analytics Cookies',
              content: 'Help understand visitor interaction through anonymous data collection and reporting.'
            },
            {
              id: 'functional-cookies',
              title: '3.3 Functional Cookies',
              content: 'Enable enhanced functionality and personalization like language and region preferences.'
            },
            {
              id: 'targeting-cookies',
              title: '3.4 Targeting and Advertising Cookies',
              content: 'Used for relevant advertisements, limiting ad frequency, and measuring campaign effectiveness.'
            }
          ]
        },
        {
          id: 'third-party-cookies',
          title: '4. Third-Party Cookies',
          content: 'Our website may use third-party cookies from various services and platforms.',
          subsections: [
            {
              id: 'google-analytics',
              title: '4.1 Google Analytics',
              content: 'We use Google Analytics to understand website usage. Cookies collect information including IP address.'
            },
            {
              id: 'payment-processors',
              title: '4.2 Payment Processors',
              content: 'Payment processors place cookies for secure processing and fraud prevention.'
            },
            {
              id: 'social-media',
              title: '4.3 Social Media Platforms',
              content: 'Social media platforms place cookies when interacting with social features on our website.'
            },
            {
              id: 'advertising-networks',
              title: '4.4 Advertising Networks',
              content: 'We work with advertising networks that place cookies for personalized advertisements.'
            }
          ]
        },
        {
          id: 'cookie-duration',
          title: '5. Cookie Duration',
          content: 'Cookies have different lifespans including session cookies and persistent cookies.',
          subsections: [
            {
              id: 'session-cookies',
              title: '5.1 Session Cookies',
              content: 'Temporary cookies deleted when browser closes, used for session maintenance.'
            },
            {
              id: 'persistent-cookies',
              title: '5.2 Persistent Cookies',
              content: 'Remain on device for set period, used for preferences and settings.'
            },
            {
              id: 'third-party-duration',
              title: '5.3 Third-Party Cookie Duration',
              content: 'Duration determined by respective third-party services and may vary.'
            }
          ]
        },
        {
          id: 'managing-preferences',
          title: '6. Managing Your Cookie Preferences',
          content: 'You can control cookies through browser settings, consent management, and opt-out options.',
          subsections: [
            {
              id: 'browser-settings',
              title: '6.1 Browser Settings',
              content: 'Control cookies through browser settings including viewing, deleting, and blocking options.'
            },
            {
              id: 'cookie-consent',
              title: '6.2 Cookie Consent',
              content: 'Cookie consent banner allows accepting all, essential only, or customizing preferences.'
            },
            {
              id: 'opt-out-options',
              title: '6.3 Opt-Out Options',
              content: 'Opt out through third-party services for analytics, advertising, and social media.'
            }
          ]
        },
        {
          id: 'impact-disabling',
          title: '7. Impact of Disabling Cookies',
          content: 'Disabling certain cookies may affect website functionality and user experience.',
          subsections: []
        },
        {
          id: 'updates-policy',
          title: '8. Updates to This Cookie Policy',
          content: 'We may update this policy to reflect changes in practices or operational reasons.',
          subsections: []
        },
        {
          id: 'contact-us',
          title: '9. Contact Us',
          content: 'For questions about cookies or this policy, contact us at privacy@powerfuel.com or +1 (555) 123-4567.',
          subsections: []
        },
        {
          id: 'additional-resources',
          title: '10. Additional Resources',
          content: 'Visit external resources for more information about cookies and management.',
          subsections: []
        }
      ]
    },
    meta: {
      description: 'PowerFuel Cookie Policy - Learn about how we use cookies and how to manage your preferences.',
      keywords: 'cookie policy, cookies, tracking, privacy, PowerFuel, website cookies'
    }
  }
];

async function seedLegalPages() {
  try {
    // Clear existing legal pages
    await LegalPage.deleteMany({});
    console.log('Cleared existing legal pages');

    // Insert new legal pages
    const result = await LegalPage.insertMany(legalPagesData);
    console.log(`Successfully seeded ${result.length} legal pages:`);
    
    result.forEach(page => {
      console.log(`- ${page.pageType}: ${page.title}`);
    });

    console.log('\nLegal pages seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding legal pages:', error);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seeding function
seedLegalPages();
