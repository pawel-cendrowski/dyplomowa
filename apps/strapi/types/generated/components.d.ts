import type { Schema, Struct } from '@strapi/strapi';

export interface LinksLinks extends Struct.ComponentSchema {
  collectionName: 'components_links_links';
  info: {
    displayName: 'Links';
  };
  attributes: {
    pages: Schema.Attribute.Relation<'oneToMany', 'api::page.page'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'links.links': LinksLinks;
    }
  }
}
