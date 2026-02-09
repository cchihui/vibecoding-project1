
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export enum Section {
  HERO = 'hero',
  SERVICES = 'services',
  PROJECTS = 'projects',
  CONTACT = 'contact'
}
