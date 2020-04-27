import { schema } from 'normalizr';

// Define a users schema
export const user = new schema.Entity('users');

// Define your comments schema
export const bullet = new schema.Entity(
  'bullets',
  {},
  {
    idAttribute: '_id'
  }
);
bullet.define({
  children: [bullet]
});

// Define your article
export const collection = new schema.Entity(
  'collections',
  { contents: [bullet] },
  {
    idAttribute: '_id'
  }
);
