import React, { useState } from 'react';
import { Sparkles, RefreshCw, Copy, Check, Send } from 'lucide-react';
import { generateIdea } from '../../api/generate-idea';

interface ImplementationPhase {
  phase: string;
  duration: string;
  deliverables: string[];
  success_metrics: string[];
}

interface ProjectRoadmap {
  title: string;
  description: string;
  business_value: string[];
  target_audience: string[];
  implementation_phases: ImplementationPhase[];
  key_features: string[];
  estimated_timeline: string;
  investment_areas: string[];
  success_metrics: string[];
}

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const IdeaGenerator: React.FC = () => {
  const [keywords, setKeywords] = useState('');
  const [generatedRoadmap, setGeneratedRoadmap] = useState<ProjectRoadmap | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleGenerateRoadmap = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedRoadmap(null);
    
    try {
      // Clear the contact form message first
      const clearEvent = new CustomEvent('clearContactForm');
      window.dispatchEvent(clearEvent);

      const { roadmap, prompt } = await generateIdea(keywords);
      setGeneratedRoadmap(roadmap);
      setCopied(false);

      // Log the prompt to console
      console.log('Generated Prompt:', prompt);

      // Store the roadmap in localStorage immediately after generation
      console.log('Storing roadmap in localStorage:', roadmap);
      localStorage.setItem('generatedRoadmap', JSON.stringify(roadmap));
      localStorage.setItem('roadmapTimestamp', Date.now().toString());

      // Dispatch event to notify Contact component
      const event = new CustomEvent('roadmapConnect', {
        detail: { timestamp: Date.now() }
      });
      window.dispatchEvent(event);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate project roadmap. Please try again.');
      console.error('Error generating roadmap:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to check if project duration exceeds 4-5 months
  const isLongDurationProject = (roadmap: ProjectRoadmap) => {
    const timeline = roadmap.estimated_timeline.toLowerCase();
    return (
      timeline.includes('5 months') ||
      timeline.includes('6 months') ||
      timeline.includes('7 months') ||
      timeline.includes('8 months') ||
      timeline.includes('9 months') ||
      timeline.includes('10 months') ||
      timeline.includes('11 months') ||
      timeline.includes('12 months') ||
      timeline.includes('year') ||
      timeline.includes('years')
    );
  };

  const copyToClipboard = () => {
    if (generatedRoadmap) {
      const text = `
Project: ${generatedRoadmap.title}
Description: ${generatedRoadmap.description}

Business Value:
${generatedRoadmap.business_value.map(value => `- ${value}`).join('\n')}

Target Audience:
${generatedRoadmap.target_audience.map(audience => `- ${audience}`).join('\n')}

Implementation Phases:
${generatedRoadmap.implementation_phases.map(phase => `
${phase.phase} (${phase.duration})
Deliverables:
${phase.deliverables.map(d => `- ${d}`).join('\n')}
Success Metrics:
${phase.success_metrics.map(m => `- ${m}`).join('\n')}
`).join('\n')}

Key Features:
${generatedRoadmap.key_features.map(feature => `- ${feature}`).join('\n')}

Estimated Timeline: ${generatedRoadmap.estimated_timeline}

Investment Areas:
${generatedRoadmap.investment_areas.map(area => `- ${area}`).join('\n')}

Success Metrics:
${generatedRoadmap.success_metrics.map(metric => `- ${metric}`).join('\n')}
      `;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the form data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Prepare the email content
      const emailContent = `
Name: ${contactForm.name}
Email: ${contactForm.email}
Message: ${contactForm.message}

Generated Roadmap:
${JSON.stringify(generatedRoadmap, null, 2)}
      `;
      
      // You would typically send this to your backend
      console.log('Email content:', emailContent);
      
      setSubmitSuccess(true);
      setShowContactForm(false);
      setContactForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to submit contact form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactClick = () => {
    // Dispatch a custom event to notify Contact component
    const event = new CustomEvent('roadmapConnect', {
      detail: { timestamp: Date.now() }
    });
    window.dispatchEvent(event);
    
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to render roadmap content based on duration
  const renderRoadmapContent = (roadmap: ProjectRoadmap) => {
    const isLong = isLongDurationProject(roadmap);

    return (
      <>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {roadmap.title}
          </h3>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Disclaimer Section */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">Important Notice</h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                The timeline, phases, and roadmap details provided are initial estimates and are subject to negotiation based on our discussion. The final scope and timeline will be determined after understanding your specific project requirements and constraints.
              </p>
            </div>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {roadmap.description}
        </p>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Business Value:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
            {roadmap.business_value.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Target Audience:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
            {roadmap.target_audience.map((audience, index) => (
              <li key={index}>{audience}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Implementation Phases:
          </h4>
          <div className="space-y-6">
            {roadmap.implementation_phases.map((phase, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h5 className="text-lg font-medium text-gray-800 dark:text-white">
                  {phase.phase} <span className="text-sm text-gray-500">({phase.duration})</span>
                </h5>
                {(!isLong || index < 2) ? (
                  <>
                    <div className="mt-2">
                      <h6 className="font-medium text-gray-700 dark:text-gray-300">Deliverables:</h6>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                        {phase.deliverables.map((deliverable, i) => (
                          <li key={i}>{deliverable}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-2">
                      <h6 className="font-medium text-gray-700 dark:text-gray-300">Success Metrics:</h6>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                        {phase.success_metrics.map((metric, i) => (
                          <li key={i}>{metric}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 italic">
                      Tentative phase - Details to be discussed during project planning
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {isLong && (
          <div className="mb-6 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-2 border-yellow-400 dark:border-yellow-600 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-yellow-800 dark:text-yellow-300 mb-2">Extended Project Timeline</h4>
                <div className="space-y-2">
                  <p className="text-base text-yellow-700 dark:text-yellow-400">
                    This project requires a longer implementation timeline. To ensure accurate planning and resource allocation:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-yellow-700 dark:text-yellow-400">
                    <li>Only the first two phases are detailed above</li>
                    <li>Additional phases are tentative and will be discussed in detail during project planning</li>
                    <li>We recommend scheduling a 30-minute discussion to review the complete implementation plan</li>
                    <li>Final timeline and resource allocation will be determined based on your specific requirements</li>
                  </ul>
                  <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-800/30 rounded-md">
                    <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">
                      Next Steps: Contact us to schedule a project planning call
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Key Features:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
            {roadmap.key_features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Estimated Timeline:
          </h4>
          <p className="text-gray-600 dark:text-gray-300">
            {roadmap.estimated_timeline}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Investment Areas:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
            {roadmap.investment_areas.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Success Metrics:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
            {roadmap.success_metrics.map((metric, index) => (
              <li key={index}>{metric}</li>
            ))}
          </ul>
        </div>
      </>
    );
  };

  return (
    <section id="idea-generator" className="py-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Got an idea? Let's create a roadmap to success!
        </h2>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg mb-8">
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Enter keywords to influence the roadmap (optional):
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g., E-commerce, Mobile App, AI Solution..."
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            <button
              onClick={handleGenerateRoadmap}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors interactive disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <RefreshCw size={20} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Roadmap
                </>
              )}
            </button>

            {error && (
              <p className="mt-4 text-red-500 text-center">{error}</p>
            )}
          </div>

          {generatedRoadmap && (
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg mb-8">
              {renderRoadmapContent(generatedRoadmap)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IdeaGenerator; 