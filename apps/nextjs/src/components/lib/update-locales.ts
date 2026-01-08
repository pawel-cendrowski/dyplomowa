import fs from 'fs';
import path from 'path';

interface StrapiLocale {
  id: number;
  name: string;
  code: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

const internalHost = process.env.PRIVATE_STRAPI_URL;

async function updateLocales() {
  console.log('Fetching languages from Strapi in progress...');

  const configDir = path.join(process.cwd(), 'src/config');
  const configPath = path.join(configDir, 'locales.json');

  console.log(`Destination: ${configPath}`);

  try {
    const response = await fetch(`${internalHost}/api/i18n/locales`);

    if (!response.ok) {
      throw new Error(`Strapi API Error: ${response.status}`);
    }

    const data = (await response.json()) as StrapiLocale[];

    if (!Array.isArray(data)) {
      throw new Error('Invalid data format. Not an Array');
    }

    const locales = data.map((item) => item.code);

    // Czy istnieje folder
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    fs.writeFileSync(configPath, JSON.stringify(locales));
    console.log(`Success! Saved: ${JSON.stringify(locales)}`);

  } catch (error) {
    console.error('Failed to fetch languages:', error);

    // Fallback
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    if (!fs.existsSync(configPath)) {
      const fallback = ['pl', 'en'];
      fs.writeFileSync(configPath, JSON.stringify(fallback));
      console.warn(`Fallback applied: ${JSON.stringify(fallback)}`);
    }
  }
}

updateLocales();