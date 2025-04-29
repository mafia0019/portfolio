import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyCBTTSwWoqot9NEbj4moRd_V-yXdW2YTOw');

// Function to get random elements from an array
const getRandomElements = (arr: string[], num: number): string[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

// List of domains to randomly select from
const domains = [
  'IoT', 'AI/ML', 'Mobile Apps', 'E-commerce', 'Healthcare', 'Education',
  'Entertainment', 'Sustainability', 'Fintech', 'Smart Home', 'Fitness',
  'Social Media', 'Productivity', 'Gaming', 'Travel', 'Food Tech',
  'Blockchain', 'Cybersecurity', 'AR/VR', 'Remote Work'
];

// List of innovation focuses to randomly select from
const innovationFocuses = [
  'automation', 'personalization', 'real-time analytics', 'predictive technology',
  'user experience', 'sustainability', 'accessibility', 'social impact',
  'data privacy', 'machine learning', 'cloud computing', 'mobile-first',
  'cross-platform', 'voice interface', 'gesture control', 'biometrics'
];

// List of target markets
const targetMarkets = [
  'Small Businesses', 'Enterprise', 'Consumers', 'Students', 'Professionals',
  'Healthcare Providers', 'Remote Workers', 'Creative Professionals', 'Developers',
  'Retail', 'Manufacturing', 'Service Industry', 'Education Sector'
];

// List of technology trends
const techTrends = [
  'Edge Computing', 'Quantum Computing', '5G Integration', 'Microservices',
  'Serverless Architecture', 'Progressive Web Apps', 'DevOps Automation',
  'Zero Trust Security', 'Digital Twins', 'Low-Code/No-Code', 'Web3'
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { keywords } = req.body;

    // Get random elements for prompt variation
    const randomDomains = getRandomElements(domains, 2);
    const randomFocuses = getRandomElements(innovationFocuses, 2);
    const randomMarkets = getRandomElements(targetMarkets, 2);
    const randomTrends = getRandomElements(techTrends, 2);
    const timestamp = new Date().getTime();
    const randomSeed = Math.floor(Math.random() * 1000000);

    // Log the random selections first
    console.log('\n=== Random Selections ===');
    console.log('Domains:', randomDomains);
    console.log('Focuses:', randomFocuses);
    console.log('Markets:', randomMarkets);
    console.log('Trends:', randomTrends);
    console.log('Request ID:', `${timestamp}-${randomSeed}`);

    const prompt = `You are an AI project roadmap generator tasked with creating unique project ideas. ${!keywords 
      ? `For this specific request (ID: ${timestamp}-${randomSeed}), generate a completely new and innovative project that meets these criteria:

1. Primary Domain Combination: Create a unique fusion of ${randomDomains.join(' and ')}.
2. Innovation Focus: Incorporate ${randomFocuses.join(' and ')} in novel ways.
3. Target Market: Focus on ${randomMarkets.join(' or ')}.
4. Technology Trend: Leverage ${randomTrends.join(' or ')} for competitive advantage.

Important: This project must be completely different from any previous suggestions. Combine these elements in an unexpected and innovative way.` 
      : `Generate a comprehensive project roadmap related to: ${keywords}`}. 

The response must be in JSON format with the following structure:
{
  "title": "Project Title",
  "description": "Brief, business-focused description of the project and its value proposition",
  "business_value": ["List of key business benefits and value propositions"],
  "target_audience": ["Primary and secondary target audiences"],
  "implementation_phases": [
    {
      "phase": "Phase Name",
      "duration": "Estimated duration",
      "deliverables": ["List of key deliverables"],
      "success_metrics": ["How to measure success in this phase"]
    }
  ],
  "key_features": ["List of main features that provide business value"],
  "estimated_timeline": "Overall project timeline",
  "investment_areas": ["Key areas where investment will be needed"],
  "success_metrics": ["Overall project success metrics"]
}

Make sure the roadmap:
- Focuses on business value and outcomes
- Is easy to understand for non-technical stakeholders
- Provides clear implementation phases
- Includes measurable success metrics
- Highlights key investment areas
- Is realistic and achievable

${!keywords 
  ? `Create a groundbreaking project that uniquely combines ${randomDomains.join(' and ')} with ${randomFocuses.join(' and ')}. 
     The solution should specifically target ${randomMarkets.join(' and ')} while incorporating ${randomTrends.join(' and ')}. 
     Make this project distinctly different from typical solutions in these domains.` 
  : ''}`;

    // Log the full prompt
    console.log('\n=== Generated Prompt ===');
    console.log(prompt);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-001" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Log the response
    console.log('\n=== AI Response ===');
    console.log(text);
    
    // Parse the JSON response
    const idea = JSON.parse(text);
    res.status(200).json({ roadmap: idea, prompt });
  } catch (error) {
    console.error('\n=== Error ===');
    console.error('Error generating idea:', error);
    res.status(500).json({ 
      message: 'Failed to generate project roadmap',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 