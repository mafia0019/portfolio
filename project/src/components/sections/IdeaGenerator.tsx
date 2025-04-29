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
      const { roadmap, prompt } = await generateIdea(keywords);
      setGeneratedRoadmap(roadmap);
      setCopied(false);

      // Log the prompt to console
      console.log('Generated Prompt:', prompt);

      // Store the roadmap in localStorage immediately after generation
      console.log('Storing roadmap in localStorage:', roadmap);
      localStorage.setItem('generatedRoadmap', JSON.stringify(roadmap));
      localStorage.setItem('roadmapTimestamp', Date.now().toString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate project roadmap. Please try again.');
      console.error('Error generating roadmap:', err);
    } finally {
      setIsLoading(false);
    }
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
            <>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg mb-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {generatedRoadmap.title}
                  </h3>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {generatedRoadmap.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Business Value:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    {generatedRoadmap.business_value.map((value, index) => (
                      <li key={index}>{value}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Target Audience:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    {generatedRoadmap.target_audience.map((audience, index) => (
                      <li key={index}>{audience}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Implementation Phases:
                  </h4>
                  <div className="space-y-6">
                    {generatedRoadmap.implementation_phases.map((phase, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <h5 className="text-lg font-medium text-gray-800 dark:text-white">
                          {phase.phase} <span className="text-sm text-gray-500">({phase.duration})</span>
                        </h5>
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
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Key Features:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    {generatedRoadmap.key_features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Estimated Timeline:
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {generatedRoadmap.estimated_timeline}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Investment Areas:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    {generatedRoadmap.investment_areas.map((area, index) => (
                      <li key={index}>{area}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Success Metrics:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    {generatedRoadmap.success_metrics.map((metric, index) => (
                      <li key={index}>{metric}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Satisfied with your success roadmap?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Connect with us to discuss your idea and get started on your project!
                </p>
                <button
                  onClick={handleContactClick}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors interactive mx-auto"
                >
                  <Send size={20} />
                  Connect with Us
                </button>
              </div>

              {showContactForm && !submitSuccess && (
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Connect with Us
                  </h3>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-2">
                        Additional Message (Optional)
                      </label>
                      <textarea
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-32"
                      />
                    </div>
                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={() => setShowContactForm(false)}
                        className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors interactive disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw size={20} className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={20} />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {submitSuccess && (
                <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-green-700 dark:text-green-400">
                    We've received your message and will get back to you soon.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default IdeaGenerator; 