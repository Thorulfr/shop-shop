export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
        // Open connection to shop-shop database version 1
        const request = window.indexedDB.open('shop-shop', 1);
        // Create variables to hold references to database, transaction, object store
        let db, tx, store;
        // Create three object stores if first-time user and/or version has changed

        request.onupgradeneeded = function (e) {
            const db = request.result;
            // Create object stores with primary key index set to data ID
            db.createObjectStore('products', { keyPath: '_id' });
            db.createObjectStore('categories', { keyPath: '_id' });
            db.createObjectStore('cart', { keyPath: '_id' });
        };

        // Error handling
        request.onerror = function (e) {
            console.error('There was an error!');
        };

        // On successfully opening the database
        request.onsuccess = function (e) {
            // Save reference to database
            db = request.result;
            // Open a transaction for whatever we pass into a store
            tx = db.transaction(storeName, 'readwrite');
            // Save reference to store
            store = tx.objectStore(storeName);

            // Error handling
            db.onerror = function (e) {
                console.error(e);
            };

            // Actual transaction handling
            switch (method) {
                case 'put':
                    store.put(object);
                    resolve(object);
                    break;
                case 'get':
                    const all = store.getAll();
                    all.onsuccess = function () {
                        resolve(all.result);
                    };
                    break;
                case 'delete':
                    store.delete(object._id);
                    break;
                default:
                    console.log('No valid method');
                    break;
            }

            // Close connection when transaction is complete
            tx.oncomplete = function () {
                db.close();
            };
        };
    });
}

export function pluralize(name, count) {
    if (count === 1) {
        return name;
    }
    return name + 's';
}
