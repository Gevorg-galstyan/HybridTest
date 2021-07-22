import { openDB } from 'idb';

const dbPromise = openDB('blog-store', 1, {
    upgrade(db) {
        db.createObjectStore('blog-db');
    },
});

export const BlogStorage = {
    get: async key => (await dbPromise).get('blog-db', key),
    set: async (key, value) => (await dbPromise).put('blog-db', value, key),
};
