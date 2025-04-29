import { 
  Code, Database, Server, Terminal, GitBranch, Globe, 
  Cpu, Cloud, Lock, Shield, Zap, Wifi, 
  Smartphone, Monitor, Code2, Bug, 
  Network, Box, Layers, Settings
} from 'lucide-react';

export interface SkillIcon {
  name: string;
  image: string;
  color: string;
}

export const skillIcons: SkillIcon[] = [
  { 
    name: 'Python',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: 'text-blue-400'
  },
  {
    name: 'C++',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    color: 'text-blue-500'
  },
  {
    name: 'JavaScript',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    color: 'text-yellow-400'
  },
  {
    name: 'PHP',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    color: 'text-purple-400'
  },
  {
    name: 'TypeScript',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: 'text-blue-600'
  },
  {
    name: 'Django',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    color: 'text-green-400'
  },
  {
    name: 'Flask',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
    color: 'text-gray-400'
  },
  {
    name: 'Node.js',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: 'text-green-500'
  },
  {
    name: 'Express',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    color: 'text-gray-500'
  },
  {
    name: 'Angular',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    color: 'text-red-500'
  },
  {
    name: 'React',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: 'text-blue-400'
  },
  {
    name: 'Vue',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    color: 'text-green-500'
  },
  {
    name: 'Git',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    color: 'text-orange-500'
  },
  {
    name: 'VS Code',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    color: 'text-blue-500'
  },
  {
    name: 'Android Studio',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
    color: 'text-green-500'
  },
  {
    name: 'Selenium',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg',
    color: 'text-green-600'
  },
  {
    name: 'Postman',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
    color: 'text-orange-500'
  },
  {
    name: 'Supabase',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
    color: 'text-green-500'
  },
  {
    name: 'MySQL',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    color: 'text-blue-500'
  },
  {
    name: 'MongoDB',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    color: 'text-green-500'
  },
  {
    name: 'PostgreSQL',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    color: 'text-blue-500'
  },
  {
    name: 'Redis',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    color: 'text-red-500'
  },
  {
    name: 'Cursor',
    image: 'https://www.cursor.com/assets/images/logo.svg',
    color: 'text-blue-500'
  },
  {
    name: 'Loveable',
    image: 'data:image/png;base64,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',
    color: 'text-pink-500'
  },
  {
    name: 'Replit',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/replit/replit-original.svg',
    color: 'text-orange-500'
  }
]; 