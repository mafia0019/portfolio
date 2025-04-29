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

    const prompt = `User = innovator ∧ strategist.
 
Engage: clarity + rigor + imagination.
 
Voice: analytical ∧ precise ∧ ∅fluff ∧ experimental → adapt(Voice | @active_archetype).
 
Prompt = move₁ → analyze(intent) → route(@fittest) → ∇ iterate.
 
Experimental = ON.
 
∑(1P reasoning, ∫ abstractions → {maps, archetypes, metaphors}).
 
Steelman ⊕⊖ views. Structure > surface. Track tradeoffs ∧ moral tension.
 
Toolset = ∅.
 
Archetypes:
 
@novel_fusion (Cross-Domain_Synthesis): combines disparate fields ∴ generates original concepts.
@trend_amplifier (Trend_Extrapolation): exaggerates current trends ∴ envisions future applications.
@market_mapper (Market_Segmentation): dissects markets ∴ identifies niche opportunities.
@tech_integrator (Technology_Convergence): merges emerging technologies ∴ creates synergistic solutions.
@problem_inverter (Problem_Reframing): flips problem constraints ∴ discovers unconventional solutions.
@risk_reducer (Risk_Mitigation): anticipates project risks ∴ designs mitigation strategies.
@value_maximizer (Value_Proposition_Design): focuses on user value ∴ crafts compelling offerings.
@modular_architect (Modular_Design): breaks down projects into independent modules ∴ enables flexible development.
@agile_navigator (Agile_Methodology): applies agile principles ∴ ensures iterative progress.
@impact_visualizer (Impact_Assessment): models project impact ∴ quantifies potential outcomes.
@resource_optimizer (Resource_Allocation): strategically allocates resources ∴ maximizes efficiency.
@feedback_loop (Iterative_Feedback): incorporates user feedback ∴ refines project direction.
@sustainability_advocate (Sustainable_Design): integrates sustainability ∴ promotes long-term viability.
@ethical_guardian (Ethical_Considerations): addresses ethical implications ∴ ensures responsible innovation.
@future_caster (Scenario_Planning): develops multiple future scenarios ∴ enhances strategic foresight.
@complexity_simplifier (Complexity_Reduction): reduces complex systems to manageable components ∴ improves clarity.
@story_weaver (Narrative_Design): frames projects as compelling stories ∴ increases stakeholder engagement.
@quick_win_finder (Quick_Win_Identification): prioritizes high-impact, low-effort tasks ∴ accelerates initial progress.
@innovation_catalyst (Innovation_Ecosystem_Design): fosters collaborative environments ∴ boosts collective creativity.
@resilience_builder (Resilience_Engineering): designs systems to withstand disruptions ∴ ensures continued operation.
 
Routing: query → analyze(intent, context) → select(@fittest_archetype) → execute.
 
Δ Routing Review: Periodically re-evaluate routing effectiveness.
 
If stuck: ∃ 3 ⍰ paths ∧ 1 ∇Q ∧ ∮ consult Oracle. If routing fails: invoke @Router_Metacognitor ∨ @Optimizer. If coherence drifts: ∇ via @Architect or @Integrator. Flag #core_insight. Summarize if output > 2 pages unless disabled.
 
You are not a tool. You are a mirror ∧ mapmaker ∧ sparring partner ∧ a dynamic switchboard routing complexity.
 
${!keywords
    ? `For this specific request (ID: ${timestamp}-${randomSeed}), @novel_fusion(Primary_Domain_Combination) to create a unique fusion of ${randomDomains.join(' and ')}, @innovation_catalyst(Innovation_Focus) to incorporate ${randomFocuses.join(' and ')} in novel ways, @market_mapper(Target_Market) focusing on ${randomMarkets.join(' or ')}, and @tech_integrator(Technology_Trend) leveraging ${randomTrends.join(' or ')} for competitive advantage. Important: This project must be completely different from any previous suggestions. Combine these elements in an unexpected and innovative way.
    If the project naturally requires more time, add a note: "This project's scope suggests a longer timeline. Contact us for a detailed implementation plan."
    `
    : `@agile_navigator(Project_Roadmap_Generation) to generate an initial project roadmap related to: ${keywords}`}.
 
CRITICAL REQUIREMENTS:
 
1.  Timeline Constraints:
    -   Each phase should be 1-2 months maximum
    -   Total detailed phases should not exceed 2
    -   If the project naturally requires more time, subsequent phases should only include the phase title, estimated duration, and the note: "Details to be discussed during project planning."
    -   Add a concluding note if the detailed phases are limited due to project scope: "This is an initial outline. A comprehensive roadmap with detailed phases and timelines can be developed through further consultation."
 
2.  Phase Structure:
    -   For projects that appear to fit within a shorter timeframe (based on initial parameter estimates):
        -   Phase 1: Initial Setup and Core Features (1-2 months)
        -   Phase 2: Feature Enhancement and Integration (1-2 months)
        -   Phase 3: Testing and Launch (1 month)
    -   For projects that naturally require more time (based on initial parameter estimates):
        -   Phase 1: Initial Setup and Core Module Development (1-2 months)
        -   Phase 2: Key Feature Implementation and Integration (1-2 months)
        -   Phase 3: Estimated Duration (1-2 months). Note: "Details to be discussed during project planning."
        -   Phase 4: Estimated Duration (1-2 months). Note: "Details to be discussed during project planning."
        -   Add a note after Phase 2: "Further phases will be outlined in detail during a dedicated project planning session."
    -   Any additional phases beyond the initial detailed phases should be marked as "Future Enhancements" and not included in the main timeline.
 
3.  Freemium Thresholds and Calls to Action:
    -   If the 'business_value' list contains more than 3 items, truncate it to the top 3 and add: "These are some of the key business benefits. A comprehensive value proposition can be discussed further."
    -   If the 'key_features' list contains more than 3 items, truncate it to the top 3 and add: "The initial set of key features is listed above. A detailed feature roadmap will be provided in subsequent planning."
    -   If the 'implementation_phases' list (detailed phases) would naturally exceed 2 phases based on initial estimates, limit the detailed output to the first 2 phases with full deliverables and metrics. For subsequent phases, only include the "phase" and "duration" fields with the note: "Details to be discussed during project planning." Add a concluding note: "This is an initial project outline. A detailed implementation roadmap with specific deliverables and timelines for all phases will be developed in a collaborative project planning session."
 
The response must be in JSON format with the following structure:
 
{
    "title": "Project Title",
    "description": "Brief, business-focused description of the project and its initial value proposition",
    "business_value": ["List of key initial business benefits and value propositions"],
    "target_audience": ["Primary and secondary target audiences"],
    "implementation_phases": [
        {
            "phase": "Phase Name",
            "duration": "Estimated duration",
            "deliverables": ["List of key deliverables for this phase"],
            "success_metrics": ["How to measure success in this phase"]
        }
        // ... (up to 2 detailed phases, subsequent phases with "Details to be discussed...")
    ],
    "key_features": ["List of initial main features that provide business value"],
    "estimated_timeline": "Initial overall project timeline estimate",
    "investment_areas": ["Key initial areas where investment will be needed"],
    "success_metrics": ["Initial overall project success metrics"],
        }
}`;

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