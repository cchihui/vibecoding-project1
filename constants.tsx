
import React from 'react';
import { Service, Project } from './types';

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    title: 'Full-Stack Development',
    description: 'Scalable web applications built with React, TypeScript, and Node.js. Focused on performance and reliability.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 'ai-integration',
    title: 'Gemini AI Solutions',
    description: 'Integrating state-of-the-art LLMs like Gemini for smart automation, content generation, and intelligent UX.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'mobile-dev',
    title: 'Responsive Design',
    description: 'Cross-platform mobile experiences that look beautiful and function perfectly on every device size.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'SaaS Analytics Dashboard',
    description: 'A comprehensive real-time tracking platform for subscription services with complex data visualization.',
    image: 'https://picsum.photos/seed/dash/800/600',
    tags: ['React', 'D3.js', 'Tailwind'],
    link: '#',
  },
  {
    id: '2',
    title: 'AI Content Assistant',
    description: 'An intelligent writing tool leveraging Gemini API to help creators generate high-quality SEO content.',
    image: 'https://picsum.photos/seed/ai/800/600',
    tags: ['Next.js', 'Gemini', 'TypeScript'],
    link: '#',
  },
  {
    id: '3',
    title: 'EcoMarket Mobile App',
    description: 'A sustainable shopping mobile application featuring geolocation-based local vendor discovery.',
    image: 'https://picsum.photos/seed/eco/800/600',
    tags: ['React Native', 'Firebase', 'Maps'],
    link: '#',
  },
];
