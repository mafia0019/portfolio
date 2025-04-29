import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client with hardcoded API key
const genAI = new GoogleGenerativeAI('AIzaSyC09zFr41hdCPSnLnc227sqrnewvsFWuLc');

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

// Debug: Log environment information
console.log('API Module - Environment check:', {
  hasApiKey: !!import.meta.env.VITE_GEMINI_API_KEY,
  apiKeyLength: import.meta.env.VITE_GEMINI_API_KEY?.length,
  apiKeyPrefix: import.meta.env.VITE_GEMINI_API_KEY ? `${import.meta.env.VITE_GEMINI_API_KEY.substring(0, 5)}...` : 'Not found',
  envKeys: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')),
  envMode: import.meta.env.MODE
});

export async function generateIdea(keywords: string) {
  try {
    // Get random elements for prompt variation
    const randomDomains = getRandomElements(domains, 2);
    const randomFocuses = getRandomElements(innovationFocuses, 2);
    const randomMarkets = getRandomElements(targetMarkets, 2);
    const randomTrends = getRandomElements(techTrends, 2);
    const timestamp = new Date().getTime();
    const randomSeed = Math.floor(Math.random() * 1000000);

    const prompt = `You are an AI project roadmap generator tasked with creating unique project ideas. ${!keywords 
      ? `For this specific request (ID: ${timestamp}-${randomSeed}), generate a completely new and innovative project that meets these criteria:

1. Primary Domain Combination: Create a unique fusion of ${randomDomains.join(' and ')}.
2. Innovation Focus: Incorporate ${randomFocuses.join(' and ')} in novel ways.
3. Target Market: Focus on ${randomMarkets.join(' or ')}.
4. Technology Trend: Leverage ${randomTrends.join(' or ')} for competitive advantage.

Important: This project must be completely different from any previous suggestions. Combine these elements in an unexpected and innovative way.` 
      : `Generate a comprehensive project roadmap related to: ${keywords}`}. 

CRITICAL REQUIREMENTS:
1. Timeline Constraints:
   - Each phase should be 1-2 months maximum
   - Total phases should not exceed 3
   - If the project naturally requires more time, add a note: "This project requires a longer timeline. Please contact us for a detailed implementation plan."

2. Phase Structure:
   - For projects under 4 months:
     - Phase 1: Initial Setup and Core Features (1-2 months)
     - Phase 2: Feature Enhancement and Integration (1-2 months)
     - Phase 3: Testing and Launch (1 month)
   - For projects over 4 months:
     - Show only 2 detailed phases with full deliverables and metrics
     - For phases after Phase 2, only include:
       - Phase title
       - Estimated duration
       - A note: "Details to be discussed during project planning"
     - Do not include deliverables or success metrics for phases after Phase 2
     - Add a note: "Additional phases are tentative and will be discussed in detail during project planning"
   - Any additional phases should be marked as "Future Enhancements" and not included in the main timeline

3. For projects that naturally require more time:
   - Show only the first 2 phases in detail with full deliverables and metrics
   - For all subsequent phases, only include:
     - Phase title
     - Estimated duration
     - A note: "Details to be discussed during project planning"
   - Do not include deliverables or success metrics for phases after Phase 2
   - For the estimated_timeline field, use: "Timeline to be discussed in detail during a project planning call"
   - Add a note: "This is a high-level overview. For a detailed implementation plan and timeline tailored to your specific requirements, please contact us to get started. We recommend scheduling a 30-minute discussion to review the phases and timeline."
   - Focus on quick wins and initial implementation
   - Emphasize modular development approach

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
- Prioritizes shorter timelines (aim for 2-3 months when possible)
- Breaks down complex features into smaller, manageable phases

${!keywords 
  ? `Create a groundbreaking project that uniquely combines ${randomDomains.join(' and ')} with ${randomFocuses.join(' and ')}. 
     The solution should specifically target ${randomMarkets.join(' and ')} while incorporating ${randomTrends.join(' and ')}. 
     Make this project distinctly different from typical solutions in these domains.` 
  : ''}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Log the raw response for debugging
    console.log('Raw API Response:', text);
    
    // Clean up the response text to ensure it's valid JSON
    const cleanedText = text
      .replace(/```json\s*/g, '') // Remove ```json prefix
      .replace(/```\s*$/g, '')    // Remove ``` suffix
      .replace(/^[^{]*/, '')      // Remove any text before the first {
      .replace(/[^}]*$/, '')      // Remove any text after the last }
      .trim();
    
    try {
      // Try to parse the cleaned text
      const roadmap = JSON.parse(cleanedText);
      
      // Validate the roadmap structure
      if (!roadmap.title || !roadmap.description || !Array.isArray(roadmap.business_value) ||
          !Array.isArray(roadmap.target_audience) || !Array.isArray(roadmap.implementation_phases) ||
          !Array.isArray(roadmap.key_features) || !roadmap.estimated_timeline ||
          !Array.isArray(roadmap.investment_areas) || !Array.isArray(roadmap.success_metrics)) {
        console.error('Invalid roadmap structure:', roadmap);
        throw new Error('Invalid roadmap structure received from API');
      }
      
      return { roadmap, prompt };
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      console.log('Cleaned text that failed to parse:', cleanedText);
      
      // Try to extract JSON from the text if it's embedded in other content
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const extractedJson = JSON.parse(jsonMatch[0]);
          if (extractedJson.title && extractedJson.description) {
            console.log('Successfully extracted JSON from text');
            return { roadmap: extractedJson, prompt };
          }
        }
      } catch (extractError) {
        console.error('Failed to extract JSON from text:', extractError);
      }
      
      throw new Error('Failed to parse the API response as JSON. Please try again.');
    }
  } catch (error) {
    console.error('Error generating roadmap:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate project roadmap: ${error.message}`);
    }
    throw new Error('Failed to generate project roadmap');
  }
} 